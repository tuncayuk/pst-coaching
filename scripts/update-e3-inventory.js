const fs = require('fs');
const inv = JSON.parse(fs.readFileSync('artifacts/ux/screen_inventory.json', 'utf8'));

const updates = {
  'subscription.fr_e3_01': {
    title: 'Plan secimi ve karsilastirma',
    route: '/profile/subscription/plan-comparison'
  },
  'subscription.fr_e3_02': {
    title: 'Satin alma ve aktivasyon',
    route: '/profile/subscription/checkout'
  },
  'subscription.fr_e3_03': { title: 'Add-on yonetimi', route: '/profile/subscription/addons' },
  'subscription.fr_e3_04': {
    title: 'Ogrenci indirimi',
    route: '/profile/subscription/student-discount'
  },
  'subscription.fr_e3_05': {
    title: 'Plan yonetimi (degistir/iptal)',
    route: '/profile/subscription/manage'
  },
  'subscription.fr_e3_06': { title: 'Kisi (seat) yonetimi', route: '/profile/subscription/seats' },
  'subscription.fr_e3_07': {
    title: 'Odeme gecmisi ve geri yukleme',
    route: '/profile/subscription/payments'
  }
};

inv.screens = inv.screens.map(s => {
  if (updates[s.id]) {
    return { ...s, title: updates[s.id].title, route: updates[s.id].route };
  }
  return s;
});

fs.writeFileSync('artifacts/ux/screen_inventory.json', JSON.stringify(inv, null, 2));
console.log('screen_inventory.json updated for EPIC-3');

const e3 = JSON.parse(fs.readFileSync('artifacts/ux/screen_inventory.json', 'utf8')).screens.filter(
  s => s.id && s.id.startsWith('subscription.fr_e3')
);
e3.forEach(s => console.log(s.id + ' | ' + s.title + ' | ' + s.route));
