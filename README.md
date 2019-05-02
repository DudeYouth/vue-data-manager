### vue-data-manager
-------
### 介绍
为什么需要vue-data-manager ？
+ 轻松的实现跨组件、跨路由改变数据状态
+ vuex等工具需要花时间入手，结构复杂繁琐。vue-data-manager api与vue
原生语法一致，贴切易入手。
+ 使用了vue本身api进行扩展、轻量、对vue友善。

### api支持
+  $watch   
+  $nextTick
+  $delete 

#### 安装使用
```
git clone https://github.com/DudeYouth/vue-data-manager.git
```

 vue-data-manager的使用方方式与vue的方式是一样的，在此不做详述。只要熟悉vue的玩家相信也一定会使用该工具。
```javascript
// user.js
export default{
    data(){
        return {
            userName:'小明',

        };
    },
    computed:{},
    watch:{},
    methods:{}
}
```

```javascript
// store.js
import Store from './vue-data-manager';
import user from './user';
export default new Store({
    user
});
```

```javascript
// main.vue
<template>
    <span @click="changeName">{{$store.user.userName}}</span>
</template>
<script>
import Vue from 'vue';
import $store from './store';

Vue.prototype.$store = $store; 
export default new Vue({
    el:'#app',
    methods:{
        changeName(){
            this.$store.user.userName = '小红';
        }
    }
})
<script>
```