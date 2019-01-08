import { userAPITypes } from "../../actions/actionTypes";
import { SUCCESSFUL, FAILED } from "../../../constants";

const initialState = {
  data: null,
  status: ""
};

export function login(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.LOGIN_SUCCESSFUL:
      return {
        ...state,
        status: SUCCESSFUL,
        isLoggedIn: true,
        data: action.data
      };
    case userAPITypes.LOGIN_FAILED:
      return { ...state, status: FAILED, isLoggedIn: false };
    case userAPITypes.RESET:
      localStorage.clear();
      return { data: null, status: "", isLoggedIn: false };
    default:
      return state;
  }
}

export function getAllUsers(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.GET_ALL_USERS_SUCCESSFUL:
      return { ...state, status: SUCCESSFUL, data: action.data };
    case userAPITypes.GET_ALL_USERS_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}

export function createNewUser(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.CREATE_NEW_USER_SUCCESSFUL:
      return { ...state, status: SUCCESSFUL, data: action.data };
    case userAPITypes.CREATE_NEW_USER_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}

export function getUserInfo(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.GET_USER_INFO_SUCCESSFUL:
      return { ...state, status: SUCCESSFUL, data: action.data };
    case userAPITypes.GET_ALL_USERS_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}

export function getUserByRfid(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.GET_USER_BY_RFID_SUCCESSFUL:
      return { ...state, status: SUCCESSFUL, data: action.data };
    case userAPITypes.GET_USER_BY_RFID_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}

export function updateUserInfo(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.UPDATE_USER_INFO_SUCCESSFUL:
      return { ...state, status: SUCCESSFUL, data: action.data };
    case userAPITypes.UPDATE_USER_INFO_FAILED:
      return { ...state, status: FAILED };
    case userAPITypes.RESET_UPDATE_USER_INFO_STATUS:
      return { ...state, status: "" };
    default:
      return state;
  }
}

export function deleteUser(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.DELETE_USER_SUCCESSFUL:
      return { ...state, status: SUCCESSFUL, data: action.data };
    case userAPITypes.DELETE_USER_FAILED:
      return { ...state, status: FAILED };
    case userAPITypes.RESET_DELETE_USER:
    return { ...state, status: "" };
    default:
      return state;
  }
}

export function deleteAllUsers(state = initialState, action) {
  switch (action.type) {
    case userAPITypes.DELETE_ALL_USERS_SUCCESSFUL:
      return { ...state, status: SUCCESSFUL, data: action.data };
    case userAPITypes.DELETE_ALL_USERS_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}
