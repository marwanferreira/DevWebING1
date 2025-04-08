const admin = require('firebase-admin');

// Replace with your path to the Firebase Admin SDK key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const COLLECTION = 'connected-objects';

async function deleteDuplicates() {
  const snapshot = await db.collection(COLLECTION).get();
  const seen = new Map(); // name.toLowerCase() -> docId
  const deletes = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    const nameKey = (data.name || '').trim().toLowerCase();

    if (!nameKey) return;

    if (seen.has(nameKey)) {
      console.log(`🗑️ Duplicate found: ${data.name} → deleting ${doc.id}`);
      deletes.push(db.collection(COLLECTION).doc(doc.id).delete());
    } else {
      seen.set(nameKey, doc.id);
    }
  });

  await Promise.all(deletes);
  console.log(`✅ Deleted ${deletes.length} duplicate(s).`);
}

deleteDuplicates().catch(err => console.error('❌ Error:', err));
