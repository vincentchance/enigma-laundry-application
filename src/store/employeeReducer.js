const DEFAULT_STATE = {
	employees: [],
};

export const employeeReducers = (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case "SET_EMPLOYEE":
			return { ...state, employees: action.payload.employees };
		default:
			return state
	}
}