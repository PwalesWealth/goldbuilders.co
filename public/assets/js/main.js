document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav-links]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
      toggle.setAttribute('aria-expanded', nav.classList.contains('show') ? 'true' : 'false');
    });
  }
  const currentPage = document.body.dataset.page;
  // Persistent direct-contact option across public pages; form-specific buttons also include enquiry details.
  const isAdminPath = window.location.pathname.includes('/admin/');
  if (!isAdminPath && currentPage !== 'nexora-solutions' && !document.querySelector('[data-global-whatsapp]')) {
    const pageTitle = document.title.replace(/\s*\|\s*GoldBuilders Co\.?/i, '').trim() || 'your website';
    const pageIntent = currentPage === 'partners' ? 'a partnership or collaboration' : currentPage === 'contact' ? 'an enquiry' : 'a service or programme enquiry';
    const message = `Hello GoldBuilders Co., I am viewing ${pageTitle} and would like to discuss ${pageIntent}. Please guide me on the next step.`;
    const quickContact = document.createElement('a');
    quickContact.href = `https://wa.me/2348022848749?text=${encodeURIComponent(message)}`;
    quickContact.className = 'global-wa-cta';
    quickContact.dataset.globalWhatsapp = 'true';
    quickContact.target = '_blank';
    quickContact.rel = 'noopener noreferrer';
    quickContact.setAttribute('aria-label', `Start a WhatsApp consultation with GoldBuilders Co. about ${pageTitle}`);
    const quickContactLabel = currentPage === 'partners' ? 'WhatsApp Partnership' : currentPage === 'contact' ? 'WhatsApp Enquiry' : 'WhatsApp Consultation';
    quickContact.innerHTML = `<span class="wa-dot" aria-hidden="true"></span><span>${quickContactLabel}</span>`;
    document.body.appendChild(quickContact);
  }
  document.querySelectorAll('[data-page]').forEach(link => {
    if (link.dataset.page === currentPage) link.classList.add('active');
  });
  const closeSubsidiaryAccordions = scope => {
    scope.querySelectorAll('[data-subsidiary-family].open').forEach(family => {
      family.classList.remove('open');
      const button = family.querySelector('[data-subsidiary-toggle]');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };
  document.querySelectorAll('[data-dropdown]').forEach(menu => {
    const btn = menu.querySelector(':scope > .nav-submenu-toggle');
    if (!btn) return;
    btn.addEventListener('click', event => {
      event.stopPropagation();
      const wasOpen = menu.classList.contains('open');
      document.querySelectorAll('[data-dropdown].open').forEach(other => {
        if (other === menu) return;
        other.classList.remove('open');
        const otherButton = other.querySelector(':scope > .nav-submenu-toggle');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
        closeSubsidiaryAccordions(other);
      });
      if (wasOpen) {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        closeSubsidiaryAccordions(menu);
      } else {
        menu.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.querySelectorAll('[data-subsidiary-toggle]').forEach(btn => {
    btn.addEventListener('click', event => {
      event.stopPropagation();
      const family = btn.closest('[data-subsidiary-family]');
      const outerMenu = btn.closest('[data-subsidiaries-menu]');
      if (!family || !outerMenu) return;
      const wasOpen = family.classList.contains('open');
      outerMenu.querySelectorAll('[data-subsidiary-family].open').forEach(other => {
        other.classList.remove('open');
        const otherButton = other.querySelector('[data-subsidiary-toggle]');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        family.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
  document.addEventListener('click', event => {
    document.querySelectorAll('[data-dropdown].open, [data-subsidiaries].open').forEach(menu => {
      if (!menu.contains(event.target)) {
        menu.classList.remove('open');
        const button = menu.querySelector(':scope > .nav-submenu-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
        closeSubsidiaryAccordions(menu);
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('[data-dropdown].open').forEach(menu => {
      menu.classList.remove('open');
      const button = menu.querySelector(':scope > .nav-submenu-toggle');
      if (button) { button.setAttribute('aria-expanded', 'false'); button.focus(); }
      closeSubsidiaryAccordions(menu);
    });
  });

  // Use solution context passed from action links to prefill the consultation form.
  const contactQuery = new URLSearchParams(window.location.search);
  const contactService = contactQuery.get('service');
  const contactServiceField = document.querySelector('#contact-form [name="service"]');
  if (contactService && contactServiceField) {
    if (contactServiceField instanceof HTMLSelectElement) {
      const match = [...contactServiceField.options].find(option => option.value.toLowerCase() === contactService.toLowerCase() || option.textContent.trim().toLowerCase() === contactService.toLowerCase());
      if (match) contactServiceField.value = match.value;
    } else {
      // Corporate and government pages use hidden service fields; allow prefill without assuming a select.
      contactServiceField.value = contactService.slice(0, 180);
    }
  }
  const contactMessageField = document.querySelector('#contact-form [name="message"]');
  const contactChallenge = contactQuery.get('challenge');
  if (contactChallenge && contactMessageField && !contactMessageField.value) contactMessageField.value = contactChallenge.slice(0, 1200);

  const apiBaseMeta = document.querySelector('meta[name="api-base"]');
  const apiBase = (apiBaseMeta?.content || '').replace(/\/$/, '');
  const apiUrl = path => `${apiBase}${path}`;
  const getValue = (form, names) => {
    for (const name of names) {
      const el = form.querySelector(`[name="${CSS.escape(name)}"]`);
      if (el) return el.type === 'checkbox' ? el.checked : String(el.value || '').trim();
    }
    return '';
  };
  function displayFormMessage(form, type, message) {
    let el = form.querySelector(type === 'success' ? '.success' : '.error');
    if (!el) {
      el = document.createElement('div');
      el.className = type === 'success' ? 'success' : 'error';
      form.prepend(el);
    }
    el.textContent = message;
    el.style.display = 'block';
    const other = form.querySelector(type === 'success' ? '.error' : '.success');
    if (other) other.style.display = 'none';
  }
  async function postForm(form, endpoint, payload, defaultSuccess) {
    const button = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalText = button ? button.textContent : '';
    if (button) { button.disabled = true; button.textContent = 'Submitting…'; }
    window.gbTrackConversion?.('form_submit', { form_type: form.dataset.apiForm || 'website_form' });
    try {
      const response = await fetch(apiUrl(endpoint), {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Submission failed. Please try again.');
      const message = data.notificationSent === false
        ? `${defaultSuccess} Your response is saved in the database, but the email alert is not configured yet. Please contact the site administrator.`
        : defaultSuccess;
      displayFormMessage(form, 'success', message);
      window.gbTrackConversion?.('generate_lead', { form_type: form.dataset.apiForm || 'website_form' });
      form.reset();
      return data;
    } catch (error) {
      displayFormMessage(form, 'error', `${error.message || 'Could not submit your response.'} Please try again or contact info@goldbuilders.co.`);
      window.gbTrackConversion?.('form_error', { form_type: form.dataset.apiForm || 'website_form' });
      return null;
    } finally {
      if (button) { button.disabled = false; button.textContent = originalText || 'Submit'; }
    }
  }

  const WHATSAPP_DESK = '2348022848749';
  const formLabel = (form, field) => {
    const explicit = field.getAttribute('data-label');
    if (explicit) return explicit;
    if (field.id) {
      const label = form.querySelector(`label[for="${CSS.escape(field.id)}"]`);
      if (label) return label.textContent.replace(/\*/g, '').trim();
    }
    const map = {
      'full-name': 'Full Name', full_name: 'Full Name', name: 'Full Name', organization: 'Organization', company: 'Organization',
      email: 'Email', phone: 'Phone / WhatsApp', industry: 'Industry', timeline: 'Timeline', service: 'Service Needed',
      message: 'Message', course: 'Course', location: 'Location', status: 'Current Status', goal: 'Learning Goal', experience: 'Experience'
    };
    return map[field.name] || field.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };
  function addDirectWhatsAppButton(form, kind) {
    if (form.dataset.whatsappButtonAdded === 'true') return;
    form.dataset.whatsappButtonAdded = 'true';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'whatsapp-direct-btn';
    button.innerHTML = '<span aria-hidden="true">●</span><span>' + (kind === 'skeelup' ? 'Enquire / Register via WhatsApp' : 'Send Enquiry on WhatsApp Instead') + '</span>';
    button.setAttribute('aria-label', kind === 'skeelup' ? 'Continue SkeelUP course registration on WhatsApp' : 'Send this consultation enquiry directly on WhatsApp');
    button.addEventListener('click', () => {
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const rows = [];
      for (const field of form.querySelectorAll('input,select,textarea')) {
        const name = (field.name || '').toLowerCase();
        const type = (field.type || '').toLowerCase();
        if (!field.name || name === 'website' || name === 'consent' || type === 'hidden' || type === 'password' || type === 'submit' || type === 'button' || type === 'reset') continue;
        if ((type === 'checkbox' || type === 'radio') && !field.checked) continue;
        const value = type === 'checkbox' || type === 'radio' ? 'Yes' : String(field.value || '').trim();
        if (!value) continue;
        rows.push(`${formLabel(form, field)}: ${value}`);
      }
      const intro = kind === 'skeelup'
        ? 'Hello GoldBuilders Co. / SkeelUP Africa, I would like to enquire about course registration.'
        : 'Hello GoldBuilders Co., I would like to make the enquiry described below:';
      const contextualIntro = kind === 'contact' ? `Hello GoldBuilders Co., I would like to make a ${getValue(form, ['enquiry_type']) || 'service'} enquiry:` : intro;
      const message = [contextualIntro, '', ...rows, '', 'Please advise me on the next steps. I am sending this directly through WhatsApp; this action does not submit the website form to the database.'].join('\n');
      window.gbTrackConversion?.('click_whatsapp', { form_type: kind });
      const url = `https://wa.me/${WHATSAPP_DESK}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
    const note = document.createElement('p');
    note.className = 'whatsapp-direct-note';
    note.textContent = 'WhatsApp opens with your details prefilled. Review and send the message yourself; this option does not save a website record.';
    const grid = form.querySelector('.form-grid');
    if (grid) { form.append(button, note); }
    else { form.append(button, note); }
  }

  document.querySelectorAll('form[data-api-form="contact"]').forEach(form => {
    addDirectWhatsAppButton(form, 'contact');
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const contextualDetails = [...form.querySelectorAll('[data-inquiry-detail]')].map(field => {
        const value = String(field.value || '').trim();
        if (!value) return '';
        return `${formLabel(form, field)}: ${value}`;
      }).filter(Boolean);
      const userMessage = getValue(form, ['message']);
      const fullMessage = [userMessage, contextualDetails.length ? `Page-specific enquiry details:\n${contextualDetails.join('\n')}` : ''].filter(Boolean).join('\n\n');
      const payload = {
        full_name: getValue(form, ['full-name', 'full_name', 'name']),
        organization: getValue(form, ['organization', 'company']),
        email: getValue(form, ['email']), phone: getValue(form, ['phone']),
        industry: getValue(form, ['industry']), timeline: getValue(form, ['timeline']),
        service: getValue(form, ['service']), enquiry_type: getValue(form, ['enquiry_type']) || (getValue(form, ['service']).toLowerCase().includes('partner') ? 'Partnership / collaboration' : (form.querySelector('[name="preferred_date"], [name="preferred_time"]') ? 'Consultation / advisory' : 'Page-specific service enquiry')), message: fullMessage,
        preferred_date: getValue(form, ['preferred_date']), preferred_time: getValue(form, ['preferred_time']),
        consent: Boolean(form.querySelector('input[type="checkbox"]:checked')),
        website: getValue(form, ['website']), referral_code: window.gbReferralCode?.() || getValue(form, ['referral_code'])
      };
      await postForm(form, '/api/contact', payload, 'Thank you. Your enquiry has been saved successfully.');
    });
  });

  document.querySelectorAll('form[data-api-form="skeelup"]').forEach(form => {
    addDirectWhatsAppButton(form, 'skeelup');
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const payload = {
        full_name: getValue(form, ['full-name', 'full_name', 'name']),
        email: getValue(form, ['email']), phone: getValue(form, ['phone']),
        location: getValue(form, ['location']), status: getValue(form, ['status']),
        course: getValue(form, ['course']), goal: getValue(form, ['goal']),
        experience: getValue(form, ['experience']),
        consent: Boolean(form.querySelector('input[type="checkbox"]:checked')),
        website: getValue(form, ['website']), referral_code: window.gbReferralCode?.() || getValue(form, ['referral_code'])
      };
      await postForm(form, '/api/skeelup', payload, 'Thank you. Your SkeelUP Africa course registration has been saved successfully.');
    });
  });

  const assessment = document.querySelector('#assessment-form');
  if (assessment) {
    assessment.addEventListener('focusin', () => window.gbTrackConversion?.('assessment_start', { form_type: 'assessment' }), { once: true });
    if (!document.querySelector('#assessment-status')) {
      const status = document.createElement('div');
      status.id = 'assessment-status'; status.className = 'notice'; status.style.display = 'none'; status.setAttribute('role', 'status');
      assessment.parentNode.insertBefore(status, assessment);
    }
    assessment.addEventListener('submit', async event => {
      event.preventDefault();
      if (!assessment.checkValidity()) { assessment.reportValidity(); return; }
      const get = name => assessment.querySelector(`[name="${name}"]`);
      const keys = ['strategy', 'people', 'revenue', 'finance', 'technology', 'operations', 'brand'];
      const payload = {};
      for (const key of keys) {
        const input = get(key); const value = Number(input?.value);
        if (!Number.isInteger(value) || value < 1 || value > 10) {
          input?.focus(); const status = document.querySelector('#assessment-status');
          status.textContent = 'Please enter a whole-number score from 1 to 10 for every dimension.'; status.style.display = 'block'; return;
        }
        payload[key] = value;
      }
      payload.organization = String(get('organization')?.value || '').trim();
      payload.email = String(get('email')?.value || '').trim();
      payload.consent = Boolean(get('consent')?.checked);
      payload.website = String(get('website')?.value || '').trim();
      payload.referral_code = window.gbReferralCode?.() || '';
      const button = assessment.querySelector('button[type="submit"]');
      const original = button?.textContent || 'Generate My Transformation Result';
      if (button) { button.disabled = true; button.textContent = 'Generating your result…'; }
      const status = document.querySelector('#assessment-status');
      status.style.display = 'none';
      try {
        let response;
        try {
          response = await fetch(apiUrl('/api/assessment'), {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload), cache: 'no-store'
          });
        } catch (networkError) {
          throw new Error('The assessment service could not be reached. The website API may not be running, or the domain may be pointing to a static-only copy. Please check the Node.js application in hosting.');
        }
        const contentType = response.headers.get('content-type') || '';
        const data = contentType.includes('application/json') ? await response.json().catch(() => ({})) : {};
        if (!response.ok || !data.token) {
          if (response.status === 404 || response.status === 405 || !contentType.includes('application/json')) {
            throw new Error('The assessment API is not responding at this website address. Confirm that the GoldBuilders Node.js app is running on this same domain and that server.js is its startup file.');
          }
          if (response.status === 429) throw new Error('Too many assessment attempts were made recently. Please wait a few minutes and try again.');
          if (response.status >= 500) throw new Error('The website received your assessment but could not save it. The database or server may need attention. Check the hosting application log and confirm the data directory is writable.');
          throw new Error(data.error || 'The assessment could not be saved. Please check your scores and try again.');
        }
        window.gbTrackConversion?.('assessment_complete', { form_type: 'assessment' });
        window.location.href = `assessment-result.html?token=${encodeURIComponent(data.token)}`;
      } catch (error) {
        status.textContent = `${error.message || 'Could not generate the assessment result.'} Your result has not been confirmed as saved. Please try again or contact info@goldbuilders.co.`;
        status.style.display = 'block';
        status.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } finally {
        if (button) { button.disabled = false; button.textContent = original; }
      }
    });
  }

  // Preserve editorial search, category filtering and article reading progress.
  const articleSearch = document.querySelector('#article-search');
  const articleFilter = document.querySelector('#article-filter');
  const articleCards = [...document.querySelectorAll('[data-article-card]')];
  if (articleCards.length && (articleSearch || articleFilter)) {
    const updateArticles = () => {
      const query = (articleSearch?.value || '').trim().toLowerCase();
      const category = articleFilter?.value || 'all';
      let visible = 0;
      articleCards.forEach(card => {
        const searchable = (card.dataset.search || card.textContent).toLowerCase();
        const show = (!query || searchable.includes(query)) && (category === 'all' || card.dataset.category === category);
        card.hidden = !show;
        if (show) visible++;
      });
      const counter = document.querySelector('#article-count');
      const empty = document.querySelector('#article-empty');
      if (counter) counter.textContent = `${visible} of ${articleCards.length} articles`;
      if (empty) empty.hidden = visible !== 0;
    };
    articleSearch?.addEventListener('input', updateArticles);
    articleFilter?.addEventListener('change', updateArticles);
    updateArticles();
  }
  const progressBar = document.querySelector('#article-progress');
  if (progressBar) {
    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      progressBar.style.width = (scrollable > 0 ? doc.scrollTop / scrollable * 100 : 0) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
});
