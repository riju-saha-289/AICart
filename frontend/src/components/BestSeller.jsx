import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { Context } from '../context/Context';
import Card from './Card';

export default function BestSeller() {
  const { products } = useContext(Context);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filtered = products.filter(item => item.isBestseller);
    setBestSeller(filtered.slice(0, 8));
  }, [products]);

  return (
    <div className="w-full py-10 px-4 md:px-10 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="text-center mb-8">
        <Title text1="BEST" text2="SELLER" />
        <p className="text-sm sm:text-base text-gray-300 mt-2">
          Tried, Tested, Loved | Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {bestSeller.map((item, index) => (
          <Card
            key={index}
            name={item.name || 'Clothes'}
            image={item.images[0]}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
}
