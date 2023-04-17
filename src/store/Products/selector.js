import { createSelector } from "reselect";
const getLoader = (state) => state?.productDetails?.loader;
const getProductCategory = (state) =>
  state?.productDetails?.productCategoriesList;

const getProductList = (state) => state?.productDetails?.productItemList;
const getProductDetails = (state) => state?.productDetails?.productDetails;

export const getLoaderSelector = createSelector(getLoader, (loader) => loader);
export const getProductCategorySelector = createSelector(
  getProductCategory,
  (productCategoriesList) => productCategoriesList
);
export const getProductListSelector = createSelector(
  getProductList,
  (productItemList) => productItemList
);

export const getProductDetailsSelector = createSelector(
  getProductDetails,
  (productDetails) => productDetails
);
