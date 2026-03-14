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
const togglePassCb = document.getElementById('toggle-pass-cb');
const toggleSecretCb = document.getElementById('toggle-secret-cb');

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
if (toggleSecretCb) {
    toggleSecretCb.addEventListener('change', (e) => {
        secretEl.type = e.target.checked ? 'text' : 'password';
    });
}

// Toggle Generated Password Visibility via Switch
if (togglePassCb) {
    togglePassCb.addEventListener('change', (e) => {
        passwordOutput.type = e.target.checked ? 'text' : 'password';
    });
}

// Auto-Clear Logic
function startSecretClearTimer() {
    clearTimeout(secretClearTimer);
    secretClearTimer = setTimeout(() => {
        if (secretEl) {
            secretEl.value = '';
            // Trigger input event to update any dependent UI if necessary
            secretEl.dispatchEvent(new Event('input'));
        }
        console.log("Secret Key auto-cleared for security (1 min inactivity).");
    }, 60000); // 1 minute
}

function startPasswordClearTimer() {
    clearTimeout(passwordClearTimer);
    passwordClearTimer = setTimeout(() => {
        if (passwordOutput) {
            passwordOutput.value = '****************';
            passwordOutput.type = 'password'; // Force mask
            if (togglePassCb) togglePassCb.checked = false;
        }
        if (outputSection) outputSection.classList.remove('active');
        if (copyBtn) copyBtn.disabled = true;
        console.log("Generated Password auto-cleared for security (15s).");
    }, 15000); // 15 seconds
}

// Clear sensitive data on tab close or leave
const clearSensitiveData = () => {
    if (secretEl) secretEl.value = '';
    if (passwordOutput) {
        passwordOutput.value = '****************';
        passwordOutput.type = 'password';
    }
    if (outputSection) outputSection.classList.remove('active');
    if (copyBtn) copyBtn.disabled = true;
    console.log("Sensitive data wiped.");
};

document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearSensitiveData();
});

window.addEventListener('beforeunload', clearSensitiveData);
window.addEventListener('pagehide', clearSensitiveData);

// Reset secret timer on any user activity (inactivity detection)
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'input'].forEach(evt => {
    document.addEventListener(evt, () => {
        if (secretEl && secretEl.value !== '') {
            startSecretClearTimer();
        }
    }, { passive: true });
});

// Field Auto-Cleanup & Restore UX
function setupSmartField(el) {
    if (!el) return;
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
setupSmartField(platformEl);
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

// Region change is handled below in the unified listener

// Auto-detect Region by Timezone
function autoDetectRegion() {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const tzMap = {
            'Asia/Kolkata': 'in', 'Asia/Calcutta': 'in',
            'America/New_York': 'us', 'America/Los_Angeles': 'us', 'America/Chicago': 'us', 'America/Denver': 'us',
            'Europe/London': 'gb', 'Europe/Paris': 'fr', 'Europe/Berlin': 'de',
            'America/Toronto': 'ca', 'Australia/Sydney': 'au', 'Australia/Melbourne': 'au',
            'Asia/Dhaka': 'bd', 'Asia/Karachi': 'pk', 'Africa/Lagos': 'ng',
            'Asia/Manila': 'ph', 'Asia/Jakarta': 'id', 'Africa/Nairobi': 'ke',
            'Asia/Dubai': 'ae', 'Asia/Riyadh': 'sa',
            'Asia/Tokyo': 'jp', 'America/Sao_Paulo': 'br', 'Africa/Johannesburg': 'za',
            'Europe/Madrid': 'es', 'Europe/Rome': 'it', 'Europe/Amsterdam': 'nl'
            // Add more common timezones if necessary.
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
        // 1. Check URL path for region (e.g. /in)
        const path = window.location.pathname.replace(/\//g, '').toLowerCase();
        if (path.length === 2) {
            const pathOpt = document.querySelector(`#region-list option[value^="${path} -"]`);
            if (pathOpt) {
                regionEl.value = pathOpt.value;
            }
        }

        // 2. Fallback to default if still empty
        if (!regionEl.value) {
            const defaultOpt = document.querySelector(`#region-list option[value^="in -"]`);
            if (defaultOpt) regionEl.value = defaultOpt.value;
        }

        // 3. Auto-detect timezone BEFORE reading regionEl.value for UI update
        //    This ensures flag badge reflects the detected region correctly
        if (!path || path === '' || path === 'index.html') {
            autoDetectRegion();
        }

        // 4. Update UI — read value AFTER autoDetectRegion() has potentially changed it
        let val = regionEl.value || '';
        let code = val.split('-')[0].trim().toLowerCase();
        if (!code) code = 'global';
        populatePlatformDatalist(code);
        updateRegionIcon(val); // Initialize flag badge with final region

        // 5. Trigger Guide language change based on final region
        const regionToLang = {
            'in': 'hi', 'np': 'hi', 'es': 'es', 'us': 'es', 'fr': 'fr', 'ca': 'fr'
        };
        const finalLang = regionToLang[code];
        if (finalLang && typeof toggleGuide === 'function') {
            toggleGuide(finalLang);
        }
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

    let countryCode = (fullVal || '').split('-')[0].trim().toLowerCase();
    
    // If user typed something but it's not a full code (e.g. typing "in"), try to find it
    if (countryCode.length < 2 && fullVal) {
        const match = document.querySelector(`#region-list option[value*="${fullVal}"]`);
        if (match) {
            countryCode = match.value.split('-')[0].trim().toLowerCase();
        }
    }

    if (countryCode && countryCode !== 'global' && countryCode.length === 2) {
        // Use FlagCDN for guaranteed rendering on Windows
        const flagUrl = `https://flagcdn.com/w80/${countryCode}.png`;
        flagBadge.innerHTML = `<img src="${flagUrl}" alt="${countryCode}" style="width: 22px; height: auto; border-radius: 2px; vertical-align: middle;">`;
        return;
    }
    flagBadge.textContent = "🌍";
}

// Unified region change listener (input + change)
if (regionEl) {
    regionEl.addEventListener('input', (e) => {
        let val = e.target.value || '';
        let code = val.split('-')[0].trim().toLowerCase();
        if (!code) code = 'global';
        populatePlatformDatalist(code);
        updateRegionIcon(val);
    });

    regionEl.addEventListener('change', (e) => {
        let val = e.target.value || '';
        let code = val.split('-')[0].trim().toLowerCase();
        if (!code) code = 'global';
        populatePlatformDatalist(code);
        updateRegionIcon(val);

        // Clear platform on region change
        if (platformEl) platformEl.value = '';

        // Update URL path without refresh (SEO & UX)
        if (code !== 'global') {
            window.history.pushState({ code }, '', `/${code}`);
        } else {
            window.history.pushState({ code }, '', '/');
        }
    });
}

// ==========================================
// 4. MAIN GENERATOR LOGIC
// ==========================================
// Main Generator Form Submission
// ==========================================
// 5. GUIDE LOCALIZATION & SHARING
// ==========================================

// Generation tracking for Shoutout feature
let genCount = parseInt(localStorage.getItem('frankpass_gen_count') || '0');

function showShoutoutModal() {
    const modal = document.getElementById('shoutout-modal');
    if (modal) modal.classList.add('show');
}

function closeShoutoutModal() {
    const modal = document.getElementById('shoutout-modal');
    if (modal) modal.classList.remove('show');
}

// Close modal when clicking outside of the content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('shoutout-modal');
    if (event.target === modal) {
        closeShoutoutModal();
    }
});

// Main Generator Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    setLoadingState(true);

    try {
        await new Promise(resolve => setTimeout(resolve, 10));

        // ... existing platform/username/secret logic ...
        let rawPlatform = platformEl.value.trim().toLowerCase();
        let platform = rawPlatform;
        platform = platform.replace(/^(https?:\/\/)?/, '').split('/')[0].split('?')[0].split('#')[0];
        platform = platform.replace(/^(www\.|m\.|app\.|login\.|secure\.|auth\.|account\.)/, '');
        let domainParts = platform.split('.');
        if (domainParts.length > 2 && (domainParts[domainParts.length - 2].length <= 3)) {
            platform = domainParts[domainParts.length - 3];
        } else if (domainParts.length >= 2) {
            platform = domainParts[domainParts.length - 2];
        } else {
            platform = domainParts[0];
        }
        platform = platform.replace(/[^a-z0-9]/g, '');

        const globalAliases = {
            'x': 'twitter', 'tw': 'twitter', 'ig': 'instagram', 'insta': 'instagram',
            'fb': 'facebook', 'yt': 'youtube', 'wa': 'whatsapp', 'amzn': 'amazon',
            'snap': 'snapchat', 'pin': 'pinterest', 'gpay': 'googlepay', 'appleid': 'apple'
        };
        if (globalAliases[platform]) platform = globalAliases[platform];

        const usernameRaw = usernameEl.value.trim().toLowerCase();
        const username = usernameRaw.split('@')[0].replace(/[^a-z0-9._-]/g, '');
        const secret = secretEl.value.toLowerCase().replace(/\s+/g, '');
        let variant = parseInt(variantEl.value, 10);
        if (isNaN(variant)) variant = 1;
        const profile = profileEl.value;
        let length = parseInt(lengthEl.value, 10);
        if (isNaN(length)) length = 16;

        const password = await FRANKPASS_CORE.generate(platform, username, secret, variant, profile, length, null);

        // Strength Logic
        const strengthIndicator = document.getElementById('strength-indicator');
        if (strengthIndicator) {
            strengthIndicator.style.display = 'flex';
            if (length >= 16 && profile === 'standard') {
                strengthIndicator.innerHTML = '<ion-icon name="shield-checkmark"></ion-icon> Unbreakable';
                strengthIndicator.style.color = '#10b981';
                strengthIndicator.style.background = 'rgba(16, 185, 129, 0.15)';
            } else if (length >= 12 && (profile === 'standard' || profile === 'alphanumeric')) {
                strengthIndicator.innerHTML = '<ion-icon name="shield-outline"></ion-icon> Strong';
                strengthIndicator.style.color = '#3b82f6';
                strengthIndicator.style.background = 'rgba(59, 130, 246, 0.15)';
            } else if (length >= 8) {
                strengthIndicator.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon> Medium';
                strengthIndicator.style.color = '#f59e0b';
                strengthIndicator.style.background = 'rgba(245, 158, 11, 0.15)';
            } else {
                strengthIndicator.innerHTML = '<ion-icon name="warning-outline"></ion-icon> Weak';
                strengthIndicator.style.color = '#ef4444';
                strengthIndicator.style.background = 'rgba(239, 68, 68, 0.15)';
            }
        }

        passwordOutput.value = password;
        outputSection.classList.add('active');
        copyBtn.disabled = false;
        copyToClipboard(password);

        startPasswordClearTimer();
        startSecretClearTimer();

        // Increment and Check Generation Count for Shoutout
        genCount++;
        localStorage.setItem('frankpass_gen_count', genCount);
        if (genCount === 2 || genCount === 3) {
            setTimeout(showShoutoutModal, 1500); // Small delay after generation
        }

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
        btnEl.addEventListener('click', () => {
            toggleGuide(lang);
        });
    }
});

function toggleGuide(lang) {
    if (!guides[lang] || !btns[lang]) return;
    const isShowing = !guides[lang].classList.contains('hidden');
    langs.forEach(l => {
        if (guides[l]) guides[l].classList.add('hidden');
        if (btns[l]) btns[l].classList.remove('active');
    });
    if (!isShowing) {
        guides[lang].classList.remove('hidden');
        btns[lang].classList.add('active');
        const activeRegion = regionEl.value.split('-')[0].trim().toLowerCase() || 'global';
        const transLang = (activeRegion === 'in' || activeRegion === 'np') ? 'in' : (activeRegion === 'ng' ? 'ng' : activeRegion);
        const breachTranslation = window.regionalTranslations[transLang] || window.regionalTranslations['ng'];
        if (breachTranslation) {
            const bTitle = document.getElementById('breach-title');
            const bBody = document.getElementById('breach-body');
            if (bTitle) bTitle.innerHTML = `<ion-icon name="warning-outline" style="vertical-align: middle; margin-right: 0.5rem;"></ion-icon> ${breachTranslation.breach_title}`;
            if (bBody) bBody.innerHTML = breachTranslation.breach_body;
        }
    }
}

function closeGuide() {
    langs.forEach(l => {
        if (guides[l]) guides[l].classList.add('hidden');
        if (btns[l]) btns[l].classList.remove('active');
    });
    
    // Scroll back to guide buttons
    const target = document.getElementById('how-it-works');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Shoutout functionality: Pre-fills a localized message and opens social sharing.
 * Detects the active region from the region selector to pick the right language.
 * @param {string} platform - The social platform ('x', 'instagram', 'facebook', 'youtube', 'whatsapp')
 */
function runShoutout(platform) {
    // Detect active region from the region selector
    const regionVal = regionEl ? regionEl.value : '';
    const regionCode = (regionVal || '').split('-')[0].trim().toLowerCase() || 'ng';
    const msgData = window.regionalTranslations[regionCode] || window.regionalTranslations['ng'] || {};
    
    // Updated more descriptive message that encourages supporting others
    const message = msgData.shoutout_message || "I'm using FrankPass - a futuristic, stateless password generator that ensures privacy and mental peace. No more forgotten passwords! Check it out: https://frankpass.com/guide";
    const encodedMsg = encodeURIComponent(message);
    const guideUrl = "https://frankpass.com/guide";
    const encodedGuideUrl = encodeURIComponent(guideUrl);

    let shareUrl = "";

    switch (platform) {
        case 'x':
            shareUrl = `https://x.com/intent/tweet?text=${encodedMsg}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedMsg}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedGuideUrl}&quote=${encodedMsg}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedGuideUrl}`;
            break;
        case 'instagram':
            navigator.clipboard.writeText(message).then(() => {
                alert("Message copied to clipboard! Now opening Instagram — paste it in your story or post.");
                window.open("https://instagram.com/mastermanikant", '_blank', 'noopener,noreferrer');
            });
            return;
        default:
            navigator.clipboard.writeText(message).then(() => {
                alert("Message copied! You can now paste it anywhere.");
            });
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
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

// Detect Standalone Mode and show "Open in Browser" button
window.addEventListener('load', () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    const openBrowserBtn = document.getElementById('open-browser-btn');
    if (isStandalone && openBrowserBtn) {
        openBrowserBtn.style.display = 'block';
    }
});

function openInBrowser() {
    // This will open the URL in a new browser tab/window
    window.open(window.location.href, '_blank');
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
        btn.innerHTML = '<ion-icon name="chevron-down-outline" id="faq-toggle-icon"></ion-icon> Show FAQ';
    } else {
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.gap = '1rem';
        if (icon) icon.style.transform = 'rotate(180deg)';
        btn.innerHTML = '<ion-icon name="chevron-up-outline" id="faq-toggle-icon"></ion-icon> Hide FAQ';
    }
}

// Collapse FAQ and scroll to header
function collapseFAQ() {
    toggleFAQ();
    document.getElementById('faq-header').scrollIntoView({ behavior: 'smooth' });
}

// Duplicate closeGuide() removed — already defined at line 492

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