<template lang="pug">
  div
    Chart(:populationData="populationData")

    div(v-for="(item,index) in prefectures")
      input(type="checkbox" id="checkbox" v-model="item.isChecked" @change="checked(item,index)")
      label( for="checkbox")
        | {{item.prefName}} {{item.isChecked}} {{index}}
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      prefListUrl: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
      populationUrl:
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      prefectures: [],
      populationData: [],
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
            isChecked: false,
            isFetched: false,
          });
        });
      });
  },
  methods: {
    checked(pref, index) {
      if (pref.isChecked) {
        this.addChart(pref, index);
      } else {
        this.removeChart(pref);
      }
      console.log(this.populationData);
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
      try {
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
            this.prefectures[index].isFetched = true;
            this.populationData.push({
              data: populationTransitionList,
              prefCode: prefCode,
            });
          });
      } catch (e) {
        console.log(e);
      }
    },
    isDataInList() {},
  },
};
</script>

<style scoped></style>
