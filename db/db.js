const mongosse=require("mongoose");

mongosse.connect("mongodb://gestion_scolarite:sanaa-99@cluster0-shard-00-00-xeedb.mongodb.net:27017,cluster0-shard-00-01-xeedb.mongodb.net:27017,cluster0-shard-00-02-xeedb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongosse.connection;
db.on("error",(err)=>console.log("error in connection of DB"+err))
db.once("open",()=>console.log("connected to DB"))

exports.connection=db;
mongosse.exports=mongosse;