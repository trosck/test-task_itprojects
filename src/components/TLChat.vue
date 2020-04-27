<template lang="pug">
transition(name="fade")
  .chat-wrapper(v-show="visible")
    .chat
      transition(name="menu")
        tl-chat-menu.menu-chat(
          v-show="showMenu"
          :content="chatList"
          :currentChat="currentChat"
          @pickDialog="id => this.$emit('pickDialog', id)"
          @closeMenu="closeMenu"
        )
      template(v-if="currentChat != null")
        tl-chat-messages.user-chat(
          v-bind="chatList[currentChat].dialogData"
          @sendMessage="sendMessage"
          @closeChat="$emit('closeChat', !visible)"
          @showMenu="showMenu = true"
        )
      template(v-else)
        .user-chat.empty Выберите пожалуйста диалог
</template>

<script>
import TLChatMenu from "./TLChatMenu.vue";
import TLChatMessages from "./TLChatMessages.vue";

export default {
  model: {
    prop: "visible",
    event: "closeChat"
  },
  props: {
    visible: Boolean,
    chatList: Array,
    currentChat: Number
  },
  data() {
    return {
      showMenu: true
    }
  },
  components: {
    "tl-chat-menu": TLChatMenu,
    "tl-chat-messages": TLChatMessages
  },
  methods: {
    sendMessage(message) {
      this.$emit("sendMessage", message)
    },
    closeMenu() {
      if (this.currentChat == null) return;
      this.showMenu = false;
    }
  }
}
</script>

<style lang="sass" scoped>
.menu-enter-active.menu-chat
  -webkit-animation: slide-in .5s ease-in-out
  -moz-animation: slide-in .5s ease-in-out
  -o-animation: slide-in .5s ease-in-out
  animation: slide-in .5s ease-in-out

.menu-leave-active.menu-chat
  -webkit-transition: margin-left .5s ease-in-out, opacity .5s
  -moz-transition: margin-left .5s ease-in-out, opacity .5s
  -o-transition: margin-left .5s ease-in-out, opacity .5s
  transition: margin-left .5s ease-in-out, opacity .5s

@keyframes slide-in
  0%
    margin-left: -20rem
    opacity: 0
  75%
    margin-left: 1rem
  100%
    margin-left: 0rem
    opacity: 1

.menu-leave-to.menu-chat
  margin-left: -20rem
  opacity: 0

.fade-enter-active, .fade-leave-active
  -webkit-transition: opacity .5s
  -moz-transition: opacity .5s
  -o-transition: opacity .5s
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.chat-wrapper
  z-index: 9999
  position: fixed
  top: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.1)
  display: flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center

  .chat
    background-color: $White
    display: flex
    flex-flow: row nowrap
    max-height: 600px
    position: relative

.menu-chat, .user-chat
  max-height: inherit
  display: flex
  flex-flow: column nowrap

  @media screen and (max-width: $SmDesktopWidth)
    height: 500px

.menu-chat
  width: 400px
  z-index: 99

  @media screen and (max-width: $SmDesktopWidth)
    background-color: $White
    position: absolute
    left: 0

  @media screen and (max-width: $PhoneWidth)
    width: 300px

.user-chat
  width: 500px

  @media screen and (max-width: $SmDesktopWidth)
    width: 600px

  @media screen and (max-width: $PhoneWidth)
    width: 300px

  &.empty
    display: flex
    justify-content: center
    align-items: center

//  т.к. в списке и в заголовке
//  сообщений одни и те же 
//  стили, решил сделать их глобальными
//  для этого компонента
//  --------------------------------
//  вынести в отдельный компонет
//  нормально не получилось

/deep/ .name-image
  .image, 
  .center,
  .right
    display: flex

  .image 
    justify-content: center
    align-items: center

    img
      object-fit: cover
      object-position: 50% 50%

    .wrap
      position: relative

    .circle.online
      width: 15px
      height: 15px
      border: 3px solid $White
      background-color: $Turquoise
      border-radius: 50%
      position: absolute
      bottom: -5px
      right: -5px

      @media screen and (max-width: $PhoneWidth)
        width: 10px
        height: 10px
        border-width: 2px

  .center
    flex-flow: column nowrap
    justify-content: space-around

    .name
      font-weight: 600
      +afs(16px, 16px, 14px)
    
    .underName
      +afs(14px, 14px, 12px)
      color: $LightGrey
  
  .right
    +afs(14px, 14px, 12px)
</style>