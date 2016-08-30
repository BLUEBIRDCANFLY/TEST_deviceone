/**
 * related to start.ui
 * 
 * @Author : router
 * @Timestamp : 2016-08-10
 */
//引入组件库
var app = sm("do_App");
var global = sm("do_Global");
var device = sm("do_Device");

//定义UI组件
var do_ImageView_content = ui("do_ImageView_content");
var do_ImageView_icon = ui("do_ImageView_icon");
var do_Label_welcom = ui("do_Label_welcom");
//动画过程
var img_anima = mm("do_Animation");
img_anima.fillafter = true;
img_anima.scale({
	delay: 10,
	duration:5000,
	curve:"Linear",
	autoRverse:false,
	scaleFromX:1,
	scaleFromY:1,
	scaletoX:92,
	scaletoY:1142
},"start1");
img_anima.transfer({
	delay:10,
    duration: 5000,
    curve: "Linear",
    autoReverse: false,
    fromX: 0,
    fromY: 0,
    toX: 92,
    toY: 1142
}, "start2");
//在定义一个1.8秒的动画过程：文字翻转
var label_anima = mm("do_Animation");
label_anima.fillAfter = true;
label_anima.transfer({
	delay:10,
    duration: 5000,
    curve: "EaseOut",
    autoReverse: false,
    fromX: 0,
    fromY: 0,
    toX: 100,
    toY: 100
}, "start3");

//启动动画，并在第1个动画结束后打开新的页面：main.ui
//do_ImageView_icon.animate(img_anima, function(){
do_Label_welcom.animate(label_anima, function(){
	app.openPage({
		source:"source://view/index.ui", 
		statusBarState:"transparent",
		animationType: "fade"		
	});
});
//do_Label_welcom.animate(label_anima);
