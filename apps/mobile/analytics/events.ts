const normalizeId = (value: string) => value.replace(/\./g, "_");

export const screenViewEventName = (screenId: string) => `${normalizeId(screenId)}_viewed`;

export const ctaTapEventName = (screenId: string, ctaId: string) =>
  `${normalizeId(screenId)}_${ctaId}_tapped`;
