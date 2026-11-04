# GEI Trust & LeaderSHIFT patch — installation notes

## Use this patch when you already have the GoldBuilders website deployed

1. Back up the current website folder and database before replacing files.
2. Extract `GoldBuilders_GEITRUST_LeaderSHIFT_Patch.zip` while preserving the folder structure.
3. Upload the extracted folders/files into the existing application root, allowing the updated HTML and JSON files to overwrite their prior versions.
4. Do not replace or delete your private `.env` file, SQLite database, uploaded lead records or existing server configuration.
5. Restart the Node.js application if your host requires it.
6. Check `https://your-domain/ecosystem/gei-trust.html`, the YIELD Global Impact Subsidiaries menu, the new LeaderSHIFT Tour and California 2030 sections, and the GEI enquiry form.

## Use the full package for a new installation

For a fresh installation, use `GoldBuilders_Final_Development_GEITRUST_LeaderSHIFT.zip` rather than this patch. Follow the main `README.md` and `.env.example` instructions. The website form uses the existing `POST /api/contact` endpoint; this update does not require a database schema migration.
