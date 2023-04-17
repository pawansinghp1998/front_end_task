import * as utils from "../serviceUtils/serviceUtils";

export const getProductCategories = () => {
  return new Promise((resolve, reject) => {
    return utils
      .get(`https://api.prodo.in/categories`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProductList = (payload) => {
  return new Promise((resolve, reject) => {
    return utils
      .get(
        `https://api.prodo.in/products/category/${payload.categoryId}?limit=${payload?.limit}&page=${payload?.page}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProductDetails = (payload) => {
  return new Promise((resolve, reject) => {
    return utils
      .get(`https://api.prodo.in/products/${payload.productId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
