class MixOrder_ShowTickets_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tickets: []
		};
	}

	show(state) {
		this.setState(state);
		$("#mixOrder_ShowTickets_Modal").modal({keyboard: true});
	}

	hide() {
		$("#mixOrder_ShowTickets_Modal").modal("hide");
	}

	render() {
		return (
			<div className="modal fade" id="mixOrder_ShowTickets_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>提取卡密</h4>
						</div>
						<div className="modal-body">
							{this.state.tickets.map((x) => <p>{x}</p>)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var mixOrder_ShowTickets_Modal = ReactDOM.render(<MixOrder_ShowTickets_Modal />, $("<div></div>").appendTo(document.body)[0]);
