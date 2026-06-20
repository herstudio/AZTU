# AZTU AI Yazı Köməkçisi — Vercel-ə yükləmə təlimatı

## Fayl strukturu
```
aztu-ai/
├── index.html          ← saytın özü (frontend)
├── api/
│   └── chat.js         ← gizli backend (API açarını qoruyur)
├── package.json
└── README.md
```

## Addım-addım: Vercel-ə yükləmə

### 1. API açarını al
1. https://console.anthropic.com adresinə get, hesab yarat
2. Sol menyudan "API Keys" → "Create Key"
3. "Billing" bölməsində balans əlavə et (kredit kartı ilə)
4. Yaranan açarı (sk-ant-... ilə başlayır) köçür, heç yerdə paylaşma

### 2. Layihəni GitHub-a yüklə
1. https://github.com — hesab yarat (yoxdursa)
2. Yeni repo yarat (məsələn: `aztu-ai-yazi-komekcisi`)
3. Bu qovluqdaki bütün faylları (`index.html`, `api/chat.js`, `package.json`) repo-ya yüklə
   - Ya GitHub saytında "Add file → Upload files" düyməsi ilə
   - Ya da git ilə: 
     ```
     git init
     git add .
     git commit -m "ilk versiya"
     git remote add origin <repo-linkin>
     git push -u origin main
     ```

### 3. Vercel-ə qoş
1. https://vercel.com adresinə get, GitHub hesabınla daxil ol
2. "Add New Project" → GitHub repo-nu seç (`aztu-ai-yazi-komekcisi`)
3. "Deploy" düyməsinə bas — Vercel avtomatik tanıyacaq (heç bir əlavə konfiqurasiya lazım deyil)

### 4. API açarını Vercel-ə əlavə et (ƏN VACİB ADDIM)
1. Layihə yarandıqdan sonra → "Settings" → "Environment Variables"
2. Yeni dəyişən əlavə et:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** sk-ant-... (öz açarın)
3. "Save" et
4. "Deployments" bölməsinə qayıt → son deploy-un yanındaki "..." menyusundan **"Redeploy"** seç (dəyişəni aktivləşdirmək üçün)

### 5. Hazırdır!
Vercel sənə bir link verəcək (məsələn `aztu-ai-yazi-komekcisi.vercel.app`). Bu linki paylaşa, ya da öz domeninə bağlaya bilərsən (Settings → Domains).

## Qeydlər
- API açarı **heç vaxt** `index.html` faylında deyil — yalnız Vercel-in server tərəfində (`api/chat.js` vasitəsilə) işlədilir, ona görə təhlükəsizdir.
- Hər sorğu üçün Anthropic-dən kiçik məbləğdə ödəniş çıxır (model: Claude Sonnet). Çox tələbə eyni anda istifadə edərsə, balansı izləməyi unutma.
- İstəsən sonradan istifadə limiti (məs. gündə neçə sorğu) əlavə edə bilərik ki, açarın həddindən artıq xərclənməsin.
