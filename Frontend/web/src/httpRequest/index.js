import * as config from './config';
import axios from 'axios';

var host = `${config.host}:${config.port}`;

/*********************************API Pin*************************************/
export async function getAllPin() {
	await axios
		.get(`${host}${config.pinAPI}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}
// export async function getPinNumber(pin, kitKey) {
//   await axios
//     .get(`${host}${config.pinAPI}?pin=${pin}&key=${kitKey}`)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }
// export async function updatePinNumber({ pin, kitKey, pinState }) {
//   var data = {
//     pin: pin,
//     key: kitKey,
//     state: pinState
//   }
//   await axios
//     .post(`${host}${config.pinAPI}`, data)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }
// export async function resetAllPin() {
//   await axios
//     .post(`${host}${config.pinAPI}`)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }

/*********************************API User*************************************/
// export async function login(username, password) {
//   var data = {
//     name: "",
//     username: username,
//     password: password,
//     rfid: "",
//     role: role ? config.roleUser : role
//   }
//   await axios
//     .post(`${host}${config.userAPI}?name=${name}&username=${username}`, data)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }
// export async function getUserInfo(userId) {
//   var data = {
//     name: name,
//     username: username,
//     password: "",
//     rfid: "",
//     role: role ? config.roleUser : role
//   }
//   await axios
//     .post(`${host}${config.userAPI}?name=${name}&username=${username}`, data)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }
// export async function createNewUser({ name, username, password, rfidCode, role = "" }) {
//   var data = {
//     name: name,
//     username: username,
//     password: password,
//     rfid: rfidCode,
//     role: role ? config.roleUser : role
//   }
//   await axios
//     .post(`${host}${config.userAPI}`, data)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }
// export async function deleteUser() {
//   await axios
//     .deleteUser(`${host}${config.userAPI}`)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }

/*********************************API DHT*************************************/
// export function getAllPin() {
//   await axios
//     .get(`${host}${config.pinAPI}`)
//     .then(res => {
//       console.log(JSON.stringify(res));
//     })
//     .catch(err => {
//       console.log(JSON.stringify(err));
//     });
// }
