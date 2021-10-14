const MongoClient = require('mongodb').MongoClient

let url= 'mongodb+srv://APP_USER:Agaporni1991@bodacluster.hh6at.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

class Connection {

    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.url, this.options)
        return this.db
    }

}

Connection.db = null
Connection.url = url;
Connection.options = {
    // bufferMaxEntries:   0,
    // reconnectTries:     5000,
    useNewUrlParser:    true,
    useUnifiedTopology: true,
}

module.exports = { Connection }
