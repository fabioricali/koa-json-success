const type = require('typis');
const defaulty = require('defaulty');
const isEmpty = require('is-empty');
const STATUS_CODES = require('http').STATUS_CODES;

/**
 * JSON response
 * @param success
 * @param message
 * @param result
 * @param code
 * @returns {{success: *, message: *, result: *, time: Date}}
 * @ignore
 */
function responseJSON(success, message, result = null, code) {
    return {
        success,
        message,
        result,
        code,
        time: new Date()
    }
}

/**
 * Wrapper method
 * @alias success
 * @param app {Object} KOA app
 * @param [opts] {Object} options
 * @param [opts.defaultOk=ok] {string} default "ok" message
 * @param [opts.defaultFailed=failed] {string} default "failed" message
 * @param [opts.onTrue=null] {Function} callback on true success
 * @param [opts.onFalse=null] {Function} callback on false success
 * @param [opts.callbackQuery=callback] {string} JSONP callback query param
 * @param [opts.allowCallback=true] {boolean} allow JSONP
 * @example
 * const koa = require('koa');
 * const success = require('koa-json-success');
 *
 * const app = new koa();
 * success(app);
 *
 * app.use(ctx => {
 *      ctx.success(true, 'done', 'a result');
 * });
 */
function wrapperApp(app, opts = {}) {
    const defaultOpts = {
        defaultOk: 'ok',
        defaultFailed: 'failed',
        onTrue: null,
        onFalse: null,
        allowCallback: true,
        callbackQuery: 'callback'
    };

    defaulty(opts, defaultOpts);

    /**
     * @name ctx
     * @inner
     * @description KOA context
     * @kind parameter
     */

    /**
     * Koa context method
     * @function
     * @alias success
     * @memberOf ctx
     * @param success {boolean} response success
     * @param [message] {string} message string
     * @param [result=null] {*} anythings like array, object, string, boolean...
     * @param [code=200] {number} status server code
     * @example
     * app.use(ctx => {
     *      ctx.success(true, 'done', 'a result', 200);
     *      // Response output example
     *      {
     *         "success": true,
     *         "code": 200,
     *         "message": "done",
     *         "result": "a result",
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * app.use(ctx => {
     *      ctx.success(false, 'ops...', null, 401);
     *      // Response output example
     *      {
     *         "success": false,
     *         "code": 401,
     *         "message": "ops...",
     *         "result": null,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     */
    const success = app.context.success = function (success, message, result = null, code = 200) {
        if (!type.is(success, 'boolean'))
            throw new Error('first argument must be a boolean type');

        if (type.is(message, 'undefined') || message === null) {
            message = success
                ? opts.defaultOk
                : opts.defaultFailed;
        }

        const args = [
            success,
            message,
            result,
            code
        ];

        if (opts.onTrue && type.is(opts.onTrue, 'function'))
            opts.onTrue.apply(this, args.slice(1));

        if (opts.onFalse && type.is(opts.onFalse, 'function'))
            opts.onFalse.apply(this, args.slice(1));

        this.status = code;
        let response = responseJSON.apply(this, args);

        if(opts.allowCallback && this.query[opts.callbackQuery]) {
            response = `${this.query[opts.callbackQuery]}(${JSON.stringify(response)})`;
        }

        this.body = response;
    };

    /**
     * This method respond as success to true
     * @function
     * @alias successTrue
     * @memberOf ctx
     * @param [message] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     * @param [code] {number} status server code
     * @example
     * app.use(ctx => {
     *      ctx.successTrue();
     *      // Response output example
     *      {
     *         "success": true,
     *         "code": 200,
     *         "message": "ok",
     *         "result": null,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * app.use(ctx => {
     *      ctx.successTrue('done');
     *      // Response output example
     *      {
     *         "success": true,
     *         "code": 200,
     *         "message": "done",
     *         "result": null,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * app.use(ctx => {
     *      ctx.successTrue('done', 'a result');
     *      // Response output example
     *      {
     *         "success": true,
     *         "code": 200,
     *         "message": "done",
     *         "result": "a result",
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     */
    const successTrue = app.context.successTrue = function (message, result, code) {
        success.call(this, true, message, result, code);
    };

    /**
     * This method respond as success to false
     * @function
     * @alias successFalse
     * @memberOf ctx
     * @param [message] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     * @param [code] {number} status server code
     * @example
     * app.use(ctx => {
     *      ctx.successFalse();
     *      // Response output example
     *      {
     *         "success": false,
     *         "code": 200,
     *         "message": "failed",
     *         "result": null,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * app.use(ctx => {
     *      ctx.successFalse('ops...');
     *      // Response output example
     *      {
     *         "success": false,
     *         "code": 200,
     *         "message": "ops...",
     *         "result": null,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * app.use(ctx => {
     *      ctx.successFalse('ops...', false);
     *      // Response output example
     *      {
     *         "success": false,
     *         "code": 200,
     *         "message": "ops...",
     *         "result": false,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     */
    const successFalse = app.context.successFalse = function (message, result, code) {
        success.call(this, false, message, result, code);
    };

    /**
     * Return success considering truthy or falsy of result param
     * @function
     * @alias successIf
     * @memberOf ctx
     * @param result {*} anythings like array, object, string, boolean...
     * @param [opts] {Object} option configuration
     * @param [opts.messageOk=ok] {string} "ok" message
     * @param [opts.messageFailed=failed] {string} "failed" message
     * @param [opts.codeOk=200] {number} status "ok" code
     * @param [opts.codeFailed=500] {number} status "failed" code
     * @example
     * // Falsy result
     * app.use(ctx => {
     *      const result = 0;
     *      ctx.successIf(result);
     *      // Response output example
     *      {
     *         "success": false,
     *         "code": 500,
     *         "message": "failed",
     *         "result": 0,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * // Truthy result
     * app.use(ctx => {
     *      const result = 123;
     *      ctx.successIf(result);
     *      // Response output example
     *      {
     *         "success": true,
     *         "code": 200,
     *         "message": "ok",
     *         "result": 123,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * // Use options
     * app.use(ctx => {
     *      const result = 123;
     *      ctx.successIf(result, {messageOk: 'all done'});
     *      // Response output example
     *      {
     *         "success": true,
     *         "code": 200,
     *         "message": "all done",
     *         "result": 123,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     */
    app.context.successIf = function (result, opts = {}) {

        defaulty(opts, {
            messageOk: 'ok',
            messageFailed: 'failed',
            codeOk: 200,
            codeFailed: 500
        });

        if (result) {
            successTrue.call(this, opts.messageOk, result, opts.codeOk);
        } else {
            successFalse.call(this, opts.messageFailed, result, opts.codeFailed);
        }
    };

    /**
     * Return success result is not empty
     * @function
     * @alias successIfNotEmpty
     * @memberOf ctx
     * @param result {*} anythings like array, object, string, boolean...
     * @param [opts] {Object} option configuration
     * @param [opts.messageOk=ok] {string} "ok" message
     * @param [opts.messageFailed=failed] {string} "failed" message
     * @param [opts.codeOk=200] {number} status "ok" code
     * @param [opts.codeFailed=500] {number} status "failed" code
     * @example
     * // Empty result
     * app.use(ctx => {
     *      const result = [];
     *      ctx.successIfNotEmpty(result);
     *      // Response output example
     *      {
     *         "success": false,
     *         "code": 500,
     *         "message": "failed",
     *         "result": 0,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     *
     * @example
     * // Not empty result
     * app.use(ctx => {
     *      const result = [1, 2, 3];
     *      ctx.successIfNotEmpty(result);
     *      // Response output example
     *      {
     *         "success": true,
     *         "code": 200,
     *         "message": "ok",
     *         "result": 123,
     *         "time": "0000-00-00T00:00:00.000Z"
     *      }
     * });
     */
    app.context.successIfNotEmpty = function (result, opts = {}) {

        defaulty(opts, {
            messageOk: 'ok',
            messageFailed: 'failed',
            codeOk: 200,
            codeFailed: 500
        });

        if (!isEmpty(result)) {
            successTrue.call(this, opts.messageOk, result, opts.codeOk);
        } else {
            successFalse.call(this, opts.messageFailed, result, opts.codeFailed);
        }
    };

    for(let code in STATUS_CODES){
        /* istanbul ignore else  */
        if(STATUS_CODES.hasOwnProperty(code)) {
            code = Number(code);
            app.context[`success${code}`] = function (message = STATUS_CODES[code], result = null) {
                success.call(this, code < 400 , message, result, code);
            };
        }
    }
    /**
     * @function success400
     * @memberOf ctx
     * @param [message=Bad Request] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success401
     * @memberOf ctx
     * @param [message=Unauthorized] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success402
     * @memberOf ctx
     * @param [message=Payment Required] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success403
     * @memberOf ctx
     * @param [message=Forbidden] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success404
     * @memberOf ctx
     * @param [message=Not Found] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success405
     * @memberOf ctx
     * @param [message=Method Not Allowed] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success406
     * @memberOf ctx
     * @param [message=Not Acceptable] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success407
     * @memberOf ctx
     * @param [message=Proxy Authentication Required] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success408
     * @memberOf ctx
     * @param [message=Request Timeout] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success409
     * @memberOf ctx
     * @param [message=Conflict] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success410
     * @memberOf ctx
     * @param [message=Gone] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success411
     * @memberOf ctx
     * @param [message=Length Required] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success412
     * @memberOf ctx
     * @param [message=Precondition Failed] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success413
     * @memberOf ctx
     * @param [message=Payload Too Large] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success414
     * @memberOf ctx
     * @param [message=URI Too Long] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success415
     * @memberOf ctx
     * @param [message=Unsupported Media Type] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success416
     * @memberOf ctx
     * @param [message=Range Not Satisfiable] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success417
     * @memberOf ctx
     * @param [message=Expectation Failed] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success418
     * @memberOf ctx
     * @param [message=I'm a teapot] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success417
     * @memberOf ctx
     * @param [message=Expectation Failed] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success421
     * @memberOf ctx
     * @param [message=Misdirected Request] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success422
     * @memberOf ctx
     * @param [message=Unprocessable Entity] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success423
     * @memberOf ctx
     * @param [message=Locked] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success424
     * @memberOf ctx
     * @param [message=Failed Dependency] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success425
     * @memberOf ctx
     * @param [message=Unordered Collection] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success426
     * @memberOf ctx
     * @param [message=Upgrade Required] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success428
     * @memberOf ctx
     * @param [message=Precondition Required] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success429
     * @memberOf ctx
     * @param [message=Too Many Requests] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success431
     * @memberOf ctx
     * @param [message=Request Header Fields Too Large] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success500
     * @memberOf ctx
     * @param [message=Internal Server Error] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success501
     * @memberOf ctx
     * @param [message=Not Implemented] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success502
     * @memberOf ctx
     * @param [message=Bad Gateway] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success503
     * @memberOf ctx
     * @param [message=Service Unavailable] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success504
     * @memberOf ctx
     * @param [message=Gateway Timeout] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success505
     * @memberOf ctx
     * @param [message=HTTP Version Not Supported] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success506
     * @memberOf ctx
     * @param [message=Variant Also Negotiates] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success507
     * @memberOf ctx
     * @param [message=Insufficient Storage] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success508
     * @memberOf ctx
     * @param [message=Loop Detected] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success509
     * @memberOf ctx
     * @param [message=Bandwidth Limit Exceeded] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success510
     * @memberOf ctx
     * @param [message=Not Extended] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
    /**
     * @function success511
     * @memberOf ctx
     * @param [message=Network Authentication Required] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     */
}

module.exports = wrapperApp;
module.exports.response = responseJSON;