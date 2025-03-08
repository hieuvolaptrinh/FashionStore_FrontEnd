import React from "react";
import Carousel from "./components/Carousel";
import ListProduct from "../../product/ListProduct";

// viết như này thì không cần inter
function HomePage(props: { keyword: string }) {
  return (
    <>
      <Carousel />
      <ListProduct keyword={props.keyword} />
    </>
  );
}
export default HomePage;
