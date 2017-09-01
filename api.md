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
    * [.successTrue([message], [result], [code])](#ctx.successTrue)
    * [.successFalse([message], [result], [code])](#ctx.successFalse)

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

