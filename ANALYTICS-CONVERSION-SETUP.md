# Analytics Conversion Setup

Events available: `book_consultation`, `click_whatsapp`, `view_solution`, `start_assessment`, `assessment_start`, `assessment_complete`, `download_result_report`, `form_submit`, `generate_lead`, `form_error`, `solution_finder_submit`, `view_case_studies`, `booking_preference_selected`, `contact_click`.

The browser pushes event names and limited non-personal metadata to `window.dataLayer` only if one exists; otherwise it dispatches a `gb:conversion` CustomEvent. It does not install GA4/GTM or transmit to a third party. Configure your own analytics account and appropriate consent before enabling tracking. Event payloads deliberately exclude names, emails, phone numbers, form values and free-text messages.
