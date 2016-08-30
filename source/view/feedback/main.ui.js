/**
 * related to main1.ui
 * 
 * @Author : router
 * @Timestamp : 2016-08-25
 */
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_DataCache_state = sm("do_DataCache");
var deviceone=require("deviceone");
//声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_userimg=ui("do_ALayout_userimg");
var do_ImageView_user=ui("do_ImageView_user");
var do_ALayout_line=ui("do_ALayout_line");
var do_ALayout_title=ui("do_ALayout_title");
var do_ScrollView_title=ui("do_ScrollView_title");
var do_ALayout_logreg=ui("do_ALayout_logreg");
var do_Label_log=ui("do_Label_log");
var do_Label_reg=ui("do_Label_reg");
var do_ALayout_login=ui("do_ALayout_login");
var do_ALayout_reg=ui("do_ALayout_reg");
var do_ALayout_user = ui("do_ALayout_user");
var do_Label_user = ui("do_Label_user");
do_Label_user.visible = false;
do_ALayout_login.on("touch",function(){
	do_App.openPage( {
		source:"source://view/feedback/login/main.ui",
		statusBarState:"transparent",
		animationType:"push_r21"
	});
});

do_ALayout_reg.on("touch",function(){
	do_App.openPage( {
		source:"source://view/feedback/regedit/main.ui",
		statusBarState:"transparent",
		animationType:"push_r21"
	});
});
do_Page.on("refreshuser", function(){
	//先尝试加载本地数据
//	do_DataCache_state.removeAll();
	var data= do_DataCache_state.loadData(123);
	datauser = JSON.parse(JSON.stringify(data));
	deviceone.print(JSON.stringify(datauser),"username");
//	if (datauser != null && datauser.length > 0){
	if (datauser == "" ||datauser.length == 0||datauser=="undefined"){
		do_Label_log.visible = true;
		do_Label_reg.visible = true;
		do_Label_user.visible = false;
	}
	else{
		do_Label_log.visible = false;
		do_ALayout_login.enabled=false;
		do_Label_reg.visible = false;
		do_ALayout_reg.enabled=false;
		do_Label_user.visible = true;
		do_Label_user.text = "你好！"+ datauser.user_name;
	}
});
do_Page.fire("refreshuser");
do_Page.on("result",function(data){
//	if (data == "" ||datauser.length == 0){
	if (data.success != 1){
		do_Label_log.visible = true;
		do_Label_reg.visible = true;
		do_Label_user.visible = false;
	}
	else{
		do_Label_log.visible = false;
		do_ALayout_login.enabled=false;
		do_Label_reg.visible = false;
		do_ALayout_reg.enabled=false;
		do_Label_user.visible = true;
		do_Label_user.text = "你好！"+ data.user_name;
	}
	deviceone.print(JSON.stringify(data));
});
