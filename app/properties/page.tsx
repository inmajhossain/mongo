// // app/properties/page.tsx

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { IProperty } from '@/models/Property';
// import Image from 'next/image';

// interface ApiResponse {
//   success: boolean;
//   data: IProperty[];
//   error?: string;
// }

// export default function Properties() {
//   const [properties, setProperties] = useState<IProperty[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async (): Promise<void> => {
//     try {
//       const res = await fetch('/api/properties');
//       const data: ApiResponse = await res.json();
      
//       if (res.ok) {
//         setProperties(data.data);
//       } else {
//         setError(data.error || 'Failed to fetch properties');
//       }
//     } catch (error) {
//       setError('Failed to fetch properties');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
//         <div className="text-center">Loading properties...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
//         <div className="text-red-600 text-center">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
//       <div className="mx-auto max-w-7xl">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="font-bold text-gray-900 text-3xl">Properties</h1>
//           <Link
//             href="/add-property"
//             className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition duration-200"
//           >
//             Add New Property
//           </Link>
//         </div>

//         {properties.length === 0 ? (
//           <div className="py-12 text-center">
//             <p className="text-gray-500">No properties found.</p>
//           </div>
//         ) : (
//           <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {properties.map((property) => (
//               <div key={property._id as string} className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition duration-200">
//                 {/* Image Section */}
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={property.imageUrl || '/default-property.jpg'}
//                     alt={property.title}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                   />
//                 </div>
                
//                 <div className="p-6">
//                   <h3 className="mb-2 font-semibold text-gray-900 text-xl">{property.title}</h3>
//                   <p className="mb-4 text-gray-600 line-clamp-2">{property.description}</p>
                  
//                   <div className="space-y-2">
//                     <p className="font-bold text-blue-600 text-2xl">${property.price.toLocaleString()}</p>
//                     <p className="text-gray-600">
//                       <span className="font-medium">Location:</span> {property.location}
//                     </p>
                    
//                     <div className="flex space-x-4 text-gray-600 text-sm">
//                       <span>{property.bedrooms} 🛏️ Beds</span>
//                       <span>{property.bathrooms} 🚿 Baths</span>
//                       <span>{property.area} 📏 sq ft</span>
//                     </div>
                    
//                     <p className="mt-2 text-gray-400 text-xs">
//                       Added: {new Date(property.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// app/properties/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProperty } from '@/models/Property';
import BookingModal from '@/app/components/BookingModal';

interface ApiResponse {
  success: boolean;
  data: IProperty[];
  error?: string;
}

export default function Properties() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Booking modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{ id: string; title: string } | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (): Promise<void> => {
    try {
      const res = await fetch('/api/properties');
      const data: ApiResponse = await res.json();
      
      if (res.ok) {
        setProperties(data.data);
      } else {
        setError(data.error || 'Failed to fetch properties');
      }
    } catch (error) {
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (propertyId: string, propertyTitle: string) => {
    setSelectedProperty({ id: propertyId, title: propertyTitle });
    setIsModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setBookingSuccess(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center">Loading properties...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-gray-900 text-3xl">Properties</h1>
          <Link
            href="/add-property"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition duration-200"
          >
            Add New Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No properties found.</p>
          </div>
        ) : (
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div key={property._id as unknown as string} className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition duration-200">
                {/* Image Section */}
                <div className="relative w-full h-48">
                  <Image
                    src={property.imageUrl || '/default-property.jpg'}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="mb-2 font-semibold text-gray-900 text-xl">{property.title}</h3>
                  <p className="mb-4 text-gray-600 line-clamp-2">{property.description}</p>
                  
                  <div className="space-y-2">
                    <p className="font-bold text-blue-600 text-2xl">${property.price.toLocaleString()}</p>
                    <p className="text-gray-600">
                      <span className="font-medium">Location:</span> {property.location}
                    </p>
                    
                    <div className="flex space-x-4 text-gray-600 text-sm">
                      <span>{property.bedrooms} 🛏️ Beds</span>
                      <span>{property.bathrooms} 🚿 Baths</span>
                      <span>{property.area} 📏 sq ft</span>
                    </div>
                    
                    <p className="mt-2 text-gray-400 text-xs">
                      Added: {new Date(property.createdAt).toLocaleDateString()}
                    </p>

                    {/* Book Now Button */}
                    <button
                      onClick={() => handleBookNow(property._id as unknown as string, property.title)}
                      className="bg-green-600 hover:bg-green-700 mt-4 px-4 py-2 rounded-md w-full font-medium text-white transition duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {selectedProperty && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            propertyId={selectedProperty.id}
            propertyTitle={selectedProperty.title}
            onSuccess={handleBookingSuccess}
          />
        )}

        {/* Success Toast */}
        {bookingSuccess && (
          <div className="right-4 bottom-4 fixed bg-green-500 shadow-lg px-6 py-3 rounded-lg text-white">
            Booking request sent successfully!
          </div>
        )}
      </div>
    </div>
  );
}