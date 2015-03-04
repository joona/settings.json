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

var quietReadConfig = function(filename, env) {
  try {
    return readConfig(filename, env);
  } catch(e) {
    return {
      defaults: {},
      environment: {}
    }
  }
}

module.exports = function(config, env, options){
  env || (env = 'production');
  options || (options = {});

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
    var _settings = (options.quiet ? quietReadConfig(file, env) : readConfig(file, env));
    extend(true, defaults, _settings.defaults);
    extend(true, environment, _settings.environment);
  }

  return extend(true, defaults, environment);
};