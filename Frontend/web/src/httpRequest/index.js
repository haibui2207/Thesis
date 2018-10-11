import * as config from "./config";
import axios from "axios";
import apiActions from "../redux/actions";

let host = `${config.host}:${config.port}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// api.getAllPins();
// api.getPinNumber(14, 'KIT001');
// api.updatePinNumber(14, 'KIT001', 1);
// api.resetAllPin();
// api.getAllUsers();
// api.login('admin', 'admin');
// api.createNewUser('tester', 'tester', 'tester');
// api.getUserInfo(1);
// api.getUserByRfid();
// api.deleteUser(2);
// api.deleteAllUsers();
// api.getAllDHTData();
// api.getLastestRecordDHT();
// api.deleteAllDHTData();

/*********************************API Pin*************************************/
export function getAllPins() {
  return dispatch => {
    return axios
      .get(`${host}${config.pinAPI}`)
      .then(res => {
        dispatch(apiActions.pinAPIActions.getAllPinsSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.pinAPIActions.getAllPinsFailed());
      });
  }
}

export function getPinNumber(pin, kitKey) {
  return dispatch => {
    return axios
      .get(`${host}${config.pinAPI}/getpinnumber?pin=${pin}&key=${kitKey}`)
      .then(res => {
        dispatch(apiActions.pinAPIActions.getPinNumberSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.pinAPIActions.getPinNumberFailed());
      });
  }
}

export function updatePinNumber({ pin, key, state }) {
  const data = {
    pin: pin,
    key: key,
    state: state
  };
  return dispatch => {
    return axios
      .post(`${host}${config.pinAPI}`, data)
      .then(res => {
        dispatch(apiActions.pinAPIActions.updatePinNumberSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.pinAPIActions.updatePinNumberFailed());
      });
  }
}

export function resetAllPin() {
  return dispatch => {
    return axios
      .post(`${host}${config.pinAPI}/resetallpin`)
      .then(res => {
        dispatch(apiActions.pinAPIActions.resetAllPinSuccessful(res));
      })
      .catch(err => {
        dispatch(apiActions.pinAPIActions.resetAllPinFailed());
      });
  }
}

/*********************************API User*************************************/
export function getAllUsers() {
  return dispatch => {
    return axios
      .get(`${host}${config.userAPI}`)
      .then(res => {
        dispatch(apiActions.userAPIActions.getAllUsersSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.getAllUsersFailed());
      });
  };
}

export function login({ username, password }) {
  const data = {
    username: username,
    password: password
  };
  return dispatch => {
    return axios
      .post(`${host}${config.userAPI}/login`, data)
      .then(res => {
        dispatch(apiActions.userAPIActions.loginSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.loginFailed());
      });
  };
}

export function createNewUser({
  name,
  username,
  password,
  gender,
  email = "",
  rfidCode = "",
  role = ""
}) {
  const data = {
    name: name,
    username: username,
    email: email,
    password: password,
    rfid: rfidCode,
    role: role ? config.roleUser : role,
    gender: gender
  };
  return dispatch => {
    return axios
      .post(`${host}${config.userAPI}/create`, data)
      .then(res => {
        dispatch(apiActions.userAPIActions.createNewUserSuccessful(res.data));
      })
      .catch(err => {
        if (err.response) {
          dispatch(apiActions.userAPIActions.createNewUserFailed());
        }
      });
  }
}

export function getUserInfo(userId) {
  return dispatch => {
    return axios
      .get(`${host}${config.userAPI}/info/${userId}`)
      .then(res => {
        dispatch(apiActions.userAPIActions.getUserInfoSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.getUserInfoFailed());
      });
  }
}

export function getUserByRfid(rfidCode) {
  return dispatch => {
    return axios
      .get(`${host}${config.userAPI}/rfid/${rfidCode}`)
      .then(res => {
        dispatch(apiActions.userAPIActions.getUserByRfidSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.getUserByRfidFailed());
      });
  }
}

export function updateUserInfo({
  id,
  name,
  username,
  password,
  gender,
  email,
  rfid
}) {
  const data = {
    id: id,
    name: name,
    username: username,
    email: email,
    password: password,
    rfid: rfid,
    gender: gender
  };
  return dispatch => {
    return axios
      .put(`${host}${config.userAPI}`, data)
      .then(res => {
        dispatch(apiActions.userAPIActions.updateUserInfoSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.updateUserInfoFailed());
      });
  }
}


export function deleteUser(userId) {
  return dispatch => {
    return axios
      .delete(`${host}${config.userAPI}/${userId}`)
      .then(res => {
        dispatch(apiActions.userAPIActions.deleteUserSuccessful(res));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.deleteUserFailed());
      });
  }
}

export function deleteAllUsers() {
  return dispatch => {
    return axios
      .delete(`${host}${config.userAPI}`)
      .then(res => {
        dispatch(apiActions.userAPIActions.deleteAllUsersSuccessful(res));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.deleteAllUsersFailed());
      });
  }
}

/*********************************API DHT*************************************/
export function getAllDHTData() {
  return dispatch => {
    return axios
      .get(`${host}${config.DHTAPI}`)
      .then(res => {
        dispatch(apiActions.dhtAPIActions.getAllDHTDataSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.dhtAPIActions.getAllDHTDataFailed());
      });
  }
}

export function getLastestRecordDHT() {
  return dispatch => {
    return axios
      .get(`${host}${config.DHTAPI}/lastestrecord`)
      .then(res => {
        dispatch(apiActions.dhtAPIActions.getLastestRecordDHTSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.dhtAPIActions.getLastestRecordDHTFailed());
      });
  }
}

export function deleteAllDHTData() {
  return dispatch => {
    return axios
      .delete(`${host}${config.DHTAPI}`)
      .then(res => {
        dispatch(apiActions.dhtAPIActions.deleteAllDHTDataSuccessful(res));
      })
      .catch(err => {
        dispatch(apiActions.dhtAPIActions.deleteAllDHTDataFailed());
      });
  }
}
