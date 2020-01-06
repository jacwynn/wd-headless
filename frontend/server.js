const express = require('express');
var cors = require('cors')
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    // server.use(cors());
    const corsOptions = {
      origin: 'https://wordpress-dot-jacwynn-site-263723.appspot.com'
    }

    server.get('/post/:slug', cors(corsOptions), (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'post' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/page/:slug', cors(corsOptions), (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug, apiRoute: 'page' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/project/:slug', cors(corsOptions), (req, res) => {
      const actualPage = '/project';
      const queryParams = { slug: req.params.slug, apiRoute: 'project' };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', cors(corsOptions), (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:rev/:type/:status/:wpnonce', cors(corsOptions), (req, res) => {
      const actualPage = '/preview';
      const { id, rev, type, status, wpnonce } = req.params;
      const queryParams = { id, rev, type, status, wpnonce };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
