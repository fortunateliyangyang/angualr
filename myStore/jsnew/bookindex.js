$(function () {
    var book=new Book()
    book.name='JavaScript高级教程'
    book.normalPrice=144
    book.youhuijia=120
    book.author='大作家'
    book.buySum=100;
    book.publisher='北京大学出版社'
    book.pages=1001
    book.images=[
        {small:'images/js.jpg',big:'images/js.jpg'},
        {small:'images/js.jpg',big:'images/js.jpg'},
        {small:'images/js.jpg',big:'images/js.jpg'}
    ]
    book.init()
    var cart = new Cart()
    $('#btnfavorite').click(function(){
        /*添加产品*/
        cart.products.push(book)
        /*重新绑定 -- 个数，总价格，产品列表*/
        cart.init()
        cart.bindList()
        /*滑动到最顶部*/
        //$(window).scrollTop(0);
    })



})