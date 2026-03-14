# FrankPass: Main Parts & Static Architecture Explained

This document explains why the app was failing and how the new "Fix Static" architecture protects your password generation logic.

## 1. The "Main Part" (The Brain)

The most important part of this application is the **Math**.

- **File:** `frankpass-core.js`
- **What it does:** It takes your Platform, Secret Key, and Variant and turns them into a password.
- **Why it's "Static":** This file is now completely independent. Even if you change the colors (CSS) or the layout (HTML/UI), as long as you don't touch `frankpass-core.js`, your passwords will **ALWAYS** be the same.

## 2. Why it wasn't working?

The previous version was "API-Only".

- It tried to talk to a Vercel server (`/api/generate-pepper`) to get an extra layer of security.
- When you copied it to a new project or ran it locally without that specific server, it failed because it couldn't "talk" to the brain.

## 3. The "Fix Static" Solution

I have implemented a **Dual-Mode** system:

1. **Online Mode (Premium):** If the server is available, it uses the server's extra security (Pepper).
2. **Static/Offline Mode (Safety):** If the server is NOT available (like when you copy it to a new place), it automatically switches to a local version of that math.
    - **RESULT:** The app will **NEVER** stop working again. It is now self-contained.

## 4. How to change the Design without breaking anything

You can now change `style.css` or the layout in `index.html` freely.

- **Rule:** Do not change the `id` of the input fields (e.g., `#platform`, `#secret`) unless you also update them in `script.js`.
- **Logic:** Keep `frankpass-core.js` exactly as it is. It is your "Golden Standard".

## 5. Summary of Files

- `frankpass-core.js`: **The Main Logic.** Never change this.
- `script.js`: **The Bridge.** Connects the UI to the Logic. Safely handles the API fallback.
- `index.html`: **The Body.** Can be changed for design.
- `style.css`: **The Clothes.** Can be changed for aesthetics.
