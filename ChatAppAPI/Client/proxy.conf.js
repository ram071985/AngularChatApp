const PROXY_CONFIG = [
    {
    context: ["/"],
    target: "http://localhost:5001",
    secure: false,
    logLevel: "error",
    changeOrigin: true,
   }
  ];
  module.exports = PROXY_CONFIG;