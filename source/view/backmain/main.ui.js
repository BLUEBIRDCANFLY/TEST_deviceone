/**
 * related to main.ui
 * 
 * @Author : router
 * @Timestamp : 2016-08-10
 */
deviceone.print("点了！")
//组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_DataCache_state = sm("do_DataCache");
var deviceone=require("deviceone");
//定义UI变量

do_ALayout_back.on("touch",function(){
	do_App.closePage();
}
);

//引用系统返回键,同样有大小写问题
do_Page.on("back",function(){
	do_App.closePage();
});
