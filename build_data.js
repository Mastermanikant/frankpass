const fs = require("fs");
const path = require("path");

const map = {
  "afghanistan.md": "af",
  "albania.md": "al",
  "algeria.md": "dz",
  "andorra.md": "ad",
  "angola.md": "ao",
  "antiguaandbarbuda.md": "ag",
  "argentina.md": "ar",
  "armenia.md": "am",
  "australia.md": "au",
  "austria.md": "at",
  "azerbaijan.md": "az",
  "bahamas.md": "bs",
  "bahrain.md": "bh",
  "bangladesh.md": "bd",
  "barbados.md": "bb",
  "belarus.md": "by",
  "belgium.md": "be",
  "belize.md": "bz",
  "benin.md": "bj",
  "bhutan.md": "bt",
  "bolivia.md": "bo",
  "bosniaandherzegovina.md": "ba",
  "botswana.md": "bw",
  "brazil.md": "br",
  "brunei.md": "bn",
  "bulgaria.md": "bg",
  "burkinafaso.md": "bf",
  "burundi.md": "bi",
  "caboverde.md": "cv",
  "cambodia.md": "kh",
  "cameroon.md": "cm",
  "canada.md": "ca",
  "centralafricanrepublic.md": "cf",
  "chad.md": "td",
  "chile.md": "cl",
  "china.md": "cn",
  "colombia.md": "co",
  "comoros.md": "km",
  "congocongobrazzaville.md": "cg",
  "congodrc.md": "cd",
  "costarica.md": "cr",
  "croatia.md": "hr",
  "cuba.md": "cu",
  "cyprus.md": "cy",
  "czechiaczechrepublic.md": "cz",
  "denmark.md": "dk",
  "djibouti.md": "dj",
  "dominica.md": "dm",
  "dominicanrepublic.md": "do",
  "ecuador.md": "ec",
  "egypt.md": "eg",
  "elsalvador.md": "sv",
  "equatorialguinea.md": "gq",
  "eritrea.md": "er",
  "estonia.md": "ee",
  "eswatini.md": "sz",
  "ethiopia.md": "et",
  "fiji.md": "fj",
  "finland.md": "fi",
  "france.md": "fr",
  "gabon.md": "ga",
  "gambia.md": "gm",
  "georgia.md": "ge",
  "germany.md": "de",
  "ghana.md": "gh",
  "greece.md": "gr",
  "grenada.md": "gd",
  "guatemala.md": "gt",
  "guinea.md": "gn",
  "guineabissau.md": "gw",
  "guyana.md": "gy",
  "haiti.md": "ht",
  "honduras.md": "hn",
  "hongkong.md": "hk",
  "hungary.md": "hu",
  "iceland.md": "is",
  "india.md": "in",
  "indonesia.md": "id",
  "iran.md": "ir",
  "iraq.md": "iq",
  "ireland.md": "ie",
  "israel.md": "il",
  "italy.md": "it",
  "jamaica.md": "jm",
  "japan.md": "jp",
  "jordan.md": "jo",
  "kazakhstan.md": "kz",
  "kenya.md": "ke",
  "kiribati.md": "ki",
  "northkorea.md": "kp",
  "southkorea.md": "kr",
  "kuwait.md": "kw",
  "kyrgyzstan.md": "kg",
  "laos.md": "la",
  "latvia.md": "lv",
  "lebanon.md": "lb",
  "lesotho.md": "ls",
  "liberia.md": "lr",
  "libya.md": "ly",
  "liechtenstein.md": "li",
  "lithuania.md": "lt",
  "luxembourg.md": "lu",
  "madagascar.md": "mg",
  "malawi.md": "mw",
  "malaysia.md": "my",
  "maldives.md": "mv",
  "mali.md": "ml",
  "malta.md": "mt",
  "marshallislands.md": "mh",
  "mauritania.md": "mr",
  "mauritius.md": "mu",
  "mexico.md": "mx",
  "micronesia.md": "fm",
  "moldova.md": "md",
  "monaco.md": "mc",
  "mongolia.md": "mn",
  "montenegro.md": "me",
  "morocco.md": "ma",
  "mozambique.md": "mz",
  "myanmarburma.md": "mm",
  "namibia.md": "na",
  "nauru.md": "nr",
  "nepal.md": "np",
  "netherlands.md": "nl",
  "newzealand.md": "nz",
  "nicaragua.md": "ni",
  "niger.md": "ne",
  "nigeria.md": "ng",
  "northmacedonia.md": "mk",
  "norway.md": "no",
  "oman.md": "om",
  "pakistan.md": "pk",
  "palau.md": "pw",
  "panama.md": "pa",
  "papuanewguinea.md": "pg",
  "paraguay.md": "py",
  "peru.md": "pe",
  "philippines.md": "ph",
  "poland.md": "pl",
  "portugal.md": "pt",
  "qatar.md": "qa",
  "romania.md": "ro",
  "russia.md": "ru",
  "rwanda.md": "rw",
  "saintkittsandnevis.md": "kn",
  "saintlucia.md": "lc",
  "saintvincentandthegrenadines.md": "vc",
  "samoa.md": "ws",
  "sanmarino.md": "sm",
  "saotomeandprincipe.md": "st",
  "saudiarabia.md": "sa",
  "senegal.md": "sn",
  "serbia.md": "rs",
  "seychelles.md": "sc",
  "sierraleone.md": "sl",
  "singapore.md": "sg",
  "slovakia.md": "sk",
  "slovenia.md": "si",
  "solomonislands.md": "sb",
  "somalia.md": "so",
  "southafrica.md": "za",
  "southsudan.md": "ss",
  "spain.md": "es",
  "srilanka.md": "lk",
  "sudan.md": "sd",
  "suriname.md": "sr",
  "sweden.md": "se",
  "switzerland.md": "ch",
  "syria.md": "sy",
  "taiwan.md": "tw",
  "tajikistan.md": "tj",
  "tanzania.md": "tz",
  "thailand.md": "th",
  "timorleste.md": "tl",
  "togo.md": "tg",
  "tonga.md": "to",
  "trinidadandtobago.md": "tt",
  "tunisia.md": "tn",
  "turkey.md": "tr",
  "turkmenistan.md": "tm",
  "tuvalu.md": "tv",
  "uganda.md": "ug",
  "ukraine.md": "ua",
  "unitedarabemirates.md": "ae",
  "unitedkingdom.md": "gb",
  "unitedstates.md": "us",
  "uruguay.md": "uy",
  "uzbekistan.md": "uz",
  "vanuatu.md": "vu",
  "vaticancity.md": "va",
  "venezuela.md": "ve",
  "vietnam.md": "vn",
  "yemen.md": "ye",
  "zambia.md": "zm",
  "zimbabwe.md": "zw",
};


let platformsObj = {};
for (const file in map) {
  const p = path.join("Country data", file);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, "utf-8");
    const jsonMatch = content.match(/\[[\s\S]*?\]/);
    if (jsonMatch) {
      try {
        const arr = JSON.parse(jsonMatch[0]);
        let parsedArr = new Set();
        arr.forEach(entry => {
          const match = entry.match(/^(.*?)(?:\s+-\s+(.*?))?(?:\s+\(([^)]+)\))?$/);
          if (match) {
            let bank = match[1] ? match[1].trim() : "";
            let app = match[2] ? match[2].trim() : "";
            let short = match[3] ? match[3].trim() : "";

            if (bank) {
              if (short && short.toLowerCase() !== bank.toLowerCase()) {
                parsedArr.add(`${bank} - ${short}`);
              } else {
                parsedArr.add(bank);
              }
            }
            if (app) {
              parsedArr.add(app);
            }
          } else {
            parsedArr.add(entry);
          }
        });
        platformsObj[map[file]] = Array.from(parsedArr);
      } catch (e) { console.error("Format error in", file); }
    }
  }
}

const jsContent = "window.regionalPlatforms = " + JSON.stringify(platformsObj, null, 2) + ";\n";
fs.writeFileSync(path.join(".", "platforms.js"), jsContent);

const translations = {
  in: {
    btn: "कैसे उपयोग करें",
    html: `<h2>FrankPass का उपयोग कैसे करें</h2>
    <p><strong>फायदा: सिर्फ 1 या 2 आसान बातें याद रखकर, जीवन भर के लिए कभी हैक न होने वाले पासवर्ड बनाएं!</strong></p>
    <p>यह टूल 100% डिटरमिनिस्टिक है। यह आपका डेटा कहीं सेव नहीं करता। यदि आप बिलकुल वही जानकारी दोबारा डालेंगे, तो आपको हमेशा बिलकुल वही पासवर्ड मिलेगा।</p>
    <h3>🔑 इनपुट्स को समझना</h3>
    <ol>
      <li><strong>Platform (ज़रूरी):</strong> जिस भी साइट का पासवर्ड बनाना चाहते हैं, उसके बस 1-2 अक्षर टाइप करें। नीचे सही नाम अपने-आप आ जाएगा, बस उसे सेलेक्ट कर लें। इससे स्पेलिंग की गलती कभी नहीं होगी!</li>
      <li><strong>Username (ऐच्छिक):</strong> अगर आप <code>raja@gmail.com</code> लिखते हैं, तो सिस्टम ऑटोमैटिक रूप से <code>@gmail.com</code> हटा देगा।</li>
      <li><strong>Secret Personal Key (ज़रूरी):</strong> यह आपकी मास्टर चाबी है! कुछ ऐसा लिखें जो आसानी से याद रहे।
      <br><em>उदाहरण:</em> <code>raja</code>, <code>1998</code>, <code>raja 1998</code>
      <br><em>ध्यान दें: सिस्टम ऑटोमैटिक रूप से स्पेस हटा देता है और अक्षरों को छोटा कर देता है, ताकि टाइपिंग में गलती ना हो।</em></li>
      <li><strong>Variant:</strong> जब भी किसी साइट का नया पासवर्ड बनाना हो, तो अपना Secret Key न बदलें, बस Variant को 1 से बढ़ाकर 2 कर दें।</li>
    </ol>
    <h3>🛡️ "दिमागी चाबी / Mental Tweak" (100% अभेद्य सुरक्षा)</h3>
    <p>जब भी आप यहाँ से जनरेट किए गए पासवर्ड को किसी लॉगिन पेज पर पेस्ट करें, तो अपनी मर्जी से 3 या 5 अक्षर (जैसे <code>@m12</code>) पासवर्ड के अंत में ज़रूर जोड़ दें। ऐसा करने के बाद, अगर कोई हैकर आपका पासवर्ड जनरेट होते हुए देख भी ले, तो भी उसे असली पासवर्ड कभी पता नहीं चलेगा!</p>
    <h3>⚠️ क्या करें और क्या न करें</h3>
    <ul>
      <li>साइट कम अक्षरों वाला पासवर्ड मांगे: Length स्लाइडर कम करें।</li>
      <li>कभी भी अपना फाइनल पासवर्ड कहीं न लिखें। सिर्फ रेसिपी लिखें: <em>"Facebook - Variant 2"</em>.</li>
    </ul>`
  },
  bd: {
    btn: "কীভাবে ব্যবহার করবেন",
    html: `<h2>কীভাবে FrankPass ব্যবহার করবেন</h2>
    <p><strong>সুবিধা: শুধু ১ বা ২ টি সহজ তথ্য মনে রেখে, সারাজীবনের জন্য কখনো হ্যাক না হওয়ার মতো পাসওয়ার্ড তৈরি করুন!</strong></p>
    <p>এই টুল 100% ডিটারমিনিস্টিক। এটি আপনার ডেটা কোথাও সেভ করে না। আপনি যদি একেবারে একই তথ্য আবার দেন, তাহলে সবসময় একই পাসওয়ার্ড পাবেন।</p>
    <h3>🔑 ইনপুটগুলো বোঝা</h3>
    <ol>
      <li><strong>Platform (প্রয়োজন):</strong> আপনি যে সাইটের পাসওয়ার্ড তৈরি করতে চান তার প্রথম 1-2 টি অক্ষর টাইপ করুন। ঐ নাম বা ড্রপ-ডাউন থেকে সেটা নির্বাচন করুন।</li>
      <li><strong>Username (ঐচ্ছিক):</strong> আপনি <code>raja@gmail.com</code> টাইপ করলে, সিস্টেম অটোমেটিক <code>@gmail.com</code> মুছে ফেলবে।</li>
      <li><strong>Secret Personal Key (প্রয়োজন):</strong> এটি আপনার প্রধান চাবি! সহজ কিছু লিখুন।
      <br><em>যেমন:</em> <code>raja 1998</code>
      <br><em>দ্রষ্টব্য: সিস্টেম নিজে থেকেই স্পেস এবং বড় হাতের অক্ষর সরিয়ে দেয়।</em></li>
      <li><strong>Variant:</strong> একই সাইটে নতুন পাসওয়ার্ড দরকার হলে, কেবল Variant 1 থেকে 2 করে দিন।</li>
    </ol>
    <h3>🛡️ মেন্টাল ট্যুইক (Mental Tweak)</h3>
    <p>পাসওয়ার্ড পেস্ট করার সময় শেষে সবসময় ৩-৫ টি অক্ষর (যেমন <code>@m12</code>) যোগ করে দিন। কেউ যদি আপনার তৈরি করা পাসওয়ার্ড দেখেও ফেলে তবুও সে আসল পাসওয়ার্ড জানতে পারবে না!</p>
    <h3>⚠️ করণীয় এবং বর্জনীয়</h3>
    <ul><li>ছোট পাসওয়ার্ড লাগলে Length স্লাইডার কমান।</li><li>কখনো আসল পাসওয়ার্ড লিখে রাখবেন না। শুধু রেসিপি লিখুন।</li></ul>`
  },
  pk: {
    btn: "استعمال کا طریقہ",
    html: `<div dir="rtl"><h2>FrankPass کیسے استعمال کریں</h2>
    <p><strong>فائدہ: صرف 1 یا 2 آسان باتیں یاد رکھیں اور زندگی بھر کے لیے ایسے پاس ورڈ بنائیں جو کبھی ہیک نہ ہوں!</strong></p>
    <p>یہ ٹول 100% ڈیٹرمنسٹک ہے۔ یہ آپ کا ڈیٹا کہیں بھی محفوظ نہیں کرتا۔ اگر آپ وہی معلومات دوبارہ درج کریں گے، تو آپ کو ہمیشہ بالکل وہی پاس ورڈ ملے گا۔</p>
    <h3>🔑 ان پٹس کو سمجھنا</h3>
    <ol>
      <li><strong>Platform (لازمی):</strong> جس سائٹ کا پاس ورڈ بنانا ہو، اس کے 1-2 حروف ٹائپ کریں اور فہرست سے منتخب کریں۔</li>
      <li><strong>Username (اختیاری):</strong> اگر آپ <code>raja@gmail.com</code> لکھتے ہیں تو سسٹم خود بخود <code>@gmail.com</code> ہٹا دے گا۔</li>
      <li><strong>Secret Personal Key (لازمی):</strong> یہ آپ کی ماسٹر چابی ہے! یاد رکھنے میں آسان چیز لکھیں۔
      <br><em>مثال:</em> <code>raja 1998</code>
      <br><em>نوٹ: سسٹم خود بخود وقفے ہٹا کر حروف چھوٹے کر دیتا ہے تاکہ ٹائپنگ میں غلطی نہ ہو۔</em></li>
      <li><strong>Variant:</strong> جب بھی نیا پاس ورڈ بنانا ہو تو اپنا سیکرٹ نہ بدلیں، بس Variant کو 1 سے 2 کر دیں۔</li>
    </ol>
    <h3>🛡️ ذہنی کی (Mental Tweak)</h3>
    <p>پاس ورڈ کو لاگ ان پیج پر کاپی کرتے وقت اس کے آخر میں 3 یا 5 حروف (جیسے <code>@m12</code>) ضرور شامل کریں۔ اس سے کوئی ہیکر بھی آپ کا اصلی پاس ورڈ نہیں جان پائے گا!</p>
    <h3>⚠️ کیا کریں اور کیا نہ کریں</h3>
    <ul><li>اگر چھوٹی پاس ورڈ درکار ہے تو لمبائی کم کریں۔</li><li>اپنا پاس ورڈ کبھی نہ لکھیں۔</li></ul></div>`
  },
  ae: {
    btn: "كيفية الاستخدام",
    html: `<div dir="rtl"><h2>كيف تستخدم FrankPass</h2>
    <p><strong>الميزة: تذكر معلومة أو اثنتين فقط، لتوليد كلمات مرور قوية لا يمكن اختراقها لمدى الحياة!</strong></p>
    <p>هذه الأداة لا تحفظ بياناتك. إذا أدخلت نفس البيانات، ستحصل دائمًا على نفس كلمة المرور.</p>
    <h3>🔑 فهم الإدخالات</h3>
    <ol>
      <li><strong>Platform (مطلوب):</strong> اكتب أول حرفين من اسم الموقع وسهّل على نفسك باختياره من القائمة.</li>
      <li><strong>Username (اختياري):</strong> إذا كتبت <code>raja@gmail.com</code>، سيزيل النظام <code>@gmail.com</code> تلقائياً.</li>
      <li><strong>Secret Personal Key (مطلوب):</strong> مفتاحك الرئيسي! استخدم شيئاً يسهل تذكره.
      <br><em>مثال:</em> <code>raja 1998</code></li>
      <li><strong>Variant:</strong> لإنشاء كلمة مرور جديدة لنفس الموقع، قم فقط بزيادة الرقم من 1 إلى 2.</li>
    </ol>
    <h3>🛡️ الخدعة الذهنية (Mental Tweak)</h3>
    <p>أضف دائمًا 3 أو 5 أحرف (مثل <code>@m12</code>) في نهاية كلمة المرور بشكل يدوي في صفحة تسجيل الدخول. بهذا حتى لو رآك أحدهم، لن يعرف كلمة المرور الحقيقية!</p>
    <h3>⚠️ افعل ولا تفعل</h3>
    <ul><li>إذا لزم الأمر ، قلل من مؤشر تغيير الطول.</li><li>لا تكتب كلمة المرور النهائية الخاصة بك في أي مكان.</li></ul></div>`
  },
  np: {
    btn: "कसरी प्रयोग गर्ने",
    html: `<h2>FrankPass कसरी प्रयोग गर्ने</h2>
    <p><strong>फाइदा: मात्र १ वा २ कुरा याद गरेर जीवनभर कहिल्यै ह्याक नहुने पासवर्ड बनाउनुहोस्!</strong></p>
    <p>यो उपकरणले तपाईको डाटा कतै सेभ गर्दैन। यदि तपाईँले ठ्याक्कै उही जानकारी फेरि हाल्नुभयो भने, तपाईँले सधैं समान पासवर्ड पाउनुहुनेछ।</p>
    <h3>🔑 इनपुटहरू बुझ्न</h3>
    <ol>
      <li><strong>Platform (अनिवार्य):</strong> तपाईँले जुनसुकै साइटको पासवर्ड बनाउन चाहनुहुन्छ, केवल त्यसको 1-2 अक्षर टाइप गर्नुहोस् र मेनुबाट छान्नुहोस्।</li>
      <li><strong>Username (ऐच्छिक):</strong> यदि तपाईँ <code>raja@gmail.com</code> लेख्नुहुन्छ भने, सिस्टमले <code>@gmail.com</code> हटाउनेछ।</li>
      <li><strong>Secret Personal Key (अनिवार्य):</strong> यो तपाईँको मुख्य चाबी हो! सजिलै सम्झिने कुरा प्रयोग गर्नुहोस्।
      <br><em>उदाहरण:</em> <code>raja 1998</code></li>
      <li><strong>Variant:</strong> एउटै साइटको लागि नयाँ पासवर्ड चाहियो भने, Variant लाई 1 बाट 2 बनाउनुहोस्।</li>
    </ol>
    <h3>🛡️ मानसिक छलकपट (Mental Tweak)</h3>
    <p>Generated पासवर्डलाई पेस्ट गरिसकेपछि अन्त्यमा सधैँ 3-5 अक्षर (जस्तै <code>@m12</code>) थप्ने गर्नुहोस्। यदि कसैले पासवर्ड हेर्यो भने पनि उसले असली पासवर्ड थाहा पाउँदैन!</p>
    <h3>⚠️ के गर्ने र के नगर्ने</h3>
    <ul><li>पासवर्ड छोटो बनाउन Length स्लाइडर प्रयोग गर्नुहोस्।</li><li>आफ्नो अन्तिम पासवर्ड कहिल्यै पनि नलेख्नुहोस्।</li></ul>`
  },
  ca: {
    btn: "Comment utiliser",
    html: `<h2>Comment utiliser FrankPass</h2>
    <p><strong>Avantage : En vous rappelant seulement 1 ou 2 choses simples, vous pouvez créer des mots de passe inviolables à vie!</strong></p>
    <p>Cet outil est déterministe. Il n'enregistre vos données nulle part. Si vous entrez les mêmes détails, vous obtiendrez le même mot de passe.</p>
    <h3>🔑 Comprendre les entrées</h3>
    <ol>
      <li><strong>Platform (Requis):</strong> Tapez 1 ou 2 lettres et choisissez le site dans la liste déroulante pour éviter les fautes de frappe.</li>
      <li><strong>Username (Optionnel):</strong> Le système ignore automatiquement le domaine comme <code>@gmail.com</code>.</li>
      <li><strong>Secret Personal Key (Requis):</strong> C'est votre phrase principale.
      <br><em>Exemple:</em> <code>raja 1998</code></li>
      <li><strong>Variant:</strong> Pour un nouveau mot de passe sur le même site, changez ce numéro (ex. de 1 à 2).</li>
    </ol>
    <h3>🛡️ L'ajustement mental (Mental Tweak)</h3>
    <p>Lorsque vous collez votre mot de passe, ajoutez toujours manuellement un mot fixe de 3 à 5 lettres (ex: <code>@m12</code>) à la fin. Ainsi, même si quelqu'un vous regarde, il ne connaîtra jamais le mot de passe final!</p>
    <h3>⚠️ À faire et à ne pas faire</h3>
    <ul><li>Réduisez le curseur si le site est strict sur la longueur.</li><li>N'écrivez jamais le mot de passe final.</li></ul>`
  },
  us: {
    btn: "Cómo utilizar",
    html: `<h2>Cómo utilizar FrankPass</h2>
    <p><strong>Beneficio: ¡Recordando solo 1 o 2 cosas, puedes crear contraseñas irrompibles para toda la vida!</strong></p>
    <p>Esta herramienta no guarda tus datos. Si introduces los mismos detalles, siempre obtendrás la misma contraseña.</p>
    <h3>🔑 Entradas</h3>
    <ol>
      <li><strong>Platform (Requerido):</strong> Escribe 1 o 2 letras y selecciona tu sitio de la lista.</li>
      <li><strong>Username (Opcional):</strong> El sistema ignora automáticamente cosas como <code>@gmail.com</code>.</li>
      <li><strong>Secret Personal Key (Requerido):</strong> Tu frase maestra secreta.
      <br><em>Ejemplo:</em> <code>raja 1998</code></li>
      <li><strong>Variant:</strong> Para crear una nueva contraseña en el mismo sitio, cambia este número de 1 a 2.</li>
    </ol>
    <h3>🛡️ El truco mental (Mental Tweak)</h3>
    <p>Al pegar la contraseña generada, añade siempre de 3 a 5 letras/números (ej. <code>@m12</code>) al final tú mismo. De este modo, aunque te miren, ¡nunca sabrán la contraseña final!</p>
    <h3>⚠️ Qué hacer y qué no hacer</h3>
    <ul><li>Utilice el control deslizante para acortar las contraseñas.</li><li>Nunca guarde su contraseña final.</li></ul>`
  },
  sg: {
    btn: "如何使用",
    html: `<h2>如何使用 FrankPass</h2>
    <p><strong>优势：只需记住一两项简单信息，即可终身生成无法破解的密码！</strong></p>
    <p>本工具是无数据库的（Stateless）。如果您输入完全相同的信息，生成的密码将始终一致。</p>
    <h3>🔑 了解输入项</h3>
    <ol>
      <li><strong>Platform (必填):</strong> 只需输入1-2个字母，从下拉选项中选择您的平台即可，避免拼写错误。</li>
      <li><strong>Username (选填):</strong> 如果您输入 <code>raja@gmail.com</code>，系统将自动忽略 <code>@gmail.com</code> 尾缀。</li>
      <li><strong>Secret Personal Key (必填):</strong> 您的主密码！请设置容易记住的内容。
      <br><em>示例:</em> <code>raja 1998</code></li>
      <li><strong>Variant:</strong> 如果您需要在同一个网站上更换新密码，请勿更改 Secret Key，只需修改此数字即可（如从1改为2）。</li>
    </ol>
    <h3>🛡️ “心理调整”（额外且强大的防护）</h3>
    <p>将生成的密码粘贴到任何登录页面后，请务必在末尾<b>手动增加 3 到 5 个字符</b>（例如 <code>@m12</code>）。如此一来，即使有人偷看系统显示的密码，他们也永远无法得知最终用于登录的真实密码！</p>
    <h3>⚠️ 注意事项</h3>
    <ul><li>如果网站限制长度，请调低滑块。</li><li>永远不要记录最终密码，只记录应用名称和Variant即可。</li></ul>`
  },
  ng: {
    btn: "How to Use",
    html: `<h2>How to Use FrankPass</h2>
    <p><strong>Benefit: Remember just 1 or 2 things and generate unbreakable passwords for life!</strong></p>
    <p>This tool saves nothing anywhere. Enter the same details again — get the exact same password every time.</p>
    <h3>🔑 What to Fill In</h3>
    <ol>
      <li><strong>Platform (Required):</strong> Type 1-2 letters and select your bank or app from the list. No spelling worries!</li>
      <li><strong>Username (Optional):</strong> If you type <code>john@gmail.com</code>, the tool keeps only <code>john</code>.</li>
      <li><strong>Secret Personal Key (Required):</strong> Your master phrase — anything you will never forget.<br><em>Examples:</em> <code>lagos 2005</code>, <code>my firstjob</code></li>
      <li><strong>Variant:</strong> Need a new password for the same site? Keep your key, just change Variant from 1 to 2.</li>
    </ol>
    <h3>🛡️ Mental Tweak (Extra Protection)</h3>
    <p>When pasting your password, always add 3–5 extra characters at the end (e.g. <code>@X9</code>). Even if someone sees your screen, they will not know your real password.</p>
    <h3>⚠️ Do's and Don'ts</h3>
    <ul><li>If a site needs fewer characters: lower the Length slider.</li><li>Never write down the final password — write the recipe: <em>"GTBank - Variant 2"</em>.</li></ul>`
  },
  ph: {
    btn: "Paano Gamitin",
    html: `<h2>Paano Gamitin ang FrankPass</h2>
    <p><strong>Benepisyo: Sa pag-alala ng 1 o 2 simpleng bagay, gumawa ng hindi ma-hack na mga password sa buong buhay!</strong></p>
    <p>Ang tool na ito ay hindi nag-iimbak ng iyong data. Ilagay ang parehong impormasyon, makakuha ng parehong password — lagi.</p>
    <h3>🔑 Mga Input</h3>
    <ol>
      <li><strong>Platform (Kinakailangan):</strong> Mag-type ng 1-2 titik at piliin ang iyong GCash, Maya, o bangko mula sa listahan.</li>
      <li><strong>Username (Opsyonal):</strong> Kung mag-type ka ng <code>juan@gmail.com</code>, awtomatikong aalisin ang <code>@gmail.com</code>.</li>
      <li><strong>Secret Personal Key (Kinakailangan):</strong> Ang iyong master na parirala.<br><em>Halimbawa:</em> <code>manila 2010</code>, <code>nanay ko</code></li>
      <li><strong>Variant:</strong> Kailangan ng bagong password sa parehong site? Palitan ang Variant mula 1 hanggang 2.</li>
    </ol>
    <h3>🛡️ Mental Tweak</h3>
    <p>Kapag nag-paste ng password, laging magdagdag ng 3–5 karakter sa dulo (hal. <code>@X9</code>). Hindi malalaman ng sinuman ang tunay mong password.</p>
    <h3>⚠️ Dapat at Hindi Dapat</h3>
    <ul><li>Kung limitado ang haba ng password: bawasan ang Length slider.</li><li>Huwag isulat ang final na password — isulat ang recipe: <em>"GCash - Variant 2"</em>.</li></ul>`
  },
  id: {
    btn: "Cara Menggunakan",
    html: `<h2>Cara Menggunakan FrankPass</h2>
    <p><strong>Manfaat: Cukup ingat 1–2 hal sederhana, buat password tak terbobol seumur hidup!</strong></p>
    <p>Alat ini tidak menyimpan data Anda. Masukkan informasi yang sama, dapatkan password yang sama — setiap saat.</p>
    <h3>🔑 Apa yang Diisi</h3>
    <ol>
      <li><strong>Platform (Wajib):</strong> Ketik 1-2 huruf dan pilih GoPay, OVO, BCA, atau aplikasi lainnya dari daftar.</li>
      <li><strong>Username (Opsional):</strong> Jika Anda mengetik <code>budi@gmail.com</code>, sistem otomatis menghapus <code>@gmail.com</code>.</li>
      <li><strong>Secret Personal Key (Wajib):</strong> Frasa utama Anda — sesuatu yang mudah Anda ingat.<br><em>Contoh:</em> <code>jakarta 2010</code>, <code>nama ibu</code></li>
      <li><strong>Variant:</strong> Perlu password baru untuk situs yang sama? Ubah Variant dari 1 ke 2.</li>
    </ol>
    <h3>🛡️ Mental Tweak</h3>
    <p>Saat menempelkan password, selalu tambahkan 3–5 karakter di akhir (mis. <code>@X9</code>). Bahkan jika seseorang melihat layar Anda, mereka tidak akan tahu password asli Anda.</p>
    <h3>⚠️ Yang Boleh dan Tidak Boleh</h3>
    <ul><li>Jika situs memerlukan karakter lebih sedikit: kurangi slider Length.</li><li>Jangan pernah catat password akhir — catat resepnya: <em>"GoPay - Variant 2"</em>.</li></ul>`
  },
  ke: {
    btn: "How to Use",
    html: `<h2>How to Use FrankPass</h2>
    <p><strong>Benefit: Remember just 1 or 2 things and generate unbreakable passwords — even for M-Pesa!</strong></p>
    <p>This tool saves nothing anywhere. Enter the same details again — get the exact same password every time.</p>
    <h3>🔑 What to Fill In</h3>
    <ol>
      <li><strong>Platform (Required):</strong> Type 1-2 letters and select your app — M-Pesa, KCB, Equity — from the list.</li>
      <li><strong>Username (Optional):</strong> If you type <code>john@gmail.com</code>, the tool keeps only <code>john</code>.</li>
      <li><strong>Secret Personal Key (Required):</strong> Your master phrase — anything you will never forget.<br><em>Examples:</em> <code>nairobi 2008</code>, <code>mama yangu</code></li>
      <li><strong>Variant:</strong> Need a new password for the same site? Keep your key, just change Variant from 1 to 2.</li>
    </ol>
    <h3>🛡️ Mental Tweak</h3>
    <p>When pasting your password, add 3–5 extra characters at the end (e.g. <code>@X9</code>). Even if someone sees your screen, they will not know your real password.</p>
    <h3>⚠️ Do's and Don'ts</h3>
    <ul><li>If a site needs fewer characters: lower the Length slider.</li><li>Never write down the final password — write the recipe: <em>"M-Pesa - Variant 2"</em>.</li></ul>`
  }
};

fs.writeFileSync(path.join(".", "translations.js"), "window.regionalTranslations = " + JSON.stringify(translations, null, 2) + ";");
console.log("SUCCESS");
