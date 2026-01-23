const PII_KEY_PATTERN = /^(email|e-mail|phone|mobile|first_name|last_name|full_name|name|address|street|city|state|zip|postal|dob|birth|birthday|password|token|session|ssn|user_id|userid|user)$/i;

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_PATTERN = /\+?\d[\d\s().-]{6,}\d/;

const scrubValue = (value: unknown): unknown => {
  if (typeof value === "string") {
    if (EMAIL_PATTERN.test(value) || PHONE_PATTERN.test(value)) {
      return "[redacted]";
    }
  }

  return value;
};

const scrubRecord = (value: Record<string, unknown>): Record<string, unknown> => {
  return Object.entries(value).reduce<Record<string, unknown>>((acc, [key, entry]) => {
    if (PII_KEY_PATTERN.test(key)) {
      return acc;
    }

    if (Array.isArray(entry)) {
      acc[key] = entry.map((item) => {
        if (Array.isArray(item)) {
          return item.map((nested) => scrubValue(nested));
        }
        if (item && typeof item === "object") {
          return scrubRecord(item as Record<string, unknown>);
        }
        return scrubValue(item);
      });
      return acc;
    }

    if (entry && typeof entry === "object") {
      acc[key] = scrubRecord(entry as Record<string, unknown>);
      return acc;
    }

    acc[key] = scrubValue(entry);
    return acc;
  }, {});
};

export const scrubPayload = (payload: Record<string, unknown>) => scrubRecord(payload);
