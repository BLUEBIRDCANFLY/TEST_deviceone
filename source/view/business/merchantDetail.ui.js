//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var root = ui("$");
var do_Notification = sm("do_Notification");
//声明UI变量
var do_DataCache_state=sm("do_DataCache");
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");
var do_WebView_merchant = ui("do_WebView_merchant");
var do_Label_title = ui("do_Label_title");
var do_ALayout_bott = ui("do_ALayout_bott");
var do_ALayout_fav = ui("do_ALayout_fav");
var do_ALayout_cart = ui("do_ALayout_cart");
var do_ALayout_pay = ui("do_ALayout_fav");
var do_ImageView_fav = ui("do_ImageView_fav");
var do_Label_fav = ui("do_Label_fav");
var do_Label_cart = ui("do_Label_cart");
var do_ScrollView_merchant = ui("do_ScrollView_merchant");
var do_Label_pay = ui("do_Label_pay");
var do_Label_price = ui("do_Label_price");
var do_Label_stand = ui("do_Label_stand");
var do_Label_cartnum = ui("do_Label_cartnum");
var do_Label_6 = ui("do_Label_6");
do_ALayout_root.add("loadingUI", "source://view/loadingUI.ui", 0, 0);
var loadingUI = ui("loadingUI");
loadingUI.visible = false;
//变量
var favorite,favochange,user_id,item_id,cartNum;
var data= do_DataCache_state.loadData(123);
user_id=data.uuid;
var idcount = 0,cartcount=0,cart_flag;
//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});
//页面装载完成后，开始初始化工作
do_Page.on("loaded", function(){
	//读取当前页面的传入参数
	var para=do_Page.getData();
	do_Label_title.text = para.title;
	do_WebView_merchant.url = para.url;
	do_Label_price.text = "￥"+para.price+"元";
	do_Label_stand.text =para.standard;
	item_id=para.merchantid;
	favorite = para.favo;
	do_Label_cartnum.text=para.cart_num;
	cartNum=para.cart_num;
//	deviceone.print(favorite,"favo_flag");
	if (favorite=="1"){
		do_ImageView_fav.source="source://image/fav_yes.png";
	}
	else{
		do_ImageView_fav.source="source://image/fav_no.png";
	}
	do_Label_6.text="各市、州分公司：	根据省分公司《关于做好省内邮政信息网网络改造工程的通知》(青邮分〔2016〕203号)安排，我省邮政金融网点授权集中系统网络配套改造工程将于9月8日至9月30日实施，为确保此项工作顺利进行，现将相关事宜通知如下：工作内容及时间安排省中心机房绿卡网核心切换时间：9月9日0:00-4:00和9月10日0:00-4:00内容：对省中心2台绿卡网核心交换机进行更新，新增2台下联路由器，完成省中心绿卡网负载均衡及相关网络设备的搬迁工作。海东汇接机房网络切换时间：9月13日0:00-4:00内容：完成海东汇接机房新增的上联省中心路由器和核心交换机的安装和部署，验证网络可用性。	市、州汇接机房网络切换时间：见附件()。内容：完成市、州汇接机房新增的上联省中心路由器和核心交换机的安装和部署，验证网络可用性。各市、州分公司：	根据省分公司《关于做好省内邮政信息网网络改造工程的通知》(青邮分〔2016〕203号)安排，我省邮政金融网点授权集中系统网络配套改造工程将于9月8日至9月30日实施，为确保此项工作顺利进行，现将相关事宜通知如下：工作内容及时间安排省中心机房绿卡网核心切换时间：9月9日0:00-4:00和9月10日0:00-4:00内容：对省中心2台绿卡网核心交换机进行更新，新增2台下联路由器，完成省中心绿卡网负载均衡及相关网络设备的搬迁工作。海东汇接机房网络切换时间：9月13日0:00-4:00内容：完成海东汇接机房新增的上联省中心路由器和核心交换机的安装和部署，验证网络可用性。、州汇接机房网络切换时间：见附件()。内容：完成市、州汇接机房新增的上联省中心路由器和核心交换机的安装和部署，验证网络可用性。"
});
do_ALayout_fav.on("touch", function(){
	if(user_id==undefined||user_id==""){
		do_App.closePage();
		do_App.openPage( {
			source:"source://view/feedback/login/main.ui",
			statusBarState:"transparent",
			animationType:"push_r21"
		});
		
	}else {if (favorite=="1"){
		favorite=0;
		do_Page.fire(updatefavo(favorite));
		favochange=favorite;
		do_ImageView_fav.source="source://image/fav_no.png";
	}
	else{
		favorite=1;
		do_Page.fire(updatefavo(favorite));
		favochange=favorite;
		do_ImageView_fav.source="source://image/fav_yes.png";
	}
	}
});

function updatefavo(favdata){
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url = "http://220.167.137.10/vdian/app/set_fav.php?uuid="+user_id+"&item_id="+item_id+"&favo="+favdata;
	http.on("success", function(data) {
		    //去掉遮盖
	    loadingUI.visible = false;		
		do_Notification.toast(favdata);
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
};
function updatecart(){
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url ="http://220.167.137.10/vdian/app/set_cata.php?item_id="+item_id+"&uuid="+user_id+"&action_flag="+cart_flag;
	//CART_FLAG:为1时添加，为0时删除。本处不做删除处理
	http.on("success", function(data) {
		    //去掉遮盖
	    loadingUI.visible = false;		
		do_Notification.toast(cart_flag);
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
};

do_ALayout_cart.on("touch", function(){
	var anim = mm("do_Animator");
		for (var i = 0; i < 10; i++) {
				anim.append(50 + 10 * i, {
				"x" : 332 + parseInt(Math.random() * 2 * i - i),
				"y" : 1778 - 10 * i - parseInt(Math.random() * 10 + 1)
				})
			}
		root.add("id" + idcount, "source://view/business/heart/balloon.ui", do_ALayout_bott.x
				+ do_ALayout_bott.width / 2, do_ALayout_bott.y);
//		deviceone.print(idcount);
		var image = ui("id" + idcount);
		idcount++;
		image.animate(anim, function() {
		image.remove();
		anim.release();// 动画执行完，释放mm组件
					})
	cartcount++;
	cart_flag=1;
	//仅允许用户点一次添加进购物车，具体的数量由购物车UI操作,但有个问题,用户退出此商品后再进来,还是可以增加数量。
	if (cartcount>0){
		do_ALayout_cart.enabled=false;
		do_Label_cartnum.text=cartNum*1+1;
		var userinfo =do_DataCache_state.loadData(123);
		userinfo.cata_num=do_Label_cartnum.text;
		do_DataCache_state.saveData(123,userinfo);//以上三行注意，将用户信息提取后进行CATA_NUM的更新。
	}
	if(user_id==undefined||user_id==""){
		do_App.closePage();
		do_App.openPage( {
			source:"source://view/feedback/login/main.u	i",
			statusBarState:"transparent",
			animationType:"push_r21"
		});
	}
	else{
		do_Page.fire(updatecart());
	}
});
