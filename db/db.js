const mongosse=require("mongoose");
//mongodb://gestion_scolarite:bouchetaSanaa@cluster0-shard-00-00-xeedb.mongodb.net:27017,cluster0-shard-00-01-xeedb.mongodb.net:27017,cluster0-shard-00-02-xeedb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
mongosse.connect("mongodb://localhost:27017/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err)=>console.log('erreur'))

const db=mongosse.connection;
db.on("error",(err)=>console.log("error in connection of BD"+err))
db.once("open",()=>console.log("connected to BD"))

exports.connection=db;
mongosse.exports=mongosse;

