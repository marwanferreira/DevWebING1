export function canUserControlObject(
    device: any,
    user: any
  ): boolean {
    if (!user || !device) return false;
  
    const userRole = user.role;
    const userRoom = user.roomNumber?.toString();
  
    const room = (device.room || device.location || '').toLowerCase().trim();
    const type = (device.type || '').toLowerCase().trim();

    if (userRole === 'admin') return true;

    if (room.startsWith('chambre')) {
      const match = room.match(/\d+/);
      const roomNumber = match ? match[0] : null;
    
      if (roomNumber === userRoom) {
        // Liste des types d'objets privés
        const allowedTypes = [
          'micro-ondes',
          'lampe',
          'chargeur',
          'plaque',
          'thermostat',
          'télévision'
        ];
    
        return allowedTypes.includes(type);
      }
      return false; // autre chambre → refusé même si complexe
    }
    
  
    if (room === 'buanderie') {
      const match = device.name.match(/\d+/);
      const deviceNumber = match ? match[0] : null;
    
      const allowedTypes = ['machine à laver', 'sèche-linge', "hotte d'air"];
    
      if (!allowedTypes.includes(type)) return false;
    
      if (userRole === 'admin' || userRole === 'complexe') return true;
    
      // Simple user → only machine/sèche-linge N where N = room number
      if (userRole === 'simple') {
        return deviceNumber === user.roomNumber?.toString();
      }
    
      return false;
    }
    
  
    if (room === 'bureau des admins') return false;
    if (room.includes('travail')) return userRole === 'complexe';
    if (room.startsWith('couloir')) return false;
  
    if (room === 'cuisine partagée') {
      if (type === 'lave-vaisselle') return userRole !== 'simple';
      return true;
    }
  
    if (room === 'salle de bain partagée') {
      return userRole !== 'simple';
    }
  
    if (room === 'salon coliving') {
      if (type === 'playstation') return true;
      return userRole !== 'simple';
    }
  
    if (room === 'espace extérieur') {
      if (type.includes('portail')) return true;
      return false;
    }
  
    return false;
  }
  