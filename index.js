const express = require('express')
const cors = require('cors');
const app = express();
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());





const uri = "mongodb+srv://scicTask:NIPL5OZGRiyIOViM@cluster0.q4jo0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log("DB connected");
async function run() {
    try {
      await client.connect();
      const taskCollection = client.db("scicTask").collection("tasks");

      app.get('/task', async(req,res)=>{
        const query= {};
        const cursor = taskCollection.find(query);
        const tasks = await cursor.toArray();
        res.send(tasks);
    });
      
      app.post('/task', async(req,res)=>{
          const newTask = req.body;
          console.log("addind", newTask);
          const result = await taskCollection.insertOne(newTask);
          res.send(result);
        
      })

      app.delete('/task/:id', async(req,res)=>{
          const id= req.params.id;
          const query= {_id: ObjectId(id)};
          const result = await taskCollection.deleteOne(query);
          res.send(result);
      })
    } finally {

    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})