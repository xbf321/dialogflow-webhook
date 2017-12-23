
class HomeController {
    async index(ctx) {
        ctx.body = 'hello world.';
    }
}
module.exports = HomeController;