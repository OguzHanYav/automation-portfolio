import { Lang } from '../i18n/language.service';

export interface LocalizedText {
  en: string;
  de: string;
  tr: string;
}

export interface LocalizedList {
  en: string[];
  de: string[];
  tr: string[];
}

export interface AutomationProject {
  slug: string;
  tools: string[];
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  result: LocalizedText;
  workflow: LocalizedList;
  features: LocalizedList;
  businessValue: LocalizedList;
}

/** Small helper so templates can do `project.title[lang]` safely. */
export function localize(value: LocalizedText, lang: Lang): string;
export function localize(value: LocalizedList, lang: Lang): string[];
export function localize(value: LocalizedText | LocalizedList, lang: Lang): string | string[] {
  return value[lang];
}

export const automationProjects: AutomationProject[] = [
  {
    slug: 'lead-capture-crm',
    tools: ['Webhooks', 'CRM API', 'Automation Engine'],
    category: { en: 'Lead Management', de: 'Lead-Management', tr: 'Lead Yönetimi' },
    title: {
      en: 'Lead Capture & CRM Sync',
      de: 'Lead-Erfassung & CRM-Synchronisation',
      tr: 'Lead Yakalama ve CRM Senkronizasyonu'
    },
    summary: {
      en: 'Website leads are captured, qualified and pushed into a CRM pipeline automatically.',
      de: 'Website-Leads werden automatisch erfasst, qualifiziert und in eine CRM-Pipeline übertragen.',
      tr: "Web sitesi lead'leri otomatik olarak yakalanır, nitelendirilir ve bir CRM iş akışına aktarılır."
    },
    problem: {
      en: 'Leads from the website landed in an inbox and were often followed up too late or not at all.',
      de: 'Leads von der Website landeten im Posteingang und wurden oft zu spät oder gar nicht kontaktiert.',
      tr: "Web sitesinden gelen lead'ler gelen kutusuna düşüyor ve çoğu zaman geç ya da hiç takip edilmiyordu."
    },
    solution: {
      en: 'Every form submission is validated, enriched and written directly into the CRM as a new deal with the right owner assigned.',
      de: 'Jede Formular-Anfrage wird validiert, angereichert und direkt als neuer Deal mit passendem Verantwortlichen ins CRM geschrieben.',
      tr: "Her form gönderimi doğrulanır, zenginleştirilir ve doğru sorumlu atanmış şekilde doğrudan CRM'e yeni bir fırsat olarak yazılır."
    },
    result: {
      en: 'Response time dropped from days to minutes, with no manual data entry.',
      de: 'Die Reaktionszeit sank von Tagen auf Minuten, ganz ohne manuelle Dateneingabe.',
      tr: 'Yanıt süresi günlerden dakikalara düştü, manuel veri girişi olmadan.'
    },
    workflow: {
      en: ['Form submitted on website', 'Data validated and deduplicated', 'Lead scored automatically', 'Deal created in CRM', 'Owner notified in real time'],
      de: ['Formular auf der Website ausgefüllt', 'Daten validiert und dedupliziert', 'Lead automatisch bewertet', 'Deal im CRM angelegt', 'Verantwortlicher in Echtzeit benachrichtigt'],
      tr: ['Web sitesinde form gönderildi', 'Veriler doğrulandı ve tekilleştirildi', 'Lead otomatik olarak puanlandı', "CRM'de fırsat oluşturuldu", 'Sorumlu gerçek zamanlı bilgilendirildi']
    },
    features: {
      en: ['Real-time CRM sync', 'Automatic lead scoring', 'Duplicate detection', 'Owner routing rules'],
      de: ['Echtzeit-CRM-Synchronisation', 'Automatische Lead-Bewertung', 'Duplikaterkennung', 'Zuweisungsregeln für Verantwortliche'],
      tr: ['Gerçek zamanlı CRM senkronizasyonu', 'Otomatik lead puanlama', 'Yinelenen kayıt tespiti', 'Sorumlu yönlendirme kuralları']
    },
    businessValue: {
      en: ['Faster response', 'No data loss', 'Less admin work', 'Clear ownership'],
      de: ['Schnellere Reaktion', 'Kein Datenverlust', 'Weniger Verwaltungsaufwand', 'Klare Verantwortlichkeit'],
      tr: ['Daha hızlı yanıt', 'Veri kaybı yok', 'Daha az idari iş', 'Net sorumluluk']
    }
  },
  {
    slug: 'onboarding-flow',
    tools: ['Task Automation', 'E-Signature API', 'Email Sequencer'],
    category: { en: 'Client Onboarding', de: 'Kunden-Onboarding', tr: 'Müşteri Onboarding' },
    title: {
      en: 'Client Onboarding Automation',
      de: 'Automatisiertes Kunden-Onboarding',
      tr: 'Müşteri Onboarding Otomasyonu'
    },
    summary: {
      en: 'New clients move from signed contract to a fully set up account without manual checklists.',
      de: 'Neue Kunden gelangen vom unterschriebenen Vertrag bis zum vollständig eingerichteten Konto ohne manuelle Checklisten.',
      tr: 'Yeni müşteriler, manuel kontrol listeleri olmadan imzalanan sözleşmeden tamamen kurulmuş bir hesaba geçer.'
    },
    problem: {
      en: 'Onboarding steps lived in spreadsheets and emails, so steps were regularly missed or delayed.',
      de: 'Onboarding-Schritte lagen in Tabellen und E-Mails, sodass Schritte regelmäßig vergessen oder verzögert wurden.',
      tr: 'Onboarding adımları tablolarda ve e-postalarda tutuluyordu, bu yüzden adımlar sık sık atlanıyor ya da gecikiyordu.'
    },
    solution: {
      en: 'A signed contract triggers a checklist that creates accounts, sends welcome material and books a kickoff call automatically.',
      de: 'Ein unterschriebener Vertrag löst eine Checkliste aus, die automatisch Konten anlegt, Willkommensmaterial versendet und ein Kickoff-Gespräch bucht.',
      tr: "İmzalanan bir sözleşme, hesapları oluşturan, hoş geldin materyallerini gönderen ve otomatik olarak bir başlangıç görüşmesi ayarlayan bir kontrol listesini tetikler."
    },
    result: {
      en: 'Onboarding time dropped by more than half and nothing gets forgotten.',
      de: 'Die Onboarding-Zeit sank um mehr als die Hälfte, und nichts wird mehr vergessen.',
      tr: 'Onboarding süresi yarıdan fazla azaldı ve hiçbir şey unutulmuyor.'
    },
    workflow: {
      en: ['Contract signed', 'Accounts created automatically', 'Welcome sequence sent', 'Kickoff call booked', 'Internal team notified'],
      de: ['Vertrag unterschrieben', 'Konten automatisch angelegt', 'Willkommens-Sequenz versendet', 'Kickoff-Gespräch gebucht', 'Internes Team benachrichtigt'],
      tr: ['Sözleşme imzalandı', 'Hesaplar otomatik oluşturuldu', 'Hoş geldin serisi gönderildi', 'Başlangıç görüşmesi ayarlandı', 'İç ekip bilgilendirildi']
    },
    features: {
      en: ['Trigger-based checklist', 'Automatic account setup', 'Scheduled welcome emails', 'Calendar integration'],
      de: ['Trigger-basierte Checkliste', 'Automatische Kontoeinrichtung', 'Geplante Willkommens-E-Mails', 'Kalenderintegration'],
      tr: ['Tetikleyici tabanlı kontrol listesi', 'Otomatik hesap kurulumu', 'Zamanlanmış hoş geldin e-postaları', 'Takvim entegrasyonu']
    },
    businessValue: {
      en: ['Consistent experience', 'Fewer missed steps', 'Faster time to value', 'Less manual coordination'],
      de: ['Konsistentes Erlebnis', 'Weniger vergessene Schritte', 'Schnellerer Mehrwert', 'Weniger manuelle Koordination'],
      tr: ['Tutarlı deneyim', 'Daha az atlanan adım', 'Daha hızlı değer üretimi', 'Daha az manuel koordinasyon']
    }
  },
  {
    slug: 'booking-followup',
    tools: ['Calendar API', 'SMS/Email Gateway', 'Automation Engine'],
    category: { en: 'Booking & Follow-up', de: 'Buchung & Follow-up', tr: 'Randevu ve Takip' },
    title: {
      en: 'Booking & Follow-up System',
      de: 'Buchungs- und Follow-up-System',
      tr: 'Randevu ve Takip Sistemi'
    },
    summary: {
      en: 'Appointments are booked, confirmed and followed up automatically without double bookings.',
      de: 'Termine werden automatisch gebucht, bestätigt und nachverfolgt, ohne Doppelbuchungen.',
      tr: 'Randevular çift kayıt olmadan otomatik olarak alınır, onaylanır ve takip edilir.'
    },
    problem: {
      en: 'Bookings came in through several channels, causing double bookings and missed reminders.',
      de: 'Buchungen kamen über mehrere Kanäle rein, was zu Doppelbuchungen und verpassten Erinnerungen führte.',
      tr: 'Randevular birden fazla kanaldan geliyordu, bu da çift kayıtlara ve kaçırılan hatırlatmalara neden oluyordu.'
    },
    solution: {
      en: 'One shared calendar checks availability in real time and sends automatic confirmations and reminders.',
      de: 'Ein gemeinsamer Kalender prüft die Verfügbarkeit in Echtzeit und versendet automatische Bestätigungen und Erinnerungen.',
      tr: 'Ortak bir takvim müsaitliği gerçek zamanlı kontrol eder ve otomatik onay ile hatırlatmalar gönderir.'
    },
    result: {
      en: 'No-shows dropped noticeably and the calendar stays conflict-free.',
      de: 'Die No-Show-Quote sank spürbar, und der Kalender bleibt konfliktfrei.',
      tr: 'Gelmeme oranı belirgin şekilde azaldı ve takvim çakışmasız kaldı.'
    },
    workflow: {
      en: ['Booking request received', 'Availability checked in real time', 'Confirmation sent instantly', 'Reminder sent before appointment', 'Follow-up sent after appointment'],
      de: ['Buchungsanfrage eingegangen', 'Verfügbarkeit in Echtzeit geprüft', 'Bestätigung sofort versendet', 'Erinnerung vor dem Termin versendet', 'Follow-up nach dem Termin versendet'],
      tr: ['Randevu talebi alındı', 'Müsaitlik gerçek zamanlı kontrol edildi', 'Onay anında gönderildi', 'Randevudan önce hatırlatma gönderildi', 'Randevudan sonra takip gönderildi']
    },
    features: {
      en: ['Real-time availability check', 'Automatic confirmations', 'Reminder sequence', 'Post-appointment follow-up'],
      de: ['Echtzeit-Verfügbarkeitsprüfung', 'Automatische Bestätigungen', 'Erinnerungs-Sequenz', 'Follow-up nach dem Termin'],
      tr: ['Gerçek zamanlı müsaitlik kontrolü', 'Otomatik onaylar', 'Hatırlatma serisi', 'Randevu sonrası takip']
    },
    businessValue: {
      en: ['Fewer no-shows', 'No double bookings', 'Better client experience', 'Time saved on coordination'],
      de: ['Weniger No-Shows', 'Keine Doppelbuchungen', 'Besseres Kundenerlebnis', 'Zeitersparnis bei der Koordination'],
      tr: ['Daha az gelmeme', 'Çift kayıt yok', 'Daha iyi müşteri deneyimi', 'Koordinasyonda zaman tasarrufu']
    }
  }
];

export function getProjectBySlug(slug: string): AutomationProject | undefined {
  return automationProjects.find((project) => project.slug === slug);
}
