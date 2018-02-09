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
			<section>
				<div className="container" style={{paddingTop: "50px", paddingBottom: "50px"}}>
					<div className="row">
					    <div className="col-md-2 col-md-offset-1">
				        	<div className="row">
				        		<img src="assets/images/man.svg" />
				        	</div>
					    </div>
					    <div className="col-md-8 col-md-offset-1">
			                <h3 style={{fontSize: "24px"}}>{this.state.data.nickname}<small style={{color: "red"}}>（{this.getReadableLevel()}）</small></h3>
			                <h3 style={{fontSize: "48px"}}><small>余额</small><span style={{color: "red"}}>￥{fn_fen2yuan_fixed(this.state.data.walletAmount)}</span></h3>
			                <p style={{fontSize: "14px"}}>这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。这里是欢迎信息。</p>
			                <a href="#" className="btn btn-danger" role="button" data-toggle="modal" data-target="#user_Recharge_Modal">充值</a>
					    </div>
					</div>
				</div>
			</section>
		);
	}
}

var user_Detail_Panel = ReactDOM.render(<User_Detail_Panel />, document.getElementById("user_Detail_Panel_Container"));
