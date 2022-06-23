import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
// import data from "../data";
import axios from "axios";
import logger from "use-reducer-logger";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
//function for fetching Api from backend
function HomeScreen() {
  //use reducer:
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // Array having products and setproducts
  // tala ko chai use state ho aba redux garera cmmt gareko
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    //call api and get products from backend
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      //call axios.get method to send an ajax request from api/product address and put in variable (result)
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      //call setproducts function and as a parameter return result.data;
      // setProducts(result.data);
    };
    //
    fetchData();
  }, []);
  return (
    <div>
      <div className="imageContainer">
        <div className="col-2">
          <h1>
            Give Your Workout <br></br>A new Style!
          </h1>
          <p>“We don’t need fashion to survive, we just desire it so much.” </p>
          <button>Shop Now &#x2192;</button>
        </div>
        <div className="col-2">
          <img src="/images/model2.png"></img>
        </div>
      </div>

      <h3>FEATURED PRODUCTS</h3>
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
