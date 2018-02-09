class System_Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeCategory: {
				id: null
			},
			categories: [],
			user: null
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
			<header className="header">
				<nav className="navbar navbar-custom" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#custom-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="index.html" style={{fontFamily: "'Microsoft YaHei',Arial,Helvetica,sans-serif,'宋体'"}}>YY大户业务网</a>
						</div>
						<div className="collapse navbar-collapse" id="custom-collapse">
							<ul className="nav navbar-nav navbar-right">
								{this.state.categories.map(x => <li className={this.state.activeCategory.id == x.id ? "active" : ""} onClick={e => this.handleClickCategory(x)}>
									<a href={"index.html?cid="+x.id}>{x.name}</a>
								</li>)}
								{this.state.user != null &&
									<li><a href={"my.html?cid="+this.state.activeCategory.id}>欢迎您，<strong>{this.state.user.nickname}</strong></a></li>
								}
								{this.state.user != null &&
									<li onClick={this.handleClickLogout}><a href="#">退出</a></li>
								}
								<div className="pull-right">
									{this.state.user == null &&
										<span>
											<a href="#" className="btn btn-primary" role="button" style={{marginTop: "5px", marginBottom: "5px", paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", letterSpacing: "3px"}} data-toggle="modal" data-target="#system_Login_Modal">登录</a>
											&nbsp;&nbsp;
											<a href="#" className="btn btn-warning" role="button" style={{marginTop: "5px", marginBottom: "5px", paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", letterSpacing: "3px"}} data-toggle="modal" data-target="#system_Register_Modal">注册</a>
										</span>
									}
								</div>
							</ul>
						</div>
					</div>
				</nav>
		</header>
		);
	}
}

var system_Navbar = ReactDOM.render(<System_Navbar />, document.getElementById("system_Navbar_Container"));
