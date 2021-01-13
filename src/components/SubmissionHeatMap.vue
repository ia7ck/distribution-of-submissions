<template>
  <div>
    <apexcharts
      type="heatmap"
      height="400"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import { getDay, getHours } from "date-fns";
export default {
  name: "SubmissionHeatMap",
  props: {
    submissions: Array,
  },
  computed: {
    series() {
      // [{name: "Sun.", data: [{x: 0, y: 0}, {x: 1, y: 0}, ...]}, ...]
      const res = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."].map(
        (n) => {
          const data = [];
          for (let h = 0; h < 24; h++) {
            data.push({
              x: h.toString(), // as "category" data
              y: 0, // submission count
            });
          }
          return { name: n, data: data };
        }
      );
      this.submissions.forEach((s) => {
        const msec = s["epoch_second"] * 1000;
        const dayOfWeek = getDay(msec);
        const hour = getHours(msec);
        res[dayOfWeek]["data"][hour]["y"] += 1;
      });
      res.reverse();
      return res;
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "heatmap",
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        // https://apexcharts.com/vue-chart-demos/heatmap-charts/color-range/
        plotOptions: {
          heatmap: {
            radius: 5,
            enableShades: false,
            colorScale: {
              ranges: [
                {
                  name: "0",
                  from: 0,
                  to: 0,
                  color: "#fafafa",
                },
                {
                  from: 1,
                  to: 5,
                  color: "#dcf8dc",
                },
                {
                  from: 6,
                  to: 10,
                  color: "#95ea95",
                },
                {
                  from: 11,
                  to: 20,
                  color: "#23b123",
                },
                {
                  name: "21 -",
                  from: 21,
                  to: Number.MAX_SAFE_INTEGER,
                  color: "#156a15",
                },
              ],
            },
          },
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        xaxis: {
          title: {
            text: "hour",
          },
          labels: {
            formatter(value) {
              if (parseInt(value) % 3 != 0) {
                return "";
              } else {
                return value;
              }
            },
          },
        },
        tooltip: {
          x: {
            formatter(value) {
              const hh = value.padStart(2, "0");
              return `${hh}:00-${hh}:59`;
            },
          },
          y: {
            formatter(value) {
              return value + " submissions";
            },
          },
        },
      },
    };
  },
};
</script>
