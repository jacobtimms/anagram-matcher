<template>
  <div class="container-fluid style list">
    <div v-for="array in list" :key="array">
      <code style="color: #28282A;" v-for="string in array" :key="string">{{ string + " " }}</code>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

.list {
  font-family: "Roboto Mono", monospace;
  text-align: left;
  color: #28282A;
}

.style {
  border: black;
  border-radius: 1.5%;
  background-color: #fef5ed;
  height: 500px;
  width: 1rem;
}
</style>