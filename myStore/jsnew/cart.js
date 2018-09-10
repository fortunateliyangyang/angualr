var Cart = function(){
    this.products=[]
    this.sum=0
    this.allPrice=0
}
Cart.prototype={
    init:function () {
        $('.cartsum').html(this.getSum())
        $('#cartprice').html(this.getAllPrice())
        this.allPrice=0
        this.sum=0

    },
    bindList:function () {
        var str=''
        for(var i= 0,len=this.products.length;i<len;i++){
            str+='<div class="cart_box">'
            str+='<div class="message">'
            str+=' <div class="alert-close"> </div>'
            str+=' <div class="list_img"> <img src="'+this.products[i].images[0].small+'" class="img-responsive" alt=""/> </div>'
            str+=' <div class="list_desc"><h4><a href="#">'+this.products[i].name+'</a></h4><span class="actual">'+ this.products[i].youhuijia+'</span></div>'
            str+=' <div class="clearfix"></div>'
            str+='  <div class="clearfix"></div>'
            str+='  </div>'
            str+='   </div>'
        }
        $('.shopping_cart').html(str)
        var str2=''
        for(var i= 0,len=this.products.length;i<len;i++){
            str2='<div class="total_left">总计 : '+this.products[i].allPrice+'</div>'
            str2='<div class="total_right allPrice " id="cartprice">$'+this.products[i].allPrice+'</div>'
            str2='<div class="clearfix"> </div>'
        }
        $(".login_buttons").html(str2)

    },
    getSum:function(){
        this.sum+=this.products.length
        return this.sum;
    },
    getAllPrice:function(){
        for(var i=0;i<this.products.length;i++){
            this.allPrice+=this.products[i].youhuijia;
        }
        return this.allPrice
    }


}