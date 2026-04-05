# Design Rules (Material 3)

## Typography

- Use Material 3 type scale; Title Large for screen headers, Title Medium for section headers, Body Large for reading, Body Medium for list rows.
- Reading surfaces (content.reading, content.ebook_reader) use Body Large with increased line height and a max line length of ~70 characters.
- Avoid all-caps; use sentence case for labels and helper text.

## Spacing and layout

- Base spacing unit: 8dp; use 16dp horizontal padding for screens and 24dp between major sections.
- Lists: 8dp vertical spacing between items; 56dp min row height.
- Cards: 12dp internal padding; 8dp radius; 8dp spacing between cards.
- Primary CTA placement: one per screen, aligned to bottom or end of section.

## Accessibility (WCAG 2.1 AA)

- Text contrast at least 4.5:1; large text at least 3:1.
- Touch targets min 48dp with 8dp spacing.
- Screen reader: every actionable element has a label and hint; focus order follows visual order.
- Support dynamic text size and reduce motion settings; do not hide controls when font is large.
- Provide high contrast mode compatible with color-blind patterns.

## Error and empty states

- Error: concise message + reason + primary retry action; avoid technical errors.
- Empty: explain why empty, provide a next step (discover content, adjust filters, invite users).
- Offline: show cached content when available; surface sync status and disable write actions that require network.
- Time-bound rules: show countdown to 08:00 unlock; show 23:00 warning and 23:59 cutoff for submissions.

## Privacy and consent

- Export/share flows must include explicit consent with scope selection.
- Do not display or log sensitive personal data beyond what is required for the flow.
