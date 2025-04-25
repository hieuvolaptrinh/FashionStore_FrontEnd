import { useParams } from "react-router-dom";

import ListProduct from "../../components/Client/Product/ListProduct";
import Carousel from "./Carousel";
import { useKeyword } from "../../contexts/KeywordContext";

function HomePage() {
  const { keyword } = useKeyword();
  // lấy typeId từ url
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
      <Carousel />
      <ListProduct keyword={keyword} typeId={typeIdNumber} />
    </>
  );
}
export default HomePage;
