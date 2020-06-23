const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {

  // START Express-Server Part
  app.use(
    "/api/backup_restore/",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/upload",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  // END Express-Server Part
  app.use(
    "/flash",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/organizations",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/networks",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/devices",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/clients",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/device_status",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/vlans",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/allVlans",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/find_ports",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/topuserdata/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/traffic_analysis/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/run_backup/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/run_restore/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );

};
