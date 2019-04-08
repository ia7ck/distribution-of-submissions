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
const timeframes = ["00:00-03:00", "03:00-06:00", "06:00-09:00", "09:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00", "21:00-24:00"];
const default_bar_data = timeframes.map((timeframe) => (
  [timeframe, ...days_of_week.map((_) => (0))]
));
const bar_data_config = {
  type: "bar",
  groups: [timeframes],
  order: null,
};
const bar_config = {
  axis: {
    x: {
      type: "category",
      tick: {
        format: (x) => (days_of_week[x]),
      },
    },
    y: {
      min: 0,
      padding: {
        bottom: 0,
      },
    },
  },
};
const default_scatter_data = days_of_week.map((_, idx) => ({
  day_of_week: idx,
  submission: null,
}));
const scatter_data_config = {
  keys: {
    x: "day_of_week",
    value: ["submission"],
  },
  type: "scatter",
};
const scatter_config = {
  transition: {
    duration: null,
  },
  color: {
    pattern: ["#009E96"],
  },
  axis: {
    rotated: true,
    x: {
      label: "day of week",
      type: "category",
      tick: {
        format: (x) => (days_of_week[x]),
      },
    },
    y: {
      label: "hour",
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
const Container = {
  components: {
    "id-form": IdForm,
    "vue-c3": VueC3,
  },
  data() {
    return ({
      location_pathname: location.pathname,
      submissions: [],
      loading: false,
      bar_handler: new Vue(),
      scatter_handler: new Vue(),
    });
  },
  mounted() {
    this.bar_handler.$emit("init", {
      data: {
        columns: default_bar_data,
        ...bar_data_config,
      },
      ...bar_config,
    });
    this.scatter_handler.$emit("init", {
      data: {
        json: default_scatter_data,
        ...scatter_data_config,
      },
      ...scatter_config,
    });
  },
  watch: {
    submissions() {
      this.bar_handler.$emit("dispatch", (chart) => {
        chart.load({
          columns: submissions_to_bar_data(this.submissions),
          ...bar_data_config,
        });
      });
      this.scatter_handler.$emit("dispatch", (chart) => {
        chart.load({
          json: default_scatter_data.concat(submissions_to_scatter_data(this.submissions)),
          ...scatter_data_config,
        });
      });
    },
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
  },
  template: `
  <div style="padding: 0 2vw;">
    <h2 style="margin: 1rem 0;"><a tabindex="2525" v-bind:href="location_pathname" style="color: rgba(0,0,0,.75); text-decoration: none;">Submissions per day</a></h2>
    <id-form v-on:id-post="request" v-bind:button_disabled="loading"></id-form>
    <vue-c3 v-bind:handler="bar_handler"></vue-c3>
    <vue-c3 v-bind:handler="scatter_handler"></vue-c3>
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

function submissions_to_bar_data(submissions) {
  let ret = default_bar_data.map((a) => (a.slice()));
  submissions.forEach(({ epoch_second }) => {
    const d = new Date(epoch_second * 1000);
    ret[Math.floor(dateFns.getHours(d) / 3)][dateFns.getISODay(d) - 1 + 1] += 1; // "00:00-03:00"とかの分だけ +1 している
  });
  return ret;
}

function submissions_to_scatter_data(submissions) {
  return submissions.map(({ epoch_second }) => {
    const d = new Date(epoch_second * 1000); // sec to msec
    return ({
      day_of_week: dateFns.getISODay(d) - 1, // Mon.: 0, ..., Sun.: 6
      submission: dateFns.getHours(d) + dateFns.getMinutes(d) / 60, // 0, 1, ... 23
    });
  }).sort((a, b) => (a.day_of_week - b.day_of_week));
}

const routes = [{ path: "/", component: Container }];
const router = new VueRouter({ routes });
const app = new Vue({ router }).$mount("#app");
