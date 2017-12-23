const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body');
const PORT = 3000;
const WebhookController = new (require('./controller/webhook'));
const HomeController = new (require('./controller/home'));

app.use(router.routes());

router.get('/', HomeController.index);
router.post('/webhook', koaBody(), WebhookController.index);

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

app.listen(PORT, () => {
    console.log(`Please visited http://127.0.0.1:${PORT}`);
});
