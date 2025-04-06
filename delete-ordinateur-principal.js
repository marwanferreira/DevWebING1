const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Make sure this file exists in the same folder

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function deleteOrdinateurPrincipal() {
  const snapshot = await db.collection('connected-objects')
    .where('name', '==', 'Ordinateur principal').get();

  if (snapshot.empty) {
    console.log('❌ No document found with name "Ordinateur principal"');
    return;
  }

  const deletes = [];
  snapshot.forEach(doc => {
    console.log(`🗑️ Deleting "${doc.id}" - ${doc.data().name}`);
    deletes.push(doc.ref.delete());
  });

  await Promise.all(deletes);
  console.log(`✅ Deleted ${deletes.length} document(s).`);
}

deleteOrdinateurPrincipal().catch(err => console.error('❌ Error:', err));
