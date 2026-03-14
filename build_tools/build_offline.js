const fs = require('fs');
const path = require('path');

// Read source files
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
const platformsJs = fs.readFileSync(path.join(__dirname, 'platforms.js'), 'utf8');
const translationsJs = fs.readFileSync(path.join(__dirname, 'translations.js'), 'utf8');
const coreJs = fs.readFileSync(path.join(__dirname, 'frankpass-core.js'), 'utf8');
const scriptJs = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

// Replace CSS
let offlineHtml = html.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>\n${css}\n</style>`
);

// Replace external JS scripts with inline scripts
offlineHtml = offlineHtml.replace(
    '<script src="platforms.js"></script>',
    `<script>\n${platformsJs}\n</script>`
);
offlineHtml = offlineHtml.replace(
    '<script src="translations.js"></script>',
    `<script>\n${translationsJs}\n</script>`
);
offlineHtml = offlineHtml.replace(
    '<script src="frankpass-core.js"></script>',
    `<script>\n${coreJs}\n</script>`
);
offlineHtml = offlineHtml.replace(
    '<script src="script.js"></script>',
    `<script>\n${scriptJs}\n</script>`
);

// Remove service worker for offline file (since it's a local file protocol)
offlineHtml = offlineHtml.replace(
    /<script>\s*if\s*\('serviceWorker'\s*in\s*navigator\).*?<\/script>/s,
    ''
);

// Remove the manifest link
offlineHtml = offlineHtml.replace(
    '<link rel="manifest" href="manifest.json">',
    ''
);

// Add an offline banner at the top of the body
const offlineBanner = `
<div style="background: #eab308; color: #000; text-align: center; padding: 10px; font-weight: bold; position: fixed; top: 0; left: 0; width: 100%; z-index: 10000; box-shadow: 0 2px 10px rgba(0,0,0,0.5);">
    ⚠️ OFFLINE DOOMSDAY VERSION: This file is running 100% locally. Disconnect your internet to test it.
</div>
`;
offlineHtml = offlineHtml.replace('<body>', `<body>\n${offlineBanner}`);

// Save the offline HTML
fs.writeFileSync(path.join(__dirname, 'frankpass_offline.html'), offlineHtml);
console.log('✅ Offline Doomsday Generator generated: frankpass_offline.html');
