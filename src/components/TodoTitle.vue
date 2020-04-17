<template lang="pug">
.wrapper-todo-title
  .title(v-show="!editMode")
    h2.name {{ title }}
    button.button.button-primary(
      v-if="editable" 
      @click="handleEditTitle(true)"
    ) Edit

  .edit-title(v-if="editable" v-show="editMode")
    input.input(
      type="text" v-model="inputEditTitle"
      @keydown.enter="handleEditTitle(false)"
    )
    button.button.button-primary(@click="handleEditTitle(false)") Save

</template>

<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    title: String
  },

  data() {
    return {
      inputEditTitle: "",
      editMode: false
    }
  },
  
  methods: {
    handleEditTitle(toEditMode) {
      if (toEditMode) {
        this.editMode = true;
        this.inputEditTitle = this.title;
      } else {
        this.$emit("update:title", this.inputEditTitle);
        this.editMode = false;
        this.editTitle = "";
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper-todo-title
  width: 100%
  height: 100%

  .title
    display: flex
    justify-content: space-between

    .name 
      font-size: 3rem
      margin: 0
      word-break: break-all

  .button
</style>