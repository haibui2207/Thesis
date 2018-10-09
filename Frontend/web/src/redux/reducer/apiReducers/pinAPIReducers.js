import { pinAPITypes } from "../../actions/actionTypes";
import { SUCCESSFUL, FAILED } from "../../../constants";

const initialState = {
  data: null,
  status: ""
};

export function getAllPins(state = initialState, action) {
  switch (action.type) {
    case pinAPITypes.GET_ALL_PINS_SUCCESSFUL:
      return {
        ...state,
        status: SUCCESSFUL,
        data: action.data
      };
    case pinAPITypes.GET_ALL_PINS_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}

export function getPinNumber(state = initialState, action) {
  switch (action.type) {
    case pinAPITypes.GET_PIN_NUMBER_SUCCESSFUL:
      return {
        ...state,
        status: SUCCESSFUL,
        data: action.data
      };
    case pinAPITypes.GET_PIN_NUMBER_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}

export function updatePinNumber(state = initialState, action) {
  switch (action.type) {
    case pinAPITypes.UPDATE_PIN_NUMBER_SUCCESSFUL:
      return {
        ...state,
        status: SUCCESSFUL,
        data: action.data
      };
    case pinAPITypes.UPDATE_PIN_NUMBER_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}

export function resetAllPin(state = initialState, action) {
  switch (action.type) {
    case pinAPITypes.RESET_ALL_PIN_SUCCESSFUL:
      return {
        ...state,
        status: SUCCESSFUL,
        data: action.data
      };
    case pinAPITypes.RESET_ALL_PIN_FAILED:
      return { ...state, status: FAILED };
    default:
      return state;
  }
}
