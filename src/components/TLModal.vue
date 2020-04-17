<template lang="pug">
transition( name="modal" )
  .wrapper( :class="modalType" )
    .inner( ref="modal" )
      .header
        .title {{ title }}

      .content
        slot( name="content" )

      .footer
        slot( name="footer" )
</template>

<script>
export default {
  props: {
    title: String,
    modalType: {
      type: String,
      default: "primary",
      validator(type) {
        return ["warning", "primary"].includes(type);
      }
    }
  },

  // watch: {
  //   visible(value) {
  //     if (value) {
  //       this.$nextTick(( ) => {
  //         document.body.addEventListener("click", this.close);
  //       })
  //     } else {
  //       document.body.removeEventListener("click", this.close);
  //     }
  //   }
  // },

  // methods: {
  //   close(event) {
  //     const check = event.path.filter(element => element == this.$refs.modal);
  //     if (!check.length) {
  //       document.body.removeEventListener("click", this.handleClose);
  //       this.$emit("close");
  //     }
  //   }
  // }
}
</script>

<style lang="sass" scoped>
.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .wrapper,
.modal-leave-active .wrapper
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

.wrapper
  transition: all 0.2s ease
  z-index: 1000
  position: fixed
  top: 0
  right: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  align-items: center
  justify-content: center

  .inner 
    margin: auto
    padding: 20px
    background-color: $White

  &.primary 
    border: 3px solid #3c7984
    box-shadow: 10px 10px 10px -5px #3c7984
  

  &.warning 
    border: 3px solid #800000
    box-shadow: 10px 10px 10px -5px #800000

.title 
  font-size: 2.5rem

.content 
  margin: 10px 0
  font-size: 1.5rem

.footer 
  margin-top: 10px
  display: flex
  justify-content: flex-end

  .button 
    margin-left: 10px
</style>