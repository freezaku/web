var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var leader = require('../models/leadership');

var app = express();

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
/*.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})*/
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
  leader.find({}, function(err, leader) {
    if(err) throw err;
    res.json(leader);
  });
})

/*.get(function(req,res,next){
        res.end('Will send all the leaders to you!');
})*/

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    //res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);    
    leader.create(req.body, function(err, leader) {
      if(err) throw err;
      console.log("Leaders created!");
      
      var id = leader._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Added the leader with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        //res.end('Deleting all leaders');
        leader.remove({}, function(err, resp) {
          if(err) throw err;
          res.json(resp);
        });
});

leaderRouter.route('/:leaderId')
/*.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})*/

.get(Verify.verifyOrdinaryUser, function(req,res,next){
        //res.end('Will send details of the leaders: ' + req.params.leaderId +' to you!');
        leader.findById(req.params.leaderId, function(err, leader) {
          if(err) throw err;
          res.json(leader);
        });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    //res.write('Updating the leader: ' + req.params.leaderId + '\n');
    //res.end('Will update the leader: ' + req.body.name + 
     //       ' with details: ' + req.body.description);
    leader.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, {
      new: true
    }, function(err, leader) {
      if(err) throw err;
      res.json(leader);
    });
})

.delete(function(req, res, next){
        //res.end('Deleting leader: ' + req.params.leaderId);
        leader.findByIdAndRemove(req.params.leaderId, function(err, resp) {
          if(err) throw err;
          res.json(resp);
        })
});

module.exports = leaderRouter;