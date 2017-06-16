let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
var expect = require('expect.js');
let should = chai.should();

chai.use(chaiHttp);
 
 // var port = process.env.PORT || 3000;
 // server.listen(port);

 before(function () {    
 	   
      this.Task = require('../../models').Task;
      var models = require('../../models');
      expect(models.Task).to.be.ok();

	  models.sequelize.sync( ).then(function() {
	    console.log('done model init for db testing');
	  }); 

      this.Task.destroy({
		  where: {},
		  truncate: true
	  })

	  this.Task.create({ title: 'task in past', date: '01/01/2000' }).then(function (task) {
          //expect(task.title).to.equal('task in past');
          task.should.have.property('title').eql('task in past');
      });  

      this.Task.create({ title: 'task in future', date: '01/01/2018' }).then(function (task) {
          task.should.have.property('title').eql('task in future');
      });   
 });
 
 describe('Tasks', () => { 
    describe('/POST task', () => {
      it('check basic post of task working', (done) => {
        let task = {
            title: "Fix Sink",
            date: '2/1/2018'
        }
        chai.request(server)
            .post('/api/tasks')
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object'); 
              done();
            });
      });
    });


/*
  * Test the /GET route
  */
  describe('/GET tasks', () => {

      it('it should GET all the tasks', (done) => {

        chai.request(server)
            .get('/api/tasks')
            .end((err, res) => {
            	res.should.have.status(200);
            	res.body.should.be.a('array');
				//res.body.length.should.be.eql(2);  

            	for(let task of res.body) {
            		console.log('task title' + task.title);
            		if(task.title === 'task in future') { 
            			expect(task).to.have.own.property('upcoming');
            		}
            		if(task.title === 'task in past') { 
            			expect(task).not.to.have.own.property('upcoming');
            		}
            	} 
              done();
            });
      });
  });

});