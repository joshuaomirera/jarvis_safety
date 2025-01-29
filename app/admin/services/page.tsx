// app/admin/services/page.tsx

'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { firestore } from '../../../lib/firebase'
import LoadingSpinner from '../../../components/LoadingSpinner'
import ServiceEditForm from '../../../components/ServiceEditForm'
import type { Service } from '../../../types/service'

export default function AdminServicesPage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);

  const {
    data: services = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(firestore, 'services'));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (service: Service) => {
      const { id, ...serviceData } = service;
      if (id) {
        await updateDoc(doc(firestore, 'services', id), serviceData);
      } else {
        await addDoc(collection(firestore, 'services'), serviceData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      setIsEditing(false);
      setSelectedService(undefined);
    },
  });

  const handleSave = async (service: Service) => {
    try {
      await saveMutation.mutate(service);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDoc(doc(firestore, 'services', id));
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Failed to delete service');
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading services</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="list-disc ml-5 mb-4">
              {service.features && service.features.length > 0 ? (
                service.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">
                    {feature}
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No features available</li>
              )}
            </ul>
            {service.price && <p className="text-lg font-semibold mb-4">{service.price}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedService(service);
                  setIsEditing(true);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      {saveMutation.isPending ? (
        <div className="text-center">Saving...</div>
      ) : (
        <ServiceEditForm
          service={selectedService}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
          </div>
        </div>
      )}
    </div>
  );
}
