import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SmallLoading from "../Loading/SmallLoading";

function Product() {
  const dispatch = useDispatch();
  const [productParams, setProductParams] = useState({
    page: 1,
    limit: 10,
    keyword: "",
  });
  const { loading, error } = useSelector((state) => state.product);

  return <>{loading && <SmallLoading />}</>;
}

export default Product;
