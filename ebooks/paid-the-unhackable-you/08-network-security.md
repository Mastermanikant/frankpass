# Chapter 8: Network Security for Humans

---

Your house has a front door with a strong lock. But if you leave the windows wide open, the lock doesn't matter. 

In the digital world, your "house" is your home Wi-Fi network. Every smart TV, every phone, every laptop, and every smart bulb in your house connects through a single plastic box: your router.

If an attacker compromises your router, they own your entire digital life. They can see every website you visit, intercept your passwords, and quietly reroute your banking app to a fake server.

This chapter will teach you how to lock the windows.

---

## 1. The Home Router Vulnerability

When you get internet installed, the technician sets up a router. They give you a Wi-Fi password (which you probably give to every guest who visits). What they *don't* tell you is that the router itself has an "Admin Panel" that controls how your entire home network functions.

By default, millions of routers ship with the exact same Admin password: `admin` / `admin` or `admin` / `password`.

If an attacker drives past your house, connects to your Wi-Fi, and types `192.168.1.1` into their browser, they can log into your router's brain using that default password.

Once inside, they can change your DNS settings (which we will discuss next) and silently poison every device in your home.

### The 60-Second Router Lockdown

1. **Find your Router IP:** Look at the sticker on the back of your router. It will usually say something like `192.168.0.1` or `10.0.0.1`.
2. **Log In:** Type that number into your browser's address bar. 
3. **Change the Admin Password:** Find the system settings and change the default admin password immediately. Use FrankPass to generate a strong password for "router".
4. **Disable Remote Management:** Ensure "Remote Management" or "Remote Admin" is turned OFF. You only ever want to be able to change router settings if you are physically inside the house.

**[SCREENSHOT IDEA: Highlight where the default IP and Admin credentials are typically located on a standard router sticker.]**

---

## 2. DNS: The Internet's Phonebook

When you type `google.com` into your browser, your computer doesn't know what that means. It only understands IP addresses (like `142.250.190.46`). 

Your computer sends a request to a **DNS Server** (Domain Name System). The DNS server is the internet's phonebook. It says, "Ah, `google.com` lives at `142.250.190.46`," and connects you.

By default, your Internet Service Provider (ISP) runs your DNS. This means your ISP sees every single website you visit, logs it, and often sells that data to advertisers. 

### The DNS Poisoning Attack
If an attacker hacks your router (because you left the password as `admin`), they change your DNS server from the ISP's phonebook to an attacker-controlled phonebook. 

Now, when you type `sbi.co.in` (State Bank of India), the attacker's fake phonebook says, "Ah, `sbi.co.in` lives at `198.51.100.10`" (the attacker's fake bank site). 

Your browser happily connects. The site looks identical. The lock icon is even there. You type your password. You are instantly hacked.

### The Upgrade: Encrypted DNS (DoH/DoT)

You must take control of your internet phonebook. You should switch to a secure, private DNS provider like **Cloudflare (1.1.1.1)** or **Quad9 (9.9.9.9)**. These providers do not log your traffic, and they encrypt your DNS requests (DNS-over-HTTPS) so your ISP cannot snoop on what websites you are visiting.

**How to fix it:**
- **On your phone:** Download the "1.1.1.1" app by Cloudflare. Turn it on. Done.
- **On your browser:** In Chrome/Brave/Firefox settings, search for "Secure DNS" and select "Cloudflare (1.1.1.1)" or "Quad9".

---

## 3. The Truth About VPNs

You have seen a hundred YouTube sponsorships telling you that a VPN (Virtual Private Network) is the ultimate security tool, and without it, hackers will instantly steal your data.

This is mostly marketing fear-mongering. 

### What a VPN Actually Does
When you turn on a VPN, it creates an encrypted tunnel between you and the VPN company's server. Your ISP can only see that you are connected to the VPN; they cannot see what you are doing. The website you visit thinks you are the VPN server, hiding your real IP address and location.

### Do You Need One?
- **At home?** No. Assuming your router is locked down and you use Secure DNS, a VPN at home is mostly useful for bypassing geographic blocks (like watching UK Netflix from India) or hiding your torrenting activity from your ISP.
- **On Public Wi-Fi?** **YES. Absolutely.** 

As we learned in the free guide, public Wi-Fi is incredibly dangerous. While most websites use HTTPS (encryption) today, an attacker on a public network can still see *which* sites you visit, even if they can't see the exact passwords. A VPN encrypts the entire connection, blinding anyone snooping on the network.

### How to Choose a VPN
Never use a "Free" VPN. Running servers costs millions of dollars. If a security product is free, *you* are the product. They are logging your traffic and selling it. 

Choose a paid, independently audited provider with a strict "No-Logs" policy. **ProtonVPN** and **Mullvad** are the gold standards in the privacy community. 

---

## ✅ Your Homework

- [ ] Walk over to your Wi-Fi router. Note the IP address and default Admin login on the sticker.
- [ ] Log into the router via your browser and change the Admin password immediately.
- [ ] Install the `1.1.1.1` app on your phone to secure your DNS traffic.
- [ ] *Optional:* If you frequently work from coffee shops or airports, purchase a 1-month subscription to ProtonVPN or Mullvad.

---

*Next: Chapter 9 — Encryption Demystified →*
