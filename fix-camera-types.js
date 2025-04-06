const admin = require('firebase-admin');

// Path to your service account key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const COLLECTION_NAME = 'connected-objects';

async function fixCameraTypes() {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  const updates = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    const type = (data.type || '').toLowerCase();

    if (type === 'caméra sécurité') {
      console.log(`🎥 Fixing "${data.name}" (type: ${type}) → caméra`);
      updates.push(
        db.collection(COLLECTION_NAME).doc(doc.id).update({ type: 'caméra' })
      );
    }
  });

  await Promise.all(updates);
  console.log(`✅ Updated ${updates.length} camera(s) to type "caméra".`);
}

fixCameraTypes().catch(err => console.error('❌ Error:', err));
