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
		this.getPrice = this.getPrice.bind(this);
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
			React.createElement("select", {className: "form-control", onChange: e => this.handleChangeCommentTimes(e, index, field)}, 
				field == "start" && React.createElement("option", {value: ""}, "请选择开始时间"), 
				field == "end" && React.createElement("option", {value: ""}, "请选择结束时间"), 
				React.createElement("option", {value: "0:00"}, "0:00"), 
				React.createElement("option", {value: "0:30"}, "0:30"), 
				React.createElement("option", {value: "1:00"}, "1:00"), 
				React.createElement("option", {value: "1:30"}, "1:30"), 
				React.createElement("option", {value: "2:00"}, "2:00"), 
				React.createElement("option", {value: "2:30"}, "2:30"), 
				React.createElement("option", {value: "3:00"}, "3:00"), 
				React.createElement("option", {value: "3:30"}, "3:30"), 
				React.createElement("option", {value: "4:00"}, "4:00"), 
				React.createElement("option", {value: "4:30"}, "4:30"), 
				React.createElement("option", {value: "5:00"}, "5:00"), 
				React.createElement("option", {value: "5:30"}, "5:30"), 
				React.createElement("option", {value: "6:00"}, "6:00"), 
				React.createElement("option", {value: "6:30"}, "6:30"), 
				React.createElement("option", {value: "7:00"}, "7:00"), 
				React.createElement("option", {value: "7:30"}, "7:30"), 
				React.createElement("option", {value: "8:00"}, "8:00"), 
				React.createElement("option", {value: "8:30"}, "8:30"), 
				React.createElement("option", {value: "9:00"}, "9:00"), 
				React.createElement("option", {value: "9:30"}, "9:30"), 
				React.createElement("option", {value: "10:00"}, "10:00"), 
				React.createElement("option", {value: "10:30"}, "10:30"), 
				React.createElement("option", {value: "11:00"}, "11:00"), 
				React.createElement("option", {value: "11:30"}, "11:30"), 
				React.createElement("option", {value: "12:00"}, "12:00"), 
				React.createElement("option", {value: "12:30"}, "12:30"), 
				React.createElement("option", {value: "13:00"}, "13:00"), 
				React.createElement("option", {value: "13:30"}, "13:30"), 
				React.createElement("option", {value: "14:00"}, "14:00"), 
				React.createElement("option", {value: "14:30"}, "14:30"), 
				React.createElement("option", {value: "15:00"}, "15:00"), 
				React.createElement("option", {value: "15:30"}, "15:30"), 
				React.createElement("option", {value: "16:00"}, "16:00"), 
				React.createElement("option", {value: "16:30"}, "16:30"), 
				React.createElement("option", {value: "17:00"}, "17:00"), 
				React.createElement("option", {value: "17:30"}, "17:30"), 
				React.createElement("option", {value: "18:00"}, "18:00"), 
				React.createElement("option", {value: "18:30"}, "18:30"), 
				React.createElement("option", {value: "19:00"}, "19:00"), 
				React.createElement("option", {value: "19:30"}, "19:30"), 
				React.createElement("option", {value: "20:00"}, "20:00"), 
				React.createElement("option", {value: "20:30"}, "20:30"), 
				React.createElement("option", {value: "21:00"}, "21:00"), 
				React.createElement("option", {value: "21:30"}, "21:30"), 
				React.createElement("option", {value: "22:00"}, "22:00"), 
				React.createElement("option", {value: "22:30"}, "22:30"), 
				React.createElement("option", {value: "23:00"}, "23:00"), 
				React.createElement("option", {value: "23:30"}, "23:30")
			)
		);
	}

	getPrice() {
		if (system_Navbar.state.user) {
			switch (system_Navbar.state.user.level) {
				case 0: return this.state.data.price;
				case 1: return this.state.data.priceLevel1;
				case 2: return this.state.data.priceLevel2;
				case 3: return this.state.data.priceLevel3;
			}
		} else {
			return this.state.data.price;
		}
	}

	render() {
		return (
			React.createElement("section", null, 
				React.createElement("div", {className: "container", style: {paddingTop: "50px", paddingBottom: "50px"}}, 
					React.createElement("div", {className: "row"}, 
					    React.createElement("div", {className: "col-md-6"}, 
				        	React.createElement("div", {className: "row"}, 
				        		React.createElement("img", {className: "col-md-12", src: this.state.activePicture})
				        	), 
				            React.createElement("div", {className: "row", style: {paddingTop: "20px", paddingBottom: "20px"}}, 
				            	this.state.pictures.map(x =>
				            		React.createElement("img", {className: "col-md-2", src: x, onClick: e => this.handleClickPicture(x)})
				            	)
				            )
					    ), 
					    React.createElement("div", {className: "col-md-6"}, 
							this.state.data.isSoldOut == 1 &&
								React.createElement("h3", {style: {fontSize: "14px", color: "red"}}, "已下架！若要购买请联系管理员"), 
							
			                React.createElement("h3", {style: {fontSize: "24px"}}, this.state.data.name), 
			                React.createElement("h3", {style: {fontSize: "24px"}}, React.createElement("small", {style: {color: "red"}}, "￥", fn_fen2yuan_in_thousands(this.getPrice()))), 
			                React.createElement("p", {style: {fontSize: "14px"}}, this.state.data.desc), 
							this.state.data.isSoldOut == 0 &&
				                React.createElement("form", {className: "form-horizontal", role: "form"}, 
									(this.state.data.commentTemplate == 1 || this.state.data.commentTemplate == 2 || this.state.data.commentTemplate == 3) &&
										React.createElement("div", {className: "form-group"}, 
											React.createElement("label", {for: "inputPassword", className: "col-sm-3 control-label"}, "频道号"), 
											React.createElement("div", {className: "col-sm-9"}, React.createElement("input", {type: "text", className: "form-control", placeholder: "请输入频道号", value: this.state.comment.channel, onChange: e => this.handleChangeComment(e, "channel")}))
										), 
									
									this.state.data.commentTemplate == 1 &&
										React.createElement("div", null, 
											React.createElement("div", {className: "form-group"}, 
												React.createElement("label", {for: "inputPassword", className: "col-sm-3 control-label"}, "开播时间段1"), 
												React.createElement("div", {className: "col-sm-4"}, this.buildTimeOptions(0, "start")), 
												React.createElement("p", {className: "col-sm-1 text-center"}, "-"), 
												React.createElement("div", {className: "col-sm-4"}, this.buildTimeOptions(0, "end"))
											), 
											React.createElement("div", {className: "form-group"}, 
												React.createElement("label", {for: "inputPassword", className: "col-sm-3 control-label"}, "开播时间段2"), 
												React.createElement("div", {className: "col-sm-4"}, this.buildTimeOptions(1, "start")), 
												React.createElement("p", {className: "col-sm-1 text-center"}, "-"), 
												React.createElement("div", {className: "col-sm-4"}, this.buildTimeOptions(1, "end"))
											), 
											React.createElement("div", {className: "form-group"}, 
												React.createElement("label", {for: "inputPassword", className: "col-sm-3 control-label"}, "开播时间段3"), 
												React.createElement("div", {className: "col-sm-4"}, this.buildTimeOptions(2, "start")), 
												React.createElement("p", {className: "col-sm-1 text-center"}, "-"), 
												React.createElement("div", {className: "col-sm-4"}, this.buildTimeOptions(2, "end"))
											)
										), 
									
									this.state.data.commentTemplate == 3 &&
										React.createElement("div", {className: "form-group"}, 
											React.createElement("label", {for: "inputPassword", className: "col-sm-3 control-label"}, "是否是卡天频道"), 
											React.createElement("div", {className: "col-sm-9"}, 
												React.createElement("label", {className: "radio-inline"}, 
													React.createElement("input", {type: "radio", name: "isKtChannel", value: "1", checked: this.state.comment.isKtChannel == 1 ? true : false, onChange: e => this.handleChangeComment(e, "isKtChannel")}), " 是"
												), 
												React.createElement("label", {className: "radio-inline"}, 
													React.createElement("input", {type: "radio", name: "isKtChannel", value: "0", checked: this.state.comment.isKtChannel == 0 ? true : false, onChange: e => this.handleChangeComment(e, "isKtChannel")}), " 否"
												)
											)
										), 
									
									React.createElement("div", {className: "form-group"}, 
										React.createElement("label", {for: "inputPassword", className: "col-sm-3 control-label"}, "备注"), 
										React.createElement("div", {className: "col-sm-9"}, React.createElement("textarea", {className: "form-control", rows: "3", placeholder: "请输入备注", value: this.state.comment.basic, onChange: e => this.handleChangeComment(e, "basic")}))
									), 
									React.createElement("div", {className: "form-group"}, 
										React.createElement("label", {className: "col-sm-3 control-label"}, "购买数量"), 
										React.createElement("div", {className: "col-sm-9"}, React.createElement("input", {type: "number", min: "0", className: "form-control", placeholder: "请输入购买数量", value: "1", disabled: "disabled"}))
									), 
									React.createElement("div", {className: "form-group"}, 
										React.createElement("label", {className: "col-sm-3 control-label"}), 
										React.createElement("div", {className: "col-sm-9"}, React.createElement("a", {href: "#", className: "btn btn-danger", role: "button", onClick: this.buy}, "购买"))
									)
								)
							
					    )
					)
				)
			)
		);
	}
}

var goods_Detail_Panel = ReactDOM.render(React.createElement(Goods_Detail_Panel, null), document.getElementById("goods_Detail_Panel_Container"));
