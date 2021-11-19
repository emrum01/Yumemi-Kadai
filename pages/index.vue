<template lang="pug">
  div
    CheckBoxList(:prefCodes="prefCodes" @updatePrefCodes="updatePrefCodes")
    Chart(:prefCodes="prefCodes")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      prefCodes: [],
    };
  },
  mounted() {
    this.$store.dispatch("prefecture/fetchPrefectures");
  },
  computed: {
    ...mapGetters("prefecture", ["getPrefectures"]),
  },
  methods: {
    updatePrefCodes(newPrefCodes) {
      this.prefCodes = newPrefCodes;
    },
  },
};
</script>

<style scoped></style>
