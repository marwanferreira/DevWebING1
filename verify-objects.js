const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const objectsRef = db.collection('connected-objects');

async function verifyObjects() {
  try {
    const snapshot = await objectsRef.get();
    if (snapshot.empty) {
      console.log('No objects found.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(`Found object: ${doc.id} =>`, doc.data());
    });
  } catch (error) {
    console.error('Error fetching objects:', error);
  }
}

verifyObjects();