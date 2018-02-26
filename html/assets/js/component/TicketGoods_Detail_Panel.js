class TicketGoods_Detail_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activePicture: null,
			pictures: [],
			data: {
				name: null,
				desc: null,
				price: 0
			},
			amount: 1
		};
		this.reload = this.reload.bind(this);
		this.handleClickPicture = this.handleClickPicture.bind(this);
		this.handleChangeAmount = this.handleChangeAmount.bind(this);
		this.buy = this.buy.bind(this);
		this.getPrice = this.getPrice.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	reload() {
		var panel = this;
		fn_public_api({
			"apiName": "TicketGoods_QueryDetail_Api",
			"ticketGoodsId": fn_url_args().id
		}, function(resp){
			var pictures = JSON.parse(resp.data.pictureUrls);
			panel.setState({data: resp.data, pictures: pictures, activePicture: pictures[0]});
		});
	}

	handleClickPicture(picture) {
		this.setState({activePicture: picture});
	}

	handleChangeAmount(e) {
		var amountValue = e.target.value;
		var amount = parseInt(amountValue);
		if (amount > 0) {
			this.setState({amount: amount});
		}
	}

	buy() {
		fn_api({
			"apiName": "MixOrder_BuyTicketGoods_Api",
			"ticketGoodsId": fn_url_args().id,
			"amount": this.state.amount
		}, function(resp){
			window.location.href = "my.html";
		});
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
									React.createElement("div", {className: "form-group"}, 
										React.createElement("label", {className: "col-sm-3 control-label"}, "购买数量"), 
										React.createElement("div", {className: "col-sm-9"}, React.createElement("input", {type: "number", min: "1", className: "form-control", placeholder: "请输入购买数量", value: this.state.amount, onChange: e => this.handleChangeAmount(e)}))
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

var ticketGoods_Detail_Panel = ReactDOM.render(React.createElement(TicketGoods_Detail_Panel, null), document.getElementById("ticketGoods_Detail_Panel_Container"));
