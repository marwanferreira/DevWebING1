export function canUserControlObject(device: any, user: any): boolean {
  if (!user || !device) return false;

  const role = user.role;
  const userRoom = user.roomNumber?.toString();

  const room = (device.room || '').toLowerCase();
  const type = (device.type || '').toLowerCase();

  // ✅ Global admin access
  if (role === 'admin') return true;

  // 🏠 Private rooms: Only the resident of that room
  if (room.startsWith('chambre') && room === `chambre ${userRoom}`) {
    return true;
  }

  // 🧺 Buanderie
  if (room === 'buanderie') {
    const match = device.name?.match(/\d+/);
    const deviceNumber = match ? match[0] : null;

    if (role === 'complexe') return true;
    if (role === 'simple' && deviceNumber === userRoom) return true;
    return false;
  }

  // 🧑‍💼 Bureau des Admins: Only admins (already handled)
  if (room === 'bureau des admins') return false;

  // 💼 Travail 1 & 2: Complexe and Admin only
  if (room.includes('travail')) {
    return role === 'complexe';
  }

  // 🛣️ Couloir 1–4: Admin only
  if (room.startsWith('couloir')) return false;

  // 🍽️ Cuisine partagée
  if (room === 'cuisine partagée') {
    if (type === 'lave-vaisselle') return role !== 'simple';
    return true;
  }

  // 🛁 Salle de bain partagée
  if (room === 'salle de bain partagée') {
    return role !== 'simple';
  }

  // 🛋️ Salon Coliving
  if (room === 'salon coliving') {
    if (type === 'playstation') return true;
    return role !== 'simple';
  }

  // 🌳 Espace extérieur
  if (room === 'espace extérieur') {
    if (type.includes('portail')) return true;
    return false;
  }

  // ❌ Deny anything not matched above
  return false;
}
