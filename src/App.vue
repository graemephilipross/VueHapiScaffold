<template>
  <div id="app">
    <SVGSprite></SVGSprite>
    <errorToast></errorToast>
    <navbar></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
    <olark-support></olark-support>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import SVGSprite from './components/SVGSprite'
import ErrorToast from './components/ErrorToast'
import OlarkSupport from './components/OlarkSupport'

export default {
  name: 'app',
  components: {
    Navbar,
    SVGSprite,
    ErrorToast,
    OlarkSupport
  }
}
</script>

<style lang="scss">
  @import "~app/fonts.scss";
  @import "~app/animations.scss";
  @import "~app/variables.scss";
  @import "~app/global.scss";
  @import "~app/buttons.scss";
  @import "~app/rangeSlider.scss";
  @import "~app/loadingSpinner.scss";
  @import '~material/master.scss';
  @import '~material/theme.scss';
  @import '~material/dialog.scss';
  @import '~material/radioButton.scss';
  @import '~material/table.scss';

  #app {
    font-family: 'robotoregular', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    box-sizing: border-box;
  }

  .container {
    display: block;
    height: calc(100vh - 64px);
  }

  .hideme {
    display: none;
  }
</style>
