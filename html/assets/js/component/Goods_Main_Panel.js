class Goods_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: {
				id: null,
				name: null,
				desc: null
			},
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
		var panel = this;
		system_Navbar.appendActiveCategoryCallback("goods_Main_Panel", function(activeCategory){
			panel.reload(activeCategory);
		});
	}

	reload(category) {
		var panel = this;
		fn_public_api({
			"apiName": "Goods_QueryList_Api",
			"pageIndex": 0,
			"pageSize": 15,
			"categoryId": category.id
		}, function(resp){
			panel.setState({category: category, data: resp.data, pager: resp.pager});
		});
	}

	loadMore() {
		var panel = this;
		fn_public_api({
			"apiName": "Goods_QueryList_Api",
			"pageIndex": this.state.pager.pageIndex+1,
			"pageSize": this.state.pager.pageSize,
			"categoryId": this.state.category.id
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
			React.createElement("div", null, 
				React.createElement("section", {id: "category-desc"}, 
					React.createElement("div", {className: "container", style: {paddingTop: "100px"}}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, 
								React.createElement("div", {className: "pfblock-header wow fadeInUp"}, 
									React.createElement("h2", {className: "pfblock-title"}, this.state.category.name), 
									React.createElement("div", {className: "pfblock-subtitle"}, 
										this.state.category.desc
									)
								)
							)
						)
					)
				), 
				React.createElement("section", null, 
					React.createElement("div", {className: "container", style: {paddingTop: "100px", paddingBottom: "100px"}}, 
						React.createElement("div", {className: "row"}, 
							this.state.data.map(x => 
							    React.createElement("div", {className: "col-sm-6 col-md-3"}, 
							        React.createElement("div", {className: "thumbnail"}, 
							        	React.createElement("div", {style: {height: "250px", overflow: "hidden"}}, 
							        		React.createElement("a", {href: "goods-detail.html?id="+x.id+"&cid="+this.state.category.id}, React.createElement("img", {className: "img-responsive", src: this.getGoodsCoverImage(x)}))
							        	), 
							            React.createElement("div", {className: "caption"}, 
							                React.createElement("a", {href: "goods-detail.html?id="+x.id+"&cid="+this.state.category.id}, React.createElement("h3", {style: {fontSize: "24px"}}, x.name, React.createElement("small", {style: {color: "red"}}, "￥", fn_fen2yuan_in_thousands(x.price)))), 
							                React.createElement("p", {style: {fontSize: "14px"}}, x.desc), 
							                React.createElement("p", null, React.createElement("a", {href: "goods-detail.html?id="+x.id+"&cid="+this.state.category.id, className: "btn btn-info", role: "button"}, "购买"))
							            )
							        )
							    )
							), 
							this.state.data.length == 0 &&
								React.createElement("p", {className: "text-center"}, "暂无数据")
							
						), 
						this.state.data.length > 0 && this.state.pager.isLastPage == 0 &&
							React.createElement("div", {className: "row", style: {paddingTop: "100px"}}, 
								React.createElement("div", {className: "col-md-12"}, 
							        React.createElement("a", {href: "javascript:void(0);", className: "btn btn-primary center-block", role: "button", style: {width: "240px", paddingTop: "10px", paddingBottom: "10px", fontSize: "14px", letterSpacing: "3px"}, onClick: this.loadMore}, "加载更多")
							    )
							), 
						
						this.state.pager.isLastPage == 1 &&
							React.createElement("p", {className: "text-center"}, "暂无更多数据")
						
					)
				)
			)
		);
	}
}

var goods_Main_Panel = ReactDOM.render(React.createElement(Goods_Main_Panel, null), document.getElementById("goods_Main_Panel_Container"));
