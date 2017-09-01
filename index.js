const type = require('typis');
const defaulty = require('defaulty');

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
        onFalse: null
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
        this.body = responseJSON.apply(this, args);
    };

    /**
     * This method respond as success to true
     * @alias successTrue
     * @memberOf ctx
     * @param [message] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     * @param [code] {number} status server code
     */
    app.context.successTrue = function (message, result, code) {
        success.call(this, true, message, result, code);
    };

    /**
     * This method respond as success to false
     * @alias successFalse
     * @memberOf ctx
     * @param [message] {string} message string
     * @param [result] {*} anythings like array, object, string, boolean...
     * @param [code] {number} status server code
     */
    app.context.successFalse = function (message, result, code) {
        success.call(this, false, message, result, code);
    };
}

module.exports = wrapperApp;
module.exports.response = responseJSON;