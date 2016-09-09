/**
 * related to main.ui
 * 
 * @Author : router
 * @Timestamp : 2016-08-25
 */
//组件库，DO_APP在主页面中如果没引用，那么DO_VIEWSHOWER_MAIN是不能使用的,注意大小写	
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var deviceone=require("deviceone");
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_DataCache_state = sm("do_DataCache");

var do_ALayout_back = ui("do_ALayout_back");
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_image =ui("do_ALayout_image");
var do_ALayout_line =ui("do_ALayout_line");
var do_ALayout_logmain = ui("do_ALayout_logmain");
var do_ALayout_username = ui("do_ALayout_username");
var do_TextField_username = ui("do_TextField_username");
//do_ImageView_username
var do_ALayout_passwd = ui("do_ALayout_passwd");
var do_TextField_passwd = ui("do_TextField_passwd");
//do_ImageView_passwd
var do_Button_commit = ui("do_Button_commit");
var do_ALayout_bott = ui ("do_ALayout_bott");
var user_id,passwd,user_state,userinfo;

function commitData(){
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
//	http.url = "http://220.167.137.10/vdian/action/goods/APP_user_login.php?password="+do_TextField_passwd.text;
	user_id=do_TextField_username.text;
	passwd=do_TextField_passwd.text;
	http.url = encodeURI("http://220.167.137.10/vdian/app/user_login.php?user_id="+user_id+"&passwd="+passwd);
	http.on("success", function(data) {
		if (data.success== 0){
			do_Notification.toast("登录未成功，请稍后再试！");
		}
		else {
			deviceone.print(JSON.stringify(data),"return");
			do_DataCache_state.saveData(123, data.obj);
			userinfo = JSON.stringify(data.obj);
//			deviceone.print(userinfo);
			do_Notification.toast("登录成功");
			do_App.closePage(userinfo);
		}
	});
	http.on("fail", function(data) {
		do_Notification.toast("网络故障"); 
	});
	http.request();
}
do_Notification.toast("输入账号");
do_Button_commit.on("touch",function(){
	if(do_TextField_username.text == ""&&do_TextField_passwd.text==""){
		do_Notification.toast("输入账号|密码");
		do_TextField_username.setFocus(true);
	}else if(do_TextField_username.text == ""){
		do_Notification.toast("输入账号");
		do_TextField_username.setFocus(true);
	}else if(do_TextField_passwd.text==""){
		do_Notification.toast("输入密码");		
		do_TextField_passwd.setFocus(true);
	}else{
		commitData();
		do_Button_commit.text = "正在提交";
		do_Button_commit.enabled = false;
		do_TextField_username.enabled = false;
		do_TextField_passwd.enabled = false;
		}
	});

//定义UI变量
var do_ALayout_back = ui("do_ALayout_back")

//使返回按钮可用
do_ALayout_back.on("touch",function(data){
	do_App.closePage(userinfo);
//	data:JSON.stringify({username:userinfo.user_name})
}
);

//引用系统返回键,同样有大小写问题
do_Page.on("back",function(data){
	do_App.closePage(userinfo);
//	data:JSON.stringify({username:userinfo.user_name})
});