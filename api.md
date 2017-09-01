## Functions

<dl>
<dt><a href="#success">success(app, [opts])</a></dt>
<dd><p>Wrapper method</p>
</dd>
</dl>

<a name="success"></a>

## success(app, [opts])
Wrapper method

**Kind**: global function  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>app</td><td><code>Object</code></td><td></td><td><p>KOA app</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>options</p>
</td>
    </tr><tr>
    <td>[opts.defaultOk]</td><td><code>string</code></td><td><code>&quot;ok&quot;</code></td><td><p>default &quot;ok&quot; message</p>
</td>
    </tr><tr>
    <td>[opts.defaultFailed]</td><td><code>string</code></td><td><code>&quot;failed&quot;</code></td><td><p>default &quot;failed&quot; message</p>
</td>
    </tr><tr>
    <td>[opts.onTrue]</td><td><code>function</code></td><td><code></code></td><td><p>callback on true success</p>
</td>
    </tr><tr>
    <td>[opts.onFalse]</td><td><code>function</code></td><td><code></code></td><td><p>callback on false success</p>
</td>
    </tr><tr>
    <td>[opts.callbackQuery]</td><td><code>string</code></td><td><code>&quot;callback&quot;</code></td><td><p>JSONP callback query param</p>
</td>
    </tr><tr>
    <td>[opts.callbackName]</td><td><code>string</code></td><td><code>&quot;cb&quot;</code></td><td><p>JSONP callback function name</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const koa = require('koa');const success = require('koa-json-success');const app = new koa();success(app);app.use(ctx => {     ctx.success(true, 'done', 'a result');});
```
<a name="ctx"></a>

## ~ctx
KOA context

**Kind**: inner parameter  

* [~ctx](#ctx)
    * [.success](#ctx.success)
    * [.successTrue](#ctx.successTrue)
    * [.successFalse](#ctx.successFalse)
    * [.successIf(result, [opts])](#ctx.successIf)
    * [.successIfNotEmpty(result, [opts])](#ctx.successIfNotEmpty)

<a name="ctx.success"></a>

### ctx.success
Koa context method

**Kind**: static constant of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>success</td><td><code>boolean</code></td><td></td><td><p>response success</p>
</td>
    </tr><tr>
    <td>[message]</td><td><code>string</code></td><td></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td><code></code></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr><tr>
    <td>[code]</td><td><code>number</code></td><td><code>200</code></td><td><p>status server code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
app.use(ctx => {     ctx.success(true, 'done', 'a result', 200);     // Response output example     {        "success": true,        "code": 200,        "message": "done",        "result": "a result",        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
app.use(ctx => {     ctx.success(false, 'ops...', null, 401);     // Response output example     {        "success": false,        "code": 401,        "message": "ops...",        "result": null,        "time": "0000-00-00T00:00:00.000Z"     }});
```
<a name="ctx.successTrue"></a>

### ctx.successTrue
This method respond as success to true

**Kind**: static constant of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr><tr>
    <td>[code]</td><td><code>number</code></td><td><p>status server code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
app.use(ctx => {     ctx.successTrue();     // Response output example     {        "success": true,        "code": 200,        "message": "ok",        "result": null,        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
app.use(ctx => {     ctx.successTrue('done');     // Response output example     {        "success": true,        "code": 200,        "message": "done",        "result": null,        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
app.use(ctx => {     ctx.successTrue('done', 'a result');     // Response output example     {        "success": true,        "code": 200,        "message": "done",        "result": "a result",        "time": "0000-00-00T00:00:00.000Z"     }});
```
<a name="ctx.successFalse"></a>

### ctx.successFalse
This method respond as success to false

**Kind**: static constant of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr><tr>
    <td>[code]</td><td><code>number</code></td><td><p>status server code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
app.use(ctx => {     ctx.successFalse();     // Response output example     {        "success": false,        "code": 200,        "message": "failed",        "result": null,        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
app.use(ctx => {     ctx.successFalse('ops...');     // Response output example     {        "success": false,        "code": 200,        "message": "ops...",        "result": null,        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
app.use(ctx => {     ctx.successFalse('ops...', false);     // Response output example     {        "success": false,        "code": 200,        "message": "ops...",        "result": false,        "time": "0000-00-00T00:00:00.000Z"     }});
```
<a name="ctx.successIf"></a>

### ctx.successIf(result, [opts])
Return success considering truthy or falsy of result param

**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>result</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>option configuration</p>
</td>
    </tr><tr>
    <td>[opts.messageOk]</td><td><code>string</code></td><td><code>&quot;ok&quot;</code></td><td><p>&quot;ok&quot; message</p>
</td>
    </tr><tr>
    <td>[opts.messageFailed]</td><td><code>string</code></td><td><code>&quot;failed&quot;</code></td><td><p>&quot;failed&quot; message</p>
</td>
    </tr><tr>
    <td>[opts.codeOk]</td><td><code>number</code></td><td><code>200</code></td><td><p>status &quot;ok&quot; code</p>
</td>
    </tr><tr>
    <td>[opts.codeFailed]</td><td><code>number</code></td><td><code>500</code></td><td><p>status &quot;failed&quot; code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// Falsy resultapp.use(ctx => {     const result = 0;     ctx.successIf(result);     // Response output example     {        "success": false,        "code": 500,        "message": "failed",        "result": 0,        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
// Truthy resultapp.use(ctx => {     const result = 123;     ctx.successIf(result);     // Response output example     {        "success": true,        "code": 200,        "message": "ok",        "result": 123,        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
// Use optionsapp.use(ctx => {     const result = 123;     ctx.successIf(result, {messageOk: 'all done'});     // Response output example     {        "success": true,        "code": 200,        "message": "all done",        "result": 123,        "time": "0000-00-00T00:00:00.000Z"     }});
```
<a name="ctx.successIfNotEmpty"></a>

### ctx.successIfNotEmpty(result, [opts])
Return success result is not empty

**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>result</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>option configuration</p>
</td>
    </tr><tr>
    <td>[opts.messageOk]</td><td><code>string</code></td><td><code>&quot;ok&quot;</code></td><td><p>&quot;ok&quot; message</p>
</td>
    </tr><tr>
    <td>[opts.messageFailed]</td><td><code>string</code></td><td><code>&quot;failed&quot;</code></td><td><p>&quot;failed&quot; message</p>
</td>
    </tr><tr>
    <td>[opts.codeOk]</td><td><code>number</code></td><td><code>200</code></td><td><p>status &quot;ok&quot; code</p>
</td>
    </tr><tr>
    <td>[opts.codeFailed]</td><td><code>number</code></td><td><code>500</code></td><td><p>status &quot;failed&quot; code</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
// Empty resultapp.use(ctx => {     const result = [];     ctx.successIfNotEmpty(result);     // Response output example     {        "success": false,        "code": 500,        "message": "failed",        "result": 0,        "time": "0000-00-00T00:00:00.000Z"     }});
```
**Example**  
```js
// Not empty resultapp.use(ctx => {     const result = [1, 2, 3];     ctx.successIfNotEmpty(result);     // Response output example     {        "success": true,        "code": 200,        "message": "ok",        "result": 123,        "time": "0000-00-00T00:00:00.000Z"     }});
```
