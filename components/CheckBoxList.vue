<template lang="pug">
  div
    
    //- 入力値に都道府県コードを上書きしてv-modelで双方向バインディング
    div(v-for="(item,index) in getPrefectures")
      input(type="checkbox" id="checkbox" :value="item.prefCode" v-model="prefCodes")
      label( for="checkbox")
        | {{item.prefName}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      prefCodes: [],
    };
  },
  mounted() {
    this.$store.dispatch("prefecture/fetchPrefectures");
  },
  computed: {
    ...mapGetters("prefecture", ["getPrefectures"]),
  },
  methods: {},
  watch: {
    prefCodes: function () {
      this.$emit("updatePrefCodes", this.prefCodes);
    },
  },
};
</script>

<style scoped></style>
