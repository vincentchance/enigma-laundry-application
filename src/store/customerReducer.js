const DEFAULT_STATE = {
	customers: [],
};

export const customerReducer = (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case "SET-CUSTOMERS":
			return { ...state , customers: action.payload.customers };
		default:
			return state
	}
}