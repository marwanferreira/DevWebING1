const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const objectsRef = db.collection('connected-objects');

async function deleteOldDistributors() {
  try {
    // Query for old distributors named "Distributeur 1", "Distributeur 2", etc.
    const snapshot = await objectsRef.where('name', 'in', [
      'Distributeur 1',
      'Distributeur 2',
      'Distributeur 3',
      'Distributeur 4'
    ]).get();

    if (snapshot.empty) {
      console.log('No old distributors found.');
      return;
    }

    // Delete each document found
    snapshot.forEach(async (doc) => {
      await objectsRef.doc(doc.id).delete();
      console.log(`🗑️ Deleted: ${doc.data().name}`);
    });

    console.log('✅ All old distributors have been deleted.');
  } catch (error) {
    console.error('Error deleting old distributors:', error);
  }
}

deleteOldDistributors();