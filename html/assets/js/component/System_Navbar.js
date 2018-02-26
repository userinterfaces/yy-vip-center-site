class System_Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeCategory: {
				id: null
			},
			categories: [],
			user: null,
			activeCategoryTicket: false
		};
		this.activeCategoryCallbacks = {};
		this.handleClickCategory = this.handleClickCategory.bind(this);
		this.handleClickLogout = this.handleClickLogout.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.appendActiveCategoryCallback = this.appendActiveCategoryCallback.bind(this);
		this.removeActiveCategoryCallback = this.removeActiveCategoryCallback.bind(this);
		this.excuteActiveCategoryCallbacks = this.excuteActiveCategoryCallbacks.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	handleClickCategory(x) {
		this.setState({activeCategory: x});
		this.excuteActiveCategoryCallbacks(x);
	}

	handleClickLogout() {
		var panel = this;
		fn_public_api({
			"apiName": "System_Logout_Api",
			"token": fn_get_token()
		}, function(){
			panel.setState({user: null});
			fn_remove_token();
			window.location.href = "index.html";
		});
	}

	handleLogin(user) {
		this.setState({user: user});
		fn_set_token(user.token);
	}

	reload() {
		var panel = this;
		fn_public_api({
			"apiName": "GoodsCategory_QueryAll_Api",
			"pageIndex": 0,
			"pageSize": 15
		}, function(resp){
			panel.setState({categories: resp.data});
			if (location.pathname.endsWith("/index.html")) {
				var activeCategory = resp.data[0];
				var categoryId = fn_url_args().cid;
				if (categoryId) {
					for (var i = 0; i < resp.data.length; i++) {
						if (categoryId == resp.data[i].id) {
							activeCategory = resp.data[i];
						}
					}
				}
				panel.setState({categories: resp.data, activeCategory: activeCategory});
				panel.excuteActiveCategoryCallbacks(activeCategory);
			}
		});
		
		if (fn_get_token()) {
			fn_public_api({
				"apiName": "My_QueryMyDetail_Api",
				"token": fn_get_token()
			}, function(resp){
				panel.handleLogin(resp.data);
			});
		}
	}

	appendActiveCategoryCallback(name, callback) {
		this.activeCategoryCallbacks[name] = callback;
	}

	removeActiveCategoryCallback(name) {
		this.activeCategoryCallbacks[name] = null;
	}

	excuteActiveCategoryCallbacks(activeCategory) {
		for (var i in this.activeCategoryCallbacks) {
			if (typeof this.activeCategoryCallbacks[i] == 'function') {
				this.activeCategoryCallbacks[i](activeCategory);
			}
		}
	}

	render() {
		return (
			React.createElement("header", {className: "header"}, 
				React.createElement("nav", {className: "navbar navbar-custom", role: "navigation"}, 
					React.createElement("div", {className: "container"}, 
						React.createElement("div", {className: "navbar-header"}, 
							React.createElement("button", {type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#custom-collapse"}, 
								React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
								React.createElement("span", {className: "icon-bar"}), 
								React.createElement("span", {className: "icon-bar"}), 
								React.createElement("span", {className: "icon-bar"})
							), 
							React.createElement("a", {className: "navbar-brand", href: "index.html", style: {fontFamily: "'Microsoft YaHei',Arial,Helvetica,sans-serif,'宋体'"}}, "YY大户业务网")
						), 
						React.createElement("div", {className: "collapse navbar-collapse", id: "custom-collapse"}, 
							React.createElement("ul", {className: "nav navbar-nav navbar-right"}, 
								this.state.categories.map(x => React.createElement("li", {className: !this.state.activeCategoryTicket && this.state.activeCategory.id == x.id ? "active" : "", onClick: e => this.handleClickCategory(x)}, 
									React.createElement("a", {href: "index.html?cid="+x.id}, x.name)
								)), 
								React.createElement("li", {className: this.state.activeCategoryTicket ? "active" : ""}, 
									React.createElement("a", {href: "ticket-index.html"}, "卡密商品")
								), 
								this.state.user != null &&
									React.createElement("li", null, React.createElement("a", {href: "my.html?cid="+this.state.activeCategory.id}, "欢迎您，", React.createElement("strong", null, this.state.user.nickname))), 
								
								this.state.user != null &&
									React.createElement("li", {onClick: this.handleClickLogout}, React.createElement("a", {href: "#"}, "退出")), 
								
								React.createElement("div", {className: "pull-right"}, 
									this.state.user == null &&
										React.createElement("span", null, 
											React.createElement("a", {href: "#", className: "btn btn-primary", role: "button", style: {marginTop: "5px", marginBottom: "5px", paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", letterSpacing: "3px"}, "data-toggle": "modal", "data-target": "#system_Login_Modal"}, "登录"), 
											"  ", 
											React.createElement("a", {href: "#", className: "btn btn-warning", role: "button", style: {marginTop: "5px", marginBottom: "5px", paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", letterSpacing: "3px"}, "data-toggle": "modal", "data-target": "#system_Register_Modal"}, "注册")
										)
									
								)
							)
						)
					)
				)
		)
		);
	}
}

var system_Navbar = ReactDOM.render(React.createElement(System_Navbar, null), document.getElementById("system_Navbar_Container"));
