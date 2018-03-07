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
    <td>[opts.allowCallback]</td><td><code>boolean</code></td><td><code>true</code></td><td><p>allow JSONP</p>
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
    * [.success(success, [message], [result], [code])](#ctx.success)
    * [.successTrue([message], [result], [code])](#ctx.successTrue)
    * [.successFalse([message], [result], [code])](#ctx.successFalse)
    * [.successIf(result, [opts])](#ctx.successIf)
    * [.successIfNotEmpty(result, [opts])](#ctx.successIfNotEmpty)
    * [.success400([message], [result])](#ctx.success400)
    * [.success401([message], [result])](#ctx.success401)
    * [.success402([message], [result])](#ctx.success402)
    * [.success403([message], [result])](#ctx.success403)
    * [.success404([message], [result])](#ctx.success404)
    * [.success405([message], [result])](#ctx.success405)
    * [.success406([message], [result])](#ctx.success406)
    * [.success407([message], [result])](#ctx.success407)
    * [.success408([message], [result])](#ctx.success408)
    * [.success409([message], [result])](#ctx.success409)
    * [.success410([message], [result])](#ctx.success410)
    * [.success411([message], [result])](#ctx.success411)
    * [.success412([message], [result])](#ctx.success412)
    * [.success413([message], [result])](#ctx.success413)
    * [.success414([message], [result])](#ctx.success414)
    * [.success415([message], [result])](#ctx.success415)
    * [.success416([message], [result])](#ctx.success416)
    * [.success417([message], [result])](#ctx.success417)
    * [.success418([message], [result])](#ctx.success418)
    * [.success417([message], [result])](#ctx.success417)
    * [.success421([message], [result])](#ctx.success421)
    * [.success422([message], [result])](#ctx.success422)
    * [.success423([message], [result])](#ctx.success423)
    * [.success424([message], [result])](#ctx.success424)
    * [.success425([message], [result])](#ctx.success425)
    * [.success426([message], [result])](#ctx.success426)
    * [.success428([message], [result])](#ctx.success428)
    * [.success429([message], [result])](#ctx.success429)
    * [.success431([message], [result])](#ctx.success431)
    * [.success500([message], [result])](#ctx.success500)
    * [.success501([message], [result])](#ctx.success501)
    * [.success502([message], [result])](#ctx.success502)
    * [.success503([message], [result])](#ctx.success503)
    * [.success504([message], [result])](#ctx.success504)
    * [.success505([message], [result])](#ctx.success505)
    * [.success506([message], [result])](#ctx.success506)
    * [.success507([message], [result])](#ctx.success507)
    * [.success508([message], [result])](#ctx.success508)
    * [.success509([message], [result])](#ctx.success509)
    * [.success510([message], [result])](#ctx.success510)
    * [.success511([message], [result])](#ctx.success511)

<a name="ctx.success"></a>

### ctx.success(success, [message], [result], [code])
Koa context method

**Kind**: static method of [<code>ctx</code>](#ctx)  
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

### ctx.successTrue([message], [result], [code])
This method respond as success to true

**Kind**: static method of [<code>ctx</code>](#ctx)  
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

### ctx.successFalse([message], [result], [code])
This method respond as success to false

**Kind**: static method of [<code>ctx</code>](#ctx)  
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
<a name="ctx.success400"></a>

### ctx.success400([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Bad Request&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success401"></a>

### ctx.success401([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Unauthorized&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success402"></a>

### ctx.success402([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Payment Required&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success403"></a>

### ctx.success403([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Forbidden&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success404"></a>

### ctx.success404([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Not Found&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success405"></a>

### ctx.success405([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Method Not Allowed&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success406"></a>

### ctx.success406([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Not Acceptable&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success407"></a>

### ctx.success407([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Proxy Authentication Required&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success408"></a>

### ctx.success408([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Request Timeout&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success409"></a>

### ctx.success409([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Conflict&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success410"></a>

### ctx.success410([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Gone&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success411"></a>

### ctx.success411([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Length Required&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success412"></a>

### ctx.success412([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Precondition Failed&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success413"></a>

### ctx.success413([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Payload Too Large&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success414"></a>

### ctx.success414([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;URI Too Long&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success415"></a>

### ctx.success415([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Unsupported Media Type&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success416"></a>

### ctx.success416([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Range Not Satisfiable&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success417"></a>

### ctx.success417([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Expectation Failed&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success418"></a>

### ctx.success418([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;I&#x27;m a teapot&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success417"></a>

### ctx.success417([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Expectation Failed&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success421"></a>

### ctx.success421([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Misdirected Request&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success422"></a>

### ctx.success422([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Unprocessable Entity&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success423"></a>

### ctx.success423([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Locked&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success424"></a>

### ctx.success424([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Failed Dependency&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success425"></a>

### ctx.success425([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Unordered Collection&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success426"></a>

### ctx.success426([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Upgrade Required&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success428"></a>

### ctx.success428([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Precondition Required&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success429"></a>

### ctx.success429([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Too Many Requests&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success431"></a>

### ctx.success431([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Request Header Fields Too Large&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success500"></a>

### ctx.success500([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Internal Server Error&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success501"></a>

### ctx.success501([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Not Implemented&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success502"></a>

### ctx.success502([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Bad Gateway&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success503"></a>

### ctx.success503([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Service Unavailable&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success504"></a>

### ctx.success504([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Gateway Timeout&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success505"></a>

### ctx.success505([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;HTTP Version Not Supported&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success506"></a>

### ctx.success506([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Variant Also Negotiates&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success507"></a>

### ctx.success507([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Insufficient Storage&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success508"></a>

### ctx.success508([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Loop Detected&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success509"></a>

### ctx.success509([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Bandwidth Limit Exceeded&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success510"></a>

### ctx.success510([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Not Extended&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

<a name="ctx.success511"></a>

### ctx.success511([message], [result])
**Kind**: static method of [<code>ctx</code>](#ctx)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[message]</td><td><code>string</code></td><td><code>&quot;Network Authentication Required&quot;</code></td><td><p>message string</p>
</td>
    </tr><tr>
    <td>[result]</td><td><code>*</code></td><td></td><td><p>anythings like array, object, string, boolean...</p>
</td>
    </tr>  </tbody>
</table>

