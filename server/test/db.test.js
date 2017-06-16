'use strict';

var expect = require('expect.js');

describe('models/index', function () {

  before(function () {
      return require('../../models').sequelize.sync();
  });

  it('returns the task model', function () {
    var models = require('../../models');
    expect(models.Task).to.be.ok();
  });
  
  beforeEach(function () {     
    this.Task = require('../../models').Task;
  });

  describe('create', function () {
    it('creates a task', function () {       
        return this.Task.create({ title: 'task 1', date: '01/01/2000' }).then(function (task) {
          expect(task.title).to.equal('task 1');
        });        
    });
  });

  describe('create', function () {
    it('creates a task', function () {       
        return this.Task.create({ title: 'task 1', date: '01/01/2000' }).then(function (task) {
          expect(task.title).to.equal('task 1');
        });        
    });
  });

});
