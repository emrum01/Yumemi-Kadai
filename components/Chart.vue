<template lang="pug">
  div
    highchart(:options="chartOptions"
      :modules="['exporting']"
      :update="watchers"
      style="width: 100%")
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      caption: "Chart caption here",
      title: "Basic Chart",
      subtitle: "More details here",
      years: [],
      points: [],
      seriesColor: "",
      animationDuration: 1000,
      chartType: "",
      colorInputIsSupported: null,
      chartTypes: "line",
      durations: [0, 500, 1000, 2000],
      seriesName: "My Data",
      yAxis: "My Values",
      watchers: ["options.title", "options.series"],
      colors: [
        "Red",
        "Green",
        "Blue",
        "Pink",
        "Orange",
        "Brown",
        "Black",
        "Purple",
      ],
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
            data: this.points,
          },
        ],
      };
    },
  },
  mounted() {
    axios
      .get(this.populationUrl, {
        headers: { "X-API-KEY": this.$config.X_API_KEY },
        params: {
          prefCode: 11,
          cityCode: "-",
        },
      })
      .then((res) => {
        res.data.result.data[0].data.forEach((element) => {
          this.points.push(element.value);
          this.years.push(element.year);
        });
        console.log(Math.max(...this.points));
      });
  },
};
</script>

<style scoped></style>
