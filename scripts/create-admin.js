
require('dotenv').config();
const readline=require('readline');
const path=require('path');
const Database=require('better-sqlite3');
const bcrypt=require('bcryptjs');
const db=new Database(process.env.DB_PATH||path.join(__dirname,'..','data','goldbuilders.db'));

function ask(q){const rl=readline.createInterface({input:process.stdin,output:process.stdout});return new Promise(r=>rl.question(q,a=>{rl.close();r(a)}))}
(async()=>{
 const email=(process.env.ADMIN_EMAIL||await ask('Admin email: ')).trim().toLowerCase();
 const password=process.env.ADMIN_PASSWORD||await ask('Admin password: ');
 if(!email||!password||password.length<12){console.error('Use a valid email and a password of at least 12 characters.');process.exit(1)}
 db.exec(`CREATE TABLE IF NOT EXISTS admins(id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'admin',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
 const hash=await bcrypt.hash(password,12);
 db.prepare(`INSERT INTO admins(email,password_hash) VALUES(?,?) ON CONFLICT(email) DO UPDATE SET password_hash=excluded.password_hash`).run(email,hash);
 console.log(`Admin configured for ${email}`);
})();
