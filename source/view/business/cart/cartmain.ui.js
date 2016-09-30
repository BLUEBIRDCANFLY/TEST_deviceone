/**
 * related to cartmain.ui
 * 
 * @Author : router
 * @Timestamp : 2016-09-20
 */
deviceone.checked = "source://image/checked.png";
deviceone.unchecked = "source://image/unchecked.png";
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_DataCache_state = sm("do_DataCache");
var deviceone=require("deviceone");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_main=ui("do_ALayout_main");
var do_ALayout_back = ui("do_ALayout_back");
var do_ScrollView_cart = ui("do_ScrollView_cart");
var do_SlideListView_cart = ui("do_SlideListView_cart");
//数据
var listcartdata = mm("do_ListData");
do_SlideListView_cart.bindItems(listcartdata);
//定义变量
var uuid,cart_data,cart_num,item_id,cart_flag;

do_ALayout_main.add("loadingUI", "source://view/loadingUI.ui", 0, 0);
var loadingUI = ui("loadingUI");
loadingUI.visible = false;

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});
loaduser();
refreshcartData();

//刷新数据
function refreshcartData(){
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url = "http://220.167.137.10/vdian/app/get_my_cata.php?uuid="+uuid;
	http.on("success", function(data) {
		cart_num=data.cata_num;
//		deviceone.print(JSON.stringify(data));
//		deviceone.print(cart_num,"cartnum");
		cart_data=JSON.parse(JSON.stringify(data.cata_info));
		appendtemplate(cart_data);
//		deviceone.print(JSON.stringify(cart_data));
		do_SlideListView_cart.rebound();
		listcartdata.removeAll();
		listcartdata.addData(cart_data);
		do_SlideListView_cart.refreshItems();
	    //去掉遮盖
	    loadingUI.visible = false;	
	resetcheck();
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

function appendtemplate(data){
	for (var i=0;i<data.length;i++){
		data[i].template=0;
		data[i].rightTemplate=1;
	}
};

//刷新用户信息
function loaduser(){
	userdata=do_DataCache_state.loadData(123);
	if (userdata==undefined||userdata == "" ||userdata.length == 0){
		uuid="";
		do_Notification.toast("请先登录！");
		do_App.closePage();
	}else {
		uuid=userdata.uuid;
//		deviceone.print(JSON.stringify(userdata));
	}
};

function resetcheck(){
	for (var i = 0; i < listcartdata.getCount(); i++) {
		var cell_data = listcartdata.getOne(i);
		cell_data.checked = deviceone.checked;
		listcartdata.updateOne(i, cell_data);
//		deviceone.print(JSON.stringify(cell_data));
//		deviceone.print(JSON.stringify(cell_data.checked),"checked"+i);	
	}
	do_SlideListView_cart.refreshItems();
	compute();
	do_ImageView_isall.source = deviceone.checked;
	
};

var do_ALayout_isall=ui("do_ALayout_isall");
var do_Label_sum=ui("do_Label_sum");
var do_ImageView_isall = ui("do_ImageView_isall");

do_Page.on("myorder", function(d) {
	// 更新第index行的数据
	var cell_data = listcartdata.getOne(d.index);
	cell_data.checked = d.checked;
	cell_data.item_num = d.count;
	cell_data.price=d.price;
	cell_data.oneprice=d.oneprice;
	// 再更新listdata
	listcartdata.updateOne(d.index, cell_data);
//	deviceone.print(JSON.stringify(cell_data),"CARTONE");
//	deviceone.print(d.index,"index");
	if (cell_data.checked==deviceone.unchecked){
		do_ImageView_isall.source = deviceone.unchecked;
	}
	// 重新计算合计和结算数量
	compute();
});


function compute() {
	var number = 0;
	var total = 0;
	var isall = true;
	for (var i = 0; i < listcartdata.getCount(); i++) {
		var cell_data = listcartdata.getOne(i);
		var checked = cell_data.checked;
		//if (checked.indexOf("unchecked") > 0) {
		if (checked==deviceone.checked) {
			var count = cell_data.item_num * 1;
			number = number + count;
			var price = cell_data.price * 1;
			total = total + price ;
//			deviceone.print(total,"sum");
		} else {
			isall = false;
			continue;
		}
	}
	// 更新ui
	do_Label_sum.text = total;
/*	numberui.text = "去结算(" + number + ")";
	if (!isall) {
		do_ImageView_isall.source=deviceone.unchecked;
	}else{
		do_ImageView_isall.source=deviceone.checked;
	}*/
};


do_ALayout_isall.on("touch", function() {
if (do_ImageView_isall.source==deviceone.checked) {
	do_ImageView_isall.source = deviceone.unchecked;
} else {
	do_ImageView_isall.source = deviceone.checked;
}
for (var i = 0; i < listcartdata.getCount(); i++) {
	var cell_data = listcartdata.getOne(i);
	cell_data.checked = do_ImageView_isall.source;
	listcartdata.updateOne(i, cell_data)
//	deviceone.print(JSON.stringify(cell_data.item_id),"isALLchecked"+i);	
//	deviceone.print(JSON.stringify(cell_data.checked),"isALLchecked"+i);		
}
do_SlideListView_cart.refreshItems();
//deviceone.print(JSON.stringify(listcartdata.getRange(0)),"isALLchecked");
compute();
});


do_Page.on("removeCell", function(data) {
	var alldata = listcartdata.getRange(0);
	loaduser();
	for(var i = 0;i<alldata.length;i++){
		if(alldata[i].index==data){
			listcartdata.removeData([i]);
			do_SlideListView_cart.refreshItems();
			cart_flag=0;
			item_id=alldata[i].item_id;
			updatecart();
			compute();
			var userinfo =do_DataCache_state.loadData(123);
			deviceone.print(JSON.stringify(userinfo.cata_num),"LOADNUM");
			userinfo.cata_num=userinfo.cata_num*1-1;
			do_DataCache_state.saveData(123,userinfo);
			deviceone.print(JSON.stringify(userinfo.cata_num),"removeNUM");
			break;
		}
	}
})
function updatecart(){
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url ="http://220.167.137.10/vdian/app/set_cata.php?item_id="+item_id+"&uuid="+uuid+"&action_flag="+cart_flag;
	//CART_FLAG:为1时添加，为0时删除。
	http.on("success", function(data) {
		    //去掉遮盖
	    loadingUI.visible = false;		
		do_Notification.toast(uuid);
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
};
