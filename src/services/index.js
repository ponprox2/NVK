import axios from 'axios';
import {
  API_GET_FREE_SHIPPER,
  API_GET_WORKING_TERRITORY,
  API_GET_REGION,
  API_UPDATE_DELIVERY_HISTORY,
  API_GET_UPDATE_DETAIL_PACKAGE,
  API_GET_SHOP_ORDER_CONFIRM,
  API_GET_DETAIL_PACKAGE,
  API_GET_SHOP_ORDER_HISTORY,
  API_GET_SHOP_ORDER_ASSIGNMENT,
  API_SHOP_ORDER_ASSIGNMENT_DISMISSION,
  API_GET_SHOP_ORDER_ASSIGNMENT_CAPABILITY,
  API_SHIPPER_ASSIGNMENT,
  API_LOGIN,
  API_UPDATE_EXPORTATION,
  API_GET_EXPORTATION,
  API_UPDATE_IMPORTATION,
  API_GET_IMPORTATION,
  API_UPDATE_DELIVERY_RESULTS,
  API_GET_DELIVERY_RESULTS,
} from './config';

export const getWorkingTerritory = async (id) => {
  try {
    const response = await axios.get(`${API_GET_WORKING_TERRITORY}?staffID=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getDeliveryResultAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_DELIVERY_RESULTS}?warehouseStaffID=${body.staffID}&regionID=${body.regionID}&shopName=${body.shopName}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const updateDeliveryResultAPI = async (body) => {
  try {
    const response = await axios.post(API_UPDATE_DELIVERY_RESULTS, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const getImportationAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_IMPORTATION}?staffID=${body.staffID}&regionID=${body.regionID}&shopName=${body.shopName}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const updateImportationAPI = async (body) => {
  try {
    const response = await axios.post(API_UPDATE_IMPORTATION, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const getExportationAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_EXPORTATION}?staffID=${body.staffID}&regionID=${body.regionID}&shopName=${body.shopName}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const updateExportationAPI = async (body) => {
  try {
    const response = await axios.post(API_UPDATE_EXPORTATION, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const shipperAssigmentAPI = async (body) => {
  try {
    const response = await axios.post(API_SHIPPER_ASSIGNMENT, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const loginAPI = async (body) => {
  try {
    const response = await axios.post(API_LOGIN, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShopOrderAssignmentAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_SHOP_ORDER_ASSIGNMENT}?staffID=${body?.staffID}&packageName=${body?.packageName1}&shopName=${body?.shopName1}&regionID=${body?.regionID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShopOrderDismissionAPI = async (body) => {
  try {
    const response = await axios.post(API_SHOP_ORDER_ASSIGNMENT_DISMISSION, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShopOrderAssignmentCapabilityAPI = async (id) => {
  try {
    const response = await axios.get(`${API_GET_SHOP_ORDER_ASSIGNMENT_CAPABILITY}?shopOrderID=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getRegion = async (id) => {
  try {
    const response = await axios.get(`${API_GET_REGION}?territoryID=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getDetailPackage = async (id) => {
  try {
    const response = await axios.get(`${API_GET_UPDATE_DETAIL_PACKAGE}?shopOrderID=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getFreeShiperAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_FREE_SHIPPER}?shopOrderID=${body?.shopOrderID}&shipperName=${body?.shipperName1}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateDeliveryHistory = async (body) => {
  try {
    const response = await axios.put(API_UPDATE_DELIVERY_HISTORY, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShopOrdersConfirming = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_SHOP_ORDER_CONFIRM}?staffID=${body?.staffID1}&regionID=${body?.regionID}&deliveryStatus=${body?.status}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getDetailPackageAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_DETAIL_PACKAGE}?shopOrderID=${body?.shopOrderID}&isDetails=${body?.isDetail}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShopOrderHistoryAPI = async (shopOrderID) => {
  try {
    const response = await axios.get(`${API_GET_SHOP_ORDER_HISTORY}?shopOrderID=${shopOrderID}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
