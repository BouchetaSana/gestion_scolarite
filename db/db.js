const mongosse=require("mongoose");

mongosse.connect("mongodb://localhost:27017/gestionscolarite",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true
})

const connection=mongosse.connection;
connection.on("error",()=>console.log("error in connection of DB"))
connection.once("open",()=>console.log("connected to DB"))

exports.connection=connection;
mongosse.exports=mongosse;