export type Lang = 'en' | 'de' | 'tr';

export const translations: Record<Lang, any> = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      demo: 'CRM Demo',
      contact: 'Contact',
      devPortfolio: 'Dev Portfolio',
      brandTag: 'Automation Systems'
    },
    footer: {
      role: 'Automation · IT Systems · Frontend Development',
      note: 'Built with anonymized demo workflows.',
      rights: '© 2026'
    },
    home: {
      pageTitle: 'Automation Portfolio',
      eyebrow: 'Automation Portfolio',
      title: 'I design clean automation systems for business workflows.',
      text: 'Interactive demo case studies for lead management, client onboarding, booking flows and internal operations — rebuilt without sensitive client data.',
      exploreBtn: 'Explore case studies',
      startBtn: 'Start a project',
      liveConceptLabel: 'Live workflow concept',
      pipelineTitle: 'Lead → System → Follow-up',
      pipelineSteps: ['Capture', 'Structure', 'Notify', 'Respond'],
      metrics: ['Demo systems', 'Client data exposed', 'Business-focused'],
      approachEyebrow: 'Approach',
      approachTitle: 'Built like business systems, not just nice pages.',
      features: [
        { title: 'Process first', text: 'Each automation starts with the business problem, not the tool.' },
        { title: 'Lean stack', text: 'Simple architecture with minimal external tools and clear ownership.' },
        { title: 'Trust by design', text: 'No confidential names, no real customer data, no unnecessary tracking.' }
      ],
      selectedWorkEyebrow: 'Selected work',
      selectedWorkTitle: 'Automation case studies',
      viewAll: 'View all →',
      ctaEyebrow: "Let's build smarter workflows",
      ctaTitle: 'Manual work is expensive. A clean system pays for itself.',
      ctaBtn: 'Contact me',
      tryDemoBtn: 'Try the live demo →'
    },
    projects: {
      pageTitle: 'Work',
      eyebrow: 'Work',
      title: 'Automation case studies.',
      text: 'A collection of clean, anonymized workflow systems designed to show how business processes can be automated.'
    },
    projectCard: {
      caseStudy: 'Case Study',
      viewSystem: 'View system →'
    },
    projectDetail: {
      back: '← Back to work',
      problem: 'Problem',
      solution: 'Solution',
      result: 'Result',
      workflowTitle: 'Workflow',
      featuresTitle: 'Features',
      valueTitle: 'Business value',
      ctaEyebrow: 'Want a similar system?',
      ctaTitle: "Let's design a workflow that saves time every week.",
      ctaBtn: 'Start a conversation',
      notFoundTitle: 'Project not found',
      notFoundBtn: 'Back to work'
    },
    contact: {
      pageTitle: 'Contact',
      eyebrow: 'Contact',
      title: 'Tell me what workflow you want to improve.',
      text: 'This form opens an email draft. It does not store data or use tracking.',
      emailLabel: 'Email',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailFieldLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'Which process should be automated?',
      consentLabel: 'I agree that my information may be used to respond to this request.',
      submitBtn: 'Prepare email',
      noticeSuccess: 'Your email client should open now.',
      noticeConsent: 'Please accept the consent checkbox first.'
    },
    crm: {
      eyebrow: 'Interactive Demo',
      pageTitle: 'CRM Demo',
      title: 'See a booking & follow-up pipeline in action',
      text: 'This is a live, working demo — not just a screenshot. Create a lead, open it, and move it through the pipeline exactly like a real CRM.',
      newLeadBtn: '+ New lead',
      viewPipeline: 'Pipeline',
      viewList: 'List',
      stages: {
        new: 'New Lead',
        contacted: 'Contacted',
        booked: 'Booked',
        completed: 'Completed',
        followup: 'Follow-up',
        lost: 'Lost'
      },
      list: {
        name: 'Name',
        company: 'Company',
        stage: 'Stage',
        value: 'Value',
        source: 'Source',
        created: 'Created',
        empty: 'No leads yet — create your first one.'
      },
      form: {
        title: 'New lead',
        nameLabel: 'Name',
        namePlaceholder: 'Jane Doe',
        emailLabel: 'Email',
        emailPlaceholder: 'jane@example.com',
        phoneLabel: 'Phone',
        phonePlaceholder: '+43 660 1234567',
        companyLabel: 'Company',
        companyPlaceholder: 'Company name',
        sourceLabel: 'Source',
        sources: ['Website', 'Referral', 'Phone', 'Walk-in', 'Social Media'],
        valueLabel: 'Estimated value (€)',
        valuePlaceholder: '0',
        noteLabel: 'Initial note (optional)',
        notePlaceholder: 'Anything worth remembering?',
        submitBtn: 'Create lead',
        cancelBtn: 'Cancel'
      },
      detail: {
        contactLabel: 'Contact',
        sourceLabel: 'Source',
        valueLabel: 'Estimated value',
        createdLabel: 'Created',
        moveTitle: 'Move to stage',
        notesTitle: 'Notes',
        addNotePlaceholder: 'Add a note…',
        addNoteBtn: 'Add note',
        noNotes: 'No notes yet.',
        deleteBtn: 'Delete lead'
      },
      deleteConfirm: 'Delete this lead? This cannot be undone.'
    }
  },

  de: {
    nav: {
      home: 'Start',
      work: 'Projekte',
      demo: 'CRM-Demo',
      contact: 'Kontakt',
      devPortfolio: 'Dev-Portfolio',
      brandTag: 'Automatisierungssysteme'
    },
    footer: {
      role: 'Automatisierung · IT-Systeme · Frontend-Entwicklung',
      note: 'Erstellt mit anonymisierten Demo-Workflows.',
      rights: '© 2026'
    },
    home: {
      pageTitle: 'Automatisierungs-Portfolio',
      eyebrow: 'Automatisierungs-Portfolio',
      title: 'Ich entwickle klare Automatisierungssysteme für Geschäftsprozesse.',
      text: 'Interaktive Demo-Fallstudien für Lead-Management, Kunden-Onboarding, Buchungsabläufe und interne Prozesse — nachgebaut ohne sensible Kundendaten.',
      exploreBtn: 'Fallstudien ansehen',
      startBtn: 'Projekt starten',
      liveConceptLabel: 'Live-Workflow-Konzept',
      pipelineTitle: 'Lead → System → Follow-up',
      pipelineSteps: ['Erfassen', 'Strukturieren', 'Benachrichtigen', 'Antworten'],
      metrics: ['Demo-Systeme', 'Kundendaten offengelegt', 'Geschäftsfokussiert'],
      approachEyebrow: 'Ansatz',
      approachTitle: 'Gebaut wie Geschäftssysteme, nicht nur schöne Seiten.',
      features: [
        { title: 'Prozess zuerst', text: 'Jede Automatisierung beginnt mit dem Geschäftsproblem, nicht mit dem Tool.' },
        { title: 'Schlanker Stack', text: 'Einfache Architektur mit minimalen externen Tools und klarer Verantwortlichkeit.' },
        { title: 'Vertrauen durch Design', text: 'Keine vertraulichen Namen, keine echten Kundendaten, kein unnötiges Tracking.' }
      ],
      selectedWorkEyebrow: 'Ausgewählte Arbeiten',
      selectedWorkTitle: 'Automatisierungs-Fallstudien',
      viewAll: 'Alle ansehen →',
      ctaEyebrow: 'Lass uns smartere Workflows bauen',
      ctaTitle: 'Manuelle Arbeit ist teuer. Ein sauberes System zahlt sich selbst aus.',
      ctaBtn: 'Kontakt aufnehmen',
      tryDemoBtn: 'Live-Demo ausprobieren →'
    },
    projects: {
      pageTitle: 'Projekte',
      eyebrow: 'Projekte',
      title: 'Automatisierungs-Fallstudien.',
      text: 'Eine Sammlung sauberer, anonymisierter Workflow-Systeme, die zeigen, wie Geschäftsprozesse automatisiert werden können.'
    },
    projectCard: {
      caseStudy: 'Fallstudie',
      viewSystem: 'System ansehen →'
    },
    projectDetail: {
      back: '← Zurück zu den Projekten',
      problem: 'Problem',
      solution: 'Lösung',
      result: 'Ergebnis',
      workflowTitle: 'Ablauf',
      featuresTitle: 'Funktionen',
      valueTitle: 'Geschäftlicher Nutzen',
      ctaEyebrow: 'Ähnliches System gewünscht?',
      ctaTitle: 'Lass uns einen Workflow entwerfen, der jede Woche Zeit spart.',
      ctaBtn: 'Gespräch beginnen',
      notFoundTitle: 'Projekt nicht gefunden',
      notFoundBtn: 'Zurück zu den Projekten'
    },
    contact: {
      pageTitle: 'Kontakt',
      eyebrow: 'Kontakt',
      title: 'Sag mir, welchen Workflow du verbessern möchtest.',
      text: 'Dieses Formular öffnet einen E-Mail-Entwurf. Es speichert keine Daten und verwendet kein Tracking.',
      emailLabel: 'E-Mail',
      nameLabel: 'Name',
      namePlaceholder: 'Dein Name',
      emailFieldLabel: 'E-Mail',
      emailPlaceholder: 'du@beispiel.de',
      messageLabel: 'Nachricht',
      messagePlaceholder: 'Welcher Prozess soll automatisiert werden?',
      consentLabel: 'Ich stimme zu, dass meine Angaben zur Beantwortung dieser Anfrage verwendet werden dürfen.',
      submitBtn: 'E-Mail vorbereiten',
      noticeSuccess: 'Dein E-Mail-Programm sollte sich jetzt öffnen.',
      noticeConsent: 'Bitte akzeptiere zuerst die Zustimmungs-Checkbox.'
    },
    crm: {
      eyebrow: 'Interaktive Demo',
      pageTitle: 'CRM-Demo',
      title: 'Erlebe eine Buchungs- & Follow-up-Pipeline live',
      text: 'Das ist eine echte, funktionierende Demo — kein Screenshot. Lege einen Lead an, öffne ihn und schiebe ihn durch die Pipeline, genau wie in einem echten CRM.',
      newLeadBtn: '+ Neuer Lead',
      viewPipeline: 'Pipeline',
      viewList: 'Liste',
      stages: {
        new: 'Neuer Lead',
        contacted: 'Kontaktiert',
        booked: 'Gebucht',
        completed: 'Abgeschlossen',
        followup: 'Follow-up',
        lost: 'Verloren'
      },
      list: {
        name: 'Name',
        company: 'Unternehmen',
        stage: 'Phase',
        value: 'Wert',
        source: 'Quelle',
        created: 'Erstellt',
        empty: 'Noch keine Leads — leg deinen ersten an.'
      },
      form: {
        title: 'Neuer Lead',
        nameLabel: 'Name',
        namePlaceholder: 'Anna Muster',
        emailLabel: 'E-Mail',
        emailPlaceholder: 'anna@beispiel.de',
        phoneLabel: 'Telefon',
        phonePlaceholder: '+43 660 1234567',
        companyLabel: 'Unternehmen',
        companyPlaceholder: 'Firmenname',
        sourceLabel: 'Quelle',
        sources: ['Website', 'Empfehlung', 'Telefon', 'Laufkundschaft', 'Social Media'],
        valueLabel: 'Geschätzter Wert (€)',
        valuePlaceholder: '0',
        noteLabel: 'Erste Notiz (optional)',
        notePlaceholder: 'Was sollte man sich merken?',
        submitBtn: 'Lead anlegen',
        cancelBtn: 'Abbrechen'
      },
      detail: {
        contactLabel: 'Kontakt',
        sourceLabel: 'Quelle',
        valueLabel: 'Geschätzter Wert',
        createdLabel: 'Erstellt',
        moveTitle: 'Phase ändern',
        notesTitle: 'Notizen',
        addNotePlaceholder: 'Notiz hinzufügen…',
        addNoteBtn: 'Notiz hinzufügen',
        noNotes: 'Noch keine Notizen.',
        deleteBtn: 'Lead löschen'
      },
      deleteConfirm: 'Diesen Lead löschen? Das kann nicht rückgängig gemacht werden.'
    }
  },

  tr: {
    nav: {
      home: 'Ana Sayfa',
      work: 'Projeler',
      demo: 'CRM Demosu',
      contact: 'İletişim',
      devPortfolio: 'Yazılım Portföyü',
      brandTag: 'Otomasyon Sistemleri'
    },
    footer: {
      role: 'Otomasyon · BT Sistemleri · Frontend Geliştirme',
      note: 'Anonimleştirilmiş demo iş akışlarıyla oluşturulmuştur.',
      rights: '© 2026'
    },
    home: {
      pageTitle: 'Otomasyon Portföyü',
      eyebrow: 'Otomasyon Portföyü',
      title: 'İş süreçleri için sade otomasyon sistemleri tasarlıyorum.',
      text: "Lead yönetimi, müşteri onboarding, randevu akışları ve iç operasyonlar için interaktif demo vaka çalışmaları — hassas müşteri verisi olmadan yeniden oluşturuldu.",
      exploreBtn: 'Vaka çalışmalarını incele',
      startBtn: 'Projeye başla',
      liveConceptLabel: 'Canlı iş akışı konsepti',
      pipelineTitle: 'Lead → Sistem → Takip',
      pipelineSteps: ['Yakala', 'Yapılandır', 'Bildir', 'Yanıtla'],
      metrics: ['Demo sistem', 'Müşteri verisi paylaşıldı', 'İş odaklı'],
      approachEyebrow: 'Yaklaşım',
      approachTitle: 'Sadece güzel sayfalar değil, iş sistemleri gibi inşa edildi.',
      features: [
        { title: 'Önce süreç', text: 'Her otomasyon araçla değil, iş problemiyle başlar.' },
        { title: 'Sade altyapı', text: 'Minimum harici araç ve net sorumluluklarla basit mimari.' },
        { title: 'Tasarımla güven', text: 'Gizli isim yok, gerçek müşteri verisi yok, gereksiz takip yok.' }
      ],
      selectedWorkEyebrow: 'Seçili çalışmalar',
      selectedWorkTitle: 'Otomasyon vaka çalışmaları',
      viewAll: 'Tümünü gör →',
      ctaEyebrow: 'Daha akıllı iş akışları kuralım',
      ctaTitle: 'Manuel iş pahalıdır. Sade bir sistem kendini amorti eder.',
      ctaBtn: 'Benimle iletişime geç',
      tryDemoBtn: 'Canlı demoyu dene →'
    },
    projects: {
      pageTitle: 'Projeler',
      eyebrow: 'Projeler',
      title: 'Otomasyon vaka çalışmaları.',
      text: "İş süreçlerinin nasıl otomatikleştirilebileceğini gösteren, sade ve anonimleştirilmiş iş akışı sistemleri koleksiyonu."
    },
    projectCard: {
      caseStudy: 'Vaka Çalışması',
      viewSystem: 'Sistemi görüntüle →'
    },
    projectDetail: {
      back: '← Projelere dön',
      problem: 'Problem',
      solution: 'Çözüm',
      result: 'Sonuç',
      workflowTitle: 'İş Akışı',
      featuresTitle: 'Özellikler',
      valueTitle: 'İş değeri',
      ctaEyebrow: 'Benzer bir sistem mi istiyorsunuz?',
      ctaTitle: 'Her hafta zaman kazandıran bir iş akışı tasarlayalım.',
      ctaBtn: 'Görüşmeye başla',
      notFoundTitle: 'Proje bulunamadı',
      notFoundBtn: 'Projelere dön'
    },
    contact: {
      pageTitle: 'İletişim',
      eyebrow: 'İletişim',
      title: 'Hangi iş akışını geliştirmek istediğinizi söyleyin.',
      text: 'Bu form bir e-posta taslağı açar. Veri saklamaz ve takip kullanmaz.',
      emailLabel: 'E-posta',
      nameLabel: 'İsim',
      namePlaceholder: 'Adınız',
      emailFieldLabel: 'E-posta',
      emailPlaceholder: 'siz@ornek.com',
      messageLabel: 'Mesaj',
      messagePlaceholder: 'Hangi süreç otomatikleştirilmeli?',
      consentLabel: "Bilgilerimin bu talebi yanıtlamak için kullanılmasını kabul ediyorum.",
      submitBtn: 'E-postayı hazırla',
      noticeSuccess: 'E-posta uygulamanız şimdi açılmalı.',
      noticeConsent: 'Lütfen önce onay kutusunu işaretleyin.'
    },
    crm: {
      eyebrow: 'İnteraktif Demo',
      pageTitle: 'CRM Demosu',
      title: 'Bir randevu ve takip pipeline\'ını canlı izleyin',
      text: 'Bu gerçek, çalışan bir demo — sadece ekran görüntüsü değil. Bir lead oluşturun, açın ve gerçek bir CRM\'de olduğu gibi pipeline boyunca ilerletin.',
      newLeadBtn: '+ Yeni lead',
      viewPipeline: 'Pipeline',
      viewList: 'Liste',
      stages: {
        new: 'Yeni Lead',
        contacted: 'İletişime Geçildi',
        booked: 'Randevu Alındı',
        completed: 'Tamamlandı',
        followup: 'Takip',
        lost: 'Kaybedildi'
      },
      list: {
        name: 'İsim',
        company: 'Şirket',
        stage: 'Aşama',
        value: 'Değer',
        source: 'Kaynak',
        created: 'Oluşturuldu',
        empty: 'Henüz lead yok — ilkini oluşturun.'
      },
      form: {
        title: 'Yeni Lead',
        nameLabel: 'İsim',
        namePlaceholder: 'Ayşe Yılmaz',
        emailLabel: 'E-posta',
        emailPlaceholder: 'ayse@ornek.com',
        phoneLabel: 'Telefon',
        phonePlaceholder: '+90 532 111 22 33',
        companyLabel: 'Şirket',
        companyPlaceholder: 'Şirket adı',
        sourceLabel: 'Kaynak',
        sources: ['Web Sitesi', 'Referans', 'Telefon', 'Mağaza', 'Sosyal Medya'],
        valueLabel: 'Tahmini değer (€)',
        valuePlaceholder: '0',
        noteLabel: 'İlk not (opsiyonel)',
        notePlaceholder: 'Hatırlanması gereken bir şey var mı?',
        submitBtn: 'Lead oluştur',
        cancelBtn: 'İptal'
      },
      detail: {
        contactLabel: 'İletişim',
        sourceLabel: 'Kaynak',
        valueLabel: 'Tahmini değer',
        createdLabel: 'Oluşturuldu',
        moveTitle: 'Aşamayı değiştir',
        notesTitle: 'Notlar',
        addNotePlaceholder: 'Not ekle…',
        addNoteBtn: 'Not ekle',
        noNotes: 'Henüz not yok.',
        deleteBtn: 'Lead\'i sil'
      },
      deleteConfirm: 'Bu lead silinsin mi? Bu işlem geri alınamaz.'
    }
  }
};
