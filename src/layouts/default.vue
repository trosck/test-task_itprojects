<template>
  <div class="container">
    <vue-header />
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {
    "vue-header": ( ) => import("@/components/Header.vue"),
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
}
</style>