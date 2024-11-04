const DEFAULT_STATE = {
	newUser: {},
};

export const userReducer = (state = DEFAULT_STATE, action) => {
	switch (action.type){
		case "SET_USER":
            return { ...state, newUser: action.payload.newUser };
		default:
			return state;
	}
}