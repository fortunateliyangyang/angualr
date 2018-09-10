var Cloth =function(){
    Base.call(this,arguments)
    this.size=''
    this.color=''
}
Cloth.prototype = new Base();
Cloth.prototype.init=function(){
    this.bindColor()
    this.bindDOMDetail()
    this.bindSize()
    this.bindDOMImage()

}
Cloth.prototype.bindDOMImage=function(){}
Cloth.prototype.bindDOMDetail = function () {
    $('#pname').html(this.name)
    $('#description').html(this.description)
    $('#price').html(this.normalPrice)
    $('#groupPrice').html(this.youhuijia)
    $('#buyCount').html(this.buySum)
}
Cloth.prototype.bindSize=function(){
    var str=''
    str+='<h3>尺寸</h3>'
    for(var i=0;i<this.sizes.length;i++) {
        str+='<li><a href="#">'+this.sizes[i]+'</a></li>'
    }
    $('.sizes').html(str)
}
Cloth.prototype.bindColor=function(){
    var str= ''
    str+= '<h3>颜色</h3>'
    for(var i=0;i<this.colors.length;i++){
        str+='<li><a href="#">'+this.colors[i]+'</a></li>'
    }
    $('.colors').html(str)
}

