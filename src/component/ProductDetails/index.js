import React from "react";
import { getProductDetailsSelector } from "../../store/Products/selector";
import { useSelector } from "react-redux";
import { Tag } from "antd";
import Loader from "../Loader";
import "./index.css";

const ProductDetails = () => {
  const productDetails = useSelector(getProductDetailsSelector);

  return (
    <>
      {productDetails?.id && (
        <>
          <div className="prod-details">Product Details</div>
          <div className="item-container">
            <div className="product-item">
              <div
                className={
                  !productDetails.readyProduct
                    ? "item-outstock"
                    : "item-no-outstock"
                }
              >
                Out of Stock
              </div>
              <img
                src={productDetails.productImages[0]}
                className="item-image"
                alt=""
              />
              <div className="item-name">{productDetails.productName}</div>
            </div>
            <div className="item-details">
              <div className="prod-name">{productDetails.productName}</div>
              <div className="prod-name">{`₹${productDetails.price}`}</div>
              <div className="item-date">{`Product Manufactured on ${productDetails.date}`}</div>
              <div className="moq">{`Minimum Order quantity : ${productDetails.moq}`}</div>
              <div className="tags">
                {productDetails.ecoFriendly && (
                  <Tag color="blue">Eco-Friendly </Tag>
                )}
                {productDetails.greenProduct && <Tag color="green">Green</Tag>}
                {productDetails.prodoExclusive && (
                  <Tag color="geekblue">P Exclusive</Tag>
                )}
                {productDetails.whiteLabeling && (
                  <Tag color="gold">White Labeled</Tag>
                )}
              </div>
            </div>
          </div>
          {productDetails.variants.length > 0 && (
            <div>
              <div className="item-variants">Available Variants</div>
              <div className="variant-group">
                {productDetails.variants.map((variant) => {
                  return (
                    <div key={variant.name}>
                      <div className="variant-container">
                        <img
                          src={variant.images[0]}
                          className="variant-image"
                          alt=""
                        />
                        <div className="variant-name">{variant.name}</div>
                        <div className="variant-price">{`₹${variant.price}`}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
      <Loader />
    </>
  );
};

export default ProductDetails;
