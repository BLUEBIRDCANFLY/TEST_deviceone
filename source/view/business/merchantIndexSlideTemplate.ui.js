//引入组件库
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");
var do_DataCache_Mer = sm("do_DataCache");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ListView_merchant=ui("do_ListView_merchant");
var do_ALayout_main=ui("do_ALayout_main");
//定义do_ListView_merchant的数据model
var listdataMerchant = mm("do_ListData");
//在do_ALayout_root上动态添加子视图(用于等待数据装载的过程)
do_ALayout_root.add("loadingUI", "source://view/loadingUI.ui", 0, 0);
var loadingUI = ui("loadingUI");
//定义变量
var type_id;
var type_name;
var page,pageNum;
//给do_ListView_news绑定数据
do_ListView_merchant.bindItems(listdataMerchant);
//设置数据绑定的映射关系
root.setMapping({
	"do_ALayout_root.tag":"id",
	"do_ALayout_main.tag":"cata_name"
});
//初始化隐藏遮盖
loadingUI.visible = false;

//刷新数据
function refreshAllData(){
	page=1;
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
//	http.url = "http://220.167.137.10/vdian/action/goods/APP_Get_items.php?cata_id="+type_id+pageNum; // 请求的 URL
	http.url = "http://220.167.137.10/vdian/action/goods/APP_Get_items.php?cata_id="+type_id+"&pageNum="+page;
	http.body = JSON.stringify({cata_id:type_id,pageNum:page}); 
	http.on("success", function(data) {
		//恢复do_ListView_news的headerview和footerview状态
		do_ListView_merchant.rebound();
		listdataMerchant.removeAll();
		//deviceone.print(JSON.stringify(data.getRange(0)));
		listdataMerchant.addData(data);
//		deviceone.print(JSON.stringify(listdataMerchant.getRange(0)));
	    do_ListView_merchant.refreshItems();
	    //每次刷新的数据，都在本地缓存起来
	    do_DataCache_Mer.saveData(type_id, data);
	    //去掉遮盖
	    loadingUI.visible = false;		
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
	    //恢复do_ListView_Merchant的headerview和footerview
		do_ListView_merchant.rebound();
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
}
//刷新数据
function getNextPageData(){
	page++;
	var http = mm("do_Http");
	http.method = "POST";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/x-www-form-urlencoded"; // Content-Type
	http.url = "http://220.167.137.10/vdian/action/goods/APP_Get_items.php?cata_id="+type_id+"&pageNum="+page;
	http.body = JSON.stringify({cata_id:type_id, pageNum:page}); 
	http.on("success", function(data) {
	    //if (!data ){
//		if (!data && typeof(data)!="undefined" && data!=0){
//		if(data === ""){
//		if(data === ""||typeof(data)!="undefined" && data!=0&&!data){
		if(data == 0){
	    	do_Notification.toast("更多商品，敬请关注！");
			do_ListView_merchant.rebound();
	    }
	    else{
			do_ListView_merchant.rebound();
			listdataMerchant.addData(data);
		    do_ListView_merchant.refreshItems();
	    }
	});
	http.on("fail", function(data) {
		do_ListView_merchant.rebound();
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
}
//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	type_id = do_ALayout_root.tag;
	//deviceone.print(type_id);
	type_name = do_ALayout_main.tag;	
	//先尝试加载本地数据
	var data = do_DataCache_Mer.loadData(type_id);
//	deviceone.print(JSON.stringify(data));
	if (data != null && data.length > 0){
		listdataMerchant.removeAll();
		listdataMerchant.addData(data);
	    do_ListView_merchant.refreshItems();
	}
	else{
		loadingUI.visible = true;		
	}
	//更新远程最新数据
	refreshAllData();
});

//下拉列表，刷新数据
do_ListView_merchant.on("pull", function(data){
	//其中state=0：表示开始下拉headerview，；state=1：表示下拉headerview超过headerview的高度，触发一次这个事件；state=2：下拉超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){
		refreshAllData();
	}
});

//上拉列表，翻页数据
do_ListView_merchant.on("push", function(data){
	//其中state=0：表示开始上推headerview，；state=1：表示上推headerview超过headerview的高度，触发一次这个事件；state=2：上推超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){		
		getNextPageData();
	}
});

//点击一条产品后
do_ListView_merchant.on("touch", function(data){
	var onMerchant=listdataMerchant.getOne(data);
	do_App.openPage({
		source:"source://view/business/merchantDetail.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({title:onMerchant.item_name, url:onMerchant.imgs}) //传递页面之间的参数
	});
});