# Chapter 3: The 5-Minute Security Setup

---

You now know what you're up against. Phishing, Wi-Fi traps, SIM swaps — they're real, they're common, and they work because most people have zero defenses.

This chapter fixes that.

In the next five minutes, you're going to do three things that will put you ahead of 95% of internet users. No apps to buy. No technical expertise needed. Just three quick changes.

Let's go.

---

## Step 1: Set Up an Authenticator App (2 minutes)

In Chapter 2, we learned that SMS OTPs are vulnerable — a SIM swap attack can intercept them. The fix is simple: replace SMS verification with an **authenticator app**.

An authenticator app generates a 6-digit code on your phone every 30 seconds. Unlike SMS, these codes are generated locally on your device. No one can intercept them — even if they steal your phone number.

### What to download

| App | Platform | Cost |
|-----|----------|------|
| **Google Authenticator** | Android / iOS | Free |
| **Microsoft Authenticator** | Android / iOS | Free |
| **Authy** | Android / iOS / Desktop | Free |

Pick any one. They all work the same way.

### How to set it up

1. Download the app from your phone's app store.
2. Go to the account you want to protect (start with your **primary email** — Google, Outlook, or whatever you use most).
3. Find **Security Settings** → **Two-Factor Authentication** → **Authenticator App**.
4. The site will show you a QR code. Open the authenticator app and scan it.
5. Done. From now on, when you log in, you'll enter your password AND the 6-digit code from the app.

### Which accounts to protect first

Do these in order — most critical first:

1. **Your primary email** (this is the master key to everything else)
2. **Your bank / UPI app** (if it supports authenticator-based 2FA)
3. **Instagram / Facebook / X** (to prevent account takeover)
4. **Any account that holds your money or reputation**

**Time spent: 2 minutes. Accounts secured: All of them.**

---

## Step 2: Lock Down Your Browser (1 minute)

Your web browser is the front door to your digital life. Most people leave it wide open.

### Quick fixes (do all of these now):

**On Chrome (or any Chromium browser):**

1. **Turn off password saving.** Go to Settings → Passwords → turn off "Offer to save passwords." Your browser is NOT a safe place to store passwords — if someone accesses your laptop, they can see every saved password in plain text.

2. **Enable Safe Browsing (Enhanced).** Go to Settings → Privacy and Security → Safe Browsing → select "Enhanced protection." This warns you about dangerous sites before you visit them.

3. **Clear saved passwords.** If your browser has saved passwords, export them somewhere safe, then delete them from the browser.

**On all browsers:**

4. **Install an ad blocker.** Ads are one of the biggest sources of malware. Install **uBlock Origin** (free, open source, available for every browser). It blocks malicious ads, trackers, and phishing scripts automatically.

**Time spent: 1 minute. Browser: Locked.**

---

## Step 3: Create an Email Alias Strategy (2 minutes)

Here's a trick that most people never think about: **don't use the same email address for everything**.

When you sign up for a shopping site with the same email you use for banking, you create a chain. If the shopping site gets breached (and they do — all the time), the attacker now has the email address you use for your bank.

### The Fix: Use aliases or separate emails

**Option A: Gmail's "+" trick**
Gmail ignores anything after a `+` sign. So if your email is `rahul@gmail.com`, you can use:
- `rahul+shopping@gmail.com` for Amazon/Flipkart
- `rahul+social@gmail.com` for Instagram/X
- `rahul+banking@gmail.com` for your bank

All these deliver to the same inbox. But now, if Flipkart gets breached, the attacker has `rahul+shopping@gmail.com` — which is useless for resetting your bank password.

**Option B: Create a separate email**
Have two emails:
- **Primary:** For banking, government services, and important accounts.
- **Secondary:** For shopping, social media, newsletters, and random sign-ups.

Never share your primary email publicly. Never type it into a website you don't fully trust.

**Time spent: 2 minutes. Email: Compartmentalized.**

---

## You're Done

That's it. Five minutes. Three changes. You now have:

✅ **Authenticator-based 2FA** — no more SMS OTP vulnerability  
✅ **A hardened browser** — no saved passwords, enhanced protection, ad blocking  
✅ **Separated email addresses** — one breach doesn't compromise everything  

Most people will never do these three things. You just did them in the time it takes to make tea.

But there's one more thing we haven't addressed — the biggest one. The thing that all of this is built around. The thing that 99% of people get completely wrong.

**Passwords.**

In the final chapter, we'll finally tackle the password problem. And the answer might surprise you — because it has nothing to do with remembering anything at all.

---

> **🔐 Quick Action:** Right now, open your Google account (myaccount.google.com → Security) and switch your 2FA from SMS to Google Authenticator. It takes 60 seconds.

---

> **Generate your unbreakable password → [frankpass.com](https://frankpass.com)**

---

*Next: Chapter 4 — Why Passwords Fail (And What Works) →*
