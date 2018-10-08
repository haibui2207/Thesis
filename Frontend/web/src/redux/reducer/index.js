import { combineReducers } from "redux";
import * as pinAPIReducers from "./apiReducers/pinAPIReducers";
import * as userAPIReducers from "./apiReducers/userAPIReducers";
import * as dhtAPIReducers from "./apiReducers/dhtAPIReducers";

export default combineReducers({
  // pinAPIReducers
  getPins: pinAPIReducers.getAllPins,
  getPin: pinAPIReducers.getPinNumber,
  updatePin: pinAPIReducers.updatePinNumber,
  resetPins: pinAPIReducers.resetAllPin,

  // userAPIReducers
  login: userAPIReducers.login,
  getUsers: userAPIReducers.getAllUsers,
  createNewUser: userAPIReducers.createNewUser,
  getProfile: userAPIReducers.getUserInfo,
  getUserByRfid: userAPIReducers.getUserByRfid,
  updateUser: userAPIReducers.updateUserInfo,
  deleteUser: userAPIReducers.deleteUser,
  deleteAllUsers: userAPIReducers.deleteAllUsers,

   // dhtAPIReducers
   getDHTData: dhtAPIReducers.getAllDHTData,
   getLastestDHTData: dhtAPIReducers.getLastestRecordDHT,
   deleteDHTData: dhtAPIReducers.deleteAllDHTData
});
