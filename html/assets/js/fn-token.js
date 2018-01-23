function fn_remove_token() {
	fn_set_token(null);
}

function fn_set_token(token) {
	$.cookie("token", token, { "expires": 30, "path": "/" });
}

function fn_get_token() {
	return $.cookie("token");
}