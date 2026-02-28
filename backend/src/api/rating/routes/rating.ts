export default {
  routes: [
    {
      method: "POST",
      path: "/ratings/vote",
      handler: "rating.vote",
      config: {
        auth: false,
      },
    },
  ],
};