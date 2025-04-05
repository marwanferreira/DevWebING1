export function canUserControlObject(
    device: any,
    user: any
  ): boolean {
    if (!user || !device) return false;
  
    const userRole = user.role;
    const userRoom = user.roomNumber?.toString();
  
    const room = device.room?.toLowerCase() || '';
    const type = device.type?.toLowerCase() || '';
  
    if (userRole === 'admin') return true;
  
    if (room.startsWith('chambre') && room === `chambre ${userRoom}`) {
      return true;
    }
  
    if (room === 'buanderie') {
      const match = device.name.match(/\d+/);
      const deviceNumber = match ? match[0] : null;
      if (userRole === 'complexe') return true;
      if (userRole === 'simple' && deviceNumber === userRoom) return true;
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
  