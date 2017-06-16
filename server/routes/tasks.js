var express =  require('express')
var router = express.Router();
 
const models  = require('../../models');

  models.sequelize.sync( ).then(function() {
    console.log('done model init');
  });

	router.get('/', function(req, res, next) {
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
    });

    router.post('/', function (req, res) {  
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

    router.delete('/', function (req, res) {  
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

module.exports = router;