# Youth Gallery and Consulting Slide Update

## What changed
- Added a responsive, three-image Youth in Action gallery to `public/ecosystem/next-community.html` for Inspire Generation NEXT / NEXT Community.
- Added a fourth slide to the existing homepage carousel for GoldBuilders Co. consulting and transformation services.
- Added optimized, locally hosted WebP versions of the supplied photographs.
- Added responsive gallery styling to the shared `public/assets/css/ux-upgrade.css`.

## New media files
- `public/assets/images/youth-gallery/youth-practical-skills.webp`
- `public/assets/images/youth-gallery/youth-digital-learning.webp`
- `public/assets/images/youth-gallery/youth-community-engagement.webp`
- `public/assets/images/consulting/consulting-strategy-conversation.webp`

## Scope preserved
No other initiative pages, the Marketplace Ministry / NEXT Missions content, existing enquiry forms, assessment workflow, database, admin login or navigation hierarchy were intentionally changed. The Missions gallery is not included and can be added when those images are supplied.

## Deployment
For an existing installation, back up the website and database first. Extract this patch into the application root so the included `public/` files merge with and replace matching files. Do not delete `.env` or `data/goldbuilders.db`. Restart the Node.js app after upload.

## Image rights
The images were supplied in this conversation. Confirm that the organisation has permission to publish them on the public website, especially if any were sourced from stock-photo libraries or partner organisations.
