/**
 * related to merchantFav.ui.ui
 * 
 * @Author : router
 * @Timestamp : 2016-09-14
 */
//引入组件库
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");
var deviceone=require("deviceone");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_fav=ui("do_ALayout_fav");
var do_ScrollView_fav=ui("do_ScrollView_fav");
var do_GridView_fav=ui("do_GridView_fav");
//定义do_GridView_fav的数据model
var griddatafav = mm("do_ListData");
var do_DataCache_state = sm("do_DataCache");
//在do_ALayout_root上动态添加子视图(用于等待数据装载的过程)
do_ALayout_root.add("loadingUI", "source://view/loadingUI.ui", 0, 0);
var loadingUI = ui("loadingUI");
//给do_GridView_fav绑定数据
do_GridView_fav.bindItems(griddatafav);
//初始化隐藏遮盖
loadingUI.visible = false;


//定义变量
var uuid,favo_data,favo_num;

loaduser();
refreshfavData();

//刷新数据
function refreshfavData(){
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url = "http://220.167.137.10/vdian/app/get_my_fav.php?uuid="+uuid;
	http.on("success", function(data) {
//		deviceone.print(uuid,"update")
		favo_num=data.num;
//		deviceone.print(favo_num,"favonum");
		favo_data=JSON.parse(JSON.stringify(data.item_info));
		do_GridView_fav.rebound();
		griddatafav.removeAll();
		griddatafav.addData(favo_data);
		do_GridView_fav.refreshItems();
	    //去掉遮盖
	    loadingUI.visible = false;		
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
	    //恢复do_ListView_Merchant的headerview和footerview
		do_GridView_fav.rebound();
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
};
do_Page.on("back",function(){
	do_App.closePage();
});
//刷新用户信息
function loaduser(){
	userdata=do_DataCache_state.loadData(123);
	if (userdata==undefined||userdata == "" ||userdata.length == 0){
		uuid="";
		do_Notification.toast("请先登录！");
		do_App.closePage();
	}else {
		uuid=userdata.uuid;
	}
	};
	
do_GridView_fav.on("touch", function(data){
	var onMerchant=griddatafav.getOne(data);
//	deviceone.print(JSON.stringify(onMerchant));
	do_App.openPage({
		source:"source://view/business/merchantDetail.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({title:onMerchant.item_name, url:onMerchant.imgs,merchantid:onMerchant.item_id,price:onMerchant.price,standard:onMerchant.pkg,favo:1}) //传递页面之间的参数
	});
});

do_Page.on("result",function(){
		do_Page.fire(refreshfavData());
		deviceone.print(favo_data,"refresh1");
});