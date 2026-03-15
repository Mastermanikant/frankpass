# Chapter 6: The Dark Web & Your Data

---

When people hear "The Dark Web," they imagine a shadowy underworld of hackers in neon-lit basements typing green code to steal millions of dollars. The reality is much more corporate, much more organized, and much more boring. 

The Dark Web is essentially Amazon for criminals. It has shopping carts, customer reviews, refund policies, and escrow services. And the most popular product on the shelves? You.

You don't need to learn how to access the Dark Web. But you absolutely must understand how the economy of stolen data functions so you can make your data worthless to the people selling it.

---

## 1. What Exactly Is the Dark Web?

The internet has three layers:

1. **The Surface Web (4%):** Everything you can find on Google, Bing, or Yahoo. Wikipedia, news sites, public social media profiles.
2. **The Deep Web (90%):** Everything that is online but blocked from search engines. Your online banking dashboard, your email inbox, Netflix's private servers, medical records. You need a password to see it.
3. **The Dark Web (6%):** A specific subset of the Deep Web that intentionally hides its servers. You cannot access it with Google Chrome. You need special software (like the Tor Browser) which bounces your connection around the globe to make you untraceable.

Because it is untraceable, it is the perfect marketplace for illegal goods.

---

## 2. The Data Economy: How You Are Sold

Imagine a major hotel chain gets hacked (this actually happened to Marriott, exposing 500 million guests). What does the hacker do with half a billion names, emails, passport numbers, and credit cards? They can't possibly use them all themselves. 

Instead, they take the database to the Dark Web and sell it.

### Step 1: The Bulk Dump
The hacker sells the raw database to a data broker for $10,000 to $100,000 depending on the quality of the data. The broker now holds massive files of unorganized data.

### Step 2: Enrichment (Creating "Fullz")
The broker doesn't just sell the Marriott database. They take your Marriott record and combine it with your leaked LinkedIn password, your exposed Facebook phone number, and your leaked Aadhaar details. 

They compile a complete dossier on you. On the Dark Web, this is called a **"Fullz"** (Full Information).

A "Fullz" might include: Name, DOB, Address, Social Security / Aadhaar Number, 3 previous passwords, phone number, and mother's maiden name.

### Step 3: The Retail Sale
The broker sets up a storefront. Individual scammers buy your "Fullz" for as little as $5 to $30. 

A scammer in another country buys your Fullz. They now have everything they need to impersonate you, open a credit card in your name, or launch a highly targeted spear-phishing attack against your employer.

**[SCREENSHOT IDEA: A mockup or blurred image of a typical Dark Web marketplace listing showing prices for credit cards and Fullz packages.]**

---

## 3. The Value of Your Data Over Time

Prices on the Dark Web follow supply and demand.
- A fresh, active credit card with a high limit: **$40 - $120**
- A hacked Netflix account: **$2**
- A complete identity package (Fullz): **$30 - $100**
- Stolen medical records (which never change): **$50 - $1,000**

But the value of a stolen password diminishes rapidly over time. If a hacker buys a database from 2018, most people will have changed those passwords. The data is "stale."

This is why **Credential Stuffing** (trying old passwords on new sites, as discussed in Chapter 2) is so dangerous. If you are one of the 65% of people who reuse the same password for 10 years, your "stale" 2018 data is still perfectly valid today. 

By using FrankPass, you instantly bankrupt the criminals who bought your data. If they try to use your old leaked password on your bank, it fails, because FrankPass generated a new, completely different mathematical output for your bank today.

---

## 4. How to Monitor the Dark Web

You should not download Tor and go digging through the Dark Web yourself. It is dangerous, unnecessary, and largely filled with scams. 

Instead, you use surface-web tools that safely index known breaches.

**1. HaveIBeenPwned (HIBP)**
This is a free service run by Troy Hunt, a respected security researcher. He collects massive data dumps from the Dark Web and allows you to search if your email appears in them. It does not show you the password, only *if* you were breached.

**2. Password Monitors (Google & Apple)**
Both Chrome and iOS have built-in password monitoring. If you save a password in Safari or Chrome, the browser will periodically check its encrypted hash against known Dark Web leaks and warn you if you have been compromised. 

*(Note: While these monitors are useful, remember Chapter 2—storing passwords in the browser is risky. FrankPass eliminates the need to store them entirely.)*

**3. Credit Freezes (The Ultimate Defense)**
If your Aadhaar or Social Security number is on the Dark Web, you cannot change it. The only defense is to freeze your credit. This means no one (not even you) can open a new loan or credit card in your name until you temporarily "thaw" the freeze with a specific PIN. 

In the US, you freeze with Equifax, Experian, and TransUnion. In India, you must actively monitor your CIBIL score for unauthorized inquiries.

---

## ✅ Your Homework

- [ ] Go to `haveibeenpwned.com` and enter every email address you own (old and new).
- [ ] Make a list of every breach your email appears in.
- [ ] Ask yourself: "Did I reuse the password from any of those breached sites somewhere important?"
- [ ] If yes, immediately go to that important site, change your FrankPass variant, and update the password.

---

*Next: Chapter 7 — Social Engineering: The Human Hack →*
