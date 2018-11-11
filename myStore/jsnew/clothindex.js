$(function () {
    var cloth = new Cloth()
    cloth.name='HM休闲服登山包33'
    cloth.description='棒棒的，棒棒的，登山一流，服务一流，你好，我好，他也好，太棒了，一口气等上珠穆朗玛峰'
    cloth.normalPrice=144
    cloth.youhuijia=120
    cloth.sizes=['S','M','L','XL','XXL']
    cloth.colors=['黄色','粉色','黑色','白色']
    cloth.buySum=100;
    cloth.images=[
        {small:'images/s11.jpg',big:'images/s11.jpg'},
        {small:'images/s12.jpg',big:'images/s12.jpg'},
        {small:'images/s13.jpg',big:'images/s13.jpg'}
    ]
    cloth.init()
    var cart = new Cart()
    $('#btnaddcart').click(function(){
        /*添加产品*/
        cart.products.push(cloth)
        /*重新绑定 -- 个数，总价格，产品列表*/
        cart.init()
        cart.bindList()
        /*滑动到最顶部*/
        //$(window).scrollTop(0);
    })

})