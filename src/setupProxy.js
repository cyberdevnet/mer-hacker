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
    "/api/cisco_meraki_migrate_tool/",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/logs/",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/read_templateFile",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/write_templateFile",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/delete_backupfile",
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
  app.use(
    "/upload_build_meraki_switchconfig",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/upload_backupfile",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/authenticate",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/hash-users",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/get-auth-status",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/set-cookie",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/read-cookie",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/clear-cookie",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/post-api-key",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  app.use(
    "/get-api-key",
    createProxyMiddleware({
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
    })
  );
  // END Express-Server Part


  // START Mongodb Part
  app.use(
    "/dump",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  // END Mongodb Part

  app.use(
    "/error_handling",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
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
    "/client",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/device_clients",
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
    "/uplink_loss",
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
  app.use(
    "/run_restore_switch/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/ios_to_meraki/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/run_migrate_switch_config/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/delete_debugfile",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/lldp_cdp/",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/site2site",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/device_switchports",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );
  app.use(
    "/deploy_device_switchports",
    createProxyMiddleware({
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    })
  );

};
