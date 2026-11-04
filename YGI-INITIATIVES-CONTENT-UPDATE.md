# YIELD Global Impact — Focused Initiative Content Update

This update expands only these two initiative pages while preserving the rest of the GoldBuilders Co. website and its existing initiatives, navigation, enquiry forms, styles and page structure:

- `public/ecosystem/the-driven-life.html` — The Driven Life / 10X Community, BeMore subscriber access, monthly webinars, weekly workshops, 10X meetups, seminars, conferences, hangouts and trips.
- `public/ecosystem/next-missions.html` — The Marketplace Ministry / NEXT Missions, Friday Weekly Prayer Series, 90 Days Moment of Change Midnight Prayers, 365 Days of Glory Midnight Prayers and Missionaries Transformation Week.
- `data/ecosystems.json` — matching directory metadata for those same two initiatives only.

All existing navigation and form functionality remains in place. Existing enquiry options are retained and relevant options have been added. Other YIELD initiatives and the wider GoldBuilders website have not been rewritten.

## Apply the patch

1. Back up the live website before replacing files.
2. Extract `GoldBuilders_YGI_Initiatives_Update_Patch.zip`.
3. Upload its `public/ecosystem/the-driven-life.html`, `public/ecosystem/next-missions.html`, `public/ecosystem.html`, and `data/ecosystems.json` files into the matching paths in the existing website folder, overwriting only those four files.
4. If the site is deployed as a Node.js application, restart it only if your hosting setup requires it; these are page and content-file updates.
5. Test both pages on desktop and mobile, submit each enquiry form, and confirm the current navigation still works.

The full updated website ZIP is also supplied for a complete redeployment. It is not live until you upload/deploy it to your hosting account.
