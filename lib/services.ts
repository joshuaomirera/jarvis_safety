// lib/services.ts

import { firestore } from './firebase';
import {
  collection,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';

export interface Service {
  id?: string;
  name: string;
  description: string;
  price: string;
  industry: string[];
  category: string;
}

// Fetch all services
export const fetchServices = async (): Promise<Service[]> => {
  const snapshot = await getDocs(collection(firestore, 'services'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Service));
};

// Fetch a service by ID
export const getServiceById = async (id: string): Promise<Service | null> => {
  const docRef = doc(firestore, 'services', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Service;
  }
  return null;
};

// Fetch all service IDs
export const getAllServiceIds = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(firestore, 'services'));
  return snapshot.docs.map((doc) => doc.id);
};
