function fn_raw_api(data, callback) {
	$.post("http://182.92.74.206:8086/yy-vip-center-site-api", JSON.stringify(data), function(resp){
		if (typeof callback == 'function') {
			callback(resp);
		}
	});
}

function fn_public_api(data, success) {
	fn_raw_api(data, function(resp){
		if (resp.code == 0) {
			if (typeof success == 'function') {
				success(resp);
			}
		} else {
			toastr.warning(resp.message);
		}
	});
}

function fn_api(data, success) {
	if (fn_get_token() == null) {
		toastr.error("Token已失效，请重新登录");
		return;
	}
	data.token = fn_get_token();
	fn_public_api(data, success);
}

function fn_fen2yuan(num) {
	if (typeof num !== "number" || isNaN(num)) {
		return null;
	}
	return num / 100 + '';
}

function fn_fen2yuan_fixed(num) {
	if (typeof num !== "number" || isNaN(num)) {
		return null;
	}
	return (num / 100).toFixed(2);
}

function fn_fen2yuan_in_thousands(num) {
	var yuan = fn_fen2yuan(num);
	var reg = yuan.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
	return yuan.replace(reg, '$1,');
}

function fn_format_date(date, format){
	var o = {
		"M+" : date.getMonth()+1, //month
		"d+" : date.getDate(), //day
		"h+" : date.getHours(), //hour
		"m+" : date.getMinutes(), //minute
		"s+" : date.getSeconds(), //second
		"q+" : Math.floor((date.getMonth()+3)/3), //quarter
		"S" : date.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}

function fn_ajax_upload_file(files, success) {
	var formData = new FormData();
	for(var i=0; i<files.length; i++) {
		formData.append("file"+i, files[i]);
	}
	$.ajax({
		url: "http://47.104.17.187:8082/micro-file-server",
		type: "POST",
		cache: false,
		data: formData,
		processData: false,
		contentType: false
	}).done(function(resp) {
		if (typeof success == 'function') {
			success(resp);
		}
	}).fail(function(resp) {
		toastr.error("文件上传失败");
	});
}

function fn_url_args() {
	var qs = location.search.substr(1),
		args = {},
		items = qs.length ? qs.split("&") : [],
		item = null,
		len = items.length;
 
	for(var i = 0; i < len; i++) {
		item = items[i].split("=");
		var name = decodeURIComponent(item[0]),
		value = decodeURIComponent(item[1]);
		if (name) {
			args[name] = value;
		}
	}
	return args;
}
