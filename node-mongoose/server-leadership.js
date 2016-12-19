var mongoose = require('mongoose'),
    assert = require('assert');

var Leaderships = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    var newLeadership = Leaderships({
        name: "Peter Pan",
        image: "images/alberto.png",
        designation: "Chief Epicurious Officer",
        abbr: "CEO",
        description: "Our CEO, Peter, . . ."
    });

    // save the user
    newLeadership.save(function (err) {
        if (err) throw err;
        console.log('Leaderships created!');

        // get all the users
        Leaderships.find({}, function (err, leaderships) {
            if (err) throw err;

            // object of all the users
            console.log(leaderships);
                        db.collection('leaderships').drop(function () {
                db.close();
            });
        });
    });
});