<template lang="html">
  <div class="wrapper">
    <div class="loader">
      <div class="circle-outer"></div>
    </div>
    <p class="loader-label">
      Loading...
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~app/variables.scss";

$animation-duration: 1.15s;
$animation-bezier: cubic-bezier(0.215, 0.61, 0.355, 1);

$ball-size: 60px;

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  width: 100%;
  height: calc(100vh - 464px);
}

.loader {
  width: 100%;

  > * {
    margin: 0 auto;
    height: $ball-size;
    width: $ball-size;
    border: 0 solid $oub-orange;
    border-radius: $ball-size;
  }
}

.circle-outer {
  animation: boop $animation-duration infinite $animation-bezier;
}

.loader-label {
  animation: loaderText $animation-duration infinite $animation-bezier;
  color: $oub-orange;
  letter-spacing: .1rem;
  font-size: 1.4rem;
  margin: 10px 0;
}


@keyframes boop {
  0% {
    transform: scale(0);
    background-color: $oub-orange;
  }

  29% {
    background-color: $oub-orange;
  }

  30% {
    transform: scale(1);
    background-color: transparent;
    border-width: calc(#{$ball-size} / 2);
    opacity: 1
  }

  50% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
    border-width: 0;
    opacity: 0;
    background-color: transparent;
  }
}

@keyframes loaderText {
  0% {
    opacity: .25;
  }

  30% {
    opacity: 1;
  }

  100% {
    opacity: .25;
  }
}

</style>
