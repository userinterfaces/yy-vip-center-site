class System_Footer extends React.Component {

	render() {
		return (
			<footer id="footer">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<p className="heart">大分県由布市湯布院町川北918-18 TEL.0977-84-2664</p>
							<p className="copyright">© 2018 YY大户业务网</p>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

var system_Footer = ReactDOM.render(<System_Footer />, document.getElementById("system_Footer_Container"));
