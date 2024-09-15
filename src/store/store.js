import { combineReducers } from 'redux';
import { authReducer } from "./authReducer";
import { customerReducer } from "./customerReducer";
import { transactionReducer } from "./transactionReducer";
import { productReducers } from "./productReducer";

export const reducers = combineReducers({
	auth: authReducer,
	customer: customerReducer,
	bill: transactionReducer,
	products: productReducers
})