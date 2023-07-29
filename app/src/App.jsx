// https://dummyjson.com/products?limit=10

import { useEffect, useState } from "react";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
function App() {
  const [products, setProducts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchProducts() {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${pageNum * 10 - 10}`
    );
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
    console.log(products);
  }

  function selectPageHandler(page) {
    setPageNum(page);
  }

  useEffect(() => {
    fetchProducts();
  }, [pageNum]);

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
      {products.length > 0 && (
        <div className="pagination">
          {pageNum > 1 && (
            <span className="arrow" onClick={() => setPageNum(pageNum - 1)}>
              <BsFillCaretLeftFill />
            </span>
          )}
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span
                onClick={() => selectPageHandler(index + 1)}
                className={pageNum === index + 1 ? "number active" : "number"}
                key={index}
              >
                {index + 1}
              </span>
            );
          })}
          {pageNum < totalPages && (
            <span className="arrow" onClick={() => setPageNum(pageNum + 1)}>
              <BsFillCaretRightFill />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
