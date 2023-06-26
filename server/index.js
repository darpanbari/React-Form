import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import expenseRouter from "../server/src/routers/expenseRouter.js"


const app = express();

app.use(express.json());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//middelwares
app.use(cors());
app.use(express.json());


app.use("/form",  expenseRouter)

mongoose.connect(`mongodb://0.0.0.0:27017/React-Form`)
.then(()=>{
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.log(err)
})


//PORT
const PORT = 3030;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${PORT}`
  );
});
