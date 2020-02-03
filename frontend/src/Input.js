import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
	static propTypes = {
		onSubmitMessage: PropTypes.func.isRequired,
	};
	state = {
		message: "",
	};

	render() {
		return (
			<form
				action="."
				onSubmit={e => {
					e.preventDefault()
					this.props.onSubmitMessage(this.state.message)
					this.setState({message: ""})
				}}
			>
				<textarea
					type="text"
					placeholder={"Введите сообщение..."}
					value={this.state.message}
					onChange={e => this.setState({message: e.target.value})}
				></textarea>
				<input type="submit" value={"Отправить"} />
			</form>
		)
	}
}

export default Input
