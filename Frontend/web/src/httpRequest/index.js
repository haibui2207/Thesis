import * as config from './config';
import axios from 'axios';

var host = `${config.host}:${config.port}`;

// import * as api from '../../../httpRequest';
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

export async function getPinNumber(pin, kitKey) {
	await axios
		.get(`${host}${config.pinAPI}/getpinnumber?pin=${pin}&key=${kitKey}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function updatePinNumber(pin, kitKey, pinState) {
	var data = {
		pin: pin,
		key: kitKey,
		state: pinState
	};
	await axios
		.put(`${host}${config.pinAPI}`, data)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function resetAllPin() {
	await axios
		.post(`${host}${config.pinAPI}/resetallpin`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

/*********************************API User*************************************/
export async function getAllUsers() {
	await axios
		.get(`${host}${config.userAPI}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function login(username, password) {
	var result;
	var data = {
		username: username,
		password: password
	};
	await axios
		.post(`${host}${config.userAPI}/login`, data)
		.then(res => {
			result = {
				status: res.status,
				data: res.data
			};
		})
		.catch(err => {
			result = {
				status: err.response.status,
				data: {}
			};
		});

	return result;
}

export async function createNewUser(name, username, password, rfidCode = '', role = '') {
	var data = {
		name: name,
		username: username,
		password: password,
		rfid: rfidCode,
		role: role ? config.roleUser : role
	};
	await axios
		.post(`${host}${config.userAPI}/create`, data)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function getUserInfo(userId) {
	await axios
		.get(`${host}${config.userAPI}/info/${userId}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function getUserByRfid(rfidCode) {
	await axios
		.get(`${host}${config.userAPI}/rfid/${rfidCode}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function deleteUser(userId) {
	await axios
		.delete(`${host}${config.userAPI}/${userId}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function deleteAllUsers() {
	await axios
		.delete(`${host}${config.userAPI}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

/*********************************API DHT*************************************/
export async function getAllDHTData() {
	await axios
		.get(`${host}${config.DHTAPI}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function getLastestRecordDHT() {
	await axios
		.get(`${host}${config.DHTAPI}/lastestrecord`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}

export async function deleteAllDHTData() {
	await axios
		.delete(`${host}${config.DHTAPI}`)
		.then(res => {
			console.log(JSON.stringify(res.data));
		})
		.catch(err => {
			console.log(JSON.stringify(err));
		});
}
