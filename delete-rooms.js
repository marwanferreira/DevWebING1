// delete-rooms.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const deleteObjectsInRooms = async () => {
  const snapshot = await db.collection('connected-objects').get();
  const batch = db.batch();

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.location && /^Chambre [2-9]$|^Chambre 10$/.test(data.location)) {
      batch.delete(doc.ref);
    }
  });

  await batch.commit();
  console.log('✅ Deleted objects in Chambre 2 to 10');
};

deleteObjectsInRooms();
