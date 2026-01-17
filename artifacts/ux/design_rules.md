# Design Rules (Material 3)

## Typography and spacing
- Use Material 3 type scale: display/heading for screen titles, title/label for card headers, body for content.
- Base spacing unit: 8dp; use 8/16/24/32 increments for layout and section gaps.
- Limit line length to 60-75 characters for long-form reading screens.
- Use consistent padding: 16dp horizontal for phone, 24dp for tablet.

## Accessibility
- Conform to WCAG 2.1 AA contrast ratios for text and UI controls.
- Ensure all interactive elements have 48dp minimum touch targets.
- Provide accessible labels for icons, media controls, and highlights.
- Support dynamic text size and high-contrast mode across all screens.
- Respect reduce-motion setting; avoid essential motion-only cues.

## Error state guidelines
- Use clear, user-focused messaging with a single primary recovery action.
- Provide per-card retry where possible on the home dashboard.
- Preserve any entered text when an error occurs (especially reflections).
- Show entitlement or paywall reasons when access is blocked.

## Empty state guidelines
- Explain why the list is empty and offer one primary CTA.
- For favorites/collections, suggest saving content or creating a collection.
- For downloads, explain offline behavior and how to download items.
- For progress, show a starter CTA to begin content.
