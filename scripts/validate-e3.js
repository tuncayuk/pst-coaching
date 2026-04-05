const fs = require('fs');

console.log('=== JSON check ===');
const contractFiles = fs.readdirSync('artifacts/ux/screen_contracts').filter(f => f.startsWith('subscription.'));
contractFiles.forEach(f => {
  try {
    JSON.parse(fs.readFileSync('artifacts/ux/screen_contracts/' + f, 'utf8'));
    console.log('OK: ' + f);
  } catch (e) {
    console.log('FAIL: ' + f + ' - ' + e.message);
  }
});

console.log('\n=== FR/AC parity ===');
let total = 0;
contractFiles.forEach(f => {
  const c = JSON.parse(fs.readFileSync('artifacts/ux/screen_contracts/' + f, 'utf8'));
  const acs = c.acceptanceCriteriaRefs || [];
  console.log(f.replace('.json', '') + ': ' + acs.length + ' ACs');
  total += acs.length;
});
console.log('Total ACs: ' + total);

console.log('\n=== Route/Title parity ===');
const inv = JSON.parse(fs.readFileSync('artifacts/ux/screen_inventory.json', 'utf8'));
const e3inv = inv.screens.filter(s => s.id && s.id.startsWith('subscription.fr_e3'));
let allOk = true;
for (let i = 1; i <= 7; i++) {
  const c = JSON.parse(fs.readFileSync('artifacts/ux/screen_contracts/subscription.fr_e3_0' + i + '.json', 'utf8'));
  const s = e3inv.find(x => x.id === c.id);
  const routeOk = s && s.route === c.route ? 'OK' : 'MISMATCH';
  const titleOk = s && s.title === c.title ? 'OK' : 'MISMATCH';
  if (routeOk !== 'OK' || titleOk !== 'OK') allOk = false;
  console.log(c.id + ' route:' + routeOk + ' title:' + titleOk);
}
console.log(allOk ? 'ALL MATCH' : 'DRIFT FOUND');
