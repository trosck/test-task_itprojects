<template lang="pug">
  .wrapper.relative
    router-link.logo(to="/")
      span.name   TodoList
      span.author by Sergey Belov
</template>

<script>
import { mapActions } from "vuex";

export default {
  
  methods: {
    
  },
}
</script>

<style lang="sass" scoped>
.wrapper 
  display: flex
  justify-content: space-between
  align-items: center
  padding: 10px
  margin: 10px 0
  @include page-item

  .logo

    .name
      font-size: 3rem
      font-weight: 700
      font-family: cursive

    .author
      font-size: 1rem
      font-weight: 500
      font-family: cursive
</style>