<template lang="pug">
.wrapper

  .name-image
    .burger(@click="$emit('showMenu')")
      i.fas.fa-hamburger.fa-2x
    .image
      .wrap
        img(src="../assets/background.jpg" alt="" width="100%" height="100%")
        .circle(:class="{ online: info.online }")
    .center
      .name {{ info.name }}
      .underName 
        template(v-if="info.online") Сейчас в сети
        template(v-else) Был(а) в сети {{ info.lastOnline }} назад
    .right
      .menu
        i.fas.fa-ellipsis-v
      .close(@click="$emit('closeChat')")
        i.fas.fa-times

  .messages(ref="messages")
    .date
    .message(
      v-for="(message, index) in messages"
      :key="index"
      :class="{ left: !message.self, right: message.self }"
    ) {{ message.text }}

  .input-field
    .icon.smile
      i.fas.fa-laugh-beam
    .icon.upload
      i.fas.fa-images
    textarea.input(
      v-model="inputMessage" 
      type="text"
      @keydown.enter.prevent="sendMessage"
      ref="textarea"
    )
    .icon.send(@click="sendMessage")
      i.fas.fa-comment

</template>

<script>
export default {
  props: {
    info: {
      image: String,
      online: Boolean,
      name: String,
      lastOnline: String
    },
    messages: Array
  },
  data() {
    return {
      inputMessage: ""
    }
  },
  mounted() {
    this.scrollToStart();
  },
  watch: {
    messages() {
      const mess = this.$refs.messages;
      if ((mess.offsetHeight + mess.scrollTop) <= mess.scrollHeight - 10) return;
      this.scrollToStart();
    }
  },
  methods: {
    scrollToStart() {
      this.$nextTick(( ) => {
        this.$refs.messages.scrollTo(0, this.$refs.messages.scrollHeight);
      })
    },
    sendMessage(event) {

      // если нажата клавиша shift, делаем перевод каретки вручную
      if (event.shiftKey) {  
        this.inputMessage += "\n"; 
        return;
      }

      // если строка пустая, то ничего не делаем
      if (!this.inputMessage.trim()) return; 

      this.$emit("sendMessage", this.inputMessage);
      this.inputMessage = "";

      console.log(1 + this.inputMessage + 1);

      this.scrollToStart();
    }
  }
}
</script>

<style lang="sass" scoped>
.burger,
.menu,
.close,
.smile,
.upload,
.send
  color: $LightGrey
  cursor: pointer

  &:hover
    color: $Grey

.name-image
  box-shadow: 0px 6px 10px -5px rgba(0, 0, 0, 0.2)
  z-index: 1
  display: grid
  grid-template-columns: 1fr 3fr 1fr
  padding: 1rem

  @media screen and (max-width: $PhoneWidth)
    column-gap: 5px

  @media screen and (max-width: $SmDesktopWidth)
    grid-template-columns: 1fr 1fr 3fr 1fr
  
  .burger 
    display: none
    cursor: pointer
    align-items: center
    justify-content: center

    @media screen and (max-width: $SmDesktopWidth)
      display: flex
  .right
    align-items: center
    justify-content: space-around

    .menu, .close
      cursor: pointer
      border: 0
      background-color: inherit
    
    .menu
      margin-right: 1rem

  .wrap
    width: 40px
    height: 40px
    
    @media screen and (max-width: $PhoneWidth)
      width: 30px
      height: 30px

.messages, .input-field
  background-color: $LightBlue

.messages
  flex: 1
  overflow: auto
  display: flex
  flex-flow: column nowrap

  .message
    margin: 1rem
    padding: 1rem
    max-width: 80%
    border-radius: 50%
    +afs(16px, 14px, 12px)

    &.left
      align-self: flex-start
      background-color: $White
      border-radius: 25px 25px 25px 0

    &.right
      align-self: flex-end
      background-color: $Purple
      border-radius: 25px 25px 0 25px
      color: $White

.input-field
  box-shadow: 0px -6px 10px -5px rgba(0, 0, 0, 0.2)
  z-index: 1
  padding: 1.5rem 1rem
  display: grid
  grid-template-columns: 1fr 1fr 6fr 1fr
  
  .input
    box-shadow: 0px 2px 4px rgba(222, 221, 239, 0.24), 0px 4px 20px #DEDDEF
    border: 0
    width: 100%
    height: 2rem
    padding: 0.5rem
    box-sizing: border-box
    max-height: 150px
    resize: none

  .icon
    cursor: pointer
    display: flex
    justify-content: center
    align-items: flex-end
    padding-bottom: 5px

    &.send
      padding-bottom: 9px
</style>