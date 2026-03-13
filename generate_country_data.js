const fs = require('fs');
const path = require('path');

const countriesToGenerate = [
    { file: 'argentina.md', name: 'Argentina', code: 'ar' },
    { file: 'austria.md', name: 'Austria', code: 'at' },
    { file: 'belgium.md', name: 'Belgium', code: 'be' },
    { file: 'brazil.md', name: 'Brazil', code: 'br' },
    { file: 'chile.md', name: 'Chile', code: 'cl' },
    { file: 'china.md', name: 'China', code: 'cn' },
    { file: 'colombia.md', name: 'Colombia', code: 'co' },
    { file: 'cz.md', name: 'Czech Republic', code: 'cz' },
    { file: 'denmark.md', name: 'Denmark', code: 'dk' },
    { file: 'egypt.md', name: 'Egypt', code: 'eg' },
    { file: 'finland.md', name: 'Finland', code: 'fi' },
    { file: 'france.md', name: 'France', code: 'fr' },
    { file: 'germany.md', name: 'Germany', code: 'de' },
    { file: 'greece.md', name: 'Greece', code: 'gr' },
    { file: 'hongkong.md', name: 'Hong Kong', code: 'hk' },
    { file: 'hungary.md', name: 'Hungary', code: 'hu' },
    { file: 'ireland.md', name: 'Ireland', code: 'ie' },
    { file: 'israel.md', name: 'Israel', code: 'il' },
    { file: 'italy.md', name: 'Italy', code: 'it' },
    { file: 'japan.md', name: 'Japan', code: 'jp' },
    { file: 'malaysia.md', name: 'Malaysia', code: 'my' },
    { file: 'mexico.md', name: 'Mexico', code: 'mx' },
    { file: 'netherlands.md', name: 'Netherlands', code: 'nl' },
    { file: 'newzealand.md', name: 'New Zealand', code: 'nz' },
    { file: 'norway.md', name: 'Norway', code: 'no' },
    { file: 'peru.md', name: 'Peru', code: 'pe' },
    { file: 'poland.md', name: 'Poland', code: 'pl' },
    { file: 'portugal.md', name: 'Portugal', code: 'pt' },
    { file: 'romania.md', name: 'Romania', code: 'ro' },
    { file: 'russia.md', name: 'Russia', code: 'ru' },
    { file: 'saudi.md', name: 'Saudi Arabia', code: 'sa' },
    { file: 'southafrica.md', name: 'South Africa', code: 'za' },
    { file: 'southkorea.md', name: 'South Korea', code: 'kr' },
    { file: 'spain.md', name: 'Spain', code: 'es' },
    { file: 'sweden.md', name: 'Sweden', code: 'se' },
    { file: 'switzerland.md', name: 'Switzerland', code: 'ch' },
    { file: 'taiwan.md', name: 'Taiwan', code: 'tw' },
    { file: 'thailand.md', name: 'Thailand', code: 'th' },
    { file: 'turkey.md', name: 'Turkey', code: 'tr' },
    { file: 'vietnam.md', name: 'Vietnam', code: 'vn' }
];

const standardPlatforms = [
    "Facebook", "Google - Gmail", "Netflix", "Amazon", "Apple",
    "Microsoft", "Instagram", "LinkedIn", "Twitter - X (Twitter)",
    "PayPal", "Discord", "Github", "Pinterest", "Reddit",
    "Snapchat", "Spotify", "Steam", "Telegram", "TikTok",
    "Twitch", "WhatsApp", "YouTube"
];

const countryDataDir = path.join(__dirname, 'Country data');

if (!fs.existsSync(countryDataDir)) {
    fs.mkdirSync(countryDataDir);
}

countriesToGenerate.forEach(country => {
    const filePath = path.join(countryDataDir, country.file);
    if (!fs.existsSync(filePath)) {
        // Adding generic big banks as placeholders to make it useful. 
        // In a real scenario, these would be country-specific.
        const regionalData = [
            `Central Bank of ${country.name}`,
            `National Bank of ${country.name}`,
            `${country.name} Commercial Bank`,
            ...standardPlatforms
        ];

        const content = `[
${regionalData.map(item => `  "${item}"`).join(',\n')}
]`;
        fs.writeFileSync(filePath, content);
        console.log(`Generated ${country.file}`);
    }
});

console.log("Country data generation complete.");
