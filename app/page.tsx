// import Link from 'next/link';
// import AddProperty from './add-property/page';

// export default function Home() {
//   return (
//     <main className="bg-linear-to-r from-blue-500 to-purple-600 min-h-screen">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl">
//         <div className="text-center">
//           <h1 className="mb-6 font-bold text-white text-4xl md:text-6xl">
//             Welcome to Monsi Properties
//           </h1>
//           <p className="mb-8 text-white text-xl">
//             Find your dream home or list your property
//           </p>
//           <div className="space-x-4">
//             <Link
//               href="/properties"
//               className="inline-block bg-white hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-blue-600 transition duration-200"
//             >
//               View Properties
//             </Link>
            

//             <AddProperty/>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }




// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-7xl">
        <div className="text-center">
          <h1 className="mb-6 font-bold text-white text-4xl md:text-6xl">
            Welcome to Monsi Properties
          </h1>
          <p className="mb-8 text-white text-xl">
            Find your dream home or list your property
          </p>
          <div className="space-x-4">
            <Link
              href="/properties"
              className="inline-block bg-white hover:bg-gray-100 px-8 py-3 rounded-md font-semibold text-blue-600 transition duration-200"
            >
              View Properties
            </Link>
            <Link
              href="/dashboard"
              className="inline-block bg-green-600 hover:bg-green-700 px-8 py-3 rounded-md font-semibold text-white transition duration-200"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}