import { combineReducers } from 'redux';
import { authReducer } from "./authReducer";
import { customerReducer } from "./customerReducer";
import { transactionReducer } from "./transactionReducer";

export const reducers = combineReducers({
	auth: authReducer,
	customer: customerReducer,
	bill: transactionReducer
})