// https://dummyjson.com/products?limit=10

import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const res = await fetch(`https://dummyjson.com/products?limit=10`);
    const data = await res.json();
    if (data && data.products) setProducts(data.products);
    console.log(products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <div key={product.id} className="product">
                <img src={product.thumbnail} alt="" />
                <span>{product.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
