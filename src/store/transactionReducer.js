const DEFAULT_STATE = {
	transactions: {},
};

export const transactionReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type){
		case "SET_TRANSACTIONS":
            return { ...state, transactions: action.payload.transaction };
		//case "ADD_TRANSACTIONS":
		//	return { ...state, transactions: }
		default:
			return state;
	}
}