<template lang="pug">
  div
    VueHighcharts(
    :options="chartOptions"
    ref="lineCharts"
  )
</template>

<script>
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
    chartOptions() {
      const ctx = this;
      return {
        chart: {
          type: "line",
          margin: [100, 100, 100, 100],
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
            x: 20,
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
    initLoad() {
      let lineCharts = this.$refs.lineCharts;
      lineCharts.addSeries([]);
      lineCharts.removeSeries();
      lineCharts.hideLoading();
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

      lineCharts.removeSeries();
      this.populationList.forEach((element) => {
        lineCharts.addSeries({
          data: element.populationValue,
          name: element.prefCode,
        });
      });
    },
  },
};
</script>

<style scoped></style>
