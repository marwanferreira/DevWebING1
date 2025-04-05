const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const objectsRef = db.collection('connected-objects');

// Names of the objects that should be deleted
const unwantedNames = [
  'Lampe plafond Salle de bain partagée',
  'PlayStation Salon',
  'Distributeur Salon',
  'Frigo 1 Cuisine',
  'Frigo 2 Cuisine',
  'Machine à café 1 Cuisine',
  'Machine à café 2 Cuisine',
  'Micro-ondes 1 Cuisine',
  'Micro-ondes 2 Cuisine',
  'Plaque électrique 1 Cuisine',
  'Plaque électrique 2 Cuisine',
  'Lave-vaisselle Cuisine',
  'Hotte d’air',
  'Ventilateur Travail 1',
  'Ventilateur Travail 2',
  'Caméra sécurité 1',
  'Caméra sécurité 2',
  'Caméra sécurité 3',
  'Caméra sécurité 4',
  'Lampe extérieure 1',
  'Lampe extérieure 2',
  'Lampe extérieure 3',
  'Détecteur mouvement 1',
  'Détecteur mouvement 2',
  'Détecteur mouvement 3',
  'Ordinateur principal',
  'Tableau de contrôle'
];

(async () => {
  console.log('🧹 Deleting mistakenly added objects...');

  for (const name of unwantedNames) {
    const snapshot = await objectsRef.where('name', '==', name).get();
    if (!snapshot.empty) {
      snapshot.forEach(doc => {
        doc.ref.delete();
        console.log(`❌ Deleted ${name}`);
      });
    } else {
      console.log(`✅ ${name} not found or already deleted`);
    }
  }

  console.log('🎯 Cleanup complete!');
})();
