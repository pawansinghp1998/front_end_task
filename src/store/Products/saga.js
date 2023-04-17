import {
  fetchProductCategoriesSuccess,
  fetchProductCategoriesFailure,
  fetchProductListFailure,
  fetchProductListSuccess,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
} from "./action";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { manageLoader } from "./action";
import {
  FETCH_PRODUCT_CATEGORIES_REQUEST,
  FETCH_PRODUCT_DETAILS_REQUEST,
  FETCH_PRODUCT_LIST_REQUEST,
} from "./actionTypes";
import { notification } from "antd";

import {
  getProductCategories,
  getProductList,
  getProductDetails,
} from "../../services/productList";

//Saga function to be called to fetch the product category
export function* fetchProductCategorySaga(action) {
  try {
    yield put(
      manageLoader({
        flag: true,
      })
    );
    window.loaderCount += 1;
    const response = yield call(getProductCategories, action.payload);
    yield put(
      fetchProductCategoriesSuccess({
        productCategoriesList: response,
      })
    );
    window.loaderCount =
      window.loaderCount >= 1 ? window.loaderCount - 1 : window.loaderCount;
    if (window.loaderCount == 0) {
      yield put(
        manageLoader({
          flag: false,
        })
      );
    }
  } catch (errObj) {
    fetchProductCategoriesFailure({ error: errObj.title });
    window.loaderCount =
      window.loaderCount >= 1 ? window.loaderCount - 1 : window.loaderCount;
    if (window.loaderCount == 0) {
      yield put(
        manageLoader({
          flag: false,
        })
      );
    }
    if (errObj) {
      notification.open({
        message: "Error!",
        description: errObj.title,
      });
    }
  }
}

//Saga function to be called to fetch the product list
export function* fetchProductListSaga(action) {
  try {
    yield put(
      manageLoader({
        flag: true,
      })
    );
    window.loaderCount += 1;
    const response = yield call(getProductList, action.payload);
    yield put(
      fetchProductListSuccess({
        productItemList: response,
      })
    );
    window.loaderCount =
      window.loaderCount >= 1 ? window.loaderCount - 1 : window.loaderCount;
    if (window.loaderCount == 0) {
      yield put(
        manageLoader({
          flag: false,
        })
      );
    }
  } catch (errObj) {
    fetchProductListFailure({ error: errObj.title });
    window.loaderCount =
      window.loaderCount >= 1 ? window.loaderCount - 1 : window.loaderCount;
    if (window.loaderCount == 0) {
      yield put(
        manageLoader({
          flag: false,
        })
      );
    }
    if (errObj) {
      notification.open({
        message: "Error!",
        description: errObj.title,
      });
    }
  }
}

//saga function to be called to get specific product details
export function* fetchProductDetailsSaga(action) {
  try {
    yield put(
      manageLoader({
        flag: true,
      })
    );
    window.loaderCount += 1;
    const response = yield call(getProductDetails, action.payload);
    yield put(
      fetchProductDetailsSuccess({
        productDetails: response,
      })
    );
    window.loaderCount =
      window.loaderCount >= 1 ? window.loaderCount - 1 : window.loaderCount;
    if (window.loaderCount == 0) {
      yield put(
        manageLoader({
          flag: false,
        })
      );
    }
  } catch (errObj) {
    fetchProductDetailsFailure({ error: errObj.title });
    window.loaderCount =
      window.loaderCount >= 1 ? window.loaderCount - 1 : window.loaderCount;
    if (window.loaderCount == 0) {
      yield put(
        manageLoader({
          flag: false,
        })
      );
    }
    if (errObj) {
      notification.open({
        message: "Error!",
        description: errObj.title,
      });
    }
  }
}

export function* productDetailsWatcher() {
  yield all([
    takeLatest(FETCH_PRODUCT_CATEGORIES_REQUEST, fetchProductCategorySaga),
    takeLatest(FETCH_PRODUCT_LIST_REQUEST, fetchProductListSaga),
    takeLatest(FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetailsSaga),
  ]);
}
