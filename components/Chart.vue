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
    populationData: {
      type: Array,
      default: () => {
        return [];
      },
      required: false,
    },
  },
  data() {
    return {
      caption: "Chart caption here",
      title: "Basic Chart",
      subtitle: "More details here",
      years: [],
      populations: [],
      seriesColor: "",
      animationDuration: 1000,
      chartType: "",
      colorInputIsSupported: null,
      chartTypes: "line",
      durations: [0, 500, 1000, 2000],
      seriesName: "My Data",
      yAxis: "My Values",
      watchers: ["options.title", "options.series"],
      lastPointClicked: {
        timestamp: "",
        x: "",
        y: "",
      },
      sexy: false,
      populationUrl:
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
    };
  },
  watch: {
    populationData: function () {
      let list = [];
      let lineCharts = this.$refs.lineCharts;
      lineCharts.removeSeries();
      this.populationData[0].data.forEach((element) => {
        this.years.push(element.year);
      });
      this.populationData.forEach((element) => {
        // element.data.forEach((population) => {
        //   list.push(population.value);
        // });
        element.data.forEach((population) => {
          this.populations.push(population.value);
        });
        console.log(list);
        lineCharts.addSeries({
          data: this.populations,
          name: element.prefCode,
        });
        this.populations = [];
      });
    },
  },
  mounted() {
    this.initLoad();
  },
  computed: {
    chartOptions() {
      const ctx = this;
      return {
        chart: {
          type: this.chartType,
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
        legend: "right",
        tooltip: {
          valueSuffix: "人",
        },
        series: [
          {
            name: "人口推移",
            data: this.populations,
          },
        ],
      };
    },
  },
  methods: {
    initLoad() {
      let lineCharts = this.$refs.lineCharts;
      lineCharts.addSeries([]);
      lineCharts.removeSeries();
      lineCharts.hideLoading();
    },
  },
};
</script>

<style scoped></style>
