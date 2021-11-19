const state = () => ({
  X_API_KEY: "",
});
const mutations = {
  set_X_API_KEY(state, config) {
    state.X_API_KEY = config.X_API_KEY;
  },
};
const actions = {
  initEnvURL({ commit }, $config) {
    commit("set_X_API_KEY", $config);
  },
};
export default { state, mutations, actions };
