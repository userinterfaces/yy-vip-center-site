class Goods_Detail_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePicture: null,
			pictures: [],
			data: {
				name: null,
				desc: null,
				price: 0
			}
		};
		this.reload = this.reload.bind(this);
		this.handleClickPicture = this.handleClickPicture.bind(this);
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
								<div className="form-group">
									<label for="inputPassword" className="col-sm-2 control-label">备注字段1</label>
									<div className="col-sm-10">
										<label className="checkbox-inline">
											<input type="checkbox" value="option1" /> 选项 1
										</label>
										<label className="checkbox-inline">
											<input type="checkbox" value="option2" /> 选项 2
										</label>
										<label className="checkbox-inline">
											<input type="checkbox" value="option3" /> 选项 3
										</label>
									</div>
								</div>
								<div className="form-group">
									<label for="inputPassword" className="col-sm-2 control-label">备注字段2</label>
									<div className="col-sm-10">
										<label className="radio-inline">
											<input type="radio" value="option1" checked /> 选项 1
										</label>
										<label className="radio-inline">
											<input type="radio" value="option2" /> 选项 2
										</label>
									</div>
								</div>
								<div className="form-group">
									<label for="inputPassword" className="col-sm-2 control-label">备注字段3</label>
									<div className="col-sm-10"><input type="text" className="form-control" placeholder="请输入备注字段3" /></div>
								</div>
								<div className="form-group">
									<label for="inputPassword" className="col-sm-2 control-label">备注字段4</label>
									<div className="col-sm-10"><input type="text" className="form-control" placeholder="请输入备注字段4" /></div>
								</div>
								<div className="form-group">
									<label for="inputPassword" className="col-sm-2 control-label">备注字段5</label>
									<div className="col-sm-10"><textarea className="form-control" rows="3" placeholder="请输入备注字段5"></textarea></div>
								</div>
								<div className="form-group">
									<label className="col-sm-2 control-label">购买数量</label>
									<div className="col-sm-10"><input type="number" min="0" className="form-control" placeholder="请输入购买数量" value="1" disabled="disabled" /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-2 control-label"></label>
									<div className="col-sm-10"><a href="#" className="btn btn-danger" role="button">购买</a></div>
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
