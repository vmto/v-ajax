#### v-ajax plug-in with functions of ajax、jsonp

#### Example
```bash
import Vue from 'vue'
import VueAjax from 'v-ajax';

Vue.use(VueAjax);
```

#### Ajax
```bash
data() {
  return {
    api:{
      url:'http://api.xxx.com/v1',
      appid:123456,
      sign:13456
    }
  }
}

// Vue 2.0+
mounted() {
  this.$ajax({
    type:'POST', // GET || POST
    url:this.api.url,
    data:{
      appid: this.api.appid,
      sign: this.api.sign
    },
    success:function(result){
      console.log(result);
    }
  })
}

// Vue 1.0+
ready() {
 code...
}
```

#### Jsonp
```bash
// Vue 2.0+
mounted() {
  this.$ajax({
    url: 'http://3g.163.com/touch/jsonp/sy/recommend/0-9.html',
    data:{id:123},
    dataType: 'jsonp', // It's not Ajax mode
    jsonp: 'callback',
    success: function (res) {
      console.log(res);
    }
  });
}

// Vue 1.0+
ready() {
 code...
}
```

#### Bugs URL
> https://github.com/vue-demo/vue-ajax
