/**
 * related to main.ui
 * 
 * @Author : router
 * @Timestamp : 2016-08-10
 */
//是否还要引入？
var do_App = sm("do_App");
var do_page = sm("do_Page");

//定义UI变量
var do_ALayout_tofeed = ui("do_ALayout_tofeed");

//使按钮到FEEDBACK页面,注意:号
do_ALayout_tofeed.on("touch",function(){
	do_App.openPage( {
		source:"source://view/backmain/main.ui",
		statusBarState:"transparent",
		animationType:"push_r21"
	});
});
