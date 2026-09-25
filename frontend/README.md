# Destek Sigorta - Frontend

React-based user interface for Destek Sigorta's Supplementary Health Insurance online sales flow. Users can fill in their information, choose an insurance package, complete payment, and get their policy created end-to-end through this single-page application (SPA).

## Tech Stack

- React + Vite
- React Router (page navigation)
- Context API (shared state across pages — selected package, customer info, etc.)
- CSS (no UI library used)

## Setup & Running

```bash
npm install
npm run dev
```

Runs by default on `http://localhost:5173`. The backend must also be running separately (see the backend folder).

## Folder Structure

- `src/pages` — one component per screen (HomePage, GenelBilgiler / Personal Info, Teklif / Offer, Ozet / Summary, SağlıkBeyanı / Health Declaration, OdemePage / Payment)
- `src/components` — reusable pieces shared across pages (Header, SiteHeader)
- `src/context` — Context setup that carries policy/customer data between pages
- `src/api` — all backend requests centralized in a single file
- `src/mock` — static data with no backend equivalent (affiliated institutions list, treatment detail tables, etc.)
- `src/assets` — images used across the project

## User Flow

From the home page, the user reaches the actual insurance flow through the "Hemen Online Teklif Al" (Get an Online Offer Now) button:

1. **Genel Bilgiler (Personal Info)** — personal information form, followed by a mock OTP verification
2. **Teklif (Offer)** — network selection (Turkuaz / Turuncu / Kırmızı) and package selection, prices fetched live from the backend
3. **Özet (Summary)** — overview of the selected package, consent checkboxes
4. **Sağlık Beyanı (Health Declaration)** — confirming this step creates the actual policy record in the backend
5. **Ödeme (Payment)** — card details form; a successful payment shows the result screen

## Notes

- The affiliated institutions list, treatment detail tables, and installment rates are filled with static data since the backend has no equivalent for them.
- OTP verification isn't connected to a real SMS service; the app generates a 6-digit code internally and displays it to the user.