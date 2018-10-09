import { pinAPITypes } from "../actionTypes";

export function getAllPinsSuccessful(data) {
  return { type: pinAPITypes.GET_ALL_PINS_SUCCESSFUL, data };
}
export function getAllPinsFailed() {
  return { type: pinAPITypes.GET_ALL_PINS_FAILED };
}
export function getPinNumberSuccessful(data) {
  return { type: pinAPITypes.GET_PIN_NUMBER_SUCCESSFUL, data };
}
export function getPinNumberFailed() {
  return { type: pinAPITypes.GET_PIN_NUMBER_FAILED };
}
export function updatePinNumberSuccessful(data) {
  return { type: pinAPITypes.UPDATE_PIN_NUMBER_SUCCESSFUL, data };
}
export function updatePinNumberFailed() {
  return { type: pinAPITypes.UPDATE_PIN_NUMBER_FAILED };
}
export function resetAllPinSuccessful(data) {
  return { type: pinAPITypes.RESET_ALL_PIN_SUCCESSFUL, data };
}
export function resetAllPinFailed() {
  return { type: pinAPITypes.RESET_ALL_PIN_FAILED };
}
