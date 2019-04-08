Vue.use(iview, {
  size: "large",
});

const IdForm = {
  data() {
    return ({
      id: this.$route.query.atcoder || "",
    });
  },
  props: {
    button_disabled: false,
  },
  mounted() {
    if (this.id.length > 0) {
      this.post();
    }
  },
  methods: {
    post() {
      this.$router.push({ path: "/", query: { atcoder: this.id } });
      this.$emit("id-post", this.id);
    },
  },
  template: `
  <div>
    <form v-on:submit.prevent="post">
      <label class="large">AtCoder ID</label>
      <Input autofocus v-model="id" style="max-width: 300px"/> 
      <Button html-type="submit" v-bind:class="{disabled: button_disabled}">Submit</Button>
    </form>
  </div>
  `
};

const days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const chart_data_config = {
  keys: {
    x: "day_of_week",
    value: ["submission"],
  },
  type: "scatter",
};
const config = {
  transition: {
    duration: null,
  },
  color: {
    pattern: ["#009944"],
  },
  axis: {
    rotated: false,
    x: {
      label: "day of week",
      type: "category",
      tick: {
        format: (x) => (days_of_week[x]),
      }
    },
    y: {
      label: "hour",
      inverted: true,
      max: 23,
      min: 0,
      padding: {
        bottom: 20,
      },
    },
  },
  tooltip: {
    show: false,
    format: {
      title: (d) => ("submission on " + days_of_week[d]),
    },
  },
  point: {
    r: 10,
    focus: {
      expand: {
        enabled: false,
      },
    },
  },
};
const default_data = days_of_week.map((_, idx) => ({
  day_of_week: idx,
  submission: null,
}));
const Container = {
  components: {
    "id-form": IdForm,
    "vue-c3": VueC3,
  },
  data() {
    return ({
      submissions: [],
      loading: false,
      handler: new Vue(),
    });
  },
  mounted() {
    this.handler.$emit("init", {
      data: {
        json: default_data,
        ...chart_data_config,
      },
      ...config,
    });
  },
  beforeUpdate() {
    this.handler.$emit("dispatch", (chart) => {
      chart.load({
        json: default_data.concat(submissions_to_chart_data(this.submissions)),
        ...chart_data_config,
      });
    });
  },
  methods: {
    async request(id) {
      this.loading = true;
      try {
        let subs = await get_timeline(id);
        subs.sort((a, b) => (b.epoch_second - a.epoch_second));
        this.submissions.splice(0, this.submissions.length, ...subs);
      } catch (err) {
        console.log(err);
        this.submissions.splice(0, this.submissions.length);
      } finally {
        this.loading = false;
      }
    },
    rotate_axis() {
      this.handler.$emit("destroy"); // かなしい
      config.axis.rotated = !config.axis.rotated;
      config.axis.y.inverted = !config.axis.y.inverted;
      this.handler.$emit("init", {
        transition: {
          duration: null,
        },
        data: {
          json: default_data.concat(submissions_to_chart_data(this.submissions)),
          ...chart_data_config,
        },
        ...config,
      });
    },
  },
  template: `
  <div style="padding: 0 2vw;">
    <h2 style="margin: 1rem 0;"><a tabindex="2525" href="/" style="color: rgba(0,0,0,.75); text-decoration: none;">Submissions per day</a></h2>
    <id-form v-on:id-post="request" v-bind:button_disabled="loading"></id-form>
    <vue-c3 v-bind:handler="handler"></vue-c3>
    <Button v-on:click="rotate_axis" html-type="button">Rotate Axis</Button>
  </div>
  `
};

async function get_timeline(id) {
  await new Promise(r => setTimeout(r, 1000));
  // const resp = await fetch("http://localhost:3000/atcoder");
  const resp = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/results?user=${id}`);
  const json = await resp.json();
  return json;
}

function submissions_to_chart_data(submissions) {
  return submissions.map(({ epoch_second }) => {
    const d = new Date(epoch_second * 1000); // sec to msec
    const today = new Date();
    return ({
      day_of_week: dateFns.getISODay(d) - 1, // Mon.: 0, ..., Sun.: 6
      submission: dateFns.getHours(d) + dateFns.getMinutes(d) / 60, // 0, 1, ... 23
    });
  }).sort((a, b) => (a.day_of_week - b.day_of_week));
}

const routes = [{ path: "/", component: Container }];
const router = new VueRouter({ routes });
const app = new Vue({ router }).$mount("#app");
