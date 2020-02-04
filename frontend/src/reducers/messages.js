export default (state = [], action) => {
	switch (action.type) {
		case "send":
			return [...state, action.payload];
		default:
			return state;
	}
}
