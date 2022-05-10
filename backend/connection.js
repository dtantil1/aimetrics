const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI || "mongodb+srv://aiadmin:test1234@cluster0.sk5nz.mongodb.net/URLDatabase?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db("URLDatabase");
            console.log("Successfully connected to MongoDB.");

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
};
