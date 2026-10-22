# Web Store Prototype & GA4 Sandbox (`activezone.bg`)

This directory contains the interactive **`activezone.bg` Pure-Play D2C E-Commerce Storefront Prototype & Live GTM/GA4 `dataLayer` Event Sandbox**, aligned 100% with the 8-page strategic blueprint in [`ActiveZone_Full_Case_Study.md`](../ActiveZone_Full_Case_Study.md).

## Files in This Folder

| File | Description |
| :--- | :--- |
| [`index.html`](./index.html) | Interactive single-page storefront featuring the Bulgarian trust bar, 4 storefront departments, 1-click *"Старт Пакети"* (-10% beginner bundles), 10-sport + supplements catalog grid, native `<dialog>` modals (PDP, Cart/Checkout, Brevo Lead-Capture, Live Catalog Manager), and the GA4 `dataLayer` inspector. |
| [`styles.css`](./styles.css) | Official ActiveZone Brand Design System (`#0D3B66` Deep Navy, `#F95738` Vibrant Orange, `#2EC4B6` Aqua Cyan, `#F4F6F8` Soft Light Gray, `#1D1E2C` Dark Charcoal; `Montserrat Bold` headings + `Inter Regular` body text). |
| [`app.js`](./app.js) | Complete 40-SKU catalog across 10 sports + supplements, 4 starter bundles, interactive CM Foot Size Calculator (`+0.5 см спортен резерв`), €50 Free-Shipping progress bar + €12 supplement checkout cross-sell, live Catalog Editor (`localStorage`), and real-time `window.dataLayer` event engine. |

---

## Key Capabilities & Strategic Architecture

### 1. 4 Storefront Departments → 10 Sports + 11th Supplements Pillar (40 SKUs + 4 Bundles)
- **Department 1: Conditioning & Studio (Acquisition Spearhead — 11 SKUs):**
  1. *Бягане и маратон* (4 SKUs) · 2. *Фитнес, кросфит и домашни тренировки* (4 SKUs) · 3. *Йога, пилатес и мобилност* (3 SKUs)
- **Department 2: Outdoor & Endurance (10 SKUs):**
  4. *Планина, хайкинг и туризъм* (4 SKUs) · 5. *Колоездене* (3 SKUs) · 6. *Плуване и водни спортове* (3 SKUs)
- **Department 3: Team, Court & Combat (13 SKUs):**
  7. *Футбол* (4 SKUs) · 8. *Тенис и падел* (3 SKUs) · 9. *Баскетбол и волейбол* (3 SKUs) · 10. *Бойни спортове и бокс* (3 SKUs)
- **Department 4: Sports Nutrition & Recovery (LTV & 30-Day Repeat Engine — 6 SKUs):**
  11. *Хранителни добавки, протеини, витамини и минерали* (6 SKUs)
- **1-Click „Старт Пакети“ (-10% Beginner Starter Bundles):** 4 pre-matched gear + supplement bundles that automatically cross the **€50.00 (97.79 лв.)** free-delivery threshold.

### 2. Curated Hybrid D2C Model & Built-In "Sage (30%)" UX
- Every product is badged as either **`ActiveZone Signature Line`** or **`Vetted Partner Brand`**.
- **Instant Sage Badges** on every product card: `Ниво` (*За начинаещи / За напреднали*) + `Настилка / Предназначение`.
- **Interactive Product Detail Modal (PDP):**
  - 1-sentence **"Съвет от треньора"** box on every product.
  - **Footwear Risk Reversal:** Interactive **CM Foot Size Calculator (`+0.5 см спортен резерв`)** + **Безплатна замяна на размер (Free Size Exchange via Speedy/Econt)**.
  - **Supplement Trust:** **Clean Nutrition Seal** (*Чиста формула · Точен дневен прием*).
  - **Async Coach Advisory:** *"Попитай Треньора в IG DM / Viber"* interactive prompt.

### 3. Bulgarian Checkout & €50 (97.79 лв.) Free-Shipping AOV Progress Bar
- All primary prices are in **EUR (`€`)** with a header toggle for secondary BGN reference at the fixed rate (`1 EUR = 1.95583 BGN`).
- **Dynamic €50.00 Free-Shipping Progress Bar** inside the cart drawer with a 1-click **€12.00 Magnesium / Electrolyte cross-sell** prompt (+28% AOV lift).
- Supports promo codes **`WELCOME10`** (-10%), **`DAN15`** (-15%), and **`SYLVIA15`** (-15%), plus **Speedy / Econt** locker & office selection (*Преглед, Тест и Наложен платеж*).

### 4. Live GTM / GA4 `dataLayer` Inspector (`G-123456789A`)
Logs all 5 core funnel events in real time:
1. `view_item` (`item_name`, `item_category`, `price`, `currency: 'EUR'`)
2. `add_to_cart` (`item_id`, `item_name`, `item_category`, `quantity`, `value`)
3. `begin_checkout` (`coupon_code`, `value`, `items`, `free_shipping_unlocked`)
4. `purchase` (`transaction_id`, `value`, `tax`, `shipping`, `is_consumable`)
5. `generate_lead` (`form_id`, `preferred_sport`)
