<template>
  <div class="cartcontrol" >
    <!-- 减号小球 -->
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart" >
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <!-- 商品数量 -->
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart" ></div>
    
  </div>
</template>

<script>
  import Vue from 'vue';
  export default{
    props:{
      food:{
        type:Object
      }
    },
    
    methods:{
      addCart(event){
        if(!event._constructed){
          return ;
        }
        if(!this.food.count){   //第一次点击
           Vue.set(this.food,'count',1)   //给未被定义的属性赋值需要用Vue.set
        }else{
          this.food.count++;
          console.log("cartcontrol.vue.count:"+this.food.count)
        } 
        //向父组件派发事件，并传递 当前dom
        this.$emit('add',event.target)
      },
      decreaseCart(){
        if(!event._constructed){
          return ;
        }
        if (this.food.count>0) {
          this.food.count--;
        }
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      height:16px
      line-height: 16px
      font-size: 16px
      color: rgb(0, 160, 220)
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
          display: inline-block
          line-height: 16px
          font-size: 16px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        opacity:0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding:6px 0
      line-height: 16px
      height:16px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
      
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 16px
      font-size: 16px
      color: rgb(0, 160, 220)
    
</style>