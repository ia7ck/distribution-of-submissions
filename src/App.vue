<template>
  <div id="app" class="is-margin-top-sm is-margin-horizontal-xs">
    <div class="text is-right is-lg">
      <a href="https://github.com/ia7ck/distribution-of-submissions">
        <i class="bx bxl-github"></i>
      </a>
    </div>
    <h1 class="text is-center is-lg is-padding-vertical">
      Distribution of Submissions
    </h1>
    <AtCoderIDForm :handleSubmit="fetchSubmissions" :inputDisabled="loading" />
    <SubmissionHeatMap :submissions="submissions" />
  </div>
</template>

<script>
import AtCoderIDForm from "./components/AtCoderIDForm.vue";
import SubmissionHeatMap from "./components/SubmissionHeatMap.vue";

export default {
  name: "App",
  components: {
    AtCoderIDForm,
    SubmissionHeatMap,
  },
  data() {
    return {
      submissions: [],
      loading: false,
    };
  },
  methods: {
    fetchSubmissions(id) {
      this.loading = true;
      fetch("https://kenkoooo.com/atcoder/atcoder-api/results?user=" + id)
        .then((resp) => resp.json())
        .then((json) => {
          // [{epoch_second: 1450961114, ...}, ...]
          this.submissions.splice(0, this.submissions.length, ...json);
        })
        .catch((err) => {
          alert("データ取得に失敗しました;;;");
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
