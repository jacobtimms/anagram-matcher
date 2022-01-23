<template>
  <div>
    <button class="btn" @click="callTransform(inputString)">Test</button>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      inputString: "apple_car_cider_tar_itch_rat_cried_helicopter_arc.txt",
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
      console.log(JSON.stringify(organisedArray));
      if (wordArray.length === 0) {
        return organisedArray;
      } else {
        for (let x = 0; x < wordArray.length; x++) {
          if (wordArray[x] === wordArray[0]) {
            continue;
          } else if (wordArray[0].length === wordArray[x].length) {
            let comparedStrings = this.compareStrings(wordArray[0], wordArray[x]);

            if (comparedStrings !== null) {
              let pairExists = this.doesPairExist(comparedStrings, organisedArray);

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
</script>

<style>
.btn {
  height: 2rem;
  width: 10rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
