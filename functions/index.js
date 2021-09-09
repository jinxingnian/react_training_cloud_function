const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

const db = admin.firestore();



exports.getColor = functions.https.onRequest((req, res) => {
    // .../p1
    cors(req, res, () => {
        var player = req.url.substring(1);
        admin.firestore().collection('playerColor').doc(player).get().then(doc => {
            res.send(doc.data().color);
        });
    });
});

exports.setColor = functions.https.onRequest((req, res) => {
    // .../p1 {color: 'red'}
    cors(req, res, () => {
        admin.firestore().collection('playerColor').doc(req.url.substring(1)).update({
            "color": req.body.color
        });
        res.send("Update success!");
    });
    
});
