import Router from 'koa-router';
import * as PodcastsController from '../controllers/podcasts_controller';

const router: Router = new Router();

// System routes
router.get('/healthcheck', (ctx) => ctx.response.body = 'Server is running');

// Podcasts controller
router.get('/podcasts/:id', PodcastsController.show)

export const routes = router.routes();
