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

  // Manually add distributeurs
  const distributeur1 = {
    name: 'Distributeur Salon 1', // Updated name
    type: 'distributeur',
    location: 'Salon 1',
    roomNumber: 1,
    connectivity: 'Wi-Fi',
    status: 'Connecté',
    lastInteraction: new Date().toISOString()
  };
  await objectsRef.add(distributeur1);
  console.log(`✅ Ajouté: ${distributeur1.name}`);

  const distributeur2 = {
    name: 'Distributeur Salon 2', // Updated name
    type: 'distributeur',
    location: 'Salon 2',
    roomNumber: 2,
    connectivity: 'Wi-Fi',
    status: 'Connecté',
    lastInteraction: new Date().toISOString()
  };
  await objectsRef.add(distributeur2);
  console.log(`✅ Ajouté: ${distributeur2.name}`);

  const distributeur3 = {
    name: 'Distributeur Salon 3', // Updated name
    type: 'distributeur',
    location: 'Salon 3',
    roomNumber: 3,
    connectivity: 'Wi-Fi',
    status: 'Connecté',
    lastInteraction: new Date().toISOString()
  };
  await objectsRef.add(distributeur3);
  console.log(`✅ Ajouté: ${distributeur3.name}`);

  const distributeur4 = {
    name: 'Distributeur Salon 4', // Updated name
    type: 'distributeur',
    location: 'Salon 4',
    roomNumber: 4,
    connectivity: 'Wi-Fi',
    status: 'Connecté',
    lastInteraction: new Date().toISOString()
  };
  await objectsRef.add(distributeur4);
  console.log(`✅ Ajouté: ${distributeur4.name}`);

  console.log('🎉 Tous les objets supplémentaires ont été ajoutés !');
})();
