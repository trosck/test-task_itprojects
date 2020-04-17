<template lang="pug">
.wrapper-confirm
  slot(@click="visible = true")
  .confirm(v-show="visible")
    .title {{ textTitle }}
    .buttons
      button.button.cancel(@click="cancel") {{ textCancel }}
      button.button.confirm(@click="confirm") {{ textConfirm }}
</template>

<script>
export default {
  props: {
    textCancel: {
      type: String,
      default: "No"
    },
    textConfirm: {
      type: String,
      default: "Yes"
    },
    textTitle: {
      type: String,
      default: "Are you sure?"
    }
  },
  
  data() {
    return {
      visible: false
    }
  },

  methods: {
    cancel() {
      this.$emit("cancel");
      this.visible = false;
    },

    confirm() {
      this.$emit("confirm");
      this.visible = false;
    }
  },
}
</script>

<style lang="sass" scoped>
.wrapper-confirm
</style>