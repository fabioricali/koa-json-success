<div align="center">
<h1>koa-json-success</h1>
JSON API response format for KOA 2
<br/><br/>
<a href="https://travis-ci.org/fabioricali/koa-json-success" target="_blank"><img src="https://travis-ci.org/fabioricali/koa-json-success.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/koa-json-success?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/koa-json-success/badge.svg?branch=master" title="Coverage Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<img src="https://img.shields.io/badge/team-terrons-orange.svg" title="Team Terrons"/>
</div>

#### This module creates a JSON response such as the following
```json
{
  "success": true,
  "message": "all done",
  "result": "anythings you want",
  "time": "0000-00-00T00:00:00.000Z,
  "code": 200
}
```

## Installation

```
npm install koa-json-success --save
```

# Example

#### Basic usage

```javascript
const success = require('koa-json-success');
const koa = require('koa');
const app = new koa();

success(app);

app.use(ctx=>{
    ctx.success(true);
    /*// => 
    {
      "success": true,
      "code": 200,
      "message": "ok",
      "result": null,
      "time": "0000-00-00T00:00:00.000Z
    }
    */
    
    ctx.success(
        true,
        'message string', // default is "ok" or "failed"
        'a result that can be anythings', // default is null
        200 //status code, default 200
    );
});

app.listen(3000);
```
## API context
- `success`
- `successTrue` success set to true
- `successFalse` success set to false

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/koa-json-success/blob/master/CHANGELOG.md">here</a>

## License
koa-json-success is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Authors
<a target="_blank" href="http://rica.li">Fabio Ricali</a>
