const fs = require('fs');

const contracts = {
  'subscription.fr_e3_01': {
    id: 'subscription.fr_e3_01',
    title: 'Plan secimi ve karsilastirma',
    route: '/profile/subscription/plan-comparison',
    purpose:
      'FR-E3-01: Lists Bireysel (1), Aile (5), Grup (10) plans with seat limits and feature comparison. Selected plan highlighted visually with checkmark. Devam Et CTA activates when a plan is chosen (AC-FR-E3-01-01/02/03). Offline: cached plan list, buy disabled.',
    entryPoints: ['subscription.overview', 'profile.overview'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      {
        name: 'subscriptionStatus',
        type: 'SubscriptionStatus',
        required: true,
        source: 'entitlement_cache'
      },
      { name: 'currentPlanId', type: 'uuid', required: false, source: 'subscription_entity' }
    ],
    dataDependencies: ['SubscriptionPlan'],
    uiStates: {
      loading: { description: '3 skeleton plan cards' },
      ready: {
        description:
          'Plan cards with name, seat limit, price, feature list; selected plan has colored border and checkmark badge'
      },
      empty: { description: 'StateMessage: no plans available, Tekrar Dene CTA' },
      error: { description: 'StateMessage: plans could not be loaded, Tekrar Dene CTA' },
      offline: { description: 'OfflineNotice banner + cached plan cards with purchase disabled' }
    },
    analytics: {
      screenView: 'plan_comparison_viewed',
      events: [
        'plan_comparison_viewed',
        'plan_card_selected',
        'plan_comparison_continue_tapped',
        'plan_comparison_retry_tapped'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E3-01-01', 'AC-FR-E3-01-02', 'AC-FR-E3-01-03'],
    gates: ['auth', 'subscription']
  },
  'subscription.fr_e3_02': {
    id: 'subscription.fr_e3_02',
    title: 'Satin alma ve aktivasyon',
    route: '/profile/subscription/checkout',
    purpose:
      'FR-E3-02: Opens platform (Apple/Google) IAP sheet. Server-side validation grants entitlement immediately (BR-08). Shows order summary with plan, price, coupon field. Handles purchase error with clear user message (AC-FR-E3-02-01/02/03/04). Offline: purchase disabled, show offline notice.',
    entryPoints: ['subscription.fr_e3_01'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'selectedPlanId', type: 'uuid', required: true, source: 'navigation_params' },
      { name: 'platform', type: 'string', required: true, source: 'device_info' }
    ],
    dataDependencies: ['SubscriptionPlan', 'Subscription'],
    uiStates: {
      loading: { description: 'Skeleton order summary and payment method rows' },
      ready: {
        description: 'Order summary card (plan name, price, coupon field), platform IAP button, payment method section'
      },
      empty: { description: 'StateMessage: cart empty, Planlari Gor CTA' },
      error: { description: 'StateMessage + inline toast for purchase failure (AC-FR-E3-02-04)' },
      offline: { description: 'OfflineNotice + disabled purchase button with explanation' }
    },
    analytics: {
      screenView: 'checkout_viewed',
      events: [
        'checkout_viewed',
        'checkout_coupon_applied',
        'checkout_purchase_tapped',
        'checkout_purchase_success',
        'checkout_purchase_error'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E3-02-01', 'AC-FR-E3-02-02', 'AC-FR-E3-02-03', 'AC-FR-E3-02-04'],
    gates: ['auth', 'subscription']
  },
  'subscription.fr_e3_03': {
    id: 'subscription.fr_e3_03',
    title: 'Add-on yonetimi',
    route: '/profile/subscription/addons',
    purpose:
      'FR-E3-03: Lists add-ons with price, active/passive status and toggle. Ek Kisi add-on shown only for Aile/Grup plans (AC-FR-E3-03-03). Plan Uyesi cannot purchase; only Plan Sahibi can act (AC-FR-E3-03-04). Offline: list visible, actions disabled.',
    entryPoints: ['subscription.overview'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'subscriptionId', type: 'uuid', required: true, source: 'subscription_entity' },
      { name: 'userRole', type: 'string', required: true, source: 'subscription_entity' }
    ],
    dataDependencies: ['AddOn', 'SubscriptionAddOn', 'SubscriptionPlan'],
    uiStates: {
      loading: { description: '2 skeleton add-on cards' },
      ready: {
        description:
          'Add-on cards with name, description, price badge, Aktif/Pasif chip, toggle button. Owner sees full actions; member sees read-only.'
      },
      empty: { description: 'StateMessage: no add-ons available, Planlari Incele CTA' },
      error: { description: 'StateMessage: add-ons could not be loaded, Tekrar Dene CTA' },
      offline: { description: 'OfflineNotice + cached add-on list with actions disabled' }
    },
    analytics: {
      screenView: 'addons_viewed',
      events: ['addons_viewed', 'addon_activated', 'addon_deactivated', 'addon_buy_tapped', 'addon_owner_gate_blocked']
    },
    acceptanceCriteriaRefs: ['AC-FR-E3-03-01', 'AC-FR-E3-03-02', 'AC-FR-E3-03-03', 'AC-FR-E3-03-04'],
    gates: ['add_on', 'auth', 'owner_role', 'subscription']
  },
  'subscription.fr_e3_04': {
    id: 'subscription.fr_e3_04',
    title: 'Ogrenci indirimi',
    route: '/profile/subscription/student-discount',
    purpose:
      'FR-E3-04: Student discount verification flow. Privacy notice shown first (AC-FR-E3-04-03). Two methods: school email or document upload (AC-FR-E3-04-01). Success applies 50% discount (AC-FR-E3-04-02). Annual re-verification required; expiry warning shown (AC-FR-E3-04-04). Offline: status visible, actions disabled.',
    entryPoints: ['subscription.overview'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      {
        name: 'verificationStatus',
        type: 'string',
        required: false,
        source: 'student_discount_entity'
      }
    ],
    dataDependencies: ['Subscription'],
    uiStates: {
      loading: { description: 'Skeleton verification status card and step list' },
      ready: {
        description:
          'Privacy notice card, verification status badge, method selection (email/document), step list with numbered items, expiry warning if within 30 days of annual renewal'
      },
      empty: { description: 'StateMessage: no verification started, Dogrulamayi Baslat CTA' },
      error: { description: 'StateMessage: verification status unavailable, Tekrar Dene CTA' },
      offline: { description: 'OfflineNotice + cached status with start disabled' }
    },
    analytics: {
      screenView: 'student_discount_viewed',
      events: [
        'student_discount_viewed',
        'student_discount_method_selected',
        'student_discount_started',
        'student_discount_status_checked',
        'student_expiry_warning_shown'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E3-04-01', 'AC-FR-E3-04-02', 'AC-FR-E3-04-03', 'AC-FR-E3-04-04'],
    gates: ['auth', 'subscription']
  },
  'subscription.fr_e3_05': {
    id: 'subscription.fr_e3_05',
    title: 'Plan yonetimi (degistir/iptal)',
    route: '/profile/subscription/manage',
    purpose:
      'FR-E3-05: Shows current plan, renewal date, seat usage. Plan downgrade warns if seat count exceeds new limit (AC-FR-E3-05-02). Cancellation lists all effects clearly (AC-FR-E3-05-03). Access continues until period end after cancel (AC-FR-E3-05-04). Redirects to platform cancel flow (AC-FR-E3-05-05). Only Plan Sahibi can act.',
    entryPoints: ['subscription.overview'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'subscriptionId', type: 'uuid', required: true, source: 'subscription_entity' }
    ],
    dataDependencies: ['Subscription', 'SubscriptionPlan', 'Seat'],
    uiStates: {
      loading: { description: 'Skeleton plan summary card and action buttons' },
      ready: {
        description:
          'Plan summary (name, renewal date, seat gauge), change plan CTA, cancellation effects list, cancel CTA routing to platform'
      },
      empty: { description: 'StateMessage: no active subscription found' },
      error: { description: 'StateMessage: plan details unavailable, Tekrar Dene CTA' },
      offline: { description: 'OfflineNotice + cached plan details, actions disabled' }
    },
    analytics: {
      screenView: 'plan_management_viewed',
      events: [
        'plan_management_viewed',
        'plan_change_tapped',
        'plan_cancel_tapped',
        'plan_cancel_confirmed',
        'plan_cancel_platform_redirect'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E3-05-01', 'AC-FR-E3-05-02', 'AC-FR-E3-05-03', 'AC-FR-E3-05-04', 'AC-FR-E3-05-05'],
    gates: ['auth', 'owner_role', 'subscription']
  },
  'subscription.fr_e3_06': {
    id: 'subscription.fr_e3_06',
    title: 'Kisi (seat) yonetimi',
    route: '/profile/subscription/seats',
    purpose:
      'FR-E3-06: Shows seat occupancy gauge (X/Y dolu). Invite by email/phone, remove member actions. If limit reached, Ek Kisi add-on upsell shown (AC-FR-E3-06-03). Member role sees only own row (AC-FR-E3-06-04). Owner sees all seats with remove/invite controls.',
    entryPoints: ['subscription.overview'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'subscriptionId', type: 'uuid', required: true, source: 'subscription_entity' },
      { name: 'userRole', type: 'string', required: true, source: 'subscription_entity' }
    ],
    dataDependencies: ['Seat', 'Invitation', 'Subscription', 'SubscriptionPlan'],
    uiStates: {
      loading: { description: 'Skeleton seat rows and occupancy gauge' },
      ready: {
        description:
          'Seat gauge bar (X/Y), seat list with user name/role/status, invite button (owner only), remove button per active member, Ek Kisi upsell card if full'
      },
      empty: { description: 'StateMessage: no seats found, Davet Gonder CTA' },
      error: { description: 'StateMessage: seat data unavailable, Tekrar Dene CTA' },
      offline: { description: 'OfflineNotice + cached seat list with actions disabled' }
    },
    analytics: {
      screenView: 'seat_management_viewed',
      events: [
        'seat_management_viewed',
        'seat_invite_tapped',
        'seat_member_removed',
        'seat_limit_reached_upsell_shown',
        'seat_addon_upsell_tapped'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E3-06-01', 'AC-FR-E3-06-02', 'AC-FR-E3-06-03', 'AC-FR-E3-06-04'],
    gates: ['auth', 'owner_role', 'subscription']
  },
  'subscription.fr_e3_07': {
    id: 'subscription.fr_e3_07',
    title: 'Odeme gecmisi ve geri yukleme',
    route: '/profile/subscription/payments',
    purpose:
      'FR-E3-07: Shows payment transactions with date, amount, currency, status. Receipt detail viewable per transaction (AC-FR-E3-07-03). Restore Purchases triggers platform IAP restore (AC-FR-E3-07-02). Offline: cached transaction list, restore disabled.',
    entryPoints: ['subscription.overview'],
    inputs: [
      { name: 'userId', type: 'uuid', required: true, source: 'session' },
      { name: 'subscriptionId', type: 'uuid', required: true, source: 'subscription_entity' }
    ],
    dataDependencies: ['PaymentTransaction', 'Subscription'],
    uiStates: {
      loading: { description: 'Skeleton transaction rows' },
      ready: {
        description:
          'Grouped payment list (date, amount, currency, status chip), Makbuz button per row, Restore Purchases section, billing info update link'
      },
      empty: { description: 'StateMessage: no payment history, Planlari Gor CTA' },
      error: { description: 'StateMessage: payments unavailable, Tekrar Dene CTA' },
      offline: { description: 'OfflineNotice + cached transaction list with restore disabled' }
    },
    analytics: {
      screenView: 'payment_history_viewed',
      events: [
        'payment_history_viewed',
        'payment_receipt_viewed',
        'restore_purchases_tapped',
        'restore_purchases_success',
        'restore_purchases_error'
      ]
    },
    acceptanceCriteriaRefs: ['AC-FR-E3-07-01', 'AC-FR-E3-07-02', 'AC-FR-E3-07-03'],
    gates: ['auth', 'subscription']
  }
};

Object.entries(contracts).forEach(([key, val]) => {
  fs.writeFileSync('artifacts/ux/screen_contracts/' + key + '.json', JSON.stringify(val, null, 2));
  console.log('Written: ' + key + '.json');
});
console.log('Done.');
