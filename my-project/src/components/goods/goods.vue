<template>
    <div class="goods">
    	<!-- 左侧菜单 -->
       <div class="menu-wrapper" ref="menuWrapper">
       	<ul>
       		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
       		@click="selectMenu(index,$event)">
       			<span class="text border-1px">
       				<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
       			</span>
       		</li>
       	</ul>
       </div>
       <!-- 右侧商品详情 -->
       <div class="foods-wrapper" ref="foodWrapper">
       	<ul>
       		<li v-for="(item,index) in goods" class="food-list food-list-hook">
       			<h1 class="title">{{item.name}}</h1>
       			<ul>
       				<li v-for="(food,index) in item.foods" class="item-food">
       					<div class="icon">
       						<img width="57" height="57" :src="food.icon" >
       					</div>
       					<div class="content">
       						<h2 class="name">{{food.name}}</h2>
       						<p class="desc">{{food.description}}</p>
       						<div class="extra">
       							<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
       						</div>
       						<div class="price">
       							<span class="now">￥{{food.price}}</span>
       							<span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
       						</div>
       						<div class="cartcontrol-wrapper">
       							<cartcontrol :food="food" @add="addFood"></cartcontrol>
       						</div>
       					</div>
       				</li>
       			</ul>
       		</li>
       	</ul>
       </div>
       <!-- 底部购物车 -->
       <shopcart ref="shopcart" :selectFoods="selectFoods"  :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice">
       </shopcart>
    </div>
</template>
<script >
	import BScroll from 'better-scroll'
	import shopcart from '../shopcart/shopcart';
    import cartcontrol from'../cartcontrol/cartcontrol'
	const ERR_OK = 0;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY: 0,
				selectedFood:{}
			};
		},
		computed:{
			currentIndex(){    //根据食物列表所处的位置，判断菜单的class
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i+1]
					if(!height2|| (this.scrollY>=height1&&this.scrollY<height2)){ 
					// 滑动后的位置落在最后一个或者当前第i个区间，则返回当前索引
						return i
					}
				}
				return 0;
			},
			selectFoods(){
				let foods = [];
				this.goods.forEach((good)=>{
					 good.foods.forEach((food)=>{
                          if(food.count){
                          	foods.push(food)
                          	console.log("goods.vue.count:"+food.count)
                          }
					    })
				     });
				return foods;
			}

		},
		created(){
		  this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

		  this.$http.get('/api/goods').then(response => {
          response = response.body; //获取数据，DOM还未更新
          if(response.errno===ERR_OK){
            this.goods = response.data;  
            this.$nextTick(()=>{       //在回调中，DOM已经更新了
            	this._initScroll();
            	this._calculateHeight();
            })
          }
         });
		},
		components: {
             shopcart,
             cartcontrol

        },
		methods:{
			// 初始化 better-scroll
			_initScroll(){
				this.meunScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});

				this.foodScroll = new BScroll(this.$refs.foodWrapper,{
					probeType: 3 ,   //在滚动过程中时事派发scroll事件
					click: true
				})
				this.foodScroll.on('scroll',(pos)=>{    // pos 当前位置
					this.scrollY = Math.abs(Math.round(pos.y))   //pos.y <0
				})
			},
			selectMenu(index,event){
				if(!event._constructed){
				 //如果不存在这个属性,则为浏览器原生点击事件（浏览器原生click事件没有_constructed的属性），不执行下面的函数 有这个属性则为我们自己派发的click事件 
					return ;
				}   
				let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook")
			    let el = foodList[index]
			    this.foodScroll.scrollToElement(el,300) 

			},
			// 计算菜单栏元素
			_calculateHeight(){
				let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook")
				let height=0
				this.listHeight.push(height)
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i]
				    height +=item.clientHeight  //每次循环增加一个food高度
					this.listHeight.push(height)     //每一个foodlist 按顺序排列下来的各自高度	
				}
				   //9 foodList是menu-wrapper对应的9个food选区

			},
			//cartcontrol子组件$emit派发而来的事件
			addFood(target){
				
				this._drop(target)
			},
			_drop(target){
				// 体验优化,异步执行下落动画
				this.$nextTick(()=>{
					this.$refs.shopcart.drop(target);
				})
			}

		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
   @import "../../common/stylus/mixin.styl"

.goods
    display:flex
    position:absolute
    top:174px
    bottom:46px
    width:100%
    overflow:hidden
	.menu-wrapper
	    flex:0 0 80px
	    width:80px
	    background: #f3f5f7
	  	.menu-item
	  	    display:table
	  	    width:56px
	  	    height:54px
	  	    padding:0 12px
	  	    line-height:14px
	  	    &.current
	  	    	position:relative
	  	    	z-index:10
	  	    	margin-top: -1px
	  	    	background:#fff 
	  	    	font-weight:700 
	  	    	.text
                   border-none()  
	  	    .icon
              display:inline-block
              vertical-align: top
              width:12px
              height:12px
              margin-right:2px
              background-repeat:no-repeat
              background-size:12px 12px
              &.decrease
                bg-image("decrease_3")
              &.discount
                bg-image("discount_3")
              &.special
                bg-image("special_3")
              &.invoice
                bg-image("invoice_3")
              &.guarantee
                bg-image("guarantee_3")
            .text
          	  display:table-cell
          	  width:56px
          	  vertical-align:middle
          	  border-1px(rgba(7, 17, 27, 0.1))
          	  font-size:12px
              
          	
	.foods-wrapper
	   flex:1 
	   .title
	   	  padding-left:14px
	   	  height:26px
	   	  line-height:26px
	   	  border-left:2px solid #d9dde1
	   	  font-size:12px
	   	  color:rgb(147,153,159) 
	   	  background:#f3f5f7
	   .item-food
	    	display:flex
	    	margin:18px
	    	padding-bottom:18px
	    	border-none()
	    	&:last-child
	    		border-none()
	    		margin-bottom:0
	    	.icon
	    		flex:0 0 57px
	    		margin-right:10px
	    	.content
	    		flex:1
	    		position:relative
	    		.name
	    			display:inline-block
	    			margin:2px 0 8px 0
	    			height:14px
	    			line-height:14px
	    			color:rgb(7,17,27)
	    			font-size:14px
	    		.desc,.extra
	    			line-height:10px
	    			color:rgb(147,153,159)
	    			font-size:10px
	    		.desc
	    			line-height: 12px
	    			margin-bottom:8px
	    		.extra
                    .count
                       margin-right:12px 
                       padding:4px 0
                .price
                	font-weight:700
                	line-height:24px
                	.now
                		font-size:14px
                		margin-right:8px
                		color:rgb(240, 20, 20)
                		font-weight:700
                	.old
                		text-decoration: line-through
                		font-size:10px
                		color:rgb(147,153,159)
                .cartcontrol-wrapper
                	position:absolute
                	right:0
                	bottom:-15px  	
</style>