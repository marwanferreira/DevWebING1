const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin with your service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function removeDuplicates(collectionName, uniqueFieldName) {
  console.log(`Starting to remove duplicates from ${collectionName} based on ${uniqueFieldName}...`);
  
  try {
    // Get all documents from the collection
    const snapshot = await db.collection(collectionName).get();
    const documents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`Found ${documents.length} documents in ${collectionName}`);
    
    // Track unique values and documents to delete
    const uniqueValues = new Map();
    const docsToDelete = [];
    
    // Identify duplicates
    documents.forEach(doc => {
      const uniqueValue = doc[uniqueFieldName];
      
      if (!uniqueValues.has(uniqueValue)) {
        // First occurrence - keep this one
        uniqueValues.set(uniqueValue, doc.id);
      } else {
        // Duplicate found - mark for deletion
        docsToDelete.push(doc.id);
      }
    });
    
    console.log(`Found ${docsToDelete.length} duplicates to remove`);
    
    // Delete duplicates
    const batchSize = 500; // Firestore limit
    let deletedCount = 0;
    
    for (let i = 0; i < docsToDelete.length; i += batchSize) {
      const batch = db.batch();
      const chunk = docsToDelete.slice(i, i + batchSize);
      
      chunk.forEach(docId => {
        batch.delete(db.collection(collectionName).doc(docId));
      });
      
      await batch.commit();
      deletedCount += chunk.length;
      console.log(`Deleted ${deletedCount} of ${docsToDelete.length} duplicates`);
    }
    
    console.log(`Successfully removed ${deletedCount} duplicates from ${collectionName}`);
    
  } catch (error) {
    console.error('Error removing duplicates:', error);
  }
}

// Example usage - replace with your collection name and the field to check for uniqueness
// For connected objects, you might want to use 'name' as the unique field
removeDuplicates('connected-objects', 'name')
  .then(() => {
    console.log('Duplicate removal process completed');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error in duplicate removal process:', error);
    process.exit(1);
  });