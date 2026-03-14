# 🛠️ FrankPass Developer Guide

This guide explains how to manage, update, and extend the FrankPass platform.

## 📂 Project Structure

| Folder/File | Description |
| :--- | :--- |
| `index.html` | The main entry point and UI structure. |
| `style.css` | All styling, animations, and glassmorphism effects. |
| `script.js` | Core UI logic, URL routing, and PWA handling. |
| `frankpass-core.js` | **Critical:** The cryptographic engine for password generation. |
| `platforms.js` | Database of all platforms/banks grouped by country code. |
| `translations.js` | Multi-language support strings. |
| `manifest.json` | PWA settings and app metadata. |
| `icons/` | Official app icons (192px and 512px). |
| `build_tools/` | Scripts used to generate data (not needed for runtime). |
| `archive/` | Previous logo concepts and older documentation. |

---

## ➕ How to Add a New Platform

1.  Open `platforms.js`.
2.  Find the country code (e.g., `"in"` for India).
3.  Add your platform name to the list:
    ```javascript
    "in": [
      "New Bank Name",
      "Existing Platform",
      ...
    ]
    ```
4.  If the platform is global, add it to the `"global"` section at the end of the file.
5.  **Tip:** Keep the names alphabetical for better user experience.

---

## 🌍 How to Add a New Country

1.  **Datalist:** In `index.html`, add a new `<option>` to the `#region-list`.
    ```html
    <option value="xx - 🚩 Country Name (XX)"></option>
    ```
2.  **Platforms:** In `platforms.js`, add a new key for the country code `"xx"`.
3.  **URL Sync:** In `script.js`, ensure the `regionToLang` map includes the new country if they speak something other than English.

---

## 🎨 Changing Logo or Icons

1.  Place your new PNG file in the `icons/` folder.
2.  Rename them to `icon-192.png` and `icon-512.png`.
3.  Check `manifest.json` to ensure the paths and sizes match.
4.  **Important:** Browsers cache PWA icons heavily. You may need to clear site data to see changes.

---

## 🚀 Deployment

The project is configured for **Vercel**. 
- Any 2-letter path (e.g., `frankpass.com/in`) is automatically redirected to `index.html` via `vercel.json`.
- `script.js` then reads that path and sets the country automatically.

---

## 🔒 Security Best Practices

- **Never** store user passwords or Secret Keys in the code or `localStorage`.
- Always use `requestAnimationFrame` for animations to keep the UI smooth.
- The `frankpass-core.js` should not be modified unless the fundamental algorithm needs changing.

---

**Happy Developing, Frank!** 🚀
