const DEFAULT_STATE = {
	products: [],
};

export const productReducers = (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case "SET_PRODUCT":
			return { ...state, products: action.payload.products};
		default:
			return state
	}
}