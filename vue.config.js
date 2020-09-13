module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 5001,
    proxy:"http://localhost:5000/api"
  },
};
