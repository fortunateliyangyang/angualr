$(function(){
   function resize() {
       var windowWidth = $(window).width();
       var isSmallScreen = windowWidth<768;
       $("#main_ad> .carousel-inner> .item").each(function (i,ele) {
           var $item = $(ele);
           var isScreen = isSmallScreen ? $item.data("image-xs"):$item.data("image-lg")
           $item.css('backgroundImage','url("'+isScreen+'")')

           if(isSmallScreen){
               $item.html('<img src="'+isScreen+'">')
           }else{
               $item.empty()
           }
       })
   }
   $(window).on('resize',resize).trigger("resize")

    //工具提示框  tooltip初始化


/*
   控制标签页和容器宽度
* */
var $ulContainer=$(".nav-tabs");
 var width=20;
$ulContainer.children().each(function(i,e){
    width+=e.clientWidth
});
if(width>$(window).width()){
    $ulContainer
        .css("width",width)
        .parent().css("overflow-x","scroll")
}
//切换新闻标题
    var $newsTitle = $(".news-title")
    $(".nav-pills li a").on("click",function () {
        var $this = $(this)
        var title = $this.data("title")
        $newsTitle.text(title)

    })

// 1. 获取手指在轮播图元素上的一个滑动方向（左右）
// 获取轮播容器
    var $carousel = $(".carousel")
    var startX, endX;
    var offset=50
    //获得手指起始位置
    $carousel.on("touchstart",function(e){
        startX = e.originalEvent.touches[0].clientX;
        console.log("startX:"+startX)
    })
    //变量重复赋值
    $carousel.on("touchmove",function(e){
        endX = e.originalEvent.touches[0].clientX;
        console.log("endX:"+endX)
    })
    $carousel.on("touchend",function(e){
       console.log(e)
        // 结束触摸一瞬间记录最后的手指所在坐标X
        // 比大小
        // console.log(endX);
        // 控制精度
        // 获取每次运动的距离，当距离大于一定值时认为是有方向变化
        var distance = Math.abs(endX-startX)
        console.log("distance"+distance)
        if(distance>offset){
           $(this).carousel(startX > endX? "next":"prev")
        }
    })











})