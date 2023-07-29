// https://dummyjson.com/products?limit=10

import { useEffect, useState } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
function App() {
  const [products, setProducts] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  async function fetchProducts() {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    if (data && data.products) setProducts(data.products);
    console.log(products);
  }

  function selectPageHandler(page) {
    setPageNum(page);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pageNum * 10 - 10, pageNum * 10).map((product) => {
            return (
              <div key={product.id} className="product">
                <img src={product.thumbnail} alt="" />
                <span>{product.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span className="arrow">
            <BsFillCaretLeftFill />
          </span>
          {[...Array(products.length / 10)].map((_, index) => {
            return (
              <span
                onClick={() => selectPageHandler(index + 1)}
                className="number"
                key={index}
              >
                {index + 1}
              </span>
            );
          })}
          <span className="arrow">
            <BsFillCaretRightFill />
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
