const type = require('typis');
const defaulty = require('defaulty');
const isEmpty = require('is-empty');

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
 * @param [opts.callbackName=cb] {string} JSONP callback function name
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
        callbackName: 'cb',
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

        if(opts.callbackName && type.is(opts.callbackName, 'string') && this.query[opts.callbackQuery]
            && this.query[opts.callbackQuery] === opts.callbackName) {
            response = `${opts.callbackName}(${JSON.stringify(response)})`;
        }

        this.body = response;
    };

    /**
     * This method respond as success to true
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

    app.context.success400 = function (msg) {
        successFalse.call(this, msg, null, 400);
    };

    app.context.success401 = function (msg) {
        successFalse.call(this, msg, null, 401);
    };

    app.context.success402 = function (msg) {
        successFalse.call(this, msg, null, 402);
    };

    app.context.success403 = function (msg) {
        successFalse.call(this, msg, null, 403);
    };

    app.context.success404 = function (msg) {
        successFalse.call(this, msg, null, 404);
    };

    app.context.success405 = function (msg) {
        successFalse.call(this, msg, null, 405);
    };
}

module.exports = wrapperApp;
module.exports.response = responseJSON;