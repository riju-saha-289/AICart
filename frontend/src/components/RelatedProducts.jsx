import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import Card from "./Card";

export default function RelatedProducts({ currentProductId, category, subcategory }) {
  const { products } = useContext(Context);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p._id !== currentProductId &&
        p.category === category &&
        p.subcategory === subcategory
    );
    setRelated(filtered.slice(0, 4)); // Limit to 4 suggestions
  }, [products, category, subcategory, currentProductId]);

  if (!related.length) return null;

  return (
    <div className="mt-16 px-6 md:px-20">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            name={product.name}
            image={product.images[0]}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
