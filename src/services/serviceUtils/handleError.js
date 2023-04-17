import {
  BAD_REQUEST,
  COMMON_ERROR,
  DANGER,
  REQUEST_PROCESS_ERROR,
  RESOURCE_NOT_ACCESSIBLE,
  UNAUTHORIZED_ACCESS,
} from "./serviceConstant";

export default (error) => {
  const { response } = error;
  if (response) {
    let obj = {};
    switch (response?.status) {
      case 500:
        obj = {
          color: DANGER,
          title: response?.data?.msg ?? REQUEST_PROCESS_ERROR,
          flag: true,
        };

        break;
      case 400:
        obj = {
          color: DANGER,
          title: response?.data?.msg ?? BAD_REQUEST,
          flag: true,
        };
        break;
      case 404:
        obj = {
          title: response?.data?.msg ?? RESOURCE_NOT_ACCESSIBLE,
          color: DANGER,
          flag: true,
        };
        break;
      case 401:
        obj = {
          color: DANGER,
          title: response?.data?.msg ?? UNAUTHORIZED_ACCESS,
          flag: true,
        };
        break;
      default:
        obj = {
          color: DANGER,
          title: COMMON_ERROR,
          flag: true,
        };
    }
    return obj;
  }
  return null;
};
