import { dhtAPITypes } from '../../actions/actionTypes';
import { SUCCESSFUL, FAILED } from '../../../constants';

const initialState = {
	data: null,
	status: ''
};

export function getAllDHTData(state = initialState, action) {
	switch (action.type) {
		case dhtAPITypes.GET_ALL_DHT_DATA_SUCCESSFUL:
			return {
				...state,
				status: SUCCESSFUL,
				data: action.data
			};
		case dhtAPITypes.GET_ALL_DHT_DATA_FAILED:
			return {  data: null, status: FAILED };
		default:
			return state;
	}
}

export function getLastestRecordDHT(state = initialState, action) {
	switch (action.type) {
		case dhtAPITypes.GET_LATEST_DHT_DATA_SUCCESSFUL:
			return {
				...state,
				status: SUCCESSFUL,
				data: action.data
			};
		case dhtAPITypes.GET_LATEST_DHT_DATA_FAILED:
			return { ...state, status: FAILED };
		case dhtAPITypes.GET_LATEST_DHT_DATA_RESET:
			return { ...state, status: FAILED };
		default:
			return state;
	}
}

export function deleteAllDHTData(state = initialState, action) {
	switch (action.type) {
		case dhtAPITypes.DELETE_ALL_DHT_DATA_SUCCESSFUL:
			return {
				...state,
				status: SUCCESSFUL,
				data: action.data
			};
		case dhtAPITypes.DELETE_ALL_DHT_DATA_FAILED:
			return { ...state, status: FAILED };
		default:
			return state;
	}
}
