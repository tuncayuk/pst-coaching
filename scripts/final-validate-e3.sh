#!/bin/zsh
set -e
echo "=== TypeScript ==="
cd /Users/tuncayyildirtan/CharityWorkspaces/pst-coaching/apps/mobile
npx tsc --noEmit 2>&1 && echo "TSC: 0 errors" || echo "TSC: ERRORS FOUND"

echo ""
echo "=== ASCII check (TSX files) ==="
cd /Users/tuncayyildirtan/CharityWorkspaces/pst-coaching
LC_ALL=C grep -rn '[^[:print:][:space:]]' \
  apps/mobile/screens/profile/ProfileSubscriptionScreen.tsx \
  apps/mobile/screens/profile/ProfilePlanComparisonScreen.tsx \
  apps/mobile/screens/profile/ProfileCheckoutScreen.tsx \
  apps/mobile/screens/profile/ProfileAddonsScreen.tsx \
  apps/mobile/screens/profile/ProfileSeatManagementScreen.tsx \
  apps/mobile/screens/profile/ProfileStudentDiscountScreen.tsx \
  apps/mobile/screens/profile/ProfilePaymentHistoryScreen.tsx \
  apps/mobile/screens/profile/ProfileRestorePurchasesScreen.tsx \
  apps/mobile/screens/profile/ProfilePlanManagementScreen.tsx \
  apps/mobile/navigation/ProfileStack.tsx 2>&1 || echo "ASCII check: CLEAN"

echo ""
echo "=== ASCII check (contracts) ==="
LC_ALL=C grep -rn '[^[:print:][:space:]]' \
  artifacts/ux/screen_contracts/subscription.fr_e3_01.json \
  artifacts/ux/screen_contracts/subscription.fr_e3_02.json \
  artifacts/ux/screen_contracts/subscription.fr_e3_03.json \
  artifacts/ux/screen_contracts/subscription.fr_e3_04.json \
  artifacts/ux/screen_contracts/subscription.fr_e3_05.json \
  artifacts/ux/screen_contracts/subscription.fr_e3_06.json \
  artifacts/ux/screen_contracts/subscription.fr_e3_07.json \
  2>&1 || echo "ASCII check contracts: CLEAN"
