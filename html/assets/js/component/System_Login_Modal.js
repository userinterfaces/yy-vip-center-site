class System_Login_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: null,
			verificationCode: null
		};
		this.handleClickSubmit = this.handleClickSubmit.bind(this);
	}

	componentDidMount() {
		$('#system_Login_Modal').on('shown.bs.modal', function(e){
			$("#system_Login_Modal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var state = this.state;
		state[field] = e.target.value;
		this.setState(state);
	}

	handleClickSubmit() {
		var modal = this;
		fn_public_api({
			"apiName": "System_Login_Api",
			"phone": this.state.phone,
			"verificationCode": this.state.verificationCode
		}, function(resp){
			system_Navbar.handleLogin(resp.data);
			modal.hide();
		});
	}

	show() {
		$("#system_Login_Modal").modal({keyboard: true});
	}

	hide() {
		$("#system_Login_Modal").modal("hide");
		this.setState({
			phone: "",
			verificationCode: ""
		});
	}

	render() {
		return (
			React.createElement("div", {className: "modal fade", id: "system_Login_Modal", tabindex: "-1", role: "dialog", "aria-hidden": "true"}, 
				React.createElement("div", {className: "modal-dialog"}, 
					React.createElement("div", {className: "modal-content"}, 
						React.createElement("div", {className: "modal-header"}, 
							React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, "×"), 
							React.createElement("h3", null, "Login")
						), 
						React.createElement("div", {className: "modal-body"}, 
							React.createElement("form", {className: "form-horizontal", role: "form"}, 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "手机号"), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("input", {type: "text", className: "form-control", placeholder: "请输入手机号", value: this.state.phone, onChange: e => this.handleChange(e, "phone")}))
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}, "验证码"), 
									React.createElement("div", {className: "col-sm-7"}, 
										React.createElement("div", {className: "input-group"}, 
											React.createElement("input", {type: "text", className: "form-control", placeholder: "请输入验证码", value: this.state.verificationCode, onChange: e => this.handleChange(e, "verificationCode")}), 
											React.createElement("span", {className: "input-group-btn"}, 
												React.createElement("button", {className: "btn btn-primary", type: "button"}, "获取手机验证码")
											)
										)
									)
								), 
								React.createElement("div", {className: "form-group"}, 
									React.createElement("label", {className: "col-sm-3 control-label"}), 
									React.createElement("div", {className: "col-sm-7"}, React.createElement("a", {href: "#", className: "btn btn-danger", role: "button", onClick: this.handleClickSubmit}, "登录"))
								)
							)
						)
					)
				)
			)
		);
	}
}

var system_Login_Modal = ReactDOM.render(React.createElement(System_Login_Modal, null), $("<div></div>").appendTo(document.body)[0]);
