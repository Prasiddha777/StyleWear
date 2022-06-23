import { useEffect, useReducer, useState } from "react";
import Card from "react-bootstrap/Card";
// import data from "../data";
import axios from "axios";
// import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import ListGroup from "react-bootstrap/ListGroup";
import LoadingBox from "../components/Loading";
import MessageBox from "../components/MessageBox";

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
      <Helmet>
        <title>Style&#38;Wear</title>
      </Helmet>
      <div className="imageContainer">
        <div className="col-2">
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <h1>
                      Give Your Workout <br></br>A new Style!
                    </h1>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    {" "}
                    <p>
                      “We don’t need fashion to survive, we just desire it so
                      much.”{" "}
                    </p>
                    <button>Shop Now</button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
        <div className="col-2">
          <img src="/images/shoes6.png"></img>
        </div>
      </div>

      <h3>FEATURED PRODUCTS</h3>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((products) => (
              <Col key={products.slug} sm={5} md={3} lr={5} className="mb-3">
                <Product products={products}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
