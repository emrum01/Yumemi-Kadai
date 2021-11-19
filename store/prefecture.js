import axios from "axios";

export const state = () => ({ prefectures: [] });

export const getters = {
  getPrefectures(state) {
    return state.prefectures;
  },
};

export const mutations = {
  initPrefectures(state, payload) {
    if (payload) {
      Object.assign(state.prefectures, payload);
    }
  },
};

export const actions = {
  async fetchPrefectures({ rootState, commit }) {
    await axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: {
          "X-API-KEY": rootState.env.X_API_KEY,
        },
      })
      .then((res) => {
        commit("initPrefectures", res.data.result);
      });
  },
};
