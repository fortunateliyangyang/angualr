<template>
	<div>
    <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price":class="{'highlight':totalPrice>0}" >￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click="pay">{{payDesc}}</div>
      </div>
    </div>
    <!-- 小球动画 -->
    <div class="ball-container">
        <div v-for="ball in balls">
          <!-- 过度钩子函数 -->
          <!--<transition name="drop" v-on:before-enter="beforeDrop" v-on:enter="dropping" v-on:after-enter="afterDrop">-->
          <transition v-on:before-enter="beforeDrop" v-on:enter="dropping" v-on:after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
    </div>
    <!-- 底部购物车详情  -->
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty" >清空</span>
      </div>
      <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(item,index) in selectFoods">
              <span class="name">{{item.name}}</span>
              <div class="price">
                <span>￥{{item.price*item.count}}</span>
              </div>
              <div class="cartcontrol-wapper">
                <cartcontrol :food="item" @add="addFood"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
    </div>
    </transition>
  </div>
  <!-- 列表背后蒙版 -->
  <transition class="fade">
    <div class="list-mask" @click="hideList" v-show="listShow" ></div> 
  </transition>
  </div>

</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from'../cartcontrol/cartcontrol'

	export default {
		props:{
			selectFoods:{
				type:Array,
				default(){
					return [{
						price:10,
						count:1
					}];
				}
			},
			seller:{
				type:Object
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}

		},
    data(){
      return{
        //创建个小球用于动画
        balls:[
           {show:false},
           {show:false},
           {show:false},
           {show:false},
           {show:false},
        ],
        // 存储下落小球
        dropBalls:[],
        //折叠
        fold:true,
        
      }
    },
		computed:{
			totalPrice(){
				let total = 0
				this.selectFoods.forEach((food)=>{
					total += food.price*food.count;
				})
				return total
			},
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count +=food.count
				})
				return count
			},
			payDesc(){
				if(this.totalPrice===0){
					return `￥${this.minPrice}元起送`;
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice - this.totalPrice
					return `还差${diff}元起送`
				}else if(this.totalPrice>this.minPrice){
					return '去结算'
				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return "not-enough"
				}else{
					return "enough"
				}
			},
      listShow(){
        if(!this.totalCount){
        this.fold = true;
        return false;
        }
        let show = !this.fold;
        console.log(show);
        
        //列表展示时初始化时better-scroll
        if (show) {
          this.$nextTick(() => {
            
            //不存在 better-scroll，进行初始化，存在即调用 refresh方法
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }

        return show;
      }
		},
    components:{
      cartcontrol
    },
    methods:{
      //清空购物车数据
      empty(){
        console.log(222);
        this.selectFoods.forEach((item) => {
          console.log(item);
          item.count = 0;
        })
      },
      drop(el) {
      // debugger
        for(let i=0; i<this.balls.length; i++){
          let ball = this.balls[i];
          if(!ball.show){
           // 只有改变元素显示隐藏状态才会触发 过度钩子函数
           ball.show = true;
           ball.el = el;
           console.log(ball);
           this.dropBalls.push(ball);
           return;
          }
        }
      },
      beforeDrop(el) {
      let count = this.balls.length;
      while(count--){
        let ball = this.balls[count];
        if(ball.show){
            //元素相对于视口的距离
          let rect = ball.el.getBoundingClientRect();

          // x,y 为初始点 与 目标点的差值
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top -22);
          el.style.display = ' ';

          // el （初始位置为 0，0，0）和购物车icon在一起，将小球（el）  放到加号位置去
          //纵向动画
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;

          // el.style.webkitTransform = `translate3d(0,${x}px,0)`;
          // el.style.transform = `translate3d(0,${x}px,0)`;

          //横向动画  inner-hook，  仅仅定义类 dom选择器，不做样式
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
      },
      dropping(el,done) {
        //手动触发浏览器重绘，便于translate3d，--rf 变量不会使用
        let rf = el.offsetHeight;

        this.$nextTick(() => {
          //小球样式位置，置于购物车按钮位置处
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';

          let inner = el.getElementsByClassName('inner-hook')[  0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';

          el.addEventListener("transitionend",done);
        })
      },
      afterDrop(el) {
        //此轮动画结束后，将此次的 ball 取出 ，ball状态重置，，el display:none
        let ball = this.dropBalls.shift();
        if(ball){
          ball.show = false;
          el.style.display = "none";
        }
      },
      toggleList(){
        console.log(111)
        if(!this.totalCount){  //选择商品数为0，则不能点击
          return
        }
        this.fold = !this.fold   //点击折叠取反
        console.log("this.totalCount:"+this.totalCount)
        console.log(this.fold);
      }, 
      addFood(target){
        this.drop(target);
      },
      hideList(){
        this.fold = !this.fold;
      },
      pay(){
        if(this.totalPrice < this.minPrice){
            return;
      }
      window.alert(`需支付${this.totalPrice}元`);
    }
    },
      
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
          	width:100%
          	text-align: center
          	border-radius:50%
          	background:#2b343c
          	&.highlight
          		background:rgb(0,160,220)
          	.icon-shopping_cart
          		line-height:44px
          		font-size:24px
          		color:#80858a
          		&.highlight
          			color:#fff
          .num
            position:absolute
            top:0
            right:0
            vertical-align:top
            text-align:center
            width:24px
            height:16px
            border-radius:16px	
            line-height:16px
            background:rgb(240,20,20)
            color:rgb(255,255,255)
            font-size:9px
            font-weight:700px
          	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
        	display:inline-block
        	margin-top:12px
        	vertical-align:top
        	padding-right:12px
        	box-sizing:border-box
        	border-right:1px solid rgba(255,255,255,0.1)
        	line-height:24px
        	color:rgba(255,255,255,0.4)
        	font-size:16px
        	font-weight:700
        	&.highlight
        		color:#fff
        .desc
        	display:inline-block
        	vertical-align:top
        	margin:12px 0 0 12px
        	line-height:24px
        	font-size:16px
      .content-right 
      	display:inline-block
      	flex:0 0 105px
      	width:105px
      	.pay
      	   height:48px
      	   line-height:48px
      	   text-align: center
      	   font-size:12px
      	   font-weight:700
      	   color:rgba(255,255,255,0.4)
      	   &.enough
      	   	background: #00b43c
      	   	color: #fff
      	   &.not-enough
      	   	background: #2b333b
    .ball-container
      .ball
        position:fixed
        left:32px
        bottom:22px
        z-index:200
           
        //Y轴 贝塞尔曲线
        transition:all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner{
          width:16px
          height:16px
          border-radius:50%
          background-color:rgb(0,160,220)
          //x 轴 线性缓动
          transition:all 0.5s linear
        }
    .shopcart-list{
      position:absolute
      left:0
      right:0
      top:0
      width:100%
      z-index:-1
  
      transform:translate3d(0,-100%,0)
      &.fold-enter-active, &.fold-leave-active{
        transition:all 0.4s linear
      }
      &.fold-enter, &.fold-leave-active{
        transform:translate3d(0,0,0)
      }
      .list-header {
        height:40px
        line-height:40px
        padding:0 18px
        background:#f3f5f7
        border-bottom:1px solid rgba(7, 17, 27, 0.1)
        .title {
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        }
        .empty {
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
        }
      }
      .list-content{
        padding:0 18px
        max-height :217px
        overflow:hidden
        background :#fff
        .food{
          position:relative
          padding:12px 0
          box-sizing:border-box  
          border-1px:rgba(7,17,27,0.1)
          .name {
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          }
          .price {
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          }
          .cartcontrol-wapper {
            position:absolute
            right: 0
            bottom:10px
          }
        }
  
      }
    }
.list-mask{
  position:fixed
  left:0
  right:0
  top:0
  bottom:0
  -webkit-backdrop-filter:blur(10px)
  background-color:rgba(7,17,27,0.6)
  //进入动画
  &.fade-enter-active,&.fade-leave{
    transition:all 3s
  }
  &.fade-enter,&.fade-leave-active{
    opaciyt:0
    background-color:rgba(7,17,27,0)
  }
}
        
      
        	
        	
          	
</style>