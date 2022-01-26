<template>
  <div class="container-fluid boxStyle list">
    <div>
      <button
        class="btn copyBtn"
        type="button"
        @click="copyResults"
        style="padding-bottom: 0"
      >
        <i class="bi bi-clipboard"></i>
      </button>
    </div>
    <div>
      <button
        class="btn copyBtn"
        type="button"
        @click="saveFile"
        style="padding-top: 0"
      >
        <i class="bi bi-download"></i>
      </button>
    </div>
    <div class="resultsText" v-for="array in list" :key="array">
      <code style="color: #28282a" v-for="string in array" :key="string">{{
        string + " "
      }}</code>
    </div>
  </div>
</template>

<script>
import { copyText } from "vue3-clipboard";
import { saveAs } from "file-saver";

export default {
  props: {
    list: Array,
  },
  methods: {
    getResultsString() {
      let result = "";
      this.list.forEach((array) => {
        for (let i = 0; i < array.length; i++) {
          result += array[i] + " ";
        }
        result += "\n";
      });
      console.log(result);
      return result;
    },
    copyResults() {
      let res = this.getResultsString();
      this.doCopy(res);
    },
    saveFile() {
      let res = this.getResultsString();
      var blob = new Blob([res], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "anagrams.txt");
    },
  },
  setup() {
    const doCopy = (inputString) => {
      copyText(inputString, undefined, (error, event) => {
        if (error) {
          alert("Can not copy");
          console.log(error);
        } else {
          alert("Copied");
          console.log(event);
        }
      });
    };
    return { doCopy };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");

.list {
  font-family: "Roboto Mono", monospace;
  text-align: left;
  color: #28282a;
}

.boxStyle {
  border: black;
  border-radius: 1.5%;
  background-color: #fef5ed;
  height: 30rem;
  width: 1rem;
  overflow: auto;
}

@media only screen and (max-width: 1200px) {
  .boxStyle {
    max-height: 20rem;
  }
}

.copyBtn {
  position: relative;
  left: 97%;
}

.resultsText {
  position: relative;
  top: -8%;
}
</style>