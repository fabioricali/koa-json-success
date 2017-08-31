const type = require('typis');
const defaulty = require('defaulty');

/**
 * JSON response
 * @param success
 * @param message
 * @param result
 * @param code
 * @returns {{success: *, message: *, result: *, time: Date}}
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
 * contextResponse
 * @param app {Object} KOA app
 * @param [opts] {Object} options
 * @param [opts.methodName=success] {string} method name in context
 * @param [opts.defaultOk=ok] {string} default "ok" message
 * @param [opts.defaultFailed=failed] default "failed" message
 * @param [opts.onTrue=null] {Function} callback on true success
 * @param [opts.onFalse=null] {Function} callback on false success
 */
function contextResponse(app, opts = {}) {
    const defaultOpts = {
        defaultOk: 'ok',
        defaultFailed: 'failed',
        onTrue: null,
        onFalse: null
    };

    defaulty(opts, defaultOpts);

    /**
     * Koa context method
     * @param success
     * @param message
     * @param result
     * @param code
     */
    app.context.success = function (success, message, result = null, code = 200) {
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
     * Set success to true
     * @param arguments.message
     * @param arguments.result
     * @param arguments.code
     */
    app.context.successTrue = function () {
        const args = Array.from(arguments);
        args.unshift(true);
        app.context.success.apply(this, args);
    };

    /**
     * Set success to false
     * @param arguments.message
     * @param arguments.result
     * @param arguments.code
     */
    app.context.successFalse = function () {
        const args = Array.from(arguments);
        args.unshift(false);
        app.context.success.apply(this, args);
    };
}

module.exports = contextResponse;
module.exports.response = responseJSON;