deviceone.checked = "source://image/checked.png";
deviceone.unchecked = "source://image/unchecked.png";
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI

var checkedLayout = ui("do_ALayout_3");
var do_ImageView_check = ui("do_ImageView_check");
var plus = ui("do_Button_1");
var subtract = ui("do_Button_2");
var count_label = ui("count_label");
var price_label = ui("price_label");
var do_Label_oneprice = ui("do_Label_oneprice");

//定义变量
var oneprice,pricenow,cartnum;
root.setMapping({
	"photo_imageview.source" : "imgs",
	"name_label.text" : "item_name",
	"price_label.text" : "price",
	"do_Label_oneprice.text" : "price",
	"do_ImageView_check.source" : "checked",
	"count_label.text" : "item_num",
	"count_label.tag" : "index" // 利用一个组件的tag属性来记录当前cell的索引，这个很重要，否则前一个页面无法知道对哪个商品操作
});

checkedLayout.on("touch", function() {
	if (do_ImageView_check.source == deviceone.checked) {
		do_ImageView_check.source = deviceone.unchecked;
	} else {
		do_ImageView_check.source = deviceone.checked;
	}
	fireMyorder();
})

plus.on("touch", function() {
	var c = count_label.text;
		oneprice = do_Label_oneprice.text;
		pricenow = oneprice*c;
//		deviceone.print(oneprice,"oneprice");
		count_label.text = (c * 1) + 1;
		price_label.text=(pricenow*1)+(oneprice*1);
//		deviceone.print(price_label.text,"pricenow"+count_label.text);
		fireMyorder();
	
});
subtract.on("touch", function() {
	var c = count_label.text;
	c = c - 1;
	if (c <= 0){
		c = 1;
	}
	count_label.text = c;
	oneprice = do_Label_oneprice.text;
	pricenow = oneprice*c;
//	deviceone.print(oneprice,"oneprice");
	price_label.text=(pricenow*1);
	fireMyorder();
});

function fireMyorder() {
	var d = {
		"index" : count_label.tag,
		"count" : count_label.text,
        "price" : price_label.text,
		"checked" : do_ImageView_check.source,
	};
	do_Page.fire("myorder", d);
}