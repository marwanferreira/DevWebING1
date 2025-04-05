const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const objectsRef = db.collection('connected-objects');

(async function seedCoffeeMachines() {
  const coffeeMachines = [
    {
      name: 'Machine à café Salon 1',
      type: 'machine à café',
      location: 'Salon 1',
      roomNumber: 1,
      connectivity: 'Wi-Fi',
      status: 'Libre',
      lastInteraction: new Date().toISOString()
    },
    {
      name: 'Machine à café Salon 2',
      type: 'machine à café',
      location: 'Salon 2',
      roomNumber: 2,
      connectivity: 'Wi-Fi',
      status: 'Libre',
      lastInteraction: new Date().toISOString()
    },
    {
      name: 'Machine à café Salon 3',
      type: 'machine à café',
      location: 'Salon 3',
      roomNumber: 3,
      connectivity: 'Wi-Fi',
      status: 'Libre',
      lastInteraction: new Date().toISOString()
    },
    {
      name: 'Machine à café Salon 4',
      type: 'machine à café',
      location: 'Salon 4',
      roomNumber: 4,
      connectivity: 'Wi-Fi',
      status: 'Libre',
      lastInteraction: new Date().toISOString()
    }
  ];

  for (const machine of coffeeMachines) {
    await objectsRef.add(machine);
    console.log(`✅ Ajouté: ${machine.name}`);
  }

  console.log('🎉 Toutes les machines à café ont été ajoutées !');
})();