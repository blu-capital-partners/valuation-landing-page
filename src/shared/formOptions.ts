// Shared between the form UI and server-side validation so both accept the same values.

export const INDUSTRIES = [
  'Agriculture & food',
  'Automotive & transport',
  'Construction & building materials',
  'Consumer goods & retail',
  'Energy & utilities',
  'Financial services',
  'Healthcare & pharma',
  'Hospitality & leisure',
  'IT & software',
  'Logistics & distribution',
  'Manufacturing & industrial',
  'Media & telecom',
  'Professional services',
  'Real estate',
  'Other',
] as const

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ro', label: 'Română' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
] as const

// Wording required by the briefing, section 0.5.
export const QUOTE_CONSENT_TEXT =
  'I consent to the processing of my personal data for the purpose of receiving a valuation quotation.'

export const WHITEPAPER_CONSENT_TEXT =
  'I consent to the processing of my personal data for the purpose of receiving the valuation white paper.'
