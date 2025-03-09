import React from "react";

import ListProduct from "../../product/ListProduct";
import { useParams } from "react-router-dom";

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
      <ListProduct keyword={props.keyword} typeId={typeIdNumber} />
    </>
  );
}
export default HomePage;
