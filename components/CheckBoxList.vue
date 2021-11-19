<template lang="pug">
  div 
    .checkbox-list
      p 都道府県
      //- 入力値に都道府県コードを上書きしてv-modelで双方向バインディング
      div
        label.checkbox(v-for="(item,index) in prefResult")
          input(type="checkbox" id="checkbox" :value="item.prefCode" v-model="prefCodes")
          | {{item.prefName}}
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      prefCodes: [],
      prefResult: [],
    };
  },
  async mounted() {
    await this.fetchPrefectures();
  },
  computed: {},
  methods: {
    async fetchPrefectures() {
      let res;
      try {
        res = await axios.get(
          "https://opendata.resas-portal.go.jp/api/v1/prefectures",
          {
            headers: {
              "X-API-KEY": this.$config.X_API_KEY,
            },
          }
        );
      } catch (e) {
        console.error(e);
        return;
      }
      res.data.result.forEach((element) => {
        this.prefResult.push(element);
      });
    },
  },
  watch: {
    prefCodes(newPrefCodes) {
      this.$emit("updatePrefCodes", newPrefCodes);
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
