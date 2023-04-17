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

export const initialState = {
  productCategoriesList: null,
  loader: { flag: false },
  productItemList: null,
  productDetails: null,
  error: null,
};

export const productDetails = (state = initialState, action) => {
  switch (action.type) {
    case MANAGE_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case FETCH_PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state,
      };
    case FETCH_PRODUCT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        productCategoriesList: action.payload.productCategoriesList,
      };
    }
    case FETCH_PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state,
        productCategoriesList: null,
        error: action.payload?.error,
      };
    case FETCH_PRODUCT_LIST_REQUEST:
      return {
        ...state,
      };
    case FETCH_PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        productItemList: action.payload.productItemList,
      };
    }
    case FETCH_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        productItemList: null,
        error: action.payload?.error,
      };
    case FETCH_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
      };
    case FETCH_PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        productDetails: action.payload.productDetails,
      };
    }
    case FETCH_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        productDetails: null,
        error: action.payload?.error,
      };
    default:
      return {
        ...state,
      };
  }
};
