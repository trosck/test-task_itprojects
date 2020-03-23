<template lang="pug">
  .container
    .wrapper-container
      header
        tl-header
      main
        slot
    .chat-icon(@click="chat = true")
      i.fas.fa-comment-alt
      .text Chat
    tl-chat(
      v-model="chat" 
      :chatList="chatList" 
      :currentChat="currentChat"
      @sendMessage="sendMessage"
      @pickDialog="id => this.currentChat = id"
    )
</template>

<script>
import TLChat from "@/components/TLChat.vue";
import TLHeader from "@/components/TLHeader.vue";

function generateString(length) {
  return (
    new Array(length).fill().map(( ) => (
      String.fromCharCode(Math.round(Math.random() * (122 - 97) + 97))
    )).join("")
  )
};
function randomBoolean() {
  return Math.round(Math.random() * 100) > 50;
}

export default {
  components: {
    "tl-header": TLHeader,
    "tl-chat": TLChat
  },
  data() {
    return {
      chat: false,
      currentChat: null,
      chatList: new Array(12).fill().map((item, index ) => {
        const bool = randomBoolean();
        const last = Math.round(Math.random() * 60) + " минут";
        return {
          id: index,
          image: "",
          name: "Владимир путин" + index,
          lastMessageDate: "22:11",
          lastMessage: generateString(7),
          online: bool,
          item,
          dialogData: {
            info: {
              image: "",
              online: bool,
              name: "Владимир путин" + index,
              lastOnline: last
            },
            messages: new Array(23).fill().map(( ) => {
              const self = Math.round(Math.random() * 100) > 50; // random boolean value
              const text = generateString(10);
              return {
                text,
                self
              }
            })
          }
        }
      }),
    }
  },
  methods: {
    sendMessage(message) {
      this.chatList[this.currentChat].dialogData.messages.push({
        text: message,
        self: true
      })
      setTimeout(( ) => {
        this.chatList[this.currentChat].dialogData.messages.push({
          text: generateString(10),
          self: false
        })
      }, 1000);
    }
  },
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

.chat-icon
  display: flex
  align-items: center
  position: fixed
  bottom: 1rem
  right: 1rem
  // color: $White
  padding: 1rem
  font-size: 3rem
  cursor: pointer
  @include page-item

  &:hover .text
    margin-left: 1rem
    opacity: 1

  .text
    margin-left: -6.5rem
    opacity: 0
    transition: margin-left 1s, opacity .5s ease-in-out
</style>