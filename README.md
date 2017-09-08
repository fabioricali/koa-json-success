<div align="center">
<h1>koa-json-success</h1>
JSON API response format for KOA 2
<br/><br/>
<a href="https://travis-ci.org/fabioricali/koa-json-success" target="_blank"><img src="https://travis-ci.org/fabioricali/koa-json-success.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/koa-json-success?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/koa-json-success/badge.svg?branch=master" title="Coverage Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<img src="https://img.shields.io/badge/team-terrons-orange.svg" title="Team Terrons"/>
</div>

#### This module creates a JSON response such as the following.
```json
{
  "success": true,
  "message": "all done",
  "result": "anythings you want",
  "time": "2017-08-30T09:59:00.846Z",
  "code": 200
}
```
 More info on <a target="_blank" href="https://github.com/fabioricali/JSON-Success-Response">JSON Success Response</a>

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
    /* Response output example 
    {
      "success": true,
      "code": 200,
      "message": "ok",
      "result": null,
      "time": "2017-08-30T09:59:00.846Z"
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

### API
- `success(success, [message], [result], [code])`
- `successTrue([message], [result], [code])`
- `successFalse([message], [result], [code])`
- `successIf(result, [opts])`
- `successIfNotEmpty(result, [opts])`
- `success400([message], [result])`
- `success401([message], [result])`
- `success402([message], [result])`
- `success403([message], [result])`
- `success404([message], [result])`
- `success405([message], [result])`
- `success406([message], [result])`
- `success407([message], [result])`
- `success408([message], [result])`
- `success409([message], [result])`
- `success410([message], [result])`
- `success411([message], [result])`
- `success412([message], [result])`
- `success413([message], [result])`
- `success414([message], [result])`
- `success415([message], [result])`
- `success416([message], [result])`
- `success417([message], [result])`
- `success418([message], [result])`
- `success417([message], [result])`
- `success421([message], [result])`
- `success422([message], [result])`
- `success423([message], [result])`
- `success424([message], [result])`
- `success425([message], [result])`
- `success426([message], [result])`
- `success428([message], [result])`
- `success429([message], [result])`
- `success431([message], [result])`
- `success500([message], [result])`
- `success501([message], [result])`
- `success502([message], [result])`
- `success503([message], [result])`
- `success504([message], [result])`
- `success505([message], [result])`
- `success506([message], [result])`
- `success507([message], [result])`
- `success508([message], [result])`
- `success509([message], [result])`
- `success510([message], [result])`
- `success511([message], [result])`

**Please see <a href="https://github.com/fabioricali/koa-json-success/blob/master/api.md">full documentation</a>**

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/koa-json-success/blob/master/CHANGELOG.md">here</a>

## License
koa-json-success is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Authors
<a target="_blank" href="http://rica.li">Fabio Ricali</a>
