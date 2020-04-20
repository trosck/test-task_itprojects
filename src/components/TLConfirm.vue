<template lang="pug">
.wrapper-confirm
  .slot(@click="visible = true")
    slot
  template(v-if="visible")
    transition(name="confirm")
      .confirm
        .title {{ textTitle }}
        .buttons
          span.button-no(@click="cancel" role="button") {{ textCancel }}
          span.button-ok(@click="confirm" role="button") {{ textConfirm }}
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
    },
    click() {
      console.log("children click")
    }
  },
}
</script>

<style lang="sass" scoped>
.wrapper-confirm
  position: relative

  .confirm
    position: fixed
    background: #ffffff
    padding: 15px
    box-shadow: 0 0 3px 1px
    border-radius: 10px
    transition: all 0.3 ease

    .title
      font-size: 2rem

.confirm-enter,
.confirm-leave-active
  opacity: 0
</style>