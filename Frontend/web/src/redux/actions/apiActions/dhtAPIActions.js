import { dhtAPITypes } from "../actionTypes";

export function getAllDHTDataSuccessful(data) {
  return { type: dhtAPITypes.GET_ALL_DHT_DATA_SUCCESSFUL, data };
}
export function getAllDHTDataFailed() {
  return { type: dhtAPITypes.GET_ALL_DHT_DATA_FAILED };
}
export function getLastestRecordDHTSuccessful(data) {
  return { type: dhtAPITypes.GET_LATEST_DHT_DATA_SUCCESSFUL, data };
}
export function getLastestRecordDHTFailed() {
  return { type: dhtAPITypes.GET_LATEST_DHT_DATA_FAILED };
}
export function deleteAllDHTDataSuccessful(data) {
  return { type: dhtAPITypes.DELETE_ALL_DHT_DATA_SUCCESSFUL, data };
}
export function deleteAllDHTDataFailed() {
  return { type: dhtAPITypes.DELETE_ALL_DHT_DATA_FAILED };
}
