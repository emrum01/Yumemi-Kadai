export default function (context) {
  context.store.dispatch("env/initEnvURL", context.$config);
}
