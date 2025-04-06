const admin = require('firebase-admin');

// Replace with the path to your service account key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const COLLECTION = 'connected-objects';

async function fixHotteType() {
  const snapshot = await db.collection(COLLECTION).get();
  const updates = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    const type = (data.type || '').toLowerCase();

    if (type === "hotte d’air" || type === "hotte d'air") {
      console.log(`💨 Fixing "${data.name}" from type "${type}" → "hotte air"`);
      updates.push(
        db.collection(COLLECTION).doc(doc.id).update({
          type: 'hotte air',
        })
      );
    }
  });

  await Promise.all(updates);
  console.log(`✅ Renamed ${updates.length} object(s) to type "hotte air"`);
}

fixHotteType().catch(err => console.error('❌ Error:', err));
