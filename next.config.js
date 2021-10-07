const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public"
  }
});

module.exports = {
  async redirects() {
    return [{ source: "/", destination: "/business", permanent: true }];
  }
};
