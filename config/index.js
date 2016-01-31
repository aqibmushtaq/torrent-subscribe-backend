var deluge = {
    hostname: "deluge.host",
    port: "8112",
    jsonUrl: "http://deluge.host:8112/json",
    password: "password"
};

var config = {
  local: {
    mode: 'local',
    port: 3000,
    logLevel: 'trace',
    deluge: deluge
  },
  staging: {
    mode: 'staging',
    port: 4000,
    logLevel: 'info',
    deluge: deluge
  },
  production: {
    mode: 'production',
    port: 5000,
    logLevel: 'warn',
    deluge: deluge
  }
}
module.exports = function(mode) {
  return config[mode || process.argv[2] || 'local'] || config.local;
}
