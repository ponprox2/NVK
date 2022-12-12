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
  API_REGISTER,
  API_GET_TERRITORY,
  API_GET_MANGAGED_WAREHOUSES,
  API_GET_UN_MANGAGED_WAREHOUSES,
  API_UPDATE_UN_MANGAGED_WAREHOUSES,
  API_GET_SHOP_ORDER_PICKUP,
  API_GET_PICKUP_CAPABLITY,
  API_UPDATE_SHOP_ORDER_PICKUP,
  API_GET_STAFF_INFO,
  API_GET_TERRITORY2,
  API_GET_PICKUP_SHIPPER,
  API_GET_DETAIL_PACKAGE2,
  API_GET_RETRIEVE_ORDERS,
  API_UPDATE_RETRIEVE_ORDER,
  API_GET_CANCEL_ORDERS,
  API_UPDATE_CANCEL_ORDER,
  API_GET_SHIP_BACK,
  API_UPDATE_SHIP_BACK,
  API_GET_RETURN_RESULTS,
  API_UPDATE_RETURN_RESULT,
  API_GET_SHIP_BACK_CAPABILITY
} from './config';

export const registerAPI = async (body) => {
  const response = await axios.post(API_REGISTER, body);
  return response;
};

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
      `${API_GET_DELIVERY_RESULTS}?warehouseStaffID=${body.staffID}&territoryID=${body.territoryID}&regionID=${body.regionID}&shopName=${body.shopName}&shopOrderID=${body?.shopOrderID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const updateDeliveryResultAPI = async (body) => {
  const response = await axios.post(API_UPDATE_DELIVERY_RESULTS, body);
  return response;
};
export const getImportationAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_IMPORTATION}?staffID=${body.staffID}&territoryID=${body.territoryID}&regionID=${body.regionID}&shopName=${body.shopName}&shopOrderID=${body?.shopOrderID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const updateImportationAPI = async (body) => {
  const response = await axios.post(API_UPDATE_IMPORTATION, body);
  return response;
};
export const getExportationAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_EXPORTATION}?staffID=${body.staffID}&territoryID=${body.territoryID}&regionID=${body.regionID}&shopName=${body.shopName}&shopOrderID=${body?.shopOrderID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const updateExportationAPI = async (body) => {
  const response = await axios.post(API_UPDATE_EXPORTATION, body);
  return response;
};
export const shipperAssigmentAPI = async (body) => {
  const response = await axios.post(API_SHIPPER_ASSIGNMENT, body);
  return response;
};

export const loginAPI = async (body) => {
  const response = await axios.post(API_LOGIN, body);
  return response;
};

export const getShopOrderAssignmentAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_SHOP_ORDER_ASSIGNMENT}?staffID=${body?.staffID}&packageName=${body?.packageName1}&shopName=${body?.shopName1}&territoryID=${body?.territoryID}&regionID=${body?.regionID}&shopOrderID=${body?.shopOrderID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShopOrderDismissionAPI = async (body) => {
  const response = await axios.post(API_SHOP_ORDER_ASSIGNMENT_DISMISSION, body);
  return response;
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

export const getFreePickUpShiperAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_PICKUP_SHIPPER}?shopOrderID=${body?.shopOrderID}&shipperName=${body?.shipperName1}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};


export const updateDeliveryHistory = async (body) => {
  // const response = await axios.post(API_UPDATE_UN_MANGAGED_WAREHOUSES, body);
  const response = await axios.post(API_UPDATE_DELIVERY_HISTORY, body);
  return response;
};

export const getShopOrdersConfirming = async (body) => {
  
  // console.log(body);
  try {
    const response = await axios.get(
      `${API_GET_SHOP_ORDER_CONFIRM}?staffID=${body?.staffID1}&territoryID=${body?.territoryID}&regionID=${body?.regionID}&deliveryStatus=${body?.status}&shopName=${body?.shopName1}&shopOrderID=${body?.shopOrderID}`
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

export const getDetailPackageAPI2 = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_DETAIL_PACKAGE2}?shopOrderID=${body?.shopOrderID}`
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

export const getTerritoryAPI = async () => {
  try {
    const response = await axios.get(API_GET_TERRITORY);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getUnMangagedWarehouseAPI = async () => {
  try {
    const response = await axios.get(API_GET_UN_MANGAGED_WAREHOUSES);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const getMangagedWarehouseAPI = async (id) => {
  try {
    const response = await axios.get(`${API_GET_MANGAGED_WAREHOUSES}?managerID=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateUnMangagedWarehouseAPI = async (body) => {
  try {
    const response = await axios.post(API_UPDATE_UN_MANGAGED_WAREHOUSES, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShopOrderPickupAPI = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_SHOP_ORDER_PICKUP}?staffID=${body?.staffID}&shopName=${body?.shopName1}&territoryID=${body?.territoryID}&regionID=${body?.regionID}&shopOrderID=${body?.shopOrderID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getPickupCapabitityAPI = async (shopOrderID) => {
  try {
    const response = await axios.get(`${API_GET_PICKUP_CAPABLITY}?shopOrderID=${shopOrderID}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateShopOrderPickup = async (body) => {
    const response = await axios.post(API_UPDATE_SHOP_ORDER_PICKUP, body);
    return response;
};


export const staffInfoAPI = async (body) => {
  const response = await axios.get(
    `${API_GET_STAFF_INFO}?staffID=${body?.staffID}`
  );
  return response;
};

export const getTerritoryAPI2 = async () => {
  try {
    const response = await axios.get(API_GET_TERRITORY2);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getRetrieveOrders = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_RETRIEVE_ORDERS}?warehouseStaffID=${body?.warehouseStaffID}&retrieveType=${body?.retrieveType}&shopName=${body?.shopName}&shopOrderID=${body?.shopOrderID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateRetrieveOrder = async (body) => {
  const response = await axios.post(API_UPDATE_RETRIEVE_ORDER, body);
  return response;
};

export const getCancelOrders = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_CANCEL_ORDERS}?warehouseStaffID=${body?.warehouseStaffID}&shopName=${body?.shopName}&shopOrderID=${body?.shopOrderID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateCancelOrder = async (body) => {
  const response = await axios.post(API_UPDATE_CANCEL_ORDER, body);
  return response;
};

export const getShipBack = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_SHIP_BACK}?warehouseStaffID=${body?.warehouseStaffID}&shopName=${body?.shopName}&shopOrderID=${body?.shopOrderID}&territoryID=${body?.territoryID}&regionID=${body?.regionID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateShipBack = async (body) => {
  const response = await axios.post(API_UPDATE_SHIP_BACK, body);
  return response;
};

export const getReturnResults = async (body) => {
  try {
    const response = await axios.get(
      `${API_GET_RETURN_RESULTS}?warehouseStaffID=${body?.warehouseStaffID}&shopName=${body?.shopName}&shopOrderID=${body?.shopOrderID}&territoryID=${body?.territoryID}&regionID=${body?.regionID}`
    );
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const updateReturnResult = async (body) => {
  const response = await axios.post(API_UPDATE_RETURN_RESULT, body);
  return response;
};

export const getShipBackCapabilityAPI = async (id) => {
  try {
    const response = await axios.get(`${API_GET_SHIP_BACK_CAPABILITY}?shopOrderID=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};