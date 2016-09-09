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
var do_ALayout_passwd1 = ui("do_ALayout_passwd1");
var do_TextField_passwd1 = ui("do_TextField_passwd1");
var do_ALayout_passwd2 = ui("do_ALayout_passwd2");
var do_TextField_passwd2 = ui("do_TextField_passwd2");
//do_ImageView_passwd
var do_ALayout_phone = ui("do_ALayout_phone");
var do_TextField_phone = ui("do_TextField_phone");
var do_Button_commit = ui("do_Button_commit");
var do_ALayout_bott = ui ("do_ALayout_bott");
var user_id,passwd,user_state;

function commitData(){
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url = "http://220.167.137.10/vdian/app/user_reg.php?user_id="+do_TextField_username.text+"&passwd="+do_TextField_passwd1.text+"&phonenum="+do_TextField_phone.text;
	http.on("success", function(data) {
		if (data.success== 0){
			do_Notification.toast(data.msg);
		}
		else {
			do_DataCache_state.saveData(124, data);
			do_Notification.toast(data.msg);
			do_App.closePage();
			do_App.openPage({
				source:"source://view/feedback/login/main.ui", 
				animationType:"push_r2l", //动画效果：从右向左推出
				statusBarState:"transparent",
			});
		}
	});
	http.on("fail", function(data) {
		do_Notification.toast("网络故障"); 
	});
	http.request();
}

do_Button_commit.on("touch",function(){
	if(do_TextField_username.text == ""&&do_TextField_passwd1.text==""){
		do_Notification.toast("输入账号|密码");
		do_TextField_username.setFocus(true);
	}else if(do_TextField_username.text == ""){
		do_Notification.toast("输入账号");
		do_TextField_username.setFocus(true);
	}else if(do_TextField_passwd1.text==""||do_TextField_passwd2.text==""){
		do_Notification.toast("输入密码");		
		do_TextField_passwd1.setFocus(true);
	}else if (do_TextField_passwd1.text!=do_TextField_passwd2.text){
		do_Notification.toast("两次输入的密码不一致！");
		do_TextField_passwd2.setFocus(true);
	}else if (do_TextField_phone.text==""||do_TextField_phone.text.length!=11){
		var len=do_TextField_phone.text.length;
		deviceone.print(len);
		do_Notification.toast("输入的手机号有问题！");	
		do_TextField_phone.setFocus(true);
	}else{
		commitData();
		do_Button_commit.text = "正在提交";
		do_Button_commit.enabled = false;
		do_TextField_username.enabled = false;
		do_TextField_passwd1.enabled = false;
		do_TextField_passwd2.enabled = false;
		do_TextField_phone.enabled = false;
		}
	});

//定义UI变量
var do_ALayout_back = ui("do_ALayout_back")

//使返回按钮可用
do_ALayout_back.on("touch",function(){
	do_App.closePage();
}
);

//引用系统返回键,同样有大小写问题
do_Page.on("back",function(){
	do_App.closePage();
});