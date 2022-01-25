<template>
  <div>
    <div class="container-fluid body">
      <div class="row align-items-center justify-content-center">
        <div class="col-xl-6 text-center">
          <div class="mb-3">
            <h1 style="font-size: 3.5rem">Welcome To Anagram Matcher</h1>
          </div>
          <div class="mb-3" style="color: #4b4951; margin-top: 2rem">
            <h5>
              Enter your filename in the below format to check for anagrams:
            </h5>
            <h5 class="text-muted">
              apple_car_cider_tar_itch_rat_cried_helicopter_arc.txt
            </h5>
          </div>
        </div>
      </div>
      <div
        class="row align-items-center justify-content-center"
        style="margin-top: 1.5rem"
      >
        <div class="col-xl-6 text-center">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Check your filename here!"
              aria-describedby="button-run"
              v-model="inputString"
            />
            <button
              class="btn btn-outline-secondary"
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
        class="row align-items-center justify-content-center"
        style="margin-top: 1rem"
      >
        <Results :list="anagramOutput" style="width: 25%"></Results>
      </div>
    </div>
  </div>
</template>

<script>
import Results from "./components/resultsBox.vue";
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
    };
  },
  methods: {
    callTransform(input) {
      console.log(input);
      input = input.split(".");
      input.pop();
      input = input[0].toLowerCase().split("_").sort();
      this.transform(input, []);
    },
    transform(wordArray, organisedArray) {
      console.log(JSON.stringify(wordArray));
      console.log(typeof organisedArray);
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
};
//document.body.style.background = "#fef5ed url('img_tree.png') no-repeat right top";
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
</style>
