const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors');
require('dotenv').config()
const { use } = require('express/lib/router');
const port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())


// mongo db connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lntwuu5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        //collection
        const projectCollection = client.db('Luxury_Living').collection('projects');



        app.get('/projects', async (req, res) => {
            const result = await projectCollection.find().toArray();
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello Luxury Living!')
})

app.listen(port, () => {
    console.log(`Luxury Living listening on port ${port}`)
})