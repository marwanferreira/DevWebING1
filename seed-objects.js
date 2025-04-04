const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const objectsRef = db.collection('connected-objects');

const rooms = Array.from({ length: 10 }, (_, i) => i + 1);
const objectsPerRoom = [
  {
    name: 'Micro-ondes',
    type: 'micro-ondes',
    connectivity: 'Wi-Fi'
  },
  {
    name: 'Frigo',
    type: 'frigo',
    connectivity: 'Wi-Fi'
  },
  {
    name: 'Plaque électrique',
    type: 'plaque',
    connectivity: 'Bluetooth'
  },
  {
    name: 'Lampe de bureau',
    type: 'lampe',
    connectivity: 'Wi-Fi'
  },
  {
    name: 'Stores automatiques',
    type: 'store',
    connectivity: 'Bluetooth'
  },
  {
    name: 'Lampe de salle de bain',
    type: 'lampe',
    locationOverride: 'Salle de bain',
    connectivity: 'Wi-Fi'
  }
];

(async function seedRooms() {
  for (const room of rooms) {
    for (const obj of objectsPerRoom) {
      const location = obj.locationOverride || `Chambre ${room}`;
      const name = `${obj.name} ${location}`;
      const doc = {
        name,
        type: obj.type,
        location,
        roomNumber: room,
        connectivity: obj.connectivity,
        status: 'Connecté',
        lastInteraction: new Date().toISOString()
      };
      await objectsRef.add(doc);
      console.log(`✅ Ajouté: ${name}`);
    }
  }
  console.log('🎉 Tous les objets supplémentaires ont été ajoutés !');
})();
