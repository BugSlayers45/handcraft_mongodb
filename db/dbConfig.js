import mongoose from "mongoose";

mongoose.connect("mongodb+srv://bugslayers45:bugslayers45@cluster0.m4qsve7.mongodb.net/handcraftdb?retryWrites=true&w=majority")

//mongoose.connect("mongodb+srv://guptaastha948:hPwEzlndRcG0IQ53@cluster0.bgxrr9l.mongodb.net/mongoproject?retryWrites=true&w=majority")

    .then(result => {
        console.log("mongo Connected....");
    }).catch(err => {
        console.log(err);
    });

export default mongoose.connection;