export interface ConnectedObject {
    id: string;
    name: string;
    type: string;
    location: string;
    roomNumber?: number;
    connectivity: string;
    status: string;
    description?: string;
    attributes?: {
      [key: string]: any;
    };
  }
  