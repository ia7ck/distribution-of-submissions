<template>
  <!-- `.prevent` modifier https://jp.vuejs.org/v2/guide/syntax.html#%E4%BF%AE%E9%A3%BE%E5%AD%90 -->
  <form class="box is-flex is-center is-middle" v-on:submit.prevent="onSubmit">
    <label class="text is-padding-right-xs" for="atcoder-id">AtCoder ID</label>
    <input
      id="atcoder-id"
      class="input"
      type="text"
      v-model="id"
      :disabled="inputDisabled"
    />
    <button class="button is-outline" type="submit" :disabled="inputDisabled">
      Go!
    </button>
  </form>
</template>

<script>
export default {
  name: "AtCoderIDForm",
  data() {
    return {
      id: this.$route.query.atcoder || "",
    };
  },
  props: {
    handleSubmit: Function,
    inputDisabled: Boolean,
  },
  mounted() {
    if (this.id.length >= 1) {
      this.sendID();
    }
  },
  methods: {
    onSubmit() {
      if (this.$route.query.atcoder != this.id) {
        this.$router.push({ path: "/", query: { atcoder: this.id } });
      }
      this.sendID();
    },
    sendID() {
      this.handleSubmit(this.id);
    },
  },
};
</script>
