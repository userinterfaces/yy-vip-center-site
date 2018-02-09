class User_Detail_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				phone: null,
				nickname: null,
				level: 0,
				walletAmount: 0,
				dtCreate: 0
			}
		};
		this.reload = this.reload.bind(this);
		this.getReadableLevel = this.getReadableLevel.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	reload() {
		var panel = this;
		fn_public_api({
			"apiName": "My_QueryMyDetail_Api",
			"token": fn_get_token()
		}, function(resp){
			panel.setState({data: resp.data});
		});
	}

	getReadableLevel() {
		switch (this.state.data.level) {
			case 0: return "普通用户";
			case 1: return "超级代理";
			case 2: return "超级代理";
			case 3: return "超级代理";
		}
	}

	render() {
		return (
			React.createElement("section", null, 
				React.createElement("div", {className: "container", style: {paddingTop: "50px", paddingBottom: "50px"}}, 
					React.createElement("div", {className: "row"}, 
					    React.createElement("div", {className: "col-md-2 col-md-offset-1"}, 
				        	React.createElement("div", {className: "row"}, 
				        		React.createElement("img", {src: "assets/images/man.svg"})
				        	)
					    ), 
					    React.createElement("div", {className: "col-md-8 col-md-offset-1"}, 
			                React.createElement("h3", {style: {fontSize: "24px"}}, this.state.data.nickname, React.createElement("small", {style: {color: "red"}}, "（", this.getReadableLevel(), "）")), 
			                React.createElement("h3", {style: {fontSize: "48px"}}, React.createElement("small", null, "余额"), React.createElement("span", {style: {color: "red"}}, "￥", fn_fen2yuan_fixed(this.state.data.walletAmount))), 
			                React.createElement("p", {style: {fontSize: "14px"}}, "这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。"), 
			                React.createElement("a", {href: "#", className: "btn btn-danger", role: "button", "data-toggle": "modal", "data-target": "#user_Recharge_Modal"}, "充值")
					    )
					)
				)
			)
		);
	}
}

var user_Detail_Panel = ReactDOM.render(React.createElement(User_Detail_Panel, null), document.getElementById("user_Detail_Panel_Container"));
