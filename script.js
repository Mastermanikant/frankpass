// ==========================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================
const APP_ID = "MasterManikant_PassGen";
const VERSION = "v1";

// Guaranteed character sets (used by core, but kept here for reference)
const UPPERCASE = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // removed I, O
const LOWERCASE = "abcdefghijkmnopqrstuvwxyz"; // removed l
const NUMBERS = "23456789"; // removed 0, 1
const SYMBOLS = "!@#$%^&*()_+-=";

// ==========================================
// 2. DOM ELEMENT SELECTIONS
// ==========================================
const form = document.getElementById('generator-form');
const platformEl = document.getElementById('platform');
const platformList = document.getElementById('platform-list');
const regionEl = document.getElementById('region');
const usernameEl = document.getElementById('username');
const secretEl = document.getElementById('secret');
const variantEl = document.getElementById('variant');
const profileEl = document.getElementById('profile');
const lengthEl = document.getElementById('length');
const lengthValEl = document.getElementById('length-val');

const generateBtn = document.getElementById('generate-btn');
const btnText = document.querySelector('.btn-text');
const btnIcon = document.querySelector('.btn-primary ion-icon');
const loader = document.querySelector('.loader');

const passwordOutput = document.getElementById('password-output');
const outputSection = document.getElementById('output-section');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');
const toggleSecretCb = document.getElementById('toggle-secret-cb');
const toggleVisBtn = document.getElementById('toggle-vis-btn');
const visIcon = document.getElementById('vis-icon');

// Security Timers
let secretClearTimer = null;
let passwordClearTimer = null;

// Guide Elements handled dynamically below

// ==========================================
// 3. EVENT LISTENERS & UI LOGIC
// ==========================================

// Update length dynamically on slider change
lengthEl.addEventListener('input', (e) => {
    lengthValEl.textContent = e.target.value;
});

// Toggle Secret Visibility via Checkbox
toggleSecretCb.addEventListener('change', (e) => {
    secretEl.type = e.target.checked ? 'text' : 'password';
});

// Toggle Generated Password Visibility
toggleVisBtn.addEventListener('click', () => {
    const isPassword = passwordOutput.type === 'password';
    passwordOutput.type = isPassword ? 'text' : 'password';
    visIcon.name = isPassword ? 'eye-outline' : 'eye-off-outline';
});

// Auto-Clear Logic
function startSecretClearTimer() {
    clearTimeout(secretClearTimer);
    secretClearTimer = setTimeout(() => {
        secretEl.value = '';
        console.log("Secret Key auto-cleared for security.");
    }, 120000); // 2 minutes
}

function startPasswordClearTimer() {
    clearTimeout(passwordClearTimer);
    passwordClearTimer = setTimeout(() => {
        passwordOutput.value = '****************';
        outputSection.classList.remove('active');
        copyBtn.disabled = true;
        console.log("Generated Password auto-cleared for security.");
    }, 30000); // 30 seconds
}

// Clear sensitive data on tab leave
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        secretEl.value = '';
        passwordOutput.value = '****************';
        outputSection.classList.remove('active');
        copyBtn.disabled = true;
        console.log("Sensitive data cleared on tab leave.");
    }
});

// Reset secret timer on input
secretEl.addEventListener('input', startSecretClearTimer);

// Field Auto-Cleanup & Restore UX
function setupSmartField(el) {
    let originalValue = "";
    el.addEventListener('focus', () => {
        originalValue = el.value;
        el.value = "";
    });
    el.addEventListener('blur', () => {
        if (el.value.trim() === "") {
            el.value = originalValue;
        }
    });
}

setupSmartField(regionEl);
setupSmartField(usernameEl);

// Populate Datalist dynamically based on region
function populatePlatformDatalist(region) {
    if (!window.regionalPlatforms || !platformList) return;

    // Clear existing
    platformList.innerHTML = '';

    let platforms = [];
    if (region === 'global') {
        // Collect all unique platforms
        let allPlatforms = new Set();
        Object.values(window.regionalPlatforms).forEach(arr => {
            arr.forEach(p => allPlatforms.add(p));
        });
        platforms = Array.from(allPlatforms).sort();
    } else {
        platforms = window.regionalPlatforms[region] || window.regionalPlatforms['in'] || [];
    }

    // Add fresh options
    platforms.forEach(platformName => {
        const option = document.createElement('option');
        option.value = platformName;
        platformList.appendChild(option);
    });
}

// Listen for region changes
if (regionEl) {
    regionEl.addEventListener('change', (e) => {
        let val = e.target.value || '';
        let code = val.split('-')[0].trim().toLowerCase();
        if (!code) code = 'global';
        populatePlatformDatalist(code);
        updateRegionIcon(val); // Added this to update the logo flag
    });
}

// Auto-detect Region by Timezone
function autoDetectRegion() {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const tzMap = {
            'Asia/Kolkata': 'in', 'America/New_York': 'us', 'America/Los_Angeles': 'us',
            'Europe/London': 'gb', 'America/Toronto': 'ca', 'Australia/Sydney': 'au',
            'Asia/Dhaka': 'bd', 'Asia/Karachi': 'pk', 'Africa/Lagos': 'ng',
            'Asia/Manila': 'ph', 'Asia/Jakarta': 'id', 'Africa/Nairobi': 'ke',
            'Asia/Dubai': 'ae', 'Europe/Paris': 'fr', 'Europe/Berlin': 'de',
            'Asia/Tokyo': 'jp', 'America/Sao_Paulo': 'br', 'Africa/Johannesburg': 'za',
            'Europe/Madrid': 'es', 'Europe/Rome': 'it', 'Europe/Amsterdam': 'nl'
            // Add more common timezones if necessary. Fallback is what is selected in HTML.
        };

        const detectedRegion = tzMap[tz];
        if (detectedRegion) {
            // 1. Personalize Platform List
            const option = document.querySelector(`#region-list option[value^="${detectedRegion} -"]`);
            if (option) {
                regionEl.value = option.value;
            }

            // 2. Personalize Language Guide (if not already manually set)
            // Map detected regions to available guide languages
            const regionToLang = {
                'in': 'hi', 'np': 'hi', // Hindi for India/Nepal
                'es': 'es', 'us': 'es', // Spanish for Spain/US-Latino
                'fr': 'fr', 'ca': 'fr', // French for France/Canada
                'bd': 'en', 'pk': 'en', 'ae': 'en' // Defaulting others to English (or specific if added)
            };
            const targetLang = regionToLang[detectedRegion];
            if (targetLang && typeof toggleGuide === 'function') {
                toggleGuide(targetLang);
            }
        }
    } catch (e) {
        console.warn("Could not auto-detect region:", e);
    }
}

// Initial populate on page load
window.addEventListener('DOMContentLoaded', () => {
    if (regionEl) {
        // Set default to India if empty
        if (!regionEl.value) {
            const defaultOpt = document.querySelector(`#region-list option[value^="in -"]`);
            if (defaultOpt) regionEl.value = defaultOpt.value;
        }
        autoDetectRegion();
        let val = regionEl.value || '';
        let code = val.split('-')[0].trim().toLowerCase();
        if (!code) code = 'global';
        populatePlatformDatalist(code);
        updateRegionIcon(val); // Initialize flag
    }
});

// Helper to convert CC to Emoji
function getFlagEmoji(cc) {
    if (!cc || cc.length !== 2) return null;
    const codePoints = cc.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

// Update the logo flag badge based on region selection
function updateRegionIcon(fullVal) {
    const flagBadge = document.getElementById('flag-badge');
    if (!flagBadge) return;

    const countryCode = (fullVal || '').split('-')[0].trim().toLowerCase();

    if (countryCode && countryCode !== 'global') {
        const flag = getFlagEmoji(countryCode);
        if (flag) {
            flagBadge.textContent = flag;
            return;
        }
    }
    flagBadge.textContent = "🌍";
}

// Listen for region changes
if (regionEl) {
    regionEl.addEventListener('input', (e) => {
        let val = e.target.value || '';
        let code = val.split('-')[0].trim().toLowerCase();
        if (!code) code = 'global';
        
        populatePlatformDatalist(code);
        updateRegionIcon(val);
    });
    
    // Also handle 'change' for full selection from datalist
    regionEl.addEventListener('change', (e) => {
        updateRegionIcon(e.target.value);
    });
}

// ==========================================
// 4. MAIN GENERATOR LOGIC
// ==========================================
// Main Generator Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    setLoadingState(true);

    try {
        await new Promise(resolve => setTimeout(resolve, 10));

        let rawPlatform = platformEl.value.trim().toLowerCase();
        
        // Advanced Domain Canonicalization (Basic PSL-like approach without heavy libraries)
        let platform = rawPlatform;
        
        // 1. Remove protocol and paths
        platform = platform.replace(/^(https?:\/\/)?/, '').split('/')[0].split('?')[0].split('#')[0];
        
        // 2. Remove common subdomains
        platform = platform.replace(/^(www\.|m\.|app\.|login\.|secure\.|auth\.|account\.)/, '');
        
        // 3. Extract the main domain block (strip TLDs)
        let domainParts = platform.split('.');
        if (domainParts.length > 2 && (domainParts[domainParts.length - 2].length <= 3)) {
            // Handle cases like .co.uk, .com.au
            platform = domainParts[domainParts.length - 3];
        } else if (domainParts.length >= 2) {
            // Handle cases like facebook.com, facebook.in
            platform = domainParts[domainParts.length - 2];
        } else {
            // No dots, use as is (e.g. user typed "facebook")
            platform = domainParts[0];
        }
        
        // 4. Final sanitization (remove any remaining non-alphanumeric chars)
        platform = platform.replace(/[^a-z0-9]/g, '');

        // Map rebranded or shortened names to their original base (e.g. x -> twitter)
        const globalAliases = {
            'x': 'twitter', 'tw': 'twitter',
            'ig': 'instagram', 'insta': 'instagram',
            'fb': 'facebook', 'yt': 'youtube',
            'wa': 'whatsapp', 'amzn': 'amazon',
            'snap': 'snapchat', 'pin': 'pinterest',
            'gpay': 'googlepay', 'appleid': 'apple'
        };
        if (globalAliases[platform]) {
            platform = globalAliases[platform];
        }

        const usernameRaw = usernameEl.value.trim().toLowerCase();
        // Smart Normalization: Strip email domain, but preserve . - _
        const username = usernameRaw.split('@')[0].replace(/[^a-z0-9._-]/g, '');
        const secret = secretEl.value.toLowerCase().replace(/\s+/g, '');

        let variant = parseInt(variantEl.value, 10);
        if (isNaN(variant)) variant = 1; // Bug fix: fallback if NaN

        const profile = profileEl.value;

        let length = parseInt(lengthEl.value, 10);
        if (isNaN(length)) length = 16;  // Bug fix: fallback if NaN

        // Generate using isolated Core Logic (Fully Offline)
        const password = await FRANKPASS_CORE.generate(platform, username, secret, variant, profile, length, null);

        // Calculate and Show Strength
        const strengthIndicator = document.getElementById('strength-indicator');
        if (strengthIndicator) {
            strengthIndicator.style.display = 'flex';
            if (length >= 16 && profile === 'standard') {
                strengthIndicator.innerHTML = '<ion-icon name="shield-checkmark"></ion-icon> Unbreakable';
                strengthIndicator.style.color = '#10b981'; // Green
                strengthIndicator.style.background = 'rgba(16, 185, 129, 0.15)';
            } else if (length >= 12 && (profile === 'standard' || profile === 'alphanumeric')) {
                strengthIndicator.innerHTML = '<ion-icon name="shield-outline"></ion-icon> Strong';
                strengthIndicator.style.color = '#3b82f6'; // Blue
                strengthIndicator.style.background = 'rgba(59, 130, 246, 0.15)';
            } else if (length >= 8) {
                strengthIndicator.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon> Medium';
                strengthIndicator.style.color = '#f59e0b'; // Amber
                strengthIndicator.style.background = 'rgba(245, 158, 11, 0.15)';
            } else {
                strengthIndicator.innerHTML = '<ion-icon name="warning-outline"></ion-icon> Weak';
                strengthIndicator.style.color = '#ef4444'; // Red
                strengthIndicator.style.background = 'rgba(239, 68, 68, 0.15)';
            }
        }

        // 3. UI Result
        passwordOutput.value = password;
        outputSection.classList.add('active');
        copyBtn.disabled = false;
        copyToClipboard(password);

        // Start Auto-Clear Timers
        startPasswordClearTimer();
        startSecretClearTimer();

    } catch (err) {
        console.error("Generation Error:", err);
        alert("A critical error occurred: " + err.message);
    } finally {
        setLoadingState(false);
    }
});


function setLoadingState(isLoading) {
    if (isLoading) {
        generateBtn.disabled = true;
        btnText.classList.add('hidden');
        btnIcon.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        generateBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnIcon.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

copyBtn.addEventListener('click', () => {
    copyToClipboard(passwordOutput.value);
});

if (toggleVisBtn) {
    toggleVisBtn.addEventListener('click', () => {
        if (passwordOutput.type === 'password') {
            passwordOutput.type = 'text';
            visIcon.name = 'eye-off-outline';
        } else {
            passwordOutput.type = 'password';
            visIcon.name = 'eye-outline';
        }
    });
}

async function copyToClipboard(text) {
    if (!text || text === '****************') return;
    try {
        await navigator.clipboard.writeText(text);
        showToast();
    } catch (err) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        showToast();
    }
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==========================================
// 5. GUIDE LOCALIZATION & SHARING
// ==========================================
// Guide Localization and Toggling
const langs = ['en', 'hi', 'es', 'fr'];
const guides = {};
const btns = {};

langs.forEach(lang => {
    const guideEl = document.getElementById(`guide-${lang}`);
    const btnEl = document.getElementById(`btn-guide-${lang}`);
    if (guideEl && btnEl) {
        guides[lang] = guideEl;
        btns[lang] = btnEl;
        btnEl.addEventListener('click', () => toggleGuide(lang));
    }
});

function toggleGuide(lang) {
    if (!guides[lang] || !btns[lang]) return;

    const isShowing = !guides[lang].classList.contains('hidden');

    // Hide all
    langs.forEach(l => {
        if (guides[l]) guides[l].classList.add('hidden');
        if (btns[l]) btns[l].classList.remove('active');
    });

    // Toggle selected
    if (!isShowing) {
        guides[lang].classList.remove('hidden');
        btns[lang].classList.add('active');
    }
}

// Localized App Sharing
function shareApp() {
    let activeLang = 'en'; // default
    langs.forEach(l => {
        if (guides[l] && !guides[l].classList.contains('hidden')) {
            activeLang = l;
        }
    });

    const shareTexts = {
        'en': 'Generate unbreakable passwords mentally without storing them anywhere!',
        'hi': 'बिना कहीं सेव किए दिमाग से अनब्रेकेबल पासवर्ड बनाएं!',
        'es': '¡Genera contraseñas irrompibles mentalmente sin guardarlas en ninguna parte!',
        'fr': 'Générez des mots de passe inviolables mentalement sans les stocker nulle part !'
    };

    const text = shareTexts[activeLang] || shareTexts['en'];

    if (navigator.share) {
        navigator.share({
            title: 'FrankPass',
            text: text,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        copyToClipboard(window.location.href);
        alert("Link copied to clipboard to share!");
    }
}

// =============== PWA Smart Install / Open-in-App Logic ===============
let deferredInstallPrompt = null;

// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('FrankPass SW registered:', reg.scope))
            .catch(err => console.warn('SW registration failed:', err));
    });
}

// Set button to "Open in App" mode
function showOpenInAppBtn() {
    const btn = document.getElementById('pwa-install-btn');
    if (!btn) return;
    btn.style.display = 'flex';
    btn.style.background = 'linear-gradient(135deg, #6366f1, #4f46e5)';
    btn.innerHTML = '<ion-icon name="phone-portrait-outline" style="margin-right:0.4rem;"></ion-icon> Open in App';
    btn.onclick = openInApp;
}

// Set button to "Install Web App" mode
function showInstallBtn() {
    const btn = document.getElementById('pwa-install-btn');
    if (!btn) return;
    btn.style.display = 'flex';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.innerHTML = '<ion-icon name="download-outline" style="margin-right:0.4rem;"></ion-icon> Install Web App';
    btn.onclick = installPWA;
}

// On page load: check if app is already installed
window.addEventListener('DOMContentLoaded', () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;

    if (isStandalone) {
        // Running inside installed PWA — hide the button
        const btn = document.getElementById('pwa-install-btn');
        if (btn) btn.style.display = 'none';
    } else if (localStorage.getItem('frankpass-installed') === 'true') {
        // Previously installed — show Open in App
        showOpenInAppBtn();
    }
    // Otherwise wait for beforeinstallprompt
});

// Browser fires this when app is installable
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    if (localStorage.getItem('frankpass-installed') !== 'true') {
        showInstallBtn();
    }
});

// Called when user clicks "Install Web App"
function installPWA() {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((result) => {
        deferredInstallPrompt = null;
        if (result.outcome === 'accepted') {
            localStorage.setItem('frankpass-installed', 'true');
            showOpenInAppBtn();
        } else {
            const btn = document.getElementById('pwa-install-btn');
            if (btn) btn.style.display = 'none';
        }
    });
}

// Called when user clicks "Open in App"
function openInApp() {
    window.open(window.location.href, '_blank', 'noreferrer');
}

// Browser fires this when install completes
window.addEventListener('appinstalled', () => {
    localStorage.setItem('frankpass-installed', 'true');
    deferredInstallPrompt = null;
    showOpenInAppBtn();
});

// =============== FAQ Toggle & Exclusive Accordion ===============

// Toggle the entire FAQ body (Show / Hide all questions)
function toggleFAQ() {
    const body = document.getElementById('faq-body');
    const btn = document.getElementById('faq-toggle-btn');
    const icon = document.getElementById('faq-toggle-icon');
    if (!body) return;

    const isOpen = body.style.display === 'flex';
    if (isOpen) {
        body.style.display = 'none';
        if (icon) icon.style.transform = 'rotate(0deg)';
        btn.innerHTML = btn.innerHTML.replace('Hide FAQ', 'Show FAQ');
    } else {
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.gap = '1rem';
        if (icon) icon.style.transform = 'rotate(180deg)';
        btn.innerHTML = btn.innerHTML.replace('Show FAQ', 'Hide FAQ');
    }
}

// Exclusive accordion: only one <details> open at a time
document.addEventListener('DOMContentLoaded', () => {
    const allDetails = document.querySelectorAll('.faq-item');
    allDetails.forEach((detail) => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                // Close all other items
                allDetails.forEach((other) => {
                    if (other !== detail && other.open) {
                        other.removeAttribute('open');
                    }
                });
            }
        });
    });
});