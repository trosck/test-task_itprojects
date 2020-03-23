<template>
  <div class="wrapper" :class="modalType" ref="modal">
    <div class="inner">
      <div class="title">{{ title }}adsfdskfjask dsf jdsfj sdfDFJK</div>

      <hr>

      <div class="content">
        <slot name="content">asdfksdfk adskf kdsjf ksadfj ksdfj</slot>
      </div>

      <hr>

      <div class="footer">
        <slot name="footer">
          <button class="button btn-primary" @click="handleClick(false)">{{ textButtonLeft }}</button>
          <button class="button btn-primary" @click="handleClick(true)">{{ textButtonRight }}</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    textButtonLeft: {
      type: String,
      default: "No"
    },
    textButtonRight: {
      type: String,
      default: "Yes"
    },
    modalType: {
      type: String,
      default: "primary",
      validator(type) {
        return ["warning", "primary"].includes(type);
      }
    }
  },
  methods: {
    handleClick(answer) {
      this.$emit("answer", answer);
    },
  },
  mounted() {
    console.log(this.$refs)
    document.body.appendChild(this.$refs.modal)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 100px;
  right: 35%;
  width: 400px;
  z-index: 1000;
  padding: 30px;
  background-color: #ffffff;

  .inner {
    margin: auto;
  }
}

.primary {
  border: 3px solid #3c7984;
  box-shadow: 10px 10px 10px -5px #3c7984;
}

.warning {
  border: 3px solid #800000;
  box-shadow: 10px 10px 10px -5px #800000;
}

.title {
  font-size: 2.5rem;
}

.content {
  font-size: 1.5rem;
}

.footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

  .button {
    margin-left: 10px;
  }
}
</style>