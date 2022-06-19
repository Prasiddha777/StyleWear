import { useParams } from "react-router-dom";

function ProductScreen() {
  //name of the hook is params
  const params = useParams();
  const { slug } = params;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
export default ProductScreen;
