const success = require('../');
const request = require('supertest');
const koa = require('koa');
const be = require('bejs');

describe('koa-json-success', function () {
    this.timeout(5000);

    describe('success', function () {

        it('should be return: success true, status code 200', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.success(true, 'done', 'hello');
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.body.message);
                    be.err.equal(res.status, 200);
                    be.err.true(res.body.success);
                    done();
                });
        });

        it('JSONP should be return: success true, status code 200', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.success(true, 'done', 'hello');
            });

            request(app.listen())
                .get('/?callback=cb')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.text);
                    be.err.empty(res.body);
                    be.err.equal(res.status, 200);
                    be.err.contains(res.text, 'cb({');
                    done();
                });
        });

        it('with callback onTrue should be return: success true, status code 200', function (done) {
            const app = new koa();

            success(app, {
                onTrue: function (message, result, status) {
                    console.log(status);
                    be.err.equal(status, 200);
                    be.err.equal(message, 'done');
                    be.err.equal(result, 'hello');
                    done();
                }
            });

            app.use(ctx => {
                ctx.success(true, 'done', 'hello');
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.body.message);
                });
        });

        it('with callback onFalse should be return: success false, status code 401', function (done) {
            const app = new koa();

            success(app, {
                onFalse: function (message, result, status) {
                    console.log(status);
                    be.err.equal(status, 401);
                    be.err.equal(message, 'unauthorized');
                    be.err.equal(result, 'hello');
                    done();
                }
            });

            app.use(ctx => {
                ctx.success(false, 'unauthorized', 'hello', 401);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.body.message);
                });
        });

        it('should be return: success false, status code 200', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.success(false, 'failed', 'hello');
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.body.message);
                    be.err.equal(res.status, 200);
                    be.err.false(res.body.success);
                    done();
                });
        });

        it('should be return: success true, status code 401', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.success(true, 'unauthorized', 'hello', 401);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);
                    be.err.equal(res.status, 401);
                    be.err.true(res.body.success);
                    done();
                });
        });

        it('without result should be return: success true, status code 200', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.success(true, 'done');
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);
                    be.err.equal(res.status, 200);
                    be.err.true(res.body.success);
                    done();
                });
        });

        it('only arg success true', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.success(true);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'ok');
                    be.err.true(res.body.success);
                    done();
                });
        });

        it('only arg success false', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.success(false);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'failed');
                    be.err.false(res.body.success);
                    done();
                });
        });

        it('without argument should be error', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                try {
                    ctx.success();
                } catch (e) {
                    be.err(done).equal(e.message, 'first argument must be a boolean type');
                }
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end();
        });
    });

    describe('successTrue', function () {
        it('no arguments', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successTrue();
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'ok');
                    be.err.true(res.body.success);
                    done();
                });
        });
        it('with argument message', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successTrue('hello');
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'hello');
                    be.err.true(res.body.success);
                    done();
                });
        });
        it('with argument message and status code', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successTrue('hello', null, 400);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 400);
                    be.err.equal(res.body.message, 'hello');
                    be.err.true(res.body.success);
                    done();
                });
        });
    });

    describe('successFalse', function () {
        it('no arguments', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successFalse();
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'failed');
                    be.err.false(res.body.success);
                    done();
                });
        });
        it('with argument message', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successFalse('hello');
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'hello');
                    be.err.false(res.body.success);
                    done();
                });
        });
        it('with argument message and status code', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successFalse('hello', null, 400);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 400);
                    be.err.equal(res.body.message, 'hello');
                    be.err.false(res.body.success);
                    done();
                });
        });
    });

    describe('successIf', function () {
        it('truthy result, should be return success true', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successIf([]);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'ok');
                    be.err.true(res.body.success);
                    done();
                });
        });
        it('falsy result, should be return success false', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successIf(0);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 500);
                    be.err.equal(res.body.message, 'failed');
                    be.err.false(res.body.success);
                    done();
                });
        });
    });

    describe('successIfNotEmpty', function () {
        it('empty result, should be return success false', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successIfNotEmpty([]);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 500);
                    be.err.equal(res.body.message, 'failed');
                    be.err.false(res.body.success);
                    done();
                });
        });
        it('not empty result, should be return success true', function (done) {
            const app = new koa();

            success(app);

            app.use(ctx => {
                ctx.successIfNotEmpty(['hello']);
            });

            request(app.listen())
                .get('/')
                .set('Accept', 'application/json')
                .end((err, res) => {
                    console.log(res.status);
                    console.log(res.body);

                    be.err.equal(res.body.code, 200);
                    be.err.equal(res.body.message, 'ok');
                    be.err.true(res.body.success);
                    done();
                });
        });
    });
});