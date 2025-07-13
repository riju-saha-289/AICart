import React from 'react';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';

export default function Product() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center py-10 px-4 sm:px-8 lg:px-16">
      <div className='pb-10'>
        <LatestCollection />
      </div>
      <BestSeller />
    </main>
  );
}
