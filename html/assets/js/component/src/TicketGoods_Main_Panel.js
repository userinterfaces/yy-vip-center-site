class TicketGoods_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			pager: {
				isFirstPage: null,
				isLastPage: null,
				pageIndex: null,
				pageSize: null,
				totalPages: null,
				totalRecords: null
			}
		};
		this.reload = this.reload.bind(this);
		this.getGoodsCoverImage = this.getGoodsCoverImage.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	componentDidMount() {
		system_Navbar.setState({activeCategoryTicket: true});
		this.reload();
	}

	reload() {
		var panel = this;
		fn_public_api({
			"apiName": "TicketGoods_QueryList_Api",
			"pageIndex": 0,
			"pageSize": 15
		}, function(resp){
			panel.setState({data: resp.data, pager: resp.pager});
		});
	}

	loadMore() {
		var panel = this;
		fn_public_api({
			"apiName": "TicketGoods_QueryList_Api",
			"pageIndex": this.state.pager.pageIndex+1,
			"pageSize": this.state.pager.pageSize
		}, function(resp){
			var data = panel.state.data.concat(resp.data);
			panel.setState({data: data, pager: resp.pager});
		});
	}

	getGoodsCoverImage(goods) {
		var url = JSON.parse(goods.pictureUrls)[0];
		if (url == null) {
			return null;
		}
		return url;
	}

	render() {
		return (
			<div>
				<section id="category-desc">
					<div className="container" style={{paddingTop: "100px"}}>
						<div className="row">
							<div className="col-sm-6 col-sm-offset-3">
								<div className="pfblock-header wow fadeInUp">
									<h2 className="pfblock-title">卡密商品</h2>
									<div className="pfblock-subtitle">
										自动发货
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="container" style={{paddingTop: "100px", paddingBottom: "100px"}}>
						<div className="row">
							{this.state.data.map(x => 
							    <div className="col-sm-6 col-md-3">
							        <div className="thumbnail">
							        	<div style={{height: "250px", overflow: "hidden"}}>
							        		<a href={"ticket-goods-detail.html?id="+x.id}><img className="img-responsive" src={this.getGoodsCoverImage(x)}/></a>
							        	</div>
							            <div className="caption">
							                <a href={"ticket-goods-detail.html?id="+x.id}><h3 style={{fontSize: "24px"}}>{x.name}<small style={{color: "red"}}>￥{fn_fen2yuan_in_thousands(x.price)}</small></h3></a>
							                <p style={{fontSize: "14px"}}>{x.desc}</p>
							                <p><a href={"ticket-goods-detail.html?id="+x.id} className="btn btn-info" role="button">购买</a></p>
							            </div>
							        </div>
							    </div>
							)}
							{this.state.data.length == 0 &&
								<p className="text-center">暂无数据</p>
							}
						</div>
						{this.state.data.length > 0 && this.state.pager.isLastPage == 0 &&
							<div className="row" style={{paddingTop: "100px"}}>
								<div className="col-md-12">
							        <a href="javascript:void(0);" className="btn btn-primary center-block" role="button" style={{width: "240px", paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", letterSpacing: "3px"}} onClick={this.loadMore}>加载更多</a>
							    </div>
							</div>
						}
						{this.state.pager.isLastPage == 1 &&
							<p className="text-center">暂无更多数据</p>
						}
					</div>
				</section>
			</div>
		);
	}
}

var ticketGoods_Main_Panel = ReactDOM.render(<TicketGoods_Main_Panel />, document.getElementById("ticketGoods_Main_Panel_Container"));
