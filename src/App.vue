<template>
  <div>
    <div class="container-fluid body">
      <div class="row align-items-center justify-content-center">
        <div class="col-xl-6 text-center">
          <div class="mb-3">
            <h1
              style="
                font-size: 4rem;
                color: #4b4951;
                margin-bottom: 10%;
                margin-top: 5%;
              "
            >
              Welcome to Anagram Matcher
            </h1>
          </div>
          <div class="mb-3" style="color: #4b4951; margin-top: 2rem">
            <h5>
              Enter your filename in the below format to check for anagrams:
            </h5>
            <h5 class="text-muted" style="word-break: break-all">
              apple_car_cider_tar_itch_rat_cried_helicopter_arc.txt
            </h5>
          </div>
        </div>
      </div>
      <div
        class="row align-items-center justify-content-center"
        style="margin-top: 1.5rem; margin-bottom: 2rem"
      >
        <div class="col-xl-6 text-center">
          <div class="input-group mb-3">
            <input
              :style="inputBorderColor"
              type="text"
              class="form-control"
              :placeholder="inputPlaceholder"
              aria-describedby="button-run"
              v-model="inputString"
            />
            <button
              class="btn btn-success"
              type="button"
              id="button-run"
              style="height: 100%"
              @click="callTransform(this.inputString)"
            >
              Run
            </button>
          </div>
        </div>
      </div>
      <div
        class="row align-items-center justify-content-center flex"
        style="margin-top: 1rem"
      >
        <div class="col-xl-6 text-center">
          <div class="resultsBox">
            <div v-if="loading === true" class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
            <Results v-else :list="anagramOutput"></Results>
          </div>
        </div>
      </div>
    </div>
    <img class="bg-decor" :src="myLogoSrc" />
  </div>
</template>

<script>
import Results from "./components/resultsBox.vue";
import myLogoSrc from "@/assets/bg-decor.svg";
export default {
  name: "App",
  components: {
    Results,
  },
  data() {
    return {
      inputString: "",
      color: "#fef5ed",
      anagramOutput: [],
      loading: false,
      inputPlaceholder: "Check your filename here!",
      inputBorderColor: "border-color: #6c757d;",
    };
  },
  methods: {
    callTransform(input) {
      if (this.inputString === "") {
        this.inputPlaceholder =
          "No input registered! Please input your filename here.";
        this.inputBorderColor = "border-color: red;";
      } else {
        this.inputBorderColor = "border-color: #6c757d;";
        this.loading = true;
        console.log(input);
        input = input.split(".");
        input.pop();
        input = input[0].toLowerCase().split("_").sort();
        this.transform(input, []);
        this.loading = false;
      }
    },
    transform(wordArray, organisedArray) {
      console.log(JSON.stringify(wordArray));
      console.log(JSON.stringify(organisedArray));
      if (wordArray.length === 0) {
        this.anagramOutput = organisedArray;
        return;
      } else {
        for (let x = 0; x < wordArray.length; x++) {
          if (wordArray[x] === wordArray[0]) {
            continue;
          } else if (wordArray[0].length === wordArray[x].length) {
            let comparedStrings = this.compareStrings(
              wordArray[0],
              wordArray[x]
            );

            if (comparedStrings !== null) {
              let pairExists = this.doesPairExist(
                comparedStrings,
                organisedArray
              );

              if (pairExists === false) {
                organisedArray.push(comparedStrings.sort());
                wordArray.splice(0, 1);
                wordArray.splice(x - 1, 1);
                break;
              }
            }
          }
          organisedArray.push([wordArray[0]]);
          wordArray.splice(0, 1);
          break;
        }
        this.transform(wordArray, organisedArray);
      }
    },
    compareStrings(baseString, comparedString) {
      for (let i = 0; i < baseString.length; i++) {
        if (!comparedString.split("").includes(baseString[i])) {
          return null;
        }
      }
      return [baseString, comparedString];
    },
    doesPairExist(newArray, existingArray) {
      let newArrayString = JSON.stringify(newArray.sort());

      existingArray.forEach((array) => {
        let existingArrayString = JSON.stringify(array.sort());

        if (newArrayString === existingArrayString) {
          return true;
        }
      });
      return false;
    },
  },
  setup() {
    return {
      myLogoSrc,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400&display=swap");

#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #28282a;
  margin-top: 60px;
}

.resultsBox {
  margin: 0% 15%;
}

.bg-decor {
  position: absolute;
  left: 0%;
  bottom: 0%;
  z-index: -1;
}
@media only screen and (max-width: 600px) {
  .resultsBox {
    margin: 0% 0%;
  }
}
</style>
