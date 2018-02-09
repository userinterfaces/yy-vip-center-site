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
				React.createElement("div", null, 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		} else if (template == 1) {
			return (
				React.createElement("div", null, 
					React.createElement("span", null, "【频道号】：", comment.channel), 
					React.createElement("span", null, "【开播时间段】：", comment.times[0].start+"-"+comment.times[0].end + "; " + comment.times[1].start+"-"+comment.times[1].end+ "; " + comment.times[2].start+"-"+comment.times[2].end), 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		} else if (template == 2) {
			return (
				React.createElement("div", null, 
					React.createElement("span", null, "【频道号】：", comment.channel), 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		} else if (template == 3) {
			return (
				React.createElement("div", null, 
					React.createElement("span", null, "【频道号】：", comment.channel), 
					React.createElement("span", null, "【是否是卡天频道】：", comment.isKtChannel==1?"是":"否"), 
					React.createElement("span", null, "【留言】：", comment.basic)
				)
			);
		}
	}

	render() {
		return (
			React.createElement("section", null, 
				React.createElement("div", {className: "container", style: {paddingTop: "50px", paddingBottom: "50px"}}, 
					React.createElement("div", {className: "row"}, 
					    React.createElement("div", {className: "col-md-12"}, 
			                React.createElement("ul", {className: "nav nav-tabs"}, 
								React.createElement("li", {className: "active"}, React.createElement("a", {href: "#all", "data-toggle": "tab", "data-search-status": "0"}, "全部订单")), 
								React.createElement("li", null, React.createElement("a", {href: "#undisposed", "data-toggle": "tab", "data-search-status": "1"}, "未处理")), 
								React.createElement("li", null, React.createElement("a", {href: "#disposed", "data-toggle": "tab", "data-search-status": "2"}, "已处理")), 
								React.createElement("li", null, React.createElement("a", {href: "#refundRequest", "data-toggle": "tab", "data-search-status": "3"}, "退货中")), 
								React.createElement("li", null, React.createElement("a", {href: "#refundRequestAgree", "data-toggle": "tab", "data-search-status": "4"}, "已退货")), 
								React.createElement("li", null, React.createElement("a", {href: "#refundRequestReject", "data-toggle": "tab", "data-search-status": "5"}, "退货被拒绝"))
							)
					    )
					), 
					React.createElement("div", {className: "row", style: {paddingTop: "30px"}}, 
					    React.createElement("div", {className: "col-md-12"}, 
							React.createElement("div", {className: "tab-content"}, 
								React.createElement("div", {className: "tab-pane active", id: "all"}, 
									React.createElement("table", {className: "table table-striped table-hover"}, 
										React.createElement("thead", null, 
											React.createElement("tr", null, 
												React.createElement("th", null, "订单号"), 
												React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
												React.createElement("th", null, "商品"), 
												React.createElement("th", null, "备注"), 
												React.createElement("th", null, "状态"), 
												React.createElement("th", null, "下单时间")
											)
										), 
										React.createElement("tbody", null, 
											this.state.data.map((x) => React.createElement("tr", null, 
												React.createElement("td", null, x.id), 
												React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
												React.createElement("td", null, x.goodsName), 
												React.createElement("td", null, this.buildReadableComment(x)), 
												React.createElement("td", null, 
													x.isDispose == 1 &&
														React.createElement("span", {className: "label label-default"}, "已处理"), 
													
													x.isDispose == 0 &&
														React.createElement("span", {className: "label label-success"}, "未处理"), 
													
													x.refundRequestStatus == 1 &&
														React.createElement("span", {className: "label label-danger"}, "退货中"), 
													
													x.refundRequestStatus == 2 &&
														React.createElement("span", {className: "label label-info"}, "已退货"), 
													
													x.refundRequestStatus == 3 &&
														React.createElement("span", {className: "label label-warning"}, "退货被拒绝")
													
												), 
												React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss"))
											))
										)
									)
								), 
								React.createElement("div", {className: "tab-pane", id: "undisposed"}, 
									React.createElement("table", {className: "table table-striped table-hover"}, 
										React.createElement("thead", null, 
											React.createElement("tr", null, 
												React.createElement("th", null, "订单号"), 
												React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
												React.createElement("th", null, "商品"), 
												React.createElement("th", null, "备注"), 
												React.createElement("th", null, "下单时间")
											)
										), 
										React.createElement("tbody", null, 
											this.state.data.map((x) => React.createElement("tr", null, 
												React.createElement("td", null, x.id), 
												React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
												React.createElement("td", null, x.goodsName), 
												React.createElement("td", null, this.buildReadableComment(x)), 
												React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss"))
											))
										)
									)
								), 
								React.createElement("div", {className: "tab-pane", id: "disposed"}, 
									React.createElement("table", {className: "table table-striped table-hover"}, 
										React.createElement("thead", null, 
											React.createElement("tr", null, 
												React.createElement("th", null, "订单号"), 
												React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
												React.createElement("th", null, "商品"), 
												React.createElement("th", null, "备注"), 
												React.createElement("th", null, "下单时间"), 
												React.createElement("th", null, "处理时间"), 
												React.createElement("th", null, "操作")
											)
										), 
										React.createElement("tbody", null, 
											this.state.data.map((x) => React.createElement("tr", null, 
												React.createElement("td", null, x.id), 
												React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
												React.createElement("td", null, x.goodsName), 
												React.createElement("td", null, this.buildReadableComment(x)), 
												React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
												React.createElement("td", null, fn_format_date(new Date(x.dtDispose), "yyyy-MM-dd hh:mm:ss")), 
												React.createElement("td", null, 
													React.createElement("button", {className: "btn btn-warning btn-sm", onClick: e => this.handleClickRefundRequest(x)}, React.createElement("i", {className: "fa fa-times", "aria-hidden": "true"}), " 申请退货")
												)
											))
										)
									)
								), 
								React.createElement("div", {className: "tab-pane", id: "refundRequest"}, 
									React.createElement("table", {className: "table table-striped table-hover"}, 
										React.createElement("thead", null, 
											React.createElement("tr", null, 
												React.createElement("th", null, "订单号"), 
												React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
												React.createElement("th", null, "商品"), 
												React.createElement("th", null, "备注"), 
												React.createElement("th", null, "下单时间"), 
												React.createElement("th", null, "退货申请时间")
											)
										), 
										React.createElement("tbody", null, 
											this.state.data.map((x) => React.createElement("tr", null, 
												React.createElement("td", null, x.id), 
												React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
												React.createElement("td", null, x.goodsName), 
												React.createElement("td", null, x.refundRequestComment), 
												React.createElement("td", null, fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")), 
												React.createElement("td", null, fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss"))
											))
										)
									)
								), 
								React.createElement("div", {className: "tab-pane", id: "refundRequestAgree"}, 
									React.createElement("table", {className: "table table-striped table-hover"}, 
										React.createElement("thead", null, 
											React.createElement("tr", null, 
												React.createElement("th", null, "订单号"), 
												React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
												React.createElement("th", null, "商品"), 
												React.createElement("th", null, "备注"), 
												React.createElement("th", null, "退货申请时间"), 
												React.createElement("th", null, "审核时间")
											)
										), 
										React.createElement("tbody", null, 
											this.state.data.map((x) => React.createElement("tr", null, 
												React.createElement("td", null, x.id), 
												React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
												React.createElement("td", null, x.goodsName), 
												React.createElement("td", null, x.refundRequestComment), 
												React.createElement("td", null, fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")), 
												React.createElement("td", null, fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss"))
											))
										)
									)
								), 
								React.createElement("div", {className: "tab-pane", id: "refundRequestReject"}, 
									React.createElement("table", {className: "table table-striped table-hover"}, 
										React.createElement("thead", null, 
											React.createElement("tr", null, 
												React.createElement("th", null, "订单号"), 
												React.createElement("th", null, "金额", React.createElement("small", null, "(元)")), 
												React.createElement("th", null, "商品"), 
												React.createElement("th", null, "备注"), 
												React.createElement("th", null, "退货申请时间"), 
												React.createElement("th", null, "审核时间")
											)
										), 
										React.createElement("tbody", null, 
											this.state.data.map((x) => React.createElement("tr", null, 
												React.createElement("td", null, x.id), 
												React.createElement("td", null, fn_fen2yuan_in_thousands(x.orderAmount)), 
												React.createElement("td", null, x.goodsName), 
												React.createElement("td", null, x.refundRequestComment), 
												React.createElement("td", null, fn_format_date(new Date(x.dtRefundRequest), "yyyy-MM-dd hh:mm:ss")), 
												React.createElement("td", null, fn_format_date(new Date(x.dtAuditRefundRequest), "yyyy-MM-dd hh:mm:ss"))
											))
										)
									)
								)
							)
					    )
					), 
					React.createElement("div", {className: "row"}, 
					    React.createElement("div", {className: "col-md-12"}, 
						    React.createElement("ul", {className: "pager"}, 
								React.createElement("li", {className: this.state.pager.isFirstPage == 1 ? "previous disabled" : "previous", onClick: this.handleClickPreviousPage}, React.createElement("a", {href: "javascript:void(0);"}, "← 上一页")), 
								React.createElement("li", {className: this.state.pager.isLastPage == 1 ? "next disabled" : "next", onClick: this.handleClickNextPage}, React.createElement("a", {href: "javascript:void(0);"}, "下一页 →"))
							)
					    )
					)
				)
			)
		);
	}
}

var mixOrder_Main_Panel = ReactDOM.render(React.createElement(MixOrder_Main_Panel, null), document.getElementById("mixOrder_Main_Panel_Container"));
