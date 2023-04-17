import {
  FETCH_PRODUCT_CATEGORIES_REQUEST,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILURE,
  FETCH_PRODUCT_LIST_REQUEST,
  FETCH_PRODUCT_LIST_SUCCESS,
  FETCH_PRODUCT_LIST_FAILURE,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_FAILURE,
  MANAGE_LOADER,
} from "./actionTypes";

export const manageLoader = (payload) => ({
  type: MANAGE_LOADER,
  payload,
});

export const fetchProductCategoriesRequest = () => ({
  type: FETCH_PRODUCT_CATEGORIES_REQUEST,
});

export const fetchProductCategoriesSuccess = (payload) => ({
  type: FETCH_PRODUCT_CATEGORIES_SUCCESS,
  payload,
});

export const fetchProductCategoriesFailure = (payload) => ({
  type: FETCH_PRODUCT_CATEGORIES_FAILURE,
  payload,
});

export const fetchProductListRequest = (payload) => ({
  type: FETCH_PRODUCT_LIST_REQUEST,
  payload,
});

export const fetchProductListSuccess = (payload) => ({
  type: FETCH_PRODUCT_LIST_SUCCESS,
  payload,
});

export const fetchProductListFailure = (payload) => ({
  type: FETCH_PRODUCT_LIST_FAILURE,
  payload,
});

export const fetchProductDetailsRequest = (payload) => ({
  type: FETCH_PRODUCT_DETAILS_REQUEST,
  payload,
});

export const fetchProductDetailsSuccess = (payload) => ({
  type: FETCH_PRODUCT_DETAILS_SUCCESS,
  payload,
});

export const fetchProductDetailsFailure = (payload) => ({
  type: FETCH_PRODUCT_DETAILS_FAILURE,
  payload,
});
