<template lang="pug">
  .checkbox-list
    p 都道府県
    //- 入力値に都道府県コードを上書きしてv-modelで双方向バインディング
    label.checkbox(v-for="(item,index) in getPrefectures")
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

<style lang="scss" scoped>
.checkbox-list {
  padding: 0 25px;
  p {
    font-size: 24px;
    line-height: 30px;
    margin: 10px 0;
    width: 150px;
    text-align: center;
  }
  .checkbox {
    width: 100px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
  }
}
</style>
