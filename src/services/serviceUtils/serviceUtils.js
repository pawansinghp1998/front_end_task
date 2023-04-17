/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import handleError from "./handleError";

export const getHeaders = () => {
  return {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
  };
};

export const get = (path) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${path}`, getHeaders())
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const post = (path, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${path}`, data, getHeaders())
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};

export const put = (path, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${path}`, data, getHeaders())
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(handleError(error));
      });
  });
};
