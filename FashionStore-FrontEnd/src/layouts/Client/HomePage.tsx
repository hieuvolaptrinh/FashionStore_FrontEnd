

import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

import ListProduct from "../../pages/ListProduct";
import Carousel from "../homepage/Carousel";

// viết như này thì không cần inter
function HomePage(props: { keyword: string }) {
  // nó sẽ lấy từ url
  const { typeId } = useParams();
  let typeIdNumber = 0;

  try {
    typeIdNumber = parseInt(typeId + ""); // NaN
  } catch (error) {
    typeIdNumber = 0;
    console.log("error", error);
  }
  if (isNaN(typeIdNumber)) {
    typeIdNumber = 0;
  }

  return (
    <>
      <Navbar />
      <Carousel />
      <ListProduct keyword={props.keyword} typeId={typeIdNumber} />
    </>
  );
}
export default HomePage;
