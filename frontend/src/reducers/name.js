export default (state = "Anonymous", action) => {
	switch (action.type) {
		case "name":
			return action.payload || state;
		default:
			return state;
	}
}
