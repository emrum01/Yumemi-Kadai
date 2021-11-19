<template lang="pug">
  .title
    h1.title-text タイトル
</template>

<script>
import { mapGetters } from "vuex";

export default {};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 50px;
  background-color: gray;
  .title-text {
    font-size: 30px;
    text-align: center;
    margin-top: auto;
  }
}
</style>
