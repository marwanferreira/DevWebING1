export interface ConnectedObject {
  firebaseId?: string;
  id: string;
  name: string;
  type: string;
  location: string;
  roomNumber: number;
  connectivity: string;
  status: string;
  description?: string; // <-- Add this line to fix your error
}
