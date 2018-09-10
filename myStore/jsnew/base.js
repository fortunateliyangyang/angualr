function Base() {
    this.name=''
    this.description=''
    this.normalPrice=''
    this.youhuijia=
    this.buySum=''
    this.images=[]
}
Base.prototype={
    init:function () {},
    /*绑定图片信息*/
    bindDOMImage:function(){
        var str=''
        for(var i= 0,len=this.images.length;i<len;i++) {
            str+='<li>'
            str+='<img class="etalage_thumb_image" src="'+ this.images[i].small+'" class="img-responsive" />'
            str+='<img class="etalage_source_image" src="'+ this.images[i].small+'" class="img-responsive" />'
            str+='</li>'

            $('#etalage').html(str)

            /*jquery插件实现的幻灯片特效*/
            $('#etalage').etalage({
                thumb_image_width: 250,
                thumb_image_height: 300,
            });
        }
    },
    /*绑定详细信息*/
    bindDOMDetail:function(){},

}