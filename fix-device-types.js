const admin = require('firebase-admin');

// Replace with your service account key path
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const COLLECTION_NAME = 'connected-objects';

// Mapping of wrong types to correct ones
const typeMap = {
  'lampe plafond': 'lampe',
  'lampe extérieure': 'lampe',
  'lampe exterieur': 'lampe',
  'lampe de bureau': 'lampe',
  'détecteur mouvement': 'capteur',
  'detecteur mouvement': 'capteur'
};

async function fixTypes() {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  const updates = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    const oldType = (data.type || '').toLowerCase();

    if (typeMap[oldType]) {
      const newType = typeMap[oldType];
      console.log(`Fixing "${data.name}" (type: ${oldType}) → ${newType}`);
      updates.push(
        db.collection(COLLECTION_NAME).doc(doc.id).update({
          type: newType
        })
      );
    }
  });

  await Promise.all(updates);
  console.log(`✅ Fixed ${updates.length} document(s).`);
}

fixTypes().catch(err => console.error('❌ Error:', err));
