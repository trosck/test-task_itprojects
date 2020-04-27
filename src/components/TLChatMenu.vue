<template lang="pug">
.wrapper
  .header
    .close(@click="close")
      i.fas.fa-chevron-left
    .title Чаты
    .input
      input(
        placeholder="Поиск..."
        v-model="inputSearch"
      )
      i.fas.fa-search.search-icon
      
  ul.chat-list
    li.list-item.name-image(
      v-for="chat in content"
      :key="chat.id"
      :class="{ active: chat.id === currentChat }"
      @click="$emit('pickDialog', chat.id) && close()"
    )
      .image
        .wrap
          img(src="../assets/background.jpg" alt="" width="100%" height="100%")
          .circle(:class="{ online: chat.online }")
      .center
        .name {{ chat.name }}
        .underName {{ chat.lastMessage }}
      .right {{ chat.lastMessageDate }}
</template>

<script>
export default {
  props: {
    content: Array,
    currentChat: Number
  },
  data() {
    return {
      inputSearch: ""
    }
  },
  methods: {
    close() {
      if (window.innerWidth <= 992) this.$emit('closeMenu')
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  box-shadow: 0px 2px 20px rgba(154, 166, 201, 0.291695)

ul
  list-style: none
  margin: 0
  padding: 0

.chat-list
  display: grid
  padding: 1rem 0
  overflow: auto

  .list-item
    padding: 1rem
    display: grid
    grid-template-columns: 1fr 2.5fr 1fr
    cursor: pointer

    &:hover, &.active
      background-color: $LightBlue

.header
  padding: 1rem
  position: relative

  .title 
    font-size: 24px
    font-weight: 500
    padding: 1rem 0

  .input
    position: relative
    box-shadow: 0px 2px 4px rgba(222, 221, 239, 0.24), 0px 4px 20px #DEDDEF

    input 
      border: 0
      width: 100%
      height: 100%
      padding: 1rem
      padding-left: 3rem
      box-sizing: border-box
      font-size: 16px
      font-weight: 500
      
    .search-icon
      position: absolute
      top: 15px
      left: 15px

  .close
    position: absolute
    cursor: pointer
    top: 20px
    right: 20px

    @media screen and (min-width: $SmDesktopWidth)
      display: none

.name-image 
  .right
    padding-top: 0.5rem
    color: $LightGrey

  .center
    // width: 200px

    .name
      font-weight: 500

  .wrap
    width: 60px 
    height: 60px
    
    @media screen and (max-width: $PhoneWidth)
      width: 40px
      height: 40px
</style>