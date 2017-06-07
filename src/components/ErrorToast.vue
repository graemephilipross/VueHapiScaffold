<template lang="html">
    <div>
      <transition name="error-fade">
        <div class="error-toast-cont" v-show="apiResponseError !== ''">
          <div class="toast error">
            <md-icon>error</md-icon>
            <p class="text" v-html="apiResponseError"></p>
          </div>
        </div>
      </transition>
      <transition name="error-fade">
        <div class="error-toast-cont" v-show="apiResponseSuccess !== ''">
          <div class="toast success">
            <md-icon>info_outline</md-icon>
            <p class="text" v-html="apiResponseSuccess"></p>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      apiResponseError: 'apiResponseError',
      apiResponseSuccess: 'apiResponseSuccess'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~app/variables.scss";
  .error-toast-cont {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    width: 100%;

    > * {
      box-sizing: border-box;
    }

    .toast {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 6px;
      padding: 15px;
      color: #FFFFFF;
      height: 64px;

      .md-icon,
      .text {
      }

      .md-icon {
        margin: 0;
        margin-right: 10px;
      }

      .text {
        font-size: 1.8rem;
      }

      &.error {
        background-color: $app-red;
      }

      &.success {
        background-color: $app-green;
      }
    }
  }

  .error-fade-enter-active, .error-fade-leave-active {
    transition: opacity .5s
  }
  .error-fade-enter, .error-fade-leave-to {
    opacity: 0
  }
</style>
