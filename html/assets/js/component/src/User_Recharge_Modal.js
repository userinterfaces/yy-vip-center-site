class User_Recharge_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rawPasswordSeriesCode: null
		};
		this.handleClickSubmit = this.handleClickSubmit.bind(this);
	}

	componentDidMount() {
		$('#user_Recharge_Modal').on('shown.bs.modal', function(e){
			$("#user_Recharge_Modal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var state = this.state;
		state[field] = e.target.value;
		this.setState(state);
	}

	handleClickSubmit() {
		$("#user_Recharge_Modal_submitButton").attr("disabled", true);
		var modal = this;
		fn_raw_api({
			"apiName": "My_Recharge_Api",
			"token": fn_get_token(),
			"rawPasswordSeriesCode": this.state.rawPasswordSeriesCode
		}, function(resp){
			if (resp.code == 0) {
				user_Detail_Panel.reload();
				modal.hide();
			} else {
				toastr.warning(resp.message);
			}
			$("#user_Recharge_Modal_submitButton").attr("disabled", false);
		});
	}

	show() {
		$("#user_Recharge_Modal").modal({keyboard: true});
	}

	hide() {
		$("#user_Recharge_Modal").modal("hide");
		this.setState({
			rawPasswordSeriesCode: ""
		});
	}

	render() {
		return (
			<div className="modal fade" id="user_Recharge_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h3>充值</h3>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">充值卡密序列号</label>
									<div className="col-sm-7"><input type="text" className="form-control" placeholder="请输入充值卡密序列号" value={this.state.rawPasswordSeriesCode} onChange={e => this.handleChange(e, "rawPasswordSeriesCode")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" id="user_Recharge_Modal_submitButton" onClick={this.handleClickSubmit}>确定</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var user_Recharge_Modal = ReactDOM.render(<User_Recharge_Modal />, $("<div></div>").appendTo(document.body)[0]);
