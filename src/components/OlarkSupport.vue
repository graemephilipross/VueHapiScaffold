<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted () {
    /*eslint-disable */
    (function(o,l,a,r,k,y){if(o.olark)return; r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0]; y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r); y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)}; y.extend=function(i,j){y("extend",i,j)}; y.identify=function(i){y("identify",k.i=i)}; y.configure=function(i,j){y("configure",i,j);k.c[i]=j}; k=y._={s:[],t:[+new Date],c:{},l:a}; })(window,document,"static.olark.com/jsclient/loader.js");
    /* custom configuration goes here (www.olark.com/documentation) */
    olark.identify('9019-313-10-6880') // change 
    /*eslint-enable */
  },
  beforeDestroy () {
    const olarkDiv = document.querySelector('div[data-olark]')
    const olarkIFrame = document.querySelector('iframe[data-olark]')
    if (olarkDiv && olarkIFrame) {
      olarkDiv.parentNode.removeChild(olarkDiv)
      olarkIFrame.parentNode.removeChild(olarkIFrame)
    }
    window.olark = null
  }
}
</script>

<style lang="scss">
</style>
