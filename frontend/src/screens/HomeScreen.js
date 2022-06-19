import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import axios from "axios";

function HomeScreen() {
  // Array having products and setproducts
  const [products, setProducts] = useState([]);
  useEffect(() => {
    //call api and get products from backend
    const fetchData = async () => {
      //call axios.get method to send an ajax request from api/product address and put in variable (result)
      const result = await axios.get("/api/products");
      //call setproducts function and as a parameter return result.data;
      setProducts(result.data);
    };
    //
    fetchData();
  }, []);
  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {products.map((products) => (
          <div className="product" key={products.slug}>
            <Link to={`/product/${products.slug}`}>
              <img src={products.image} alt={products.name} />
            </Link>
            <Link to={`/product/${products.slug}`}>
              <p>{products.name}</p>
            </Link>
            <p>
              <strong>Rs.{products.price}</strong>
            </p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
