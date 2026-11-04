(() => {
  const form = document.querySelector('#contact-form[data-api-form="contact"]');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const typeField = form.querySelector('[name="enquiry_type"]');
  const serviceField = form.querySelector('[name="service"]');
  const dateField = form.querySelector('[name="preferred_date"]');
  const timeField = form.querySelector('[name="preferred_time"]');
  const dateWrap = dateField?.closest('.field');
  const timeWrap = timeField?.closest('.field');
  const typeLabel = form.querySelector('[data-enquiry-type-label]');
  const serviceLabel = form.querySelector('[data-enquiry-service-label]');
  const formTitle = form.querySelector('[data-enquiry-form-title]');
  const formIntro = form.querySelector('[data-enquiry-form-intro]');
  const submitButton = form.querySelector('button[type="submit"]');
  const heroTitle = document.querySelector('[data-contact-hero-title]');
  const heroLead = document.querySelector('[data-contact-hero-lead]');
  const getDirectWa = () => form.querySelector('.whatsapp-direct-btn');

  const catalog = {
    consultation: {
      label: 'Consultation / advisory',
      interestLabel: 'Which solution or consultation do you need?',
      placeholder: 'Select a consulting solution',
      title: 'Request a Consultation',
      intro: 'Choose the advisory or transformation support you want to discuss.',
      hero: 'Let’s discuss the outcome you want to achieve.',
      heroLead: 'Select the service area that best matches your business or organisational priority.',
      submit: 'Send Consultation Request',
      options: [
        'Business strategy, growth and transformation',
        'Operating model, structure and process improvement',
        'HR advisory and leadership development',
        'HR Outsourcing Suite — recruitment, background checks and staff verification',
        'Revenue operations, sales systems and customer growth',
        'Accounting, bookkeeping and finance management',
        'Payroll processing and administration',
        'Internal audit and financial controls review',
        'Statutory external audit coordination through licensed audit firm',
        'Tax health check, computation and filing support',
        'Ongoing tax compliance support',
        'Business compliance and regulatory readiness review',
        'Corporate governance framework and board systems',
        'Business incorporation and registration support',
        'Annual returns and statutory filing support',
        'International business setup and cross-border compliance coordination',
        'Diaspora business setup in Nigeria',
        'Digital transformation, AI and workflow automation',
        'Website and landing page development',
        'Corporate website and CMS development',
        'CRM setup and pipeline configuration',
        'CRM implementation and business system integration',
        'Business intelligence dashboard and analytics',
        'AI assistant or business AI integration',
        'IoT and connected-device solution',
        'Custom software, web or mobile application development',
        'Nexora Business-in-a-Box setup',
        'Executive Strategy Session',
        'Transformation Diagnostic',
        'Corporate training or workshop',
        'Multi-service transformation programme',
        'Business Support & Operations',
        'Systems Writing & Revenue Operations',
        'Market Leadership & Customer Acquisition',
        'Accounting, Financial Analysis & Business Support',
        'Logistics & Fuel Delivery App Development',
        'Business Development & Setup',
        'Other consulting request'
      ]
    },
    partnership: {
      label: 'Partnership / collaboration',
      interestLabel: 'What type of partnership are you proposing?',
      placeholder: 'Select a partnership pathway',
      title: 'Start a Partnership Conversation',
      intro: 'Tell us how you would like to collaborate with GoldBuilders and the wider ecosystem.',
      hero: 'Let’s explore what we can build together.',
      heroLead: 'Choose the partnership pathway that best describes your proposal. This form is for collaboration enquiries, not service consultations.',
      submit: 'Send Partnership Enquiry',
      options: [
        'Strategic delivery or implementation partnership',
        'Technology, software or product partnership',
        'Referral, channel or market-access partnership',
        'Talent, consultant or specialist network partnership',
        'Corporate or institutional partnership',
        'Training, education or learning partnership',
        'Investment, venture or business-building collaboration',
        'Media, marketing or co-branding partnership',
        'Sponsorship, CSR or social-impact partnership',
        'Supplier, vendor or service-provider partnership',
        'Campus, community or ecosystem partnership',
        'Other partnership proposal'
      ]
    },
    programme: {
      label: 'Programme / coaching / training',
      interestLabel: 'Which programme or learning experience interests you?',
      placeholder: 'Select a programme',
      title: 'Enquire About a Programme',
      intro: 'Choose the coaching, training or development programme you want to join or discuss.',
      hero: 'Find the right programme for your next stage.',
      heroLead: 'Select a programme or learning pathway. For a specific programme, its own page may provide a more detailed application form.',
      submit: 'Send Programme Enquiry',
      options: [
        'BeMore Career Mapping Series Coaching — $10/month',
        'BeMore Business Intelligence Mastermind Coaching — $10/month',
        'BeMore ARIS 10X Framework coaching',
        'Leadership Development Programme',
        'Talent Development and Workforce Skills',
        'Corporate workshops, retreats or team programmes',
        'SkeelUP Africa — digital skills and remote-work bootcamp',
        'BI, data analytics or dashboard training',
        'Career coaching and professional development',
        'Executive coaching or leadership masterclass',
        'School of Impact / YIELD learning programme',
        'Other programme enquiry'
      ]
    },
    product: {
      label: 'Digital product / implementation',
      interestLabel: 'What product or implementation do you need?',
      placeholder: 'Select a product or implementation need',
      title: 'Discuss a Digital Solution',
      intro: 'Tell us what you want to build, integrate or improve. We will route this to the relevant solution team.',
      hero: 'Tell us what you want to build or improve.',
      heroLead: 'This route is for product, platform, application and implementation enquiries.',
      submit: 'Send Product Enquiry',
      options: [
        'Nexora Business-in-a-Box',
        'Website / landing page development',
        'Corporate website and CMS development',
        'CRM setup and pipeline configuration',
        'CRM implementation and integrations',
        'ERP or business management system',
        'Business intelligence dashboard and KPI reporting',
        'Multi-source data analytics and reporting system',
        'Workflow automation and system integration',
        'AI assistant / chatbot / business AI integration',
        'IoT solution and connected-device prototype',
        'Custom software / web / mobile application development',
        'Digital product strategy or MVP development',
        'Technology support or enhancement',
        'Other digital solution'
      ]
    },
    general: {
      label: 'General enquiry',
      interestLabel: 'What is your enquiry about?',
      placeholder: 'Select the reason for your enquiry',
      title: 'Send a General Enquiry',
      intro: 'Choose the closest reason for contacting GoldBuilders. We will direct your message to the appropriate team.',
      hero: 'How can we help you?',
      heroLead: 'Choose the type of enquiry you are making so your message reaches the right team.',
      submit: 'Send Enquiry',
      options: [
        'General question about GoldBuilders Co.',
        'Existing customer or project follow-up',
        'Careers, employment or joining the team',
        'Media, speaking or interview request',
        'Vendor or supplier enquiry',
        'Feedback, complaint or service issue',
        'Request for information or company profile',
        'Other enquiry'
      ]
    }
  };

  const normalise = value => String(value || '').trim().toLowerCase();
  const inferType = () => {
    const explicit = normalise(params.get('type'));
    if (catalog[explicit]) return explicit;
    const service = normalise(params.get('service'));
    if (service.includes('partner')) return 'partnership';
    if (/(programme|program|career mapping|mastermind|coaching|training|bootcamp|workshop|retreat|leadership development)/.test(service)) return 'programme';
    if (/(nexora|website|landing page|cms|crm|iot|application|dashboard|analytics|digital product|automation|software|technology|ai assistant|chatbot|web app)/.test(service)) return 'product';
    if (service) return 'consultation';
    return 'general';
  };

  const currentType = () => catalog[typeField.value] ? typeField.value : 'general';
  const fillServices = (type, selected = '') => {
    const config = catalog[type];
    serviceField.replaceChildren();
    const blank = document.createElement('option');
    blank.value = '';
    blank.textContent = config.placeholder;
    serviceField.append(blank);
    config.options.forEach(optionText => {
      const option = document.createElement('option');
      option.value = optionText;
      option.textContent = optionText;
      serviceField.append(option);
    });
    if (selected && ![...serviceField.options].some(option => normalise(option.value) === normalise(selected))) {
      const custom = document.createElement('option');
      custom.value = selected;
      custom.textContent = selected;
      serviceField.append(custom);
    }
    if (selected) {
      const match = [...serviceField.options].find(option => normalise(option.value) === normalise(selected));
      if (match) serviceField.value = match.value;
    }
    serviceField.required = true;
    serviceField.setAttribute('aria-describedby', 'enquiry-context-note');
    if (serviceLabel) serviceLabel.textContent = config.interestLabel;
    if (typeLabel) typeLabel.textContent = config.label;
    if (formTitle) formTitle.textContent = config.title;
    if (formIntro) formIntro.textContent = config.intro;
    if (submitButton) submitButton.textContent = config.submit;
    if (heroTitle) heroTitle.textContent = config.hero;
    if (heroLead) heroLead.textContent = config.heroLead;

    const consultationOnly = type === 'consultation';
    [dateWrap, timeWrap].forEach(wrapper => {
      if (!wrapper) return;
      wrapper.classList.toggle('is-hidden', !consultationOnly);
      wrapper.setAttribute('aria-hidden', consultationOnly ? 'false' : 'true');
    });
    form.dataset.enquiryType = type;
    const consultationNote = form.querySelector('[data-consultation-note]');
    if (consultationNote) consultationNote.hidden = !consultationOnly;
    const directWa = getDirectWa();
    if (directWa) {
      const label = type === 'partnership' ? 'Send Partnership Enquiry on WhatsApp Instead'
        : type === 'programme' ? 'Send Programme Enquiry on WhatsApp Instead'
        : type === 'product' ? 'Send Product Enquiry on WhatsApp Instead'
        : type === 'consultation' ? 'Send Consultation Enquiry on WhatsApp Instead'
        : 'Send General Enquiry on WhatsApp Instead';
      directWa.textContent = label;
      directWa.setAttribute('aria-label', label);
    }
    if (!consultationOnly) { if (dateField) dateField.value = ''; if (timeField) timeField.value = ''; }
  };

  typeField.addEventListener('change', () => fillServices(currentType()));
  document.addEventListener('DOMContentLoaded', () => { if (catalog[typeField.value]) fillServices(currentType(), serviceField.value); });
  const initialType = inferType();
  typeField.value = initialType;
  fillServices(initialType, params.get('service') || '');

  if (params.get('challenge')) {
    const message = form.querySelector('[name="message"]');
    if (message && !message.value) message.value = params.get('challenge').slice(0, 1200);
  }
})();
