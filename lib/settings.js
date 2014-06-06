var extend = require('extend');
var fs = require('fs');

var readConfig = function(filename, env) {
  env || (env = 'production');

  var json = fs.readFileSync(filename, 'utf8');
  var settings = JSON.parse(json);

  return {
    defaults: (settings['defaults'] || {}),
    environment: (settings[env] || {})
  };
};

module.exports = function(config, env){
  env || (env = 'production');

  var files = [],
      defaults = {},
      environment = {},
      file;

  if(typeof config === "string") {
    files = [config];
  } else if(Array.isArray(config)){
    files = config;
  }

  files = files.reverse();

  while(file = files.pop()) {
    var _settings = readConfig(file, env);

    extend(true, defaults, _settings.defaults);
    extend(true, environment, _settings.environment);
  }

  return extend(true, defaults, environment);
};