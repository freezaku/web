var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var promo = require('../models/promotions');

var router = express.Router()
            .use(bodyParser.json());

router.route('/')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        promo.find({}, function (err, promo) {
            if (err) throw err;
            res.json(promo);
        });
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        promo.create(req.body, function (err, promo) {
            if (err) throw err;
            console.log('Promotion created!');
            var id = promo._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promotion with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        promo.remove({}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

router.route('/:promoId')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        promo.findById(req.params.promoId, function (err, promo) {
            if (err) throw err;
            res.json(promo);
        });
    })

    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        promo.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {
            new: true
        }, function (err, promo) {
            if (err) throw err;
            res.json(promo);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        promo.findByIdAndRemove(req.params.promoId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

module.exports = router;