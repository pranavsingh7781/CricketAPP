
import app from "./app.js";
import { config } from "dotenv";
config();

const Port = process.env.PORT || 8081;

app.listen(Port,() =>
{
    console.log(`The Server Is Up At Port Number : ${Port}`)
})