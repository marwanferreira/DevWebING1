import { Injectable } from '@angular/core';
import { UserProfile, UserType } from '../auth/user.service';

export interface Device {
  name: string;
  room: string;
  status: string;
  type: string;
  roomNumber?: number;
  isOn?: boolean;
  occupiedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  
  constructor() { }
  
  canUserControlObject(device: Device, user: UserProfile | null): boolean {
    if (!user || !device) return false;
  
    const userRole = user.role as string;
    // Convertir roomNumber en nombre pour la comparaison
    const userRoomNumber = typeof user.roomNumber === 'string' ? parseInt(user.roomNumber) : user.roomNumber;
    
    // Admin can control all devices
    if (userRole === 'admin') return true;
    
    const room = device.room?.toLowerCase() || '';
    const deviceRoomMatch = room.match(/chambre\s+(\d+)/i);
    const deviceRoomNumber = deviceRoomMatch ? parseInt(deviceRoomMatch[1]) : null;
    
    // Users can control devices in their own room
    if (deviceRoomNumber && deviceRoomNumber === userRoomNumber) {
      return true;
    }
    
    // Specific rules for different areas
    if (room === 'buanderie') {
      // In laundry room, users can only use their assigned machines
      const deviceNumberMatch = device.name.match(/\d+/);
      const deviceNumber = deviceNumberMatch ? parseInt(deviceNumberMatch[0]) : null;
      
      if (userRole === 'complexe') return true;
      if (deviceNumber && deviceNumber === userRoomNumber) return true;
      return false;
    }
    
    // Shared spaces rules
    if (room === 'cuisine partagée') {
      const type = device.type?.toLowerCase() || '';
      // Everyone can use kitchen devices except dishwasher (restricted to complexe and admin)
      if (type === 'lave-vaisselle') return userRole === 'complexe' || userRole === 'admin';
      return true;
    }
    
    if (room === 'salon coliving') {
      const type = device.type?.toLowerCase() || '';
      // Everyone can use PlayStation
      if (type === 'playstation') return true;
      // Other devices in living room are restricted to complexe and admin
      return userRole === 'complexe' || userRole === 'admin';
    }
    
    if (room === 'salle de bain partagée') {
      // Shared bathroom devices are restricted to complexe and admin
      return userRole === 'complexe' || userRole === 'admin';
    }
    
    if (room === 'espace extérieur') {
      const type = device.type?.toLowerCase() || '';
      // Everyone can use the gate
      if (type.includes('portail')) return true;
      // Other outdoor devices are restricted to admin
      return userRole === 'admin';
    }
    
    // Work rooms are restricted to complexe and admin
    if (room.includes('travail')) {
      return userRole === 'complexe' || userRole === 'admin';
    }
    
    // Admin office is restricted to admin only
    if (room === 'bureau des admins') {
      return userRole === 'admin';
    }
    
    // Hallways are restricted to admin only
    if (room.startsWith('couloir')) {
      return userRole === 'admin';
    }
    
    // Default: deny access
    return false;
  }
  
  getDeviceAccessStatus(device: Device, user: UserProfile | null): string {
    return this.canUserControlObject(device, user) ? 'Autorisé' : 'Non autorisé';
  }
}