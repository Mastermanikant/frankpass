# Chapter 11: Building Your Personal Security Stack

---

Cybersecurity is not a single product you buy. It is a system you build.

Throughout this book, we have discussed concepts like stateless passwords, end-to-end encryption, virtual credit cards, and secure DNS. But concepts are useless without the right tools.

This chapter provides a complete, battle-tested software stack. This is the exact setup used by privacy advocates, journalists, and cybersecurity professionals. 

Almost everything on this list is either free, open-source, or both.

---

## 1. The Core Stack: Passwords and 2FA

Your first line of defense is securing access to your accounts.

### Authentication & Passwords
1. **Stateless Generator:** [FrankPass](https://frankpass.com)
   - *Why:* Zero storage, zero servers, military-grade PBKDF2 cryptography. It eliminates the risk of vault breaches and credential stuffing.
   - *Cost:* Free.

2. **Authenticator App (2FA):** Ente Auth
   - *Why:* Unlike Google Authenticator (which syncs to your Google account in plaintext) or Authy (which suffered a major data breach in 2024), Ente Auth is open-source and uses End-to-End Encryption (E2EE) to back up your 2FA tokens.
   - *Cost:* Free.

3. **Hardware Security Key (Advanced):** YubiKey 5 Series
   - *Why:* If you hold significant cryptocurrency or are a high-value target (journalist, activist, CEO), SMS or App 2FA is not enough. A YubiKey is a physical USB/NFC stick. You cannot log into your email without physically touching the key. It completely stops remote phishing attacks.
   - *Cost:* ~$50 USD.

---

## 2. The Communication Stack: Email and Messaging

Stop using services that read your data to serve you ads.

### Email Providers
1. **ProtonMail or Tuta**
   - *Why:* Both use End-to-End Encryption. Unlike Gmail, they cannot read your emails. They are based in Switzerland and Germany (strong privacy laws).
   - *Cost:* Free tiers available.

### Email Aliasing (Hiding Your Real Email)
1. **SimpleLogin (Now part of Proton)**
   - *Why:* Generate a unique, random email address for every website you sign up for (e.g., `amazon837@domain.com`). If that site is breached, you just turn off the alias. Your real email address remains perfectly hidden and spam-free.
   - *Cost:* Free tier available.

### Instant Messaging
1. **Signal**
   - *Why:* The undisputed champion of secure messaging. Open-source, audited, non-profit, zero metadata collection. E2EE by default.
   - *Cost:* Free.

---

## 3. The Browsing Stack: Blocking the Trackers

Your web browser is your window to the internet. Make sure nobody is looking back through it.

### Web Browsers
1. **Brave Browser (Desktop & Mobile)**
   - *Why:* Built on Chromium (so all your Chrome extensions work), but it aggressively blocks ads, trackers, and fingerprinting out of the box. 
   - *Cost:* Free.

2. **Mullvad Browser (Advanced Anonymity)**
   - *Why:* Built in partnership with the Tor Project, it focuses on defeating "browser fingerprinting." It makes your browser look identical to millions of other Mullvad Browser users, preventing websites from tracking you across the web.
   - *Cost:* Free.

### Browser Extensions
1. **uBlock Origin**
   - *Why:* The most powerful, lightweight ad and tracker blocker in existence. *(Note: Must be 'uBlock Origin', not 'uBlock').*
   - *Cost:* Free.

---

## 4. The Network & Storage Stack

Secure your connection and your files.

### Domain Name System (DNS)
1. **Cloudflare 1.1.1.1 or Quad9**
   - *Why:* Encrypts your DNS requests (DNS-over-HTTPS) so your Internet Service Provider cannot see which websites you are visiting.
   - *Cost:* Free.

### Virtual Private Network (VPN)
1. **Mullvad VPN or ProtonVPN**
   - *Why:* Strict no-logs policies, regular independent audits, open-source apps. Mullvad doesn't even ask for an email address to create an account, making it completely anonymous.
   - *Cost:* ~$5/month (Do not use free VPNs).

### Cloud Storage
1. **Proton Drive, Tresorit, or Cryptomator**
   - *Why:* Google Drive and Dropbox hold the keys to your files. If they are hacked, your files are exposed. Proton and Tresorit offer Zero-Knowledge, E2EE cloud storage. 
   - *(Alternative: Use **Cryptomator** (free) to encrypt your sensitive files locally before uploading them to Google Drive).*

---

## The FrankPass Extension (Coming Soon)

Building a security stack takes effort. We realize that typing your FrankPass Key and website name every time you log in adds friction. 

That is why the FrankPass Browser Extension is currently in development. It will sit in your browser, securely generating your stateless passwords and auto-filling them into websites, perfectly bridging the gap between unbreakable cryptography and ultimate convenience.

**→ [Join the Waitlist for 50% Off the First Year](https://frankbase.com/extensions-waitlist)**

---

## ✅ Your Homework

You do not need to install all of these today. Pick one category to upgrade this week.

- [ ] Download **Brave Browser** and import your bookmarks from Chrome. It takes 30 seconds.
- [ ] Install **uBlock Origin** on your desktop.
- [ ] Create a free **ProtonMail** account and use it to sign up for your most critical services (like your banking portal).
- [ ] Make sure your **FrankPass** workflow is smooth. Generate the password, copy, paste, and log in.

---

*Next: Chapter 12 — The Unhackable Mindset →*
