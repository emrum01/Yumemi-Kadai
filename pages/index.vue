<template lang="pug">
  div
    Chart(:populationData="populationData")
    //- 入力値に都道府県コードを上書きしてv-modelで双方向バインディング
    div(v-for="(item,index) in getPrefectures")
      input(type="checkbox" id="checkbox" :value="item.prefCode" v-model="prefCodes" @change="checked(item,index)")
      label( for="checkbox")
        | {{item.prefName}}
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      prefListUrl: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      populationUrl:
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      prefectures: [],
      populationData: [],
      prefCodes: [],
    };
  },
  mounted() {
    this.$store.dispatch("prefecture/fetchPrefectures");
    console.log(this.getPrefectures);
  },
  computed: {
    ...mapGetters("prefecture", ["getPrefectures"]),
  },
  methods: {
    checked(pref, index) {
      if (pref.isChecked) {
        this.addChart(pref, index);
      } else {
        this.removeChart(pref);
      }
    },
    removeChart(pref) {
      for (let i = 0; i < this.populationData.length; i++) {
        if (this.populationData[i].prefCode === pref.prefCode) {
          this.populationData.splice(i, 1);
        }
      }
    },
    addChart(pref, index) {
      this.getPopulationData(pref.prefCode, index);
    },
    getPopulationData(prefCode, index) {
      axios
        .get(this.populationUrl, {
          headers: { "X-API-KEY": this.$config.X_API_KEY },
          params: {
            prefCode: prefCode,
            cityCode: "-",
          },
        })
        .then((res) => {
          let populationTransitionList = res.data.result.data[0].data;
          this.populationData.push({
            data: populationTransitionList,
            prefCode: prefCode,
          });
        });
    },
  },
  watch: {
    prefCode: function () {},
  },
};
</script>

<style scoped></style>
