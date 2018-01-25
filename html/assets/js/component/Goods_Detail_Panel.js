class Goods_Detail_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePicture: null,
			pictures: [],
			data: {
				name: null,
				desc: null,
				price: 0,
				commentTemplate: 0
			},
			comment: {
				basic: null,
				channel: null,
				times: [
					{start: null, end: null},
					{start: null, end: null},
					{start: null, end: null}
				],
				isKtChannel: 0
			}
		};
		this.reload = this.reload.bind(this);
		this.handleClickPicture = this.handleClickPicture.bind(this);
		this.buy = this.buy.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	reload() {
		var panel = this;
		fn_public_api({
			"apiName": "Goods_QueryDetail_Api",
			"goodsId": fn_url_args().id
		}, function(resp){
			var pictures = JSON.parse(resp.data.pictureUrls);
			panel.setState({data: resp.data, pictures: pictures, activePicture: pictures[0]});
		});
	}

	handleClickPicture(picture) {
		this.setState({activePicture: picture});
	}

	buy() {
		var commentTemplate = this.state.data.commentTemplate;
		if ((commentTemplate == 1 || commentTemplate == 2 || commentTemplate == 3) && this.state.comment.channel == null) {
			toastr.error("请填写频道号");
			return;
		}
		fn_api({
			"apiName": "MixOrder_Buy_Api",
			"goodsId": fn_url_args().id,
			"comment": JSON.stringify(this.state.comment)
		}, function(resp){
			window.location.href = "my.html?cid=" + fn_url_args().cid;
		});
	}

	handleChangeComment(e, field) {
		var comment = this.state.comment;
		comment[field] = e.target.value;
		this.setState({comment: comment});
	}

	handleChangeCommentTimes(e, index, field) {
		var comment = this.state.comment;
		comment.times[index][field] = e.target.value;
		this.setState({comment: comment});
	}

	buildTimeOptions(index, field) {
		return (
			<select className="form-control" onChange={e => this.handleChangeCommentTimes(e, index, field)}>
				{field == "start" && <option value="">请选择开始时间</option>}
				{field == "end" && <option value="">请选择结束时间</option>}
				<option value="0:00">0点</option>
				<option value="0:30">0点半</option>
				<option value="1:00">1点</option>
				<option value="1:30">1点半</option>
				<option value="2:00">2点</option>
				<option value="2:30">2点半</option>
				<option value="3:00">3点</option>
				<option value="3:30">3点半</option>
				<option value="4:00">4点</option>
				<option value="4:30">4点半</option>
				<option value="5:00">5点</option>
				<option value="5:30">5点半</option>
				<option value="6:00">6点</option>
				<option value="6:30">6点半</option>
				<option value="7:00">7点</option>
				<option value="7:30">7点半</option>
				<option value="8:00">8点</option>
				<option value="8:30">8点半</option>
				<option value="9:00">9点</option>
				<option value="9:30">9点半</option>
				<option value="10:00">10点</option>
				<option value="10:30">10点半</option>
				<option value="11:00">11点</option>
				<option value="11:30">11点半</option>
				<option value="12:00">12点</option>
				<option value="12:30">12点半</option>
				<option value="13:00">13点</option>
				<option value="13:30">13点半</option>
				<option value="14:00">14点</option>
				<option value="14:30">14点半</option>
				<option value="15:00">15点</option>
				<option value="15:30">15点半</option>
				<option value="16:00">16点</option>
				<option value="16:30">16点半</option>
				<option value="17:00">17点</option>
				<option value="17:30">17点半</option>
				<option value="18:00">18点</option>
				<option value="18:30">18点半</option>
				<option value="19:00">19点</option>
				<option value="19:30">19点半</option>
				<option value="20:00">20点</option>
				<option value="20:30">20点半</option>
				<option value="21:00">21点</option>
				<option value="21:30">21点半</option>
				<option value="22:00">22点</option>
				<option value="22:30">22点半</option>
				<option value="23:00">23点</option>
				<option value="23:30">23点半</option>
			</select>
		);
	}

	render() {
		return (
			<section>
				<div className="container" style={{paddingTop: "50px", paddingBottom: "50px"}}>
					<div className="row">
					    <div className="col-md-6">
				        	<div className="row">
				        		<img className="col-md-12" src={this.state.activePicture} />
				        	</div>
				            <div className="row" style={{paddingTop: "20px", paddingBottom: "20px"}}>
				            	{this.state.pictures.map(x =>
				            		<img className="col-md-2" src={x} onClick={e => this.handleClickPicture(x)} />
				            	)}
				            </div>
					    </div>
					    <div className="col-md-6">
			                <h3 style={{fontSize: "24px"}}>{this.state.data.name}</h3>
			                <h3 style={{fontSize: "24px"}}><small style={{color: "red"}}>￥{fn_fen2yuan_in_thousands(this.state.data.price)}</small></h3>
			                <p style={{fontSize: "14px"}}>{this.state.data.desc}</p>
			                <form className="form-horizontal" role="form">
								{(this.state.data.commentTemplate == 1 || this.state.data.commentTemplate == 2 || this.state.data.commentTemplate == 3) &&
									<div className="form-group">
										<label for="inputPassword" className="col-sm-3 control-label">频道号</label>
										<div className="col-sm-9"><input type="text" className="form-control" placeholder="请输入频道号" value={this.state.comment.channel} onChange={e => this.handleChangeComment(e, "channel")}/></div>
									</div>
								}
								{this.state.data.commentTemplate == 1 &&
									<div>
										<div className="form-group">
											<label for="inputPassword" className="col-sm-3 control-label">开播时间段1</label>
											<div className="col-sm-4">{this.buildTimeOptions(0, "start")}</div>
											<p className="col-sm-1 text-center">-</p>
											<div className="col-sm-4">{this.buildTimeOptions(0, "end")}</div>
										</div>
										<div className="form-group">
											<label for="inputPassword" className="col-sm-3 control-label">开播时间段2</label>
											<div className="col-sm-4">{this.buildTimeOptions(1, "start")}</div>
											<p className="col-sm-1 text-center">-</p>
											<div className="col-sm-4">{this.buildTimeOptions(1, "end")}</div>
										</div>
										<div className="form-group">
											<label for="inputPassword" className="col-sm-3 control-label">开播时间段3</label>
											<div className="col-sm-4">{this.buildTimeOptions(2, "start")}</div>
											<p className="col-sm-1 text-center">-</p>
											<div className="col-sm-4">{this.buildTimeOptions(2, "end")}</div>
										</div>
									</div>
								}
								{this.state.data.commentTemplate == 3 &&
									<div className="form-group">
										<label for="inputPassword" className="col-sm-3 control-label">是否是卡天频道</label>
										<div className="col-sm-9">
											<label className="radio-inline">
												<input type="radio" name="isKtChannel" value="1" checked={this.state.comment.isKtChannel == 1 ? true : false} onChange={e => this.handleChangeComment(e, "isKtChannel")} /> 是
											</label>
											<label className="radio-inline">
												<input type="radio" name="isKtChannel" value="0" checked={this.state.comment.isKtChannel == 0 ? true : false} onChange={e => this.handleChangeComment(e, "isKtChannel")} /> 否
											</label>
										</div>
									</div>
								}
								<div className="form-group">
									<label for="inputPassword" className="col-sm-3 control-label">备注</label>
									<div className="col-sm-9"><textarea className="form-control" rows="3" placeholder="请输入备注" value={this.state.comment.basic} onChange={e => this.handleChangeComment(e, "basic")}></textarea></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">购买数量</label>
									<div className="col-sm-9"><input type="number" min="0" className="form-control" placeholder="请输入购买数量" value="1" disabled="disabled" /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-9"><a href="#" className="btn btn-danger" role="button" onClick={this.buy}>购买</a></div>
								</div>
							</form>
					    </div>
					</div>
				</div>
			</section>
		);
	}
}

var goods_Detail_Panel = ReactDOM.render(<Goods_Detail_Panel />, document.getElementById("goods_Detail_Panel_Container"));
