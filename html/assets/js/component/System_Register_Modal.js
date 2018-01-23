class System_Register_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: null,
			nickname: null,
			verificationCode: null
		};
		this.handleClickSubmit = this.handleClickSubmit.bind(this);
	}

	componentDidMount() {
		$('#system_Register_Modal').on('shown.bs.modal', function(e){
			$("#system_Register_Modal input")[0].focus();
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
			"apiName": "System_Register_Api",
			"phone": this.state.phone,
			"nickname": this.state.nickname,
			"verificationCode": this.state.verificationCode
		}, function(resp){
			system_Navbar.handleLogin(resp.data);
			modal.hide();
		});
	}

	show() {
		$("#system_Register_Modal").modal({keyboard: true});
	}

	hide() {
		$("#system_Register_Modal").modal("hide");
		this.setState({
			phone: "",
			nickname: "",
			verificationCode: ""
		});
	}

	render() {
		return (
			<div className="modal fade" id="system_Register_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h3>Register</h3>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">手机号</label>
									<div className="col-sm-7"><input type="text" className="form-control" placeholder="请输入手机号" value={this.state.phone} onChange={e => this.handleChange(e, "phone")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">昵称</label>
									<div className="col-sm-7"><input type="text" className="form-control" placeholder="请输入昵称" value={this.state.nickname} onChange={e => this.handleChange(e, "nickname")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">验证码</label>
									<div className="col-sm-7">
										<div className="input-group">
											<input type="text" className="form-control" placeholder="请输入验证码" value={this.state.verificationCode} onChange={e => this.handleChange(e, "verificationCode")} />
											<span className="input-group-btn">
												<button className="btn btn-primary" type="button">获取手机验证码</button>
											</span>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleClickSubmit}>注册</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var system_Register_Modal = ReactDOM.render(<System_Register_Modal />, $("<div></div>").appendTo(document.body)[0]);
