const fs = require('fs');
const path = require('path');

const screensDir = '/Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile/screens/profile';

const files = [
  { file: 'ProfileAddonsScreen.tsx', marker: 'const ProfileAddonsContent' },
  { file: 'ProfileCheckoutScreen.tsx', marker: 'const ProfileCheckoutContent' },
  { file: 'ProfilePlanComparisonScreen.tsx', marker: 'const ProfilePlanComparisonContent' },
  { file: 'ProfilePaymentHistoryScreen.tsx', marker: 'const ProfilePaymentHistoryContent' },
  { file: 'ProfileRestorePurchasesScreen.tsx', marker: 'const ProfileRestorePurchasesContent' },
  { file: 'ProfileSeatManagementScreen.tsx', marker: 'const ProfileSeatManagementContent' },
  { file: 'ProfileStudentDiscountScreen.tsx', marker: 'const ProfileStudentDiscountContent' },
];

files.forEach(({ file, marker }) => {
  const fullPath = path.join(screensDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  
  // Find first and second occurrence of the marker
  const occurrences = [];
  lines.forEach((line, idx) => {
    if (line.startsWith(marker)) {
      occurrences.push(idx + 1); // 1-based
    }
  });
  
  console.log(file + ': marker "' + marker + '" found at lines: ' + occurrences.join(', '));
  
  if (occurrences.length >= 2) {
    // Truncate at the second occurrence (keep everything before line occurrences[1]-1)
    const truncateLine = occurrences[1] - 1; // 0-based index of the blank line before second marker
    // Find the last non-blank/non-comment line before the second marker
    let cutAt = truncateLine;
    // Walk backwards to skip blank lines before the duplicate
    while (cutAt > 0 && lines[cutAt - 1].trim() === '') {
      cutAt--;
    }
    const newContent = lines.slice(0, cutAt).join('\n') + '\n';
    fs.writeFileSync(fullPath, newContent);
    console.log('  -> Truncated at line ' + cutAt + ' (removed ' + (lines.length - cutAt) + ' lines)');
  } else {
    console.log('  -> No duplicate found, skipping');
  }
});
