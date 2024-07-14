import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

console.log('generating key');
console.log(__dirname);

const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
};

const envFilePath = path.join(__dirname, '/.env');
// const envFilePath = '/.env';


if (!fs.existsSync(envFilePath)) {
   const secretKey = generateSecretKey();
   fs.writeFileSync(envFilePath, `SECRET_KEY=${secretKey}\n`);
}
else {
   const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
   const secretKey = generateSecretKey();
   fs.appendFileSync(envFilePath, `SECRET_KEY=${secretKey}\n`);    
}
