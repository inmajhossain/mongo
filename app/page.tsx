
// app/page.tsx
import Link from 'next/link';
import Properties from './properties/page';

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

          <div className='flex md:flex-row flex-col justify-around items-center mt-10'>
            <Link href="/add-property" className="bg-black px-4 py-2 rounded-md font-mono font-medium text-white transition duration-200">
              Add Properties
            </Link>
            <Link href="/dashboard" className="bg-black px-4 py-2 rounded-md font-mono font-medium text-white transition duration-200">
              Client Dashboard
            </Link>
          </div>
          <div className="space-x-4">
            
            <Properties />
            
          </div>
          
        </div>
      </div>
    </main>
  );
}