/**
 * @Author : router
 * @Timestamp : 2016-08-08
 */
//引入组件库
var d1 = require("deviceone");
var do_App = d1.sm("do_App");
var initdata = d1.sm("do_InitData");

do_App.on("loaded", function () {
	initdata.copy([ "initdata://merchant.json"], "data://", function() {
	//全屏方式打开主界面
	do_App.openPage({
		source:"source://view/index.ui", 
		statusBarState:"transparent",
		animationType: "fade"
			});
});
});
