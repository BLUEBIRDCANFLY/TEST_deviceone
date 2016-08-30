var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ImageView_1=ui("do_ImageView_1");
//var do_WebView_3=ui("do_WebView_3");
var do_Label_1=ui("do_Label_1");
//var do_Label_2=ui("do_Label_2");
//设置数据绑定的映射关系
root.setMapping({
	"do_ImageView_1.source" : "thumb_imgs",
	//"do_WebView_3.url":"imgs",
	"do_Label_1.text" : "item_desc",
	//"do_Label_2.text" : "imgs"
});


