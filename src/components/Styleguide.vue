<template lang="html">
  <div class="styleguide">
    <h1> This is an H1 </h1>
    <h2> This is an H2 </h2>
    <h3> This is an H3 </h3>
    <h4> This is an H4 </h4>
    <h5> This is an H5 </h5>
    <h6> This is an H6 </h6>
    <p> This is a P </p>

    <button class="button primary-button">Primary</button>
    <button class="button secondary-button">Secondary</button>
    <button class="button selected-button">Selected</button>
    <button class="button disabled-button">Disabled</button>

    <div class="forms">
      <md-input-container>
        <label>Textarea</label>
        <md-textarea></md-textarea>
      </md-input-container>
    </div>

    <md-theme md-name="buttons">
      <router-link tag="md-button" to="/" class="md-raised">Default</router-link>
      <router-link tag="md-button" to="/" class="md-raised md-primary">Primary</router-link>
      <router-link tag="md-button" to="/" class="md-raised md-accent">Accent</router-link>
      <router-link tag="md-button" to="/" class="md-raised md-warn">Warn</router-link>
    </md-theme>

    <md-theme md-name="buttons">
      <md-radio v-model="radio1" id="my-test1" name="my-test-group1" md-value="1">My beautiful radio</md-radio>
      <md-radio v-model="radio1" id="my-test2" name="my-test-group1" md-value="2">Another radio</md-radio>
      <md-radio v-model="radio1" id="my-test3" name="my-test-group1" md-value="3">Another another radio</md-radio>
    </md-theme>

  </div>
</template>

<script>

export default {
  data () {
    return {
      radio1: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .styleguide {
    width: 960px;
    margin: 0 auto;
  }

  .forms {
    width: 300px;
    margin: 50px auto;
  }
</style>
