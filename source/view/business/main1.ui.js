/**
 * related to main.ui
 * 
 * @Author : router
 * @Timestamp : 2016-08-10
 */
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var deviceone=require("deviceone");
//声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_main = ui("do_ALayout_main");
var do_SegmentView_tabs = ui("do_SegmentView_tabs");
var do_ScrollView_business=ui("do_ScrollView_business");
var do_ALayout_scroll=ui("do_ALayout_scroll");
var do_SlideView_business=ui("do_SlideView_business");
var do_GridView_content=ui("do_GridView_content");
/**********************************************************************************************************/
//希望能读到数据JSON
var storage = sm("do_Storage");
var grid_view1, Listdata;
grid_view1 = ui("do_GridView_content");
Listdata = mm("do_ListData");
grid_view1.bindItems(Listdata);


 storage.readFile("data://merchant.json", function(data){// 读取文件
	 //deviceone.print(data);
	deviceone.print(JSON.stringify(data,["imgs","item_desc","thumb_imgs"]));
    Listdata.addData(data); // 给ListData添加数据
    grid_view1.refreshItems(); // 刷新ListView 行数据;
 });
 /**********************************************************************************************************/
//定义产品类型的数据
 var jsonTabs = [ 
     {
 	    id : "66114091",
 	    name : "冲调饮品",
 	    selected : "1",  
 	    template : 0  //采用的模板
 	}, 
 	{
 		id : "65630593",
 	    name : "调料熟食",
 	    selected : "0",
 	    template : 0
 	},
 	{
 		id : "60104730",
 	    name : "干果特产",
 	    selected : "0",
 	    template : 0
 	},
 	{
 		id : "55469432",
 	    name : "蔬菜瓜果",
 	    selected : "0",
 	    template : 0
 	},
 	{
 		id : "85359030",
 	    name : "限时特价",
 	    selected : "0",
 	    template : 0
 	},
 	{
 		id : "72467919",
 	    name : "生活用品",
 	    selected : "0",
 	    template : 0
 	} 	
 ];
 //复制新闻类型的数据
 var jsonSlides = JSON.parse(JSON.stringify(jsonTabs));
 //定义do_SegmentView_tabs的数据Model
 var listdataTabs = mm("do_ListData");
 listdataTabs.addData(jsonTabs);
 do_SegmentView_tabs.bindItems(listdataTabs);
 do_SegmentView_tabs.refreshItems();
 
//定义do_SlideView_business的数据Model
 var listdataSlides = mm("do_ListData");
 listdataSlides.addData(jsonSlides);
 /***********************************************/
//在当前页面下订阅selectOneTab的事件
 do_Page.on("selectOneTab", function(data){
 	var _selectedIndex=-1;
 	for(var i=0; i<jsonTabs.length;i++){
 		if (jsonTabs[i].name == data.name){
 			_selectedIndex =i;
 			listdataTabs.updateOne(i, 
 				{
 				    name : jsonTabs[i].name,
 				    selected : "1",
 				    template : jsonTabs[i].template
 				}
 			);
 		}
 		else{
 			listdataTabs.updateOne(i, 
 				{
 				    name : jsonTabs[i].name,
 				    selected : "0",
 				    template : jsonTabs[i].template
 				}
 			);
 		}
 	}

 	//do_SegmentView_tabs重新绑定数据
 	do_SegmentView_tabs.refreshItems();
 	//移动当选中的cell上
 	if (_selectedIndex >=0)	{
 		do_SegmentView_tabs.index = _selectedIndex;	
 		do_SlideView_business.index = _selectedIndex;
 	}
 });
 /***********************************************/
 //页面装载完成后，开始初始化工作
do_Page.on("loaded", function(){
	//给do_SegmentView_tabs绑定数据
	do_SegmentView_tabs.bindItems(listdataTabs);
	do_SegmentView_tabs.refreshItems();
});

//当do_SlideView_news变化时，同步do_SegmentView_tabs
  do_SlideView_business.on("indexChanged", function(index) {
  do_Page.fire("selectOneTab", {name:jsonTabs[index].name});
})