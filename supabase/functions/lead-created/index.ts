// supabase/functions/lead-created/index.ts
//
// Wird vom Supabase Database Webhook bei INSERT auf "leads" aufgerufen.
// Läuft unabhängig vom Frontend (Angular hat keinen eigenen Server) —
// Deploy: supabase functions deploy lead-created --no-verify-jwt
//
// SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY sind in Edge Functions
// automatisch als Env-Variablen vorhanden. Die übrigen Secrets einmalig
// setzen, siehe README.

import { createClient } from 'npm:@supabase/supabase-js@2';

const LEAD_WEBHOOK_SECRET = Deno.env.get('LEAD_WEBHOOK_SECRET') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') ?? 'CRM Demo <onboarding@resend.dev>';

const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID') ?? '';
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN') ?? '';
const TWILIO_WHATSAPP_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM') ?? '';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: Lead;
}

Deno.serve(async (req: Request) => {
  if (req.headers.get('x-webhook-secret') !== LEAD_WEBHOOK_SECRET) {
    return json({ error: 'Unauthorized' }, 401);
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  if (payload.type !== 'INSERT' || payload.table !== 'leads') {
    return json({ ok: true, skipped: true }, 200);
  }

  const lead = payload.record;
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Beide Kanäle unabhängig voneinander — ein Fehlschlag beim einen
  // blockiert nie den anderen, und der Lead existiert bereits in der DB,
  // bevor diese Funktion überhaupt aufgerufen wird.
  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendEmail(lead),
    lead.phone ? sendWhatsapp(lead.name, lead.phone) : Promise.reject(new Error('Lead hat keine Telefonnummer'))
  ]);

  await Promise.allSettled([
    logNotification(admin, lead.id, 'email', emailResult),
    logNotification(admin, lead.id, 'whatsapp', whatsappResult)
  ]);

  if (emailResult.status === 'rejected') {
    console.error(`[lead-created] E-Mail fehlgeschlagen für Lead ${lead.id}:`, emailResult.reason);
  }
  if (whatsappResult.status === 'rejected') {
    console.error(`[lead-created] WhatsApp fehlgeschlagen für Lead ${lead.id}:`, whatsappResult.reason);
  }

  return json({
    ok: true,
    leadId: lead.id,
    email: emailResult.status,
    whatsapp: whatsappResult.status
  });
});

async function sendEmail(lead: Lead): Promise<unknown> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: lead.email,
      subject: 'Deine Anfrage ist eingegangen',
      html: `
        <p>Hallo ${escapeHtml(lead.name)},</p>
        <p>vielen Dank für deine Anfrage! Deine CRM-Automatisierung wurde erfolgreich initiiert.</p>
        <p>Wir melden uns in Kürze bei dir.</p>
      `.trim()
    })
  });

  if (!res.ok) {
    throw new Error(`Resend-Fehler ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function sendWhatsapp(name: string, phone: string): Promise<unknown> {
  if (!/^\+[1-9]\d{6,14}$/.test(phone)) {
    throw new Error(`Ungültiges Telefonformat für WhatsApp: "${phone}" (erwartet E.164, z. B. +491511234567)`);
  }

  const body = new URLSearchParams({
    From: TWILIO_WHATSAPP_FROM,
    To: `whatsapp:${phone}`,
    Body: `Hallo ${name} 👋 Deine Test-Anfrage ist erfolgreich im CRM eingegangen!`
  });

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (!res.ok) {
    throw new Error(`Twilio-Fehler ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function logNotification(
  admin: ReturnType<typeof createClient>,
  leadId: string,
  channel: 'email' | 'whatsapp',
  result: PromiseSettledResult<unknown>
): Promise<void> {
  const { error } = await admin.from('lead_notifications').insert({
    lead_id: leadId,
    channel,
    status: result.status === 'fulfilled' ? 'sent' : 'failed',
    error: result.status === 'rejected' ? String(result.reason) : null
  });
  if (error) {
    console.error(`[lead-created] Konnte Notification-Log (${channel}) nicht schreiben:`, error);
  }
}

function escapeHtml(value: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, (char) => map[char]);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
