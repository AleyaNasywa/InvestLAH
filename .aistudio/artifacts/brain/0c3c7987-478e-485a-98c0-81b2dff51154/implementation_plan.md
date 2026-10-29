# InvestLAH — Restore Original Gen-Z Neo-Brutalist Color Palette

This plan restores the original, vibrant **Gen-Z Soft-Pop Neo-Brutalist** color palette and rounded card geometry across the entire **InvestLAH** application while preserving all functional improvements (including the cleaned-up Detox Dividen subtab and Tab 9 Final Boss Quiz).

## User Review & Critical Decisions

> [!IMPORTANT]
> Summary of what this update restores and preserves:

- **Restore Original Color Palette & Rounded Geometry**: Revert from the harsh industrial gray/primary colors back to the original **Cream Fizz (`#F7F9F6`)** background, **Mint (`#C8F7E1` / `#D1FAE5`)**, **Sky Blue (`#BEE3FF` / `bg-blue-100`)**, **Lavender (`#DCCBFF` / `bg-purple-200`)**, **Butter Yellow (`#FEF08A` / `#FFF0A3`)**, **Soft Coral Pink (`#FFC9E0` / `#FFE4E6`)**, and vibrant **Matcha Green (`#10D989`)** & **Hot Coral (`#FF4766`)** accents with `rounded-2xl` / `rounded-3xl` cards.
- **Keep Functional Fixes**: Keep the duplicate platform cards removed from Tab 8 Subtab 2 (`Detox Dividen`) and keep **Tab 9 (`Final Boss Quiz`)**, restyled to match the original aesthetic.

---

## 1. Overview & Core Concept

- **What It Does**: Restores the lively, approachable Gen-Z Malaysian student aesthetic across all 9 modules of **InvestLAH**.
- **Target Audience / Persona**: Malaysian university students learning personal finance and investing through a colorful, friendly Neo-Brutalist interface.
- **Key Value**: Brings back the warm, cohesive pastel-pop + Matcha Neo-Brutalist palette that feels inviting and fun to use without harsh primary-color clashes.

---

## 2. User Experience & Visual Design

- **Restored Visual Identity & Color Tokens**:
  - **Dominant Canvas (`60%`)**: Warm Cream Fizz (`#F7F9F6`) with crisp white (`#FFFFFF`) elevated cards.
  - **Soft-Pop Surfaces (`30%`)**:
    - Mint (`#C8F7E1` / `#D1FAE5`)
    - Sky Blue (`#BEE3FF` / `#DBEAFE`)
    - Lavender (`#DCCBFF` / `#E9D5FF`)
    - Butter Yellow (`#FEF08A` / `#FFF0A3`)
    - Soft Blush (`#FFC9E0` / `#FFE4E6`)
    - Peach (`#FFD9B8`)
  - **Primary Action Accents (`10%`)**:
    - Electric Matcha (`#10D989`) for primary CTAs, progress bars, and positive states.
    - Hot Coral (`#FF4766`) for alerts, deficits, and delete confirmations.
    - Deep Ink (`#0F172A` / `#000000`) for `3px` borders and `5px` offset shadows.
- **Module-by-Module Color Restoration**:
  - **Global Header & Sidebar**: Cream Fizz (`#F7F9F6`) header and drawer, Butter Yellow (`#FEF08A`) `≡ Menu Tab` button, Matcha (`#10D989`) brand pill, and soft blush/yellow active states.
  - **Tab 1 (`Baru Nak Up`)**: Mint-to-blush pastel hero header (`from-[#D1FAE5] via-[#E0F2FE] to-[#FCE7F3]`), Lavender subtab pills (`#DCCBFF`), Cream Fizz boba cards, and soft Blue/Mint/Pink feature cards.
  - **Tab 2 (`Vibe Check Risiko`)**: Soft Mint/Yellow/Blush launch card, Sky Blue (`#BEE3FF`), Lavender (`#DCCBFF`), and Soft Pink (`#FFC9E0`) persona cards & Aura Meter arcs.
  - **Tab 3 (`Pokai Tapi Bajet`)**: Sky Blue (`bg-blue-100`) Needs card, Soft Pink (`bg-pink-100`) Wants card, Butter Yellow (`#FEF08A`) Bag summary card, and Mint (`#D1FAE5`) / Blush (`#FFE4E6`) Baki Bersih cards.
  - **Tab 4 (`Mission Get Rich`)**: Original video-matched colors (`#BEE3FF`, `#FFD9B8`, `#DCCBFF`, `#FFC9E0`, `#FFF0A3`, `#C8F7E1`) on the 3D flip goal tiles, Blueprint stat boxes, and Saved Goals cards.
  - **Tab 5 (`Simulator Arcade`)**: Mint (`#C8F7E1`), Sky Blue (`bg-blue-200`), and Soft Pink (`bg-pink-200`) slider cards, Butter-to-Mint hero result card, compact-height Race Bag bars with large RM font, and Lavender (`bg-purple-200`) Cost of Delay card.
  - **Tab 6 (`Port Duit Pergi`)**: Mint header box (`#C8F7E1`), soft Sky Blue (`bg-blue-100`) vs Soft Red (`bg-red-100`) comparison cards, and pastel-pop `Klik & Uji` asset classifier + Vibe Check quiz.
  - **Tab 7 (`Kamus Pelabur`)**: Soft mint-to-sky container (`from-[#ECFDF5] via-[#F0FDF4] to-[#E0F2FE]`), white 3D flip cards with soft Blue (`bg-blue-100`), Pink (`bg-pink-100`), Yellow (`#FEF08A`), and Mint (`#D1FAE5`) back faces.
  - **Tab 8 (`Halal Or Nah?`)**: Lavender, Sky Blue, and Butter Yellow 3D Red Flag cards; Mint (`#D1FAE5`) vs Soft Pink (`bg-pink-200`) Detox Dividen cards + 3 Charity Cards (**with the duplicate bottom platform cards kept removed**); and soft Blue/Pink/Mint category headers in Port Gempak.
  - **Tab 9 (`Final Boss Quiz`)**: Restyled with the soft-pop Cream Fizz, Mint, Lavender, Sky Blue, and Butter Yellow palette so it blends seamlessly with Tabs 1–8.

---

## 3. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────────┐
│             Restored Soft-Pop Gen-Z Neo-Brutalist Theme              │
│  Canvas: #F7F9F6 (Cream Fizz) · Borders & Shadows: #0F172A / #000    │
│  Surfaces: #C8F7E1 · #BEE3FF · #DCCBFF · #FEF08A · #FFC9E0 · #FFD9B8 │
│  Accents:  #10D989 (Matcha CTA) · #FF4766 (Coral Alert)              │
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
     ┌───────────────────┬─────────┴─────────┬───────────────────┐
     ▼                   ▼                   ▼                   ▼
┌──────────┐       ┌──────────┐        ┌──────────┐        ┌──────────┐
│ Tabs 1–4 │       │ Tabs 5–6 │        │ Tabs 7–8 │        │  Tab 9   │
│ Restored │       │ Restored │        │ Restored │        │ Restyled │
│ Soft-Pop │       │ Soft-Pop │        │ (Cleaned │        │ to Match │
│ Palette  │       │ Palette  │        │  Sub 2)  │        │ Tabs 1–8 │
└──────────┘       └──────────┘        └──────────┘        └──────────┘
```
