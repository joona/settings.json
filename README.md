settings.json
=============

Super simple, environment aware, JSON settings reader for NodeJS.

[![Build Status](https://travis-ci.org/joona/settings.json.svg?branch=master)](https://travis-ci.org/joona/settings.json)

## Installation

	npm install settings.json
	

## Get started

```javascript
var settings = require('settings.json')(__dirname + '/config/settings.json', 'development');
```

## Usage

    require('settings.json')(<input> [, <environment>])

    <input>           One or many paths for settings file(s). Files are loaded in specified order
                      and overlapping settings from the previous file will be overridden with the ones
                      from latter one.
                      
    <environment>     Environment to select from the settings, defaults to "production".


### Examples

Check out [tests](https://github.com/joona/settings.json/blob/master/test/lib/settings_test.js).






