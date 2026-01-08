const fs = require('fs');
const path = require('path');

const envContent = `NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDj86CAmwy9KoMDb2uwxmYpVHQ_AJptTMw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rentease-fab4f.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rentease-fab4f
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rentease-fab4f.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=583626215014
NEXT_PUBLIC_FIREBASE_APP_ID=1:583626215014:web:9b53006b377e32096f27a7
`;

const filePath = path.join(process.cwd(), '.env.local');

fs.writeFileSync(filePath, envContent, { encoding: 'utf8' });

console.log('.env.local has been generated successfully with UTF-8 encoding.');
console.log('Content preview:');
console.log(envContent);
