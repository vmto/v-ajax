## To solve the callback

> https://github.com/vue-demo/vue-ajax

```bash
import Vue from 'vue'
import VAjax from 'v-ajax';

Vue.use(VAjax);
```

```bash
data() {
  return {
    api:{
      url:'http://api.xxx.com/v1',
      appid:123456,
      sign:'13456'
    }
  }
}

// Vue 1.0+
ready() {
  this.$ajax({
    type:'GET',
    url:this.api.url,
    dataType:'jsonp',
    jsonp:'jsonpcallback',
    data:{
      appid : this.api.appid,
      sign : this.api.sign
    },
    success:function(result){
      console.log(result);
    },
    error:function(err){
      console.log(err);
    }
  })
}

// Vue 2.0+
mounted() {
  this.$ajax({
    type:'GET',
    url:this.api.url,
    dataType:'jsonp',
    jsonp:'jsonpcallback',
    data:{
      appid : this.api.appid,
      sign : this.api.sign
    },
    success:function(result){
      console.log(result);
    },
    error:function(err){
      console.log(err);
    }
  })
}
```
