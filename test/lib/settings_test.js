var settings = require(__dirname + "/../../lib/settings");

describe('settings', function(){
  describe('for single file', function(){
    function env(_env, filename){
      filename || (filename = "settings.json");
      return settings(__dirname + "/../fixtures/" + filename, _env);
    }

    it('should not throw an exception', function(){
      expect(env()).not.to.throw;
    });

    it('should be object', function(){
      expect(env()).to.be.a('object');
    });

    it('should not be empty', function(){
      expect(env()).not.to.be.empty;
    });

    it('should throw an error if file is not found', function(){
      expect(function(){
        env("production", "settings_nonexistent.json")
      }).to.throw(Error);
    });

    it('should throw an error if file is invalid', function(){
      expect(function(){
        env("production", "settings_invalid.json")
      }).to.throw(SyntaxError);
    });

    it('should include values from default environment', function(){
      expect(env().only_defined_in_default).to.be.true;
    });

    it('should return production environment by default', function(){
      expect(env().env).to.eq('production');
    });

    it('should return development environment when specified', function(){
      expect(env('development').env).to.eq('development');
    });

    it('should overwrite matching defaults with specified environment', function(){
      expect(env().foo).to.eq('foobaa');
      expect(env('development').foo).to.eq('foo');
    });

    it('should merge defaults with settings of specified environment', function(){
      expect(env().foo).to.eq('foobaa');
      expect(env().only_exists_in_production).to.eq(true);
      expect(env().only_defined_in_default).to.eq(true);
    });

    it('should work with nested objects', function(){
      expect(env().nested.foo).to.eq('foobaa');
    });
  });

  describe('for multiple files', function(){
    function env(_env, files){
      files || (files = [
        __dirname + "/../fixtures/settings.json",
        __dirname + "/../fixtures/settings_override.json"
      ]);

      return settings(files, _env);
    }

    it('should not throw an exception', function(){
      expect(env()).not.to.throw;
    });

    it('should not be empty', function(){
      expect(env()).not.to.be.empty;
    });

    it('should throw an error if any of the specified files is not found', function(){
      function load() {
        return env(undefined, [
            __dirname + "/../fixtures/settings.json",
            __dirname + "/../fixtures/settings_nonexistent.json",
            __dirname + "/../fixtures/settings_override.json"
        ]);
      }

      expect(function(){
        load();
      }).to.throw(Error);
    });

    it('should throw an error if any of the specified files has syntax errors', function(){
      function load() {
        return env(undefined, [
            __dirname + "/../fixtures/settings.json",
            __dirname + "/../fixtures/settings_invalid.json",
            __dirname + "/../fixtures/settings_override.json"
        ]);
      }

      expect(function(){
        load()
      }).to.throw(SyntaxError);
    });

    it('should include defaults from multiple files', function(){
      expect(env().only_defined_in_default).to.eq(true);
      expect(env().only_defined_in_override_defaults).to.eq(true);
    });

    it('should return production settings by default from all files', function(){
      expect(env().env).to.eq('production');
    });

    it('should override matching values from the latter file', function(){
      expect(env().foo).to.eq('baafoo');
    });

    it('should not override specified environment variables with defaults from latter file', function(){
      expect(env().production_specific).to.eq('first');
    });

    it('should take specified environment', function(){
      expect(env('development').env).to.eq('development');
    });
  });
});