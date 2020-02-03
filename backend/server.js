const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080});

wss.on("connection", (ws) => {
	ws.on("message", (data) => {
		for (let client of wss.clients) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		}
	});
});
