class MixOrder_Main_Panel extends React.Component {
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
			},
			searchStatus: 0
		};
		this.reload = this.reload.bind(this);
		this.handleClickPreviousPage = this.handleClickPreviousPage.bind(this);
		this.handleClickNextPage = this.handleClickNextPage.bind(this);
		this.handleClickRefundRequest = this.handleClickRefundRequest.bind(this);
	}

	componentDidMount() {
		var panel = this;
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			panel.setState({searchStatus: e.target.dataset.searchStatus});
			panel.reload();
		})
		this.reload();
	}

	reload(pageIndex, pageSize) {
		if (pageIndex == null) {
			pageIndex = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}
		var panel = this;
		fn_api({
			"apiName": "MixOrder_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize,
			"searchStatus": this.state.searchStatus
		}, function(resp){
			panel.setState({data: resp.data, pager: resp.pager});
		});
	}

	handleClickPreviousPage(pageIndex) {
		if (this.state.pager.isFirstPage == 1) {
			return;
		}
		this.reload(this.state.pager.pageIndex - 1, 15);
	}

	handleClickNextPage(pageIndex) {
		if (this.state.pager.isLastPage == 1) {
			return;
		}
		this.reload(this.state.pager.pageIndex + 1, 15);
	}

	handleClickRefundRequest(mixOrder) {
		var panel = this;
		fn_api({
			"apiName": "MixOrder_RefundRequest_Api",
			"orderId": mixOrder.id
		}, function(resp){
			panel.reload();
		});
	}

	buildReadableComment(mixOrder) {
		var template = mixOrder.goodsCommentTemplate;
		var comment = JSON.parse(mixOrder.comment);
		if (template == 0) {
			return (
				<div>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		} else if (template == 1) {
			return (
				<div>
					<span>【频道号】：{comment.channel}</span>
					<span>【开播时间段】：{comment.times[0].start+"-"+comment.times[0].end + "; " + comment.times[1].start+"-"+comment.times[1].end+ "; " + comment.times[2].start+"-"+comment.times[2].end}</span>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		} else if (template == 2) {
			return (
				<div>
					<span>【频道号】：{comment.channel}</span>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		} else if (template == 3) {
			return (
				<div>
					<span>【频道号】：{comment.channel}</span>
					<span>【是否是卡天频道】：{comment.isKtChannel==1?"是":"否"}</span>
					<span>【留言】：{comment.basic}</span>
				</div>
			);
		}
	}

	render() {
		return (
			<section>
				<div className="container" style={{paddingTop: "50px", paddingBottom: "50px"}}>
					<div className="row">
					    <div className="col-md-12">
			                <ul className="nav nav-tabs">
								<li className="active"><a href="#all" data-toggle="tab" data-search-status="0">全部订单</a></li>
								<li><a href="#undisposed" data-toggle="tab" data-search-status="1">未处理</a></li>
								<li><a href="#disposed" data-toggle="tab" data-search-status="2">已处理</a></li>
								<li><a href="#refundRequest" data-toggle="tab" data-search-status="3">退货中</a></li>
								<li><a href="#refundRequestAgree" data-toggle="tab" data-search-status="4">已退货</a></li>
								<li><a href="#refundRequestReject" data-toggle="tab" data-search-status="5">退货被拒绝</a></li>
							</ul>
					    </div>
					</div>
					<div className="row" style={{paddingTop: "30px"}}>
					    <div className="col-md-12">
							<div className="tab-content">
								<div className="tab-pane active" id="all">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th>订单号</th>
												<th>金额<small>(元)</small></th>
												<th>商品</th>
												<th>备注</th>
												<th>状态</th>
												<th>下单时间</th>
											</tr>
										</thead>
										<tbody>
											{this.state.data.map((x) => <tr>
												<td>{x.id}</td>
												<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
												<td>{x.goodsName}</td>
												<td>{this.buildReadableComment(x)}</td>
												<td>
													{x.isDispose == 1 &&
														<span className="label label-default">已处理</span>
													}
													{x.isDispose == 0 &&
														<span className="label label-success">未处理</span>
													}
													{x.refundRequestStatus == 1 &&
														<span className="label label-danger">退货中</span>
													}
													{x.refundRequestStatus == 2 &&
														<span className="label label-info">已退货</span>
													}
													{x.refundRequestStatus == 3 &&
														<span className="label label-warning">退货被拒绝</span>
													}
												</td>
												<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
											</tr>)}
										</tbody>
									</table>
								</div>
								<div className="tab-pane" id="undisposed">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th>订单号</th>
												<th>金额<small>(元)</small></th>
												<th>商品</th>
												<th>备注</th>
												<th>下单时间</th>
											</tr>
										</thead>
										<tbody>
											{this.state.data.map((x) => <tr>
												<td>{x.id}</td>
												<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
												<td>{x.goodsName}</td>
												<td>{this.buildReadableComment(x)}</td>
												<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
											</tr>)}
										</tbody>
									</table>
								</div>
								<div className="tab-pane" id="disposed">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th>订单号</th>
												<th>金额<small>(元)</small></th>
												<th>商品</th>
												<th>备注</th>
												<th>下单时间</th>
												<th>处理时间</th>
												<th>操作</th>
											</tr>
										</thead>
										<tbody>
											{this.state.data.map((x) => <tr>
												<td>{x.id}</td>
												<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
												<td>{x.goodsName}</td>
												<td>{this.buildReadableComment(x)}</td>
												<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
												<td>{fn_format_date(new Date(x.dtDispose), "yyyy-MM-dd hh:mm:ss")}</td>
												<td>
													<button className="btn btn-warning btn-sm" onClick={e => this.handleClickRefundRequest(x)}><i className="fa fa-times" aria-hidden="true"></i> 申请退货</button>
												</td>
											</tr>)}
										</tbody>
									</table>
								</div>
								<div className="tab-pane" id="refundRequest">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th>订单号</th>
												<th>金额<small>(元)</small></th>
												<th>商品</th>
												<th>备注</th>
												<th>下单时间</th>
												<th>退货申请时间</th>
											</tr>
										</thead>
										<tbody>
											{this.state.data.map((x) => <tr>
												<td>{x.id}</td>
												<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
												<td>{x.goodsName}</td>
												<td>{x.refundRequestComment}</td>
												<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
												<td>{fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
											</tr>)}
										</tbody>
									</table>
								</div>
								<div className="tab-pane" id="refundRequestAgree">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th>订单号</th>
												<th>金额<small>(元)</small></th>
												<th>商品</th>
												<th>备注</th>
												<th>退货申请时间</th>
												<th>审核时间</th>
											</tr>
										</thead>
										<tbody>
											{this.state.data.map((x) => <tr>
												<td>{x.id}</td>
												<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
												<td>{x.goodsName}</td>
												<td>{x.refundRequestComment}</td>
												<td>{fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
												<td>{fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
											</tr>)}
										</tbody>
									</table>
								</div>
								<div className="tab-pane" id="refundRequestReject">
									<table className="table table-striped table-hover">
										<thead>
											<tr>
												<th>订单号</th>
												<th>金额<small>(元)</small></th>
												<th>商品</th>
												<th>备注</th>
												<th>退货申请时间</th>
												<th>审核时间</th>
											</tr>
										</thead>
										<tbody>
											{this.state.data.map((x) => <tr>
												<td>{x.id}</td>
												<td>{fn_fen2yuan_in_thousands(x.orderAmount)}</td>
												<td>{x.goodsName}</td>
												<td>{x.refundRequestComment}</td>
												<td>{fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
												<td>{fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss")}</td>
											</tr>)}
										</tbody>
									</table>
								</div>
							</div>
					    </div>
					</div>
					<div className="row">
					    <div className="col-md-12">
						    <ul className="pager">
								<li className={this.state.pager.isFirstPage == 1 ? "previous disabled" : "previous"} onClick={this.handleClickPreviousPage}><a href="javascript:void(0);">&larr; 上一页</a></li>
								<li className={this.state.pager.isLastPage == 1 ? "next disabled" : "next"} onClick={this.handleClickNextPage}><a href="javascript:void(0);">下一页 &rarr;</a></li>
							</ul>
					    </div>
					</div>
				</div>
			</section>
		);
	}
}

var mixOrder_Main_Panel = ReactDOM.render(<MixOrder_Main_Panel />, document.getElementById("mixOrder_Main_Panel_Container"));
