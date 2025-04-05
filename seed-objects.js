const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const objectsRef = db.collection('connected-objects');

// Define all additional shared-space connected objects
const additionalObjects = [
  { name: 'Lampe plafond Salle de bain partagée', type: 'lampe', location: 'Salle de bain partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Télévision Salon', type: 'télévision', location: 'Salon Coliving', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Lampe plafond Salon', type: 'lampe', location: 'Salon Coliving', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Ventilateur Salon', type: 'ventilateur', location: 'Salon Coliving', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'PlayStation Salon', type: 'PlayStation', location: 'Salon Coliving', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Distributeur Salon', type: 'distributeur', location: 'Salon Coliving', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Frigo 1 Cuisine', type: 'frigo', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Frigo 2 Cuisine', type: 'frigo', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Machine à café 1 Cuisine', type: 'machine à café', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Machine à café 2 Cuisine', type: 'machine à café', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Micro-ondes 1 Cuisine', type: 'micro-ondes', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Micro-ondes 2 Cuisine', type: 'micro-ondes', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Plaque électrique 1 Cuisine', type: 'plaque', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Plaque électrique 2 Cuisine', type: 'plaque', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Lave-vaisselle Cuisine', type: 'lave-vaisselle', location: 'Cuisine partagée', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Hotte d’air', type: 'hotte', location: 'Buanderie', connectivity: 'Wi-Fi', status: 'Connecté' },
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `Machine à laver ${i + 1}`,
    type: 'machine à laver',
    location: 'Buanderie',
    roomNumber: i + 1,
    connectivity: 'Wi-Fi',
    status: 'Connecté'
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `Sèche-linge ${i + 1}`,
    type: 'sèche-linge',
    location: 'Buanderie',
    roomNumber: i + 1,
    connectivity: 'Wi-Fi',
    status: 'Connecté'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    name: `Lampe plafond Couloir ${i + 1}`,
    type: 'lampe',
    location: `Couloir ${i + 1}`,
    connectivity: 'Wi-Fi',
    status: 'Connecté'
  })),
  { name: 'Lampe plafond Travail 1', type: 'lampe', location: 'Chambre Travail 1', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Ventilateur Travail 1', type: 'ventilateur', location: 'Chambre Travail 1', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Store Travail 1', type: 'store', location: 'Chambre Travail 1', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Lampe plafond Travail 2', type: 'lampe', location: 'Chambre Travail 2', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Ventilateur Travail 2', type: 'ventilateur', location: 'Chambre Travail 2', connectivity: 'Wi-Fi', status: 'Connecté' },
  ...Array.from({ length: 4 }, (_, i) => ({
    name: `Caméra sécurité ${i + 1}`,
    type: 'caméra',
    location: 'Espace extérieur',
    connectivity: 'Wi-Fi',
    status: 'Connecté'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    name: `Lampe extérieure ${i + 1}`,
    type: 'lampe',
    location: 'Espace extérieur',
    connectivity: 'Wi-Fi',
    status: 'Connecté'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    name: `Détecteur mouvement ${i + 1}`,
    type: 'détecteur',
    location: 'Espace extérieur',
    connectivity: 'Wi-Fi',
    status: 'Connecté'
  })),
  { name: 'Portail', type: 'Portail', location: 'Espace extérieur', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Ordinateur principal', type: 'ordinateur', location: 'Bureau des admins', connectivity: 'Wi-Fi', status: 'Connecté' },
  { name: 'Tableau de contrôle', type: 'tableau', location: 'Bureau des admins', connectivity: 'Wi-Fi', status: 'Connecté' },
];

(async () => {
  console.log('🚀 Seeding shared connected objects...');
  for (const obj of additionalObjects) {
    const querySnapshot = await objectsRef
      .where('name', '==', obj.name)
      .where('location', '==', obj.location)
      .get();

    if (querySnapshot.empty) {
      await objectsRef.add(obj);
      console.log(`✅ Added ${obj.name} at ${obj.location}`);
    } else {
      console.log(`⏩ Skipped ${obj.name} (already exists)`);
    }
  }
  console.log('🎉 All shared connected objects added!');
})();
