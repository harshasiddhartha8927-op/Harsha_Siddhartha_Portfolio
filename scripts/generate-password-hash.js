import bcrypt from 'bcryptjs';

const password = process.argv[2] || 'admin123';

console.log('--------------------------------------------------');
console.log('Generative AI Portfolio — Admin Password Hash Utility');
console.log('--------------------------------------------------');
console.log(`Input Password: "${password}"`);

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('\nGenerated Bcrypt Hash:');
console.log(hash);
console.log('\nCopy and paste this hash into your .env or Vercel Environment Variables:');
console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
console.log('--------------------------------------------------');
