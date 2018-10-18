import { userAPITypes } from "../actionTypes";

export function reset() {
  return { type: userAPITypes.RESET };
}
export function loginSuccessful(data) {
  return { type: userAPITypes.LOGIN_SUCCESSFUL, data };
}
export function loginFailed() {
  return { type: userAPITypes.LOGIN_FAILED };
}
export function getAllUsersSuccessful(data) {
  return { type: userAPITypes.GET_ALL_USERS_SUCCESSFUL, data };
}
export function getAllUsersFailed() {
  return { type: userAPITypes.GET_ALL_USERS_FAILED };
}
export function createNewUserSuccessful(data) {
  return { type: userAPITypes.CREATE_NEW_USER_SUCCESSFUL, data };
}
export function createNewUserFailed() {
  return { type: userAPITypes.CREATE_NEW_USER_FAILED };
}
export function getUserInfoSuccessful(data) {
  return { type: userAPITypes.GET_USER_INFO_SUCCESSFUL, data };
}
export function getUserInfoFailed() {
  return { type: userAPITypes.GET_USER_INFO_FAILED };
}
export function getUserByRfidSuccessful(data) {
  return { type: userAPITypes.GET_USER_BY_RFID_SUCCESSFUL, data };
}
export function getUserByRfidFailed() {
  return { type: userAPITypes.GET_USER_BY_RFID_FAILED };
}
export function updateUserInfoSuccessful(data) {
  return { type: userAPITypes.UPDATE_USER_INFO_SUCCESSFUL, data };
}
export function updateUserInfoFailed() {
  return { type: userAPITypes.UPDATE_USER_INFO_FAILED };
}
export function resetUpdateUserInfoStatus() {
  return { type: userAPITypes.RESET_UPDATE_USER_INFO_STATUS };
}
export function deleteUserSuccessful(data) {
  return { type: userAPITypes.DELETE_USER_SUCCESSFUL, data };
}
export function deleteUserFailed() {
  return { type: userAPITypes.DELETE_USER_FAILED };
}
export function resetDeleteUser() {
  return { type: userAPITypes.RESET_DELETE_USER };
}
export function deleteAllUsersSuccessful(data) {
  return { type: userAPITypes.DELETE_ALL_USERS_SUCCESSFUL, data };
}
export function deleteAllUsersFailed() {
  return { type: userAPITypes.DELETE_ALL_USERS_FAILED };
}