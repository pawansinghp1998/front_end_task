import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Pagination, Select, Switch } from "antd";
import {
  fetchProductCategoriesRequest,
  fetchProductListRequest,
  fetchProductDetailsRequest,
} from "../../store/Products/action";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import {
  getProductCategorySelector,
  getProductListSelector,
} from "../../store/Products/selector";
import "./index.css";
import { NavLink } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  const productCategoryList = useSelector(getProductCategorySelector);
  const productList = useSelector(getProductListSelector);

  const [filterData, setFilterData] = useState({
    showAvailableItemOnly: false,
    priceRange: null,
    sortingCriteria: null,
  });

  // local state variable to maintain cureent page no
  const [currentPage, setCurrentPage] = useState(1);
  const [configProductList, setConfigProductList] = useState();

  const [selectedProductCategoryId, setSelectedProductCategoryId] = useState(0);

  const sortOption = [
    { label: "A-Z", value: "A-Z", id: 2 },
    { label: "Date", value: "Date", id: 3 },
    { label: "Price", value: "Price", id: 1 },
  ];

  const priceRange = [
    { label: "₹0-99", value: "0-99", id: 99 },
    { label: "₹100-999", value: "100-999", id: 999 },
    { label: "₹1000-1499", value: "1000-1499", id: 1499 },
    { label: "Above ₹1499", value: "1499", id: 1500 },
  ];

  //api call to fetch product categories
  useEffect(() => {
    dispatch(fetchProductCategoriesRequest());
  }, []);

  //By default calling the product list api with the first product category selected
  useEffect(() => {
    if (productCategoryList?.length > 0) {
      setSelectedProductCategoryId(productCategoryList[0].id);
    }
  }, [productCategoryList]);

  useEffect(() => {
    let customProductList = [];
    if (productList?.items?.length > 0) {
      customProductList = productList.items.map((item) => {
        //Handling the case in which product item have missing price details , showing default price value as zero in that case
        let minPrice = item?.variants?.[0]?.price
          ? item?.variants?.[0]?.price
          : 0;
        let maxPrice = item?.variants?.[0]?.price
          ? item?.variants?.[0]?.price
          : 0;
        item.variants.forEach((variant) => {
          if (variant.price > maxPrice) {
            maxPrice = variant.price;
          }
          if (variant.price < minPrice) {
            minPrice = variant.price;
          }
        });
        //adding two more keys maxPrice and minPrice to each item to show price range of product on UI
        return { ...item, minPrice, maxPrice };
      });
    }

    // Filtering the product which are ready/ available
    if (filterData.showAvailableItemOnly) {
      customProductList = customProductList.filter((item) => item.readyProduct);
    }

    //Sorting the product as per choosen criteria
    if (filterData.sortingCriteria) {
      if (filterData.sortingCriteria === "A-Z") {
        customProductList.sort((a, b) =>
          a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1
        );
      }
      if (filterData.sortingCriteria === "Date") {
        customProductList.sort((a, b) => (a.date > b.date ? -1 : 1));
      }
      if (filterData.sortingCriteria === "Price") {
        customProductList.sort((a, b) => (+a.minPrice > +b.minPrice ? 1 : -1));
      }
    }

    //Filtering product in selected price range
    if (filterData.priceRange) {
      const price = filterData.priceRange.split("-");
      var minPrice = +price[0];
      var maxPrice = +price[1];
      if (maxPrice - minPrice >= 0) {
        customProductList = customProductList.filter(
          (item) =>
            (item.minPrice >= minPrice && item.minPrice <= maxPrice) ||
            (item.maxPrice >= minPrice && item.maxPrice <= maxPrice)
        );
      } else if (minPrice && !maxPrice) {
        customProductList = customProductList.filter(
          (item) => item.maxPrice >= minPrice
        );
      }
    }
    // setting products to items to render upon applying various filters
    setConfigProductList(customProductList);
  }, [filterData, productList]);

  //calling the product list api when either product category changes or page no changes
  useEffect(() => {
    if (selectedProductCategoryId && currentPage) {
      dispatch(
        fetchProductListRequest({
          categoryId: selectedProductCategoryId,
          limit: 20,
          page: currentPage,
        })
      );
    }
    //To scroll to top on api call
    window.scrollTo(0, 0);
  }, [selectedProductCategoryId, currentPage]);

  // handle the selected product category and update the local state variable
  const handleCategorySelected = (category) => {
    setSelectedProductCategoryId(category.id);
    setCurrentPage(1);
  };

  //handling the various type of filter available and storing the selected filter value in local state variable
  const handleFilterChange = (value, category) => {
    if (category === "productAvailable") {
      setFilterData({ ...filterData, showAvailableItemOnly: value });
    } else if (category === "sort") {
      setFilterData({ ...filterData, sortingCriteria: value });
    } else if (category === "price") {
      setFilterData({ ...filterData, priceRange: value });
    }
  };

  // handle the particular product click and calling the product details api of selected productId
  const handleProductClick = (productId) => {
    dispatch(fetchProductDetailsRequest({ productId: productId }));
  };

  return (
    <div>
      <div className="header-section">
        <div className="product-category-list">
          {productCategoryList?.length > 0 &&
            productCategoryList.map((category) => {
              return (
                <div
                  className="product-category"
                  onClick={() => handleCategorySelected(category)}
                  key={category.id}
                >
                  <img
                    src={`https://static.prodo.in/${category.categoryImages[0]}`}
                    className="category-image"
                    alt=""
                  />
                  <div
                    className={
                      category.id === selectedProductCategoryId
                        ? "category-name-selected"
                        : "category-name-not-selected"
                    }
                  >
                    {category.categoryName}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="filter">
          <div className="available-prod">
            <Switch
              onChange={(value) =>
                handleFilterChange(value, "productAvailable")
              }
            />
            <div>Available Products Only</div>
          </div>
          <div className="select-group">
            <div className="select-text">Choose Sorting Criteria</div>
            <div className="filter-select">
              <Select
                placeholder="Sort Products"
                options={sortOption}
                onChange={(value) => handleFilterChange(value, "sort")}
                allowClear
              />
            </div>
            <div className="select-text">Select Price Range</div>
            <div className="filter-select">
              <Select
                placeholder="Price Range"
                options={priceRange}
                onChange={(value) => handleFilterChange(value, "price")}
                allowClear
              />
            </div>
          </div>
        </div>
      </div>
      <div className="product-list">
        {configProductList?.length > 0 &&
          configProductList.map((item) => {
            return (
              <NavLink to="/productId" key={item.id}>
                <div
                  key={item.id}
                  className="product-container"
                  onClick={() => handleProductClick(item.id)}
                >
                  <div
                    className={!item.readyProduct ? "outstock" : "no-outstock"}
                  >
                    Out of Stock
                  </div>
                  <img
                    src={item.productImages[0]}
                    className="product-image"
                    alt=""
                  />
                  <div className="product-name">{item.productName}</div>
                  <span className="prod-info">
                    {item.minPrice === item.maxPrice ? (
                      <span className="price">{`₹${item.minPrice}`}</span>
                    ) : (
                      <span className="price">{`₹${item.minPrice}-${item.maxPrice}`}</span>
                    )}
                    <Tag color="red">{`MOQ:${item.moq}`}</Tag>
                    <span className="date">{item.date}</span>
                  </span>
                  <div className="tags">
                    {item.ecoFriendly && <Tag color="blue">Eco-Friendly </Tag>}
                    {item.greenProduct && <Tag color="green">Green</Tag>}
                    {item.prodoExclusive && (
                      <Tag color="geekblue">P Exclusive</Tag>
                    )}
                  </div>
                </div>
              </NavLink>
            );
          })}
      </div>
      <Loader />
      <div className="pagination">
        <Pagination
          className="Simple"
          defaultCurrent={0}
          total={productList?.meta?.totalItems}
          showSizeChanger={false}
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          pageSize={20}
        />
      </div>
    </div>
  );
};
export default ProductList;
