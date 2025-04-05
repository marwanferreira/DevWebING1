const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

const locationsToDelete = ["Salle de bain", "Salon 1", "Salon 2", "Salon 3", "Salon 4"];

async function deleteObjectsByLocation() {
  const snapshot = await db.collection('connected-objects').get();

  const deletions = snapshot.docs.map(async (doc) => {
    const data = doc.data();
    if (locationsToDelete.includes(data.location)) {
      await db.collection('connected-objects').doc(doc.id).delete();
      console.log(`❌ Deleted ${data.name} at ${data.location}`);
    }
  });

  await Promise.all(deletions);
  console.log("✅ Deletion complete.");
}

deleteObjectsByLocation().catch(console.error);
