<template lang="pug">
li.item.relative(:class="{ complete: item.complete }")

  input(
    v-if="editable"
    type="checkbox" 
    class="checkbox"
    @change="$emit('complete')" 
    :checked="item.complete"
  )

  span {{ item.name }}

  // .tools.relative(v-if="editable")

  //   button(
  //     class="button btn-primary" 
  //     @click="$emit"
  //   ) Edit

  //   button(
  //     class="button btn-warning"
  //     @click="handleDelete(index)"
  //   ) Delete
</template>

<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object, 
      required: true
      /* 
        type: {
          complete: Boolean,
          name: String
        }
      */
    }
  }
}
</script>

<style lang="sass" scoped>
.item 
  display: flex
  align-items: center
  margin: 1rem 0
  font-size: 2rem

  &.complete 
    text-decoration: line-through
</style>