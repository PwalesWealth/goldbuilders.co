# YIELD Global Impact — MentorshipMatters & Growth Lab update

## Added
- New initiative page: `public/ecosystem/mentorship-matters.html`.
- MentorshipMatters brand asset: `public/assets/images/mentorshipmatters-logo.webp` (derived from the supplied logo).
- MentorshipMatters initiative entry in `data/ecosystems.json`.
- Added MentorshipMatters to the YIELD Global Impact connected-initiatives grid, global YIELD dropdown, ecosystem directory, subsidiaries directory and site directory.
- Added The Growth Lab Channel section and WhatsApp CTA to `public/ecosystem/the-driven-life.html`.

## MentorshipMatters offer framing
- Tagline: “Be the mentor you wish you had.”
- Audience: children, teenagers and young adults, with parents/guardians, mentors, schools and partners invited into suitable roles.
- Core structure: career mapping, clarity clinics and mentorship access.
- Cohort dates, prices and registration windows are not invented; they remain to be announced.
- Safeguarding and parent/guardian consent are addressed for under-18 participation.

## Growth Lab Channel
- Button: “Join The Growth Lab Channel”
- URL: https://whatsapp.com/channel/0029Vajjko20rGiI32CBS145
- Positioned as a personal, professional and spiritual growth; entrepreneurship; career development; and opportunity-creation resource for professionals, SMEs and business owners.

## Enquiry handling
- Dedicated MentorshipMatters enquiry form posts to the existing `/api/contact` route and identifies the initiative in the `service` field.
- The form asks whether the enquiry is from a mentee, parent/guardian, mentor, institution or partner.
- No database schema change is required.
