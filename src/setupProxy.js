const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/organizations",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/networks",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/devices",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/clients",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/device_status",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/vlans",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/allVlans",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/find_ports",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/topuserdata/",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/traffic_analysis/",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/run_backup/",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/run_restore/",
    createProxyMiddleware({
      target: "http://172.19.85.214:5000",
      changeOrigin: true,
    })
  );

};
