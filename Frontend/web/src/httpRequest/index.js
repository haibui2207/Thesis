import * as config from "./config";
import axios from "axios";
import apiActions from "../redux/actions";

let host = `${config.host}:${config.port}`;

// api.getAllPin();
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
export function getAllPin() {
  axios
    .get(`${host}${config.pinAPI}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function getPinNumber(pin, kitKey) {
  axios
    .get(`${host}${config.pinAPI}/getpinnumber?pin=${pin}&key=${kitKey}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function updatePinNumber(pin, kitKey, pinState) {
  const data = {
    pin: pin,
    key: kitKey,
    state: pinState
  };
  axios
    .put(`${host}${config.pinAPI}`, data)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function resetAllPin() {
  axios
    .post(`${host}${config.pinAPI}/resetallpin`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
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
  axios
    .get(`${host}${config.userAPI}/info/${userId}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function getUserByRfid(rfidCode) {
  axios
    .get(`${host}${config.userAPI}/rfid/${rfidCode}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function updateUserInfo({
  name,
  username,
  password,
  gender,
  email,
  rfidCode
}) {
  const data = {
    name: name,
    username: username,
    email: email,
    password: password,
    rfid: rfidCode,
    gender: gender
  };
  return dispatch => {
    return axios
      .post(`${host}${config.userAPI}/rfid/${rfidCode}`, data)
      .then(res => {
        dispatch(apiActions.userAPIActions.updateUserInfoSuccessful(res.data));
      })
      .catch(err => {
        dispatch(apiActions.userAPIActions.updateUserInfoFailed());
      });
  }
}


export function deleteUser(userId) {
  axios
    .delete(`${host}${config.userAPI}/${userId}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function deleteAllUsers() {
  axios
    .delete(`${host}${config.userAPI}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

/*********************************API DHT*************************************/
export function getAllDHTData() {
  axios
    .get(`${host}${config.DHTAPI}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function getLastestRecordDHT() {
  axios
    .get(`${host}${config.DHTAPI}/lastestrecord`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}

export function deleteAllDHTData() {
  axios
    .delete(`${host}${config.DHTAPI}`)
    .then(res => {
      console.log(JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
}
