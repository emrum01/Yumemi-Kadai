<template lang="pug">
  div
    Chart

    div(v-for="item in prefectures")
      input(type="checkbox" id="checkbox" v-model="item.checked")
      label( for="checkbox")
        | {{item.prefName}} {{item.checked}}
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      prefListUrl: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      prefectures: [],
    };
  },
  mounted() {
    axios
      .get(this.prefListUrl, {
        headers: { "X-API-KEY": this.$config.X_API_KEY },
      })
      .then((res) => {
        res.data.result.forEach((element) => {
          this.prefectures.push({
            prefCode: element.prefCode,
            prefName: element.prefName,
            checked: false,
          });
        });
      });
  },
};
</script>

<style scoped></style>
