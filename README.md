# Gülin Bozan 🍰

Samsun'da ev yapımı pasta ve unlu mamüller için modern, tek sayfalık
(one-page) tanıtım web sitesi. GitHub Pages ile **ücretsiz** yayınlanmak
üzere hazırlanmıştır.

## Site nelerden oluşuyor?

| Dosya | Açıklama |
| --- | --- |
| `index.html` | Sayfanın tüm içeriği |
| `styles.css` | Modern tasarım / stiller |
| `script.js` | Menü, galeri (lightbox), animasyonlar, WhatsApp linki |
| `images/` | Optimize edilmiş görseller (WebP + JPG) |
| `_source/` | Orijinal ekran görüntüleri (yayınlanmaz) |
| `optimize.js` | Görselleri yeniden optimize etmek için betik |

## ✏️ Yayınlamadan önce güncellenecek bilgiler

Aşağıdaki yer tutucu (placeholder) bilgileri teyzenizin **gerçek** bilgileriyle
değiştirin:

1. **Telefon / WhatsApp** → `index.html` içindeki "İLETİŞİM" bölümü
   (kod içinde `DÜZENLE` notu ile işaretli). Instagram (@gulinbozan), konum
   (Samsun) ve marka adı (Gülin Bozan) hazırdır.
2. **WhatsApp numarası** → `script.js` dosyasının başındaki `WHATSAPP` değişkeni
   (ülke koduyla, sadece rakam. Örn. Türkiye: `905551234567`).
3. İsterseniz metinleri kendi zevkinize göre düzenleyebilirsiniz.

## 🚀 GitHub Pages ile yayınlama (ozdemiremrah81 hesabı)

> Not: Şu an bilgisayarda GitHub CLI **farklı** bir hesapla (`emrah-ozdemir_deopca`)
> giriş yapmış durumda. Aşağıdaki ilk adım, kişisel hesabınıza geçmenizi sağlar.

### 1. Kişisel hesaba giriş yapın

```powershell
gh auth login --hostname github.com --web
# Açılan tarayıcıda ozdemiremrah81 hesabıyla giriş yapın ve kodu onaylayın.
gh auth switch --user ozdemiremrah81   # (birden fazla hesap varsa)
gh api user --jq .login                # "ozdemiremrah81" yazmalı
```

### 2. Repoyu oluşturun ve yükleyin

Kullanıcı ana sayfası olarak yayınlamak için repo adı **tam olarak**
`ozdemiremrah81.github.io` olmalıdır (adres en temiz hâlde olur):

```powershell
cd c:\repos3\gb
gh repo create ozdemiremrah81.github.io --public --source . --remote origin --push
```

### 3. GitHub Pages'i açın

`ozdemiremrah81.github.io` reposunda genellikle Pages otomatik açılır. Açık
değilse:

- GitHub → repo → **Settings → Pages**
- **Source**: `Deploy from a branch`
- **Branch**: `main` / `(root)` → Save

Birkaç dakika sonra site şu adreste yayında olur:

**https://ozdemiremrah81.github.io**

---

## 🔧 Görselleri yeniden optimize etmek (opsiyonel)

Yeni fotoğraf eklemek isterseniz, orijinalleri `_source/` klasörüne koyup:

```powershell
npm install
node optimize.js
```

Bu işlem `images/` klasörünü yeniden üretir (WebP + JPG, ~1080px, hafif boyut).

## 👀 Yerelde önizleme

```powershell
npx serve .
# veya herhangi bir statik sunucu; ardından tarayıcıda açın
```
