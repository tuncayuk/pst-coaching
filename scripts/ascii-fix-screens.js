const fs = require('fs');

const files = [
  'apps/mobile/screens/profile/ProfileRestorePurchasesScreen.tsx',
  'apps/mobile/screens/profile/ProfileStudentDiscountScreen.tsx',
  'apps/mobile/screens/profile/ProfileCheckoutScreen.tsx',
  'apps/mobile/screens/profile/ProfileStudentDiscountScreen.tsx'
];

// Turkish special characters to replace with ASCII equivalents
const replacements = [
  [/\u0131/g, 'i'], // ı -> i (dotless i)
  [/\u0130/g, 'I'], // İ -> I (dotted I)
  [/\u015f/g, 's'], // ş -> s
  [/\u015e/g, 'S'], // Ş -> S
  [/\u00fc/g, 'u'], // ü -> u
  [/\u00dc/g, 'U'], // Ü -> U
  [/\u00f6/g, 'o'], // ö -> o
  [/\u00d6/g, 'O'], // Ö -> O
  [/\u00e7/g, 'c'], // ç -> c
  [/\u00c7/g, 'C'], // Ç -> C
  [/\u011f/g, 'g'], // ğ -> g
  [/\u011e/g, 'G'] // Ğ -> G
];

const targetFiles = [
  'apps/mobile/screens/profile/ProfileRestorePurchasesScreen.tsx',
  'apps/mobile/screens/profile/ProfileStudentDiscountScreen.tsx',
  'apps/mobile/screens/profile/ProfileCheckoutScreen.tsx',
  'apps/mobile/screens/profile/ProfileAddonsScreen.tsx',
  'apps/mobile/screens/profile/ProfileCheckoutScreen.tsx',
  'apps/mobile/screens/profile/ProfileSeatManagementScreen.tsx',
  'apps/mobile/screens/profile/ProfilePaymentHistoryScreen.tsx',
  'apps/mobile/screens/profile/ProfilePlanComparisonScreen.tsx',
  'apps/mobile/screens/profile/ProfilePlanManagementScreen.tsx',
  'apps/mobile/screens/profile/ProfileSubscriptionScreen.tsx'
];

// deduplicate
const unique = [...new Set(targetFiles)];

unique.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  replacements.forEach(([from, to]) => {
    const newContent = content.replace(from, to);
    // Check if actually changed
    if (newContent !== content) {
      changed = true;
      content = newContent;
    }
  });
  // Keep replacing until stable
  let prev;
  do {
    prev = content;
    replacements.forEach(([from, to]) => {
      content = content.replace(from, to);
    });
  } while (content !== prev);

  fs.writeFileSync(f, content);
  console.log((changed ? 'Fixed: ' : 'Clean: ') + f);
});
