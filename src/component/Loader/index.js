import { getLoaderSelector } from "../../store/Products/selector";
import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import "./index.css";

const Loader = (props) => {
  const loader = useSelector(getLoaderSelector);

  if (!loader?.flag) {
    return null;
  }
  return <Spin size="large" className="loader" />;
};

export default Loader;
