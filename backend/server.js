const express = require('express');
const server = express();
const port = process.env.PORT || 5000;
const dbo = require('./connection');

server.use(express.json());

server.get('/', (rec,res)=>{
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('urlData')
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching URL data!');
            } else {
                res.json(result);
            }
        });
})

server.post('/upload',(req, res) =>{
    const { url, user_email, timestamp } = req.body
    const dbConnect = dbo.getDb();
    const payload = {
        url,
        user_email,
        timestamp
    };

    dbConnect
        .collection('urlData')
        .insertOne(payload, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting url data!');
            } else {
                console.log(`Added a new url with id ${result.insertedId}`);
                res.status(201).send();
            }
        });
})

dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }

    server.listen(port, () => {
        console.log('Server is running on ', port)
    })
});
