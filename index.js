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
        /** ----------------------------
         * All Collection
        --------------------------------*/
        //1. projectCollection
        const projectCollection = client.db('Luxury_Living').collection('projects');
        //2. serviceCollection
        const serviceCollection = client.db('Luxury_Living').collection('services');


        // get data for projects page
        app.get('/projects', async (req, res) => {
            const result = await projectCollection.find().toArray();
            res.send(result);
        })

        //get data for projects in homepage
        app.get('/homeProjects', async (req, res) => {
            const result = await projectCollection.find().limit(3).toArray();
            res.send(result);
        })

        // get services for services page
        app.get('/services', async (req, res) => {
            const result = await serviceCollection.find().toArray();
            res.send(result);
        });

        // get services for home page
        app.get('/homeServices', async (req, res) => {
            const result = await serviceCollection.find().limit(3).toArray();
            res.send(result);
        });
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