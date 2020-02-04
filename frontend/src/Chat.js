import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Input from "./Input";
import Message from "./Message";
import * as actions from "./actions/actions";

const URL = "ws://127.0.0.1:8080";

class Chat extends Component {
	ws = new WebSocket(URL);

	componentDidMount() {
		this.ws.onopen = () => {
			const message = {type: "join", time: new Date().toLocaleTimeString("ru-RU")}
			this.ws.send(JSON.stringify(message));
		};

		this.ws.onmessage = (e) => {
			const message = JSON.parse(e.data);
			this.props.actions.sendMessage(message);
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

	submitMessage = (messageString) => {
		if (messageString.length === 0) return;

		const message = {type: "message", time: new Date().toLocaleTimeString("ru-RU"), name: this.props.name, message: messageString};
		this.ws.send(JSON.stringify(message));
		this.props.actions.sendMessage(message);
	};

	handleWindowBeforeUnload = () => {
		const message = {type: "leave", time: new Date().toLocaleTimeString("ru-RU"), name: this.props.name};
		this.ws.send(JSON.stringify(message));
	}

	render() {
		const { name, messages } = this.props;
		const { changeName } = this.props.actions;

		return (
			<div className="chat">
				<div className="messages">
					{messages.map((message, index) =>
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
							value={name}
							onChange={e => changeName(e.target.value)}
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

const mapStateToProps = (state) => {
	return {
		name: state.name,
		messages: state.messages
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
