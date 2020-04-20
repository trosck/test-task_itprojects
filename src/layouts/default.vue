<template lang="pug">
  .container
    .wrapper-container
      header
        tl-header
      main
        slot
</template>

<script>
export default {
  components: {
    "tl-header": ( ) => import("@/components/TLHeader.vue"),
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  max-height: 100vh
  min-height: 100vh
  background: rgba(0, 0, 0, 0.3)

  .wrapper-container
    margin: 0 auto
    width: 100%
    max-width: 440px
    height: 100%
    max-height: 100%
    display: flex
    flex-flow: column nowrap
    position: relative

    main
      overflow: hidden
      display: flex
      flex-flow: column nowrap
      flex: 1
      position: relative
</style>