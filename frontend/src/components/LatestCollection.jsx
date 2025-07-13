import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { Context } from '../context/Context';
import Card from './Card';

export default function LatestCollection() {
  const { products } = useContext(Context);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 8));
  }, [products]);

  return (
    <section className="w-full py-10 px-4 md:px-10 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white rounded-lg shadow-lg">
      <div className="text-center mb-8 ">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-sm sm:text-base text-gray-300 mt-2">
          Step Into Style New Collections Dropping This Season!
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {latestProduct.map((item, index) => (
          <Card
            key={index}
            name={item.name || 'Clothes'}
            image={item.images[0]}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </section>
  );
}
