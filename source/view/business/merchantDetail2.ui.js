//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
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
var do_Label_pay = ui("do_Label_pay");
var do_Label_price = ui("do_Label_price");
var do_Label_4 = ui("do_Label_4");
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
	do_Label_4.text="	各单位要高度重视此次邮政金融网点授权集中系统网络配套改造工程，加强与省中心机房的沟通协调，及时解决工程实施过程中出现的问题。	各市、州技术人员确保验证测试网点网络畅通，设备运行正常，做好验证网点的技术支持工作。	参加业务验证的网点要按照业务验证进场时间要求做好各系统的业务验证和测试工作，在接到切换业务组通知后开始进行测试，并及时将结果上报业务组。	请各单位务必于传真形式9月8日前上报技术和业务联系人，及业务验证网点负责人和网点联系电话。	业务联系人：李  立 0971-6327256、18997210929	技术联系人：曲   伟0971-6327385 18609719712 传真：0971-6327468 0971-6316385"
});
do_ALayout_fav.on("touch", function(){
	if (do_ImageView_fav.source=="source://image/fav_no.png"){
	do_ImageView_fav.source="source://image/fav_yes.png";
	}
	else{
		do_ImageView_fav.source="source://image/fav_no.png";
	}
		
});