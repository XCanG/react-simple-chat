import React, { Component } from "react";
import Input from "./Input";
import Message from "./Message";

const URL = "ws://127.0.0.1:8080";

class Chat extends Component {
	state = {
		name: "Anonymous",
		messages: [],
	};

	ws = new WebSocket(URL);

	componentDidMount() {
		this.ws.onopen = () => {
			const message = {type: "join", time: new Date().toLocaleTimeString("ru-RU")}
			this.ws.send(JSON.stringify(message));
		};

		this.ws.onmessage = (e) => {
			const message = JSON.parse(e.data);
			this.addMessage(message);
		};

		this.ws.onclose = () => {
			this.setState({
				ws: new WebSocket(URL),
			});
		};

		window.addEventListener("beforeunload", this.handleWindowBeforeUnload);
	}

	componentWillUnmount() {
		window.removeEventListener("beforeunload", this.handleWindowBeforeUnload);
	}

	addMessage = (message) =>
		this.setState(state => ({messages: [...state.messages, message]}));

	submitMessage = (messageString) => {
		const message = {type: "message", time: new Date().toLocaleTimeString("ru-RU"), name: this.state.name, message: messageString};
		this.ws.send(JSON.stringify(message));
		this.addMessage(message);
	};

	handleWindowBeforeUnload = () => {
		const message = {type: "leave", time: new Date().toLocaleTimeString("ru-RU"), name: this.state.name};
		this.ws.send(JSON.stringify(message));
	}

	render() {
		return (
			<div className="chat">
				<div className="messages">
					{this.state.messages.map((message, index) =>
						<Message
							key={index}
							type={message.type}
							time={message.time}
							message={message.message}
							name={message.name}
						/>,
					)}
				</div>
				<div className="inputs">
					<label>
						Имя:
						<input
							type="text"
							placeholder={"Введите ваше имя..."}
							value={this.state.name}
							onChange={e => this.setState({name: e.target.value})}
						/>
					</label>
					<Input
						ws={this.ws}
						onSubmitMessage={msg => this.submitMessage(msg)}
					/>
				</div>
			</div>
		)
	}
}

export default Chat;
