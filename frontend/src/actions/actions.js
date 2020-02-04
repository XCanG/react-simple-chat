export function changeName(name) {
	return {
		type: "name",
		payload: name,
	}
}

export function sendMessage(msg) {
	return {
		type: "send",
		payload: msg,
	}
}
