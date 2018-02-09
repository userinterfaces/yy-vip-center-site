class System_Footer extends React.Component {

	render() {
		return (
			React.createElement("footer", {id: "footer"}, 
				React.createElement("div", {className: "container"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-sm-12"}, 
							React.createElement("p", {className: "heart"}, "大分県由布市湯布院町川北918-18 TEL.0977-84-2664"), 
							React.createElement("p", {className: "copyright"}, "© 2018 YY大户业务网")
						)
					)
				)
			)
		);
	}
}

var system_Footer = ReactDOM.render(React.createElement(System_Footer, null), document.getElementById("system_Footer_Container"));
