import React from "react"

export default ({ type, time, name, message }) => {
	switch (type) {
		case "join":
			return <div className="message">
				<time className="time" dateTime={time}>{time}</time>
				<div className="info">Новый пользователь вошёл в чат</div>
			</div>;
		case "leave":
			return <div className="message">
				<time className="time" dateTime={time}>{time}</time>
				<div className="info">Пользователь <strong>{name}</strong> покинул чат</div>
			</div>;
		default:
			return <div className="message">
				<time className="time" dateTime={time}>{time}</time>
				<div className="name">{name}</div>
				<div className="text">{message}</div>
			</div>;
	}
}
