var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var Dishes = require('../models/dishes')
//var User = require('../models/user')
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

    .get(Verify.verifyOrdinaryUser, function(req,res,next){

        Favorites.findOne({postedBy: req.decoded._doc._id})
            .populate('postedBy dishes')
            .exec(function (err, favorite) {
              if (err) throw err;
              res.json(favorite);
            });
    })

    .post(Verify.verifyOrdinaryUser, function (req, res, next){

        Favorites.findOne({postedBy: req.decoded._doc._id}, function (err, favorite) {
          if (err) throw err;
          console.log(favorite);

          if (favorite == null) {
              var fav = {
                dishes: req.body._id,
                postedBy: req.decoded._doc._id
              };

              Favorites.create(fav, function (err, favorite) {
                  if (err) throw err;
                  console.log('Favorite created!');
                  console.log(favorite);
                  res.json(favorite);
              });
          }  else if (favorite.dishes.indexOf(req.body._id) > -1) {

                console.log("This favorite already existed!");
                res.end("This favorite already existed!");

          } else {

                favorite.dishes.push(req.body._id);
                favorite.save(function (err, favorite) {
                  if (err) throw err;
                  console.log('Updated Favorites!');
                  res.json(favorite);
                })
          }
        })

    })

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {

        Favorites.findOneAndRemove({postedBy: req.decoded._doc._id}, function (err, favorite) {
            if (err) throw err;
              console.log('Removed Favorites!');
              res.json(favorite);

        });
    });

favoriteRouter.route('/:dishId')

    .delete(Verify.verifyOrdinaryUser, function(req, res, next){

        Favorites.findOne({postedBy: req.decoded._doc._id}, function (err, favorite) {
            if (err) throw err;
            var dish = req.params.dishId;
            var index = favorite.dishes.indexOf(dish);
            if (index > -1) {
              favorite.dishes.splice(index, 1);
              favorite.save(function (err, favorite) {
                if (err) throw err;
                console.log('Updated Favorites!');
              })
            }
            res.json(favorite);
        });
    });

module.exports = favoriteRouter;