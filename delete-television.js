const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function deleteTelevision() {
  const snapshot = await db.collection('connected-objects')
    .where('name', '==', 'Télévision').get();

  if (snapshot.empty) {
    console.log('❌ No object named "Télévision" found.');
    return;
  }

  const deletes = [];
  snapshot.forEach(doc => {
    console.log(`🗑️ Deleting "${doc.id}" - ${doc.data().name}`);
    deletes.push(doc.ref.delete());
  });

  await Promise.all(deletes);
  console.log(`✅ Deleted ${deletes.length} document(s) named "Télévision".`);
}

deleteTelevision().catch(err => console.error('❌ Error:', err));
