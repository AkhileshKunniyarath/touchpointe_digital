# Conversion & Lead Generation Overhaul Plan

This plan addresses the comprehensive marketing and conversion audit you provided. We will implement the changes progressively, focusing on the high-impact "Day 1 to 3" priorities to turn the site from an informational brochure into a lead generation machine.

## User Review Required
> [!IMPORTANT]
> **Information Needed Before Proceeding:**
> 1. **WhatsApp Number**: For the sticky WhatsApp button and automation links.
> 2. **Calendly Link**: For the "Book Free Consultation" call-to-actions.
> 3. **Tracking IDs**: Do you have a Meta Pixel ID or Google Tag Manager ID ready? (We currently have GA4 natively supported via `NEXT_PUBLIC_GA_ID`).
> 4. **CRM Integration**: The form will initially send emails (standard setup). Do you have webhook URLs or API keys for Zoho/HubSpot that we should hook into for the new lead capture?

## Proposed Changes

### 1. Homepage Positioning & Hero CTAs (Day 1)
#### [MODIFY] `app/(website)/page.tsx`
* **Copy Updates**: Update the default `defaultCopy` to align with the new sharp positioning: "We help local businesses increase revenue using AI-driven systems" (or similar based on your exact preference).
* **Primary CTAs**: Change the hero button to "Book Free Consultation" linked to your Calendly. Add a secondary "Get Growth Plan" button. 
* **Fix `<img>` Warning**: Convert the native `<img>` tag in the recent projects section to Next.js `<Image>` component for Core Web Vitals optimization.

---

### 2. Lead Capture & Sticky Conversions (Day 1)
#### [NEW] `components/site/whatsapp-button.tsx`
* Create a floating, fixed-position WhatsApp click button in the bottom corner.
#### [NEW] `components/site/lead-capture-modal.tsx`
* Build a popup or inline lead magnet form ("Free Website Audit") requiring Name + Phone + Email.
#### [MODIFY] `app/layout.tsx`
* Inject the WhatsApp button and Modal provider globally so they persist across all pages.

---

### 3. Analytics & Tracking Foundation (Day 1)
#### [MODIFY] `app/layout.tsx`
* Expand the existing `GoogleAnalytics` component into a broader `<TrackingScripts>` component. 
* Inject standard Meta Pixel tracking script and Google Tag Manager (GTM) script. 

---

### 4. SEO Enhancements & Pricing 
#### [MODIFY] `lib/site.ts`
* Update the base metadata `keywords` array to include localized and niche terms: "AI marketing agency Kerala", "Website development Thrissur", "Automation services India".
* Refine the `siteConfig.description` to heavily push the new value proposition.
#### [MODIFY] `components/site/service-picker.tsx`
* Add "Starting from ₹X" pricing badges to the service selections to eliminate pricing friction and generate qualified leads.

## Open Questions

> [!WARNING]  
> Before we start on Day 1 priorities, please confirm:
> - Will you be providing the WhatsApp number and Calendly link now, or should I use placeholders that you will fill in later?
> - For the CRM, should I build a standard API endpoint that posts to a Zapier webhook/Hubspot form so you can route it easily?

## Verification Plan

### Automated Tests
- Run `npm run build` to verify the `<Image>` tag optimizations resolve the Next.js build warnings.
- Use `npm run lint` to assure no regressions.

### Manual Verification
- Deploy to a preview URL or test locally.
- Verify the tracking scripts fire in the browser network tab.
- Click the WhatsApp and Calendly buttons to ensure proper routing.
