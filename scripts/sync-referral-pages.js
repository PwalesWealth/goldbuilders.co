// Copies public/referral-partner.html into the two folder URLs so /referral-partner/ and
// /become-a-referral-partner/ are full working pages (not redirects) on any host.
// Run after editing referral-partner.html:  node scripts/sync-referral-pages.js
const fs = require('fs'), path = require('path');
const pub = path.join(__dirname, '..', 'public');
const src = fs.readFileSync(path.join(pub, 'referral-partner.html'), 'utf8');
// Only rewrite attributes in the static HTML; leave inline <script> bodies untouched.
const rewrite = html => html.replace(/\b(href|src)="(?!https?:|mailto:|tel:|#|\/|data:|javascript:)([^"]*)"/g, '$1="../$2"');
const out = src.split(/(<script>[\s\S]*?<\/script>)/).map(part => part.startsWith('<script>') ? part : rewrite(part)).join('')
  .replace('<title>', '<link rel="canonical" href="../referral-partner.html"><title>');
for (const dir of ['referral-partner', 'become-a-referral-partner']) {
  fs.mkdirSync(path.join(pub, dir), { recursive: true });
  fs.writeFileSync(path.join(pub, dir, 'index.html'), out);
}
console.log('Synced referral pages.');
