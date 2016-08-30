/**
 * related to main.ui
 * 
 * @Author : router
 * @Timestamp : 2016-08-18
 */
//定义UI组件
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_DataCache_busi = sm("do_DataCache");
var deviceone=require("deviceone");

//声明UI变量，页面上需要在程序中体现的部分
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_main=ui("do_ALayout_main");
var do_SegmentView_tabs=ui("do_SegmentView_tabs");
//var do_ALayout_head_hiding=ui("do_ALayout_head_hiding");
//var do_ALayout_tail_hiding=ui("do_ALayout_tail_hiding");
var do_SlideView_merchant=ui("do_SlideView_merchant");


do_ALayout_root.add("loadingUI", "source://view/loadingUI.ui", 0, 0);
var loadingUI = ui("loadingUI");
//定义do_SegmentView_TABS数据MODLE
var listdataTabs= mm("do_ListData");
//定义do_SlideView_merchant的数据Model
var listdataSlides = mm("do_ListData");
var jsonSlides;
var selected,type_name,type_id;
do_SegmentView_tabs.bindItems(listdataTabs);
do_SlideView_merchant.bindItems(listdataSlides);

//初始化隐藏遮盖
loadingUI.visible = false;
//刷数据
function refreshAllData(){
	var http = mm("do_Http");
	http.method = "GET";  // GET | POST
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.url = "http://220.167.137.10/vdian/action/goods/APP_Get_cata.php"; // 请求的 URL
	http.on("success", function(data) {
		listdataTabs.removeAll();
		listdataTabs.addData(data);
		jsonSlides = JSON.parse(JSON.stringify(data));
		listdataSlides.removeAll();
		listdataSlides.addData(jsonSlides);
//		deviceone.print(JSON.stringify(jsonSlides));
//		deviceone.print(JSON.stringify(listdataSlides.getRange(0)));
//		do_SlideView_merchant.bindItems(listdataSlides);
		//do刷新显示
		do_SegmentView_tabs.refreshItems();
		do_SlideView_merchant.refreshItems();
	    //每次刷新的数据，都在本地缓存起来，以便下次打开应用时即时离线状态下也能显示新闻列表，提高用户体验
	    do_DataCache_busi.saveData(99, data);
	    //去掉遮盖
	    loadingUI.visible = false;		
	});
	http.on("fail", function(data) {
		//去掉遮盖
		loadingUI.visible = false;
		do_Notification.toast("网络故障"); //比具体的错误提示更容易懂
	});
	http.request();
}


//订阅每次绑定数据后的事件
do_Page.on("refreshmerchant", function(){
	//先尝试加载本地数据
	var data= do_DataCache_busi.loadData(99);
//	deviceone.print(JSON.stringify(data));
	if (data != null && data.length > 0){
		listdataTabs.removeAll();
		listdataSlides.removeAll();
		listdataTabs.addData(data);
		jsonSlides = JSON.parse(JSON.stringify(data));
		listdataSlides.addData(jsonSlides);
//		deviceone.print(JSON.stringify(listdataTabs.getRange(0)));
//		deviceone.print(JSON.stringify(listdataSlides.getRange(0)));
		do_SegmentView_tabs.refreshItems();
		do_SlideView_merchant.refreshItems();
	}
	else{
		loadingUI.visible = true;		
	}
	//更新远程最新数据
	refreshAllData();
});

//在当前页面下订阅selectOneTab的事件
//**************************************************************//
do_Page.on("selectOneTab", function(data){
	var _selectedIndex=-1;
	for(var i=0; i<jsonSlides.length;i++){
		if (jsonSlides[i].cata_name == data.name){
			//deviceone.print(JSON.stringify(jsonSlides[i].cata_name));
			_selectedIndex =i;
			listdataTabs.updateOne(i, 
				{
				    id :jsonSlides[i].id,
				    cata_name : jsonSlides[i].cata_name,
				    selected : "1",
				    //template : listdataTabs[i].template
				}
			);
		}
		else{
			listdataTabs.updateOne(i, 
				{
					id :jsonSlides[i].id,
					cata_name : jsonSlides[i].cata_name,
				    selected : "0",
				    //template : listdataTabs[i].template
				}
			);
		}
	}

	//do_SegmentView_tabs重新绑定数据
	do_SegmentView_tabs.refreshItems();
	//移动当选中的cell上
	if (_selectedIndex >=0)	{
		do_SegmentView_tabs.index = _selectedIndex;	
		do_SlideView_merchant.index = _selectedIndex;
	}
});
do_Page.fire("refreshmerchant");
do_SlideView_merchant.on("indexChanged", function(index) {
	do_Page.fire("selectOneTab", {name:jsonSlides[index].cata_name});
})
