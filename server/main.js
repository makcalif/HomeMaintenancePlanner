const express = require('express')
const path = require('path')
const webpack = require('webpack')
const logger = require('../build/lib/logger')
const webpackConfig = require('../build/webpack.config')
const bodyParser = require('body-parser')
const project = require('../project.config')
const compress = require('compression') 
//const tasks = require('./routes/tasks');

const models  = require('../models');

const app = express()
app.use(compress())


  //app.use('/tasks', tasks);

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  logger.info('Enabling webpack development and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : path.resolve(project.basePath, project.srcDir),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : 'normal',
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, 'public')))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
 
  app.use(bodyParser.json())


  models.sequelize.sync( ).then(function() {
    console.log('done model init');
  });



  app.get('/api/tasks', function (req, res) { 
    models.Task.findAll({  
      order: [ ['date', 'ASC'] ]    
    }).then(function(tasks) {  
       
    let past = [];
    let upcoming = [];
    const now = new Date();
    now.setHours(0,0,0,0);
    for (let task of tasks){

      if(task.date >= now) { 
         task.upcoming = true;
         const upcomingTask = {id: task.id, title: task.title, date: task.date, upcoming: 'true'};
         upcoming.push(upcomingTask);
      }
      else { 
         past.push(task);
      }
    }
    for (let task of past){
       upcoming.push(task);
    }
      res.json(upcoming);
    });
  })  

  app.post('/api/task', function (req, res) {  
    const title = req.body.title;
    const date = req.body.date;
    console.log('server body title:' + req.body.title );
    console.log('server body date:' + req.body.date );
 
    models.Task.create({
      title: title,
      date: date
    }).then(function(e) { 
      console.log('done adding Task' + e);
      res.json(e);
    }); 
  });

  app.delete('/api/task', function (req, res) {  
    const id = req.body.id; 
    console.log('delete server by id:' + id );
     
    models.Task.destroy({
      where: {
        id: id
      }
    }).then(function(e) {
      //res.redirect('/');
      console.log('done deleting Task' + e);
      res.json(e);
    }); 
  }); 

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
  
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)))
}

module.exports = app
