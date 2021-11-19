<template lang="pug">
  .Chart
    VueHighcharts(
    :options="chartOptions"
    ref="lineCharts"
  )
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  props: {
    prefCodes: {
      type: Array,
      default: () => {
        return [];
      },
      required: false,
    },
  },
  data() {
    return {
      populationUrl:
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
      populationList: [],
      populationInfo: {},
      population: [],
      years: [],
    };
  },
  computed: {
    ...mapGetters("prefecture", ["getPrefectureId"]),
    chartOptions() {
      const ctx = this;
      return {
        chart: {
          type: "line",
        },
        subtitle: {
          text: "2020年版",
        },
        xAxis: {
          title: {
            text: "年",
            align: "high",
            offset: 5,
            rotation: 0,
            x: 10,
          },
          categories: this.years,
        },
        yAxis: {
          title: {
            text: "人口",
            align: "high",
            offset: 10,
            rotation: 0,
            y: -20,
          },
        },
        responsive: {
          rules: [
            {
              condition: {
                maxheight: 400,
              },
              chartOptions: {
                legend: {
                  layout: "vertical",
                  align: "right",
                  verticalAlign: "top",
                },
              },
            },
          ],
        },
        legend: "right",
        series: [],
      };
    },
  },
  mounted() {
    this.initLoad();
  },
  methods: {
    async initLoad() {
      let lineCharts = this.$refs.lineCharts;
      await lineCharts.addSeries([]);
      await lineCharts.removeSeries();
      await lineCharts.hideLoading();
      this.getYears();
    },
    async getYears() {
      let res = await this.getPopulation(1);
      this.years = res.years;
    },
    async getPopulationList(prefCodes) {
      this.populationList = [];
      const length = prefCodes.length;
      for (let i = 0; i < length; i++) {
        let res = await this.getPopulation(prefCodes[i]);
        this.populationList.push(res);
      }
    },
    async getPopulation(n) {
      let res;
      try {
        res = await axios.get(
          "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
          {
            headers: {
              "X-API-KEY": this.$config.X_API_KEY,
            },
            params: {
              prefCode: n,
              cityCode: "-",
            },
          }
        );
      } catch (e) {
        console.error(e);
        return;
      }
      console.log(res);
      const prefPopulationYear = res.data.result.data[0].data.map((object) =>
        String(object.year)
      );
      const prefPopulationValue = res.data.result.data[0].data.map(
        (object) => object.value
      );
      return {
        prefCode: n,
        years: prefPopulationYear,
        populationValue: prefPopulationValue,
      };
    },
  },
  watch: {
    prefCodes: async function () {
      await this.getPopulationList(this.prefCodes);
      let lineCharts = this.$refs.lineCharts;

      await lineCharts.removeSeries();
      await this.populationList.forEach((element) => {
        lineCharts.addSeries({
          name: this.getPrefectureId(element.prefCode),
          data: element.populationValue,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Chart {
  width: 90%;
  padding: 5%;
}
@media screen and (min-width: 600px) {
  .Chart {
    width: 400px;
    padding: 25px 25px;
  }
}
@media screen and (min-width: 1025px) {
  .Chart {
    width: 800px;
    padding: 25px 25px;
  }
}
</style>
