## 2026-03-15 — Form Accessibility & Autofill Support
**Learning:** The contact form and newsletter subscription form were missing explicit label-input associations and `name` attributes.
**Action:** Always verify that interactive forms have `id` attributes linked to `htmlFor` labels and `name` attributes for browser autofill. Use `sr-only` for visually hidden labels in minimalist designs like newsletters.
