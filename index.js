import mongoose from "mongoose";
import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import route from "./router/userRouter.js";
import Stripe from "stripe";
import  { client,designer } from './connection.js';

const stripe = Stripe('sk_test_51Pt572DcxgPqDrQh11uhq6RG00a6ckao0Djdm7Vi6c5DlW4XGEYBCNqqkbggtm2bshV0jH3Bou9O2Xpnmys1uIB500UV0foNnD');

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const url = process.env.MONGOURL;

app.use(express.static('D:/iconic Image/server/index.js'))
app.post("/api/create-checkout-session", async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price: 'price_1PtT1cDcxgPqDrQhXXvtcD3C',
      quantity: 1,
    }],
    mode: "payment",
    success_url: "http://localhost:3000/subscription/done",
    cancel_url: "http://localhost:3000/subscription/nope",
  });
  res.json({ id: session.id })
})

app.delete('/getuser/:id', (req, res) => {
  client.query(`DELETE FROM users WHERE _id='${req.params.id}'`, (err, result) => {
    if (!err) {
      res.status(200).send(result.rows);
    } else {
      res.status(404).send({ err });
    }
  });
  client.end;
})

mongoose.connect(url).then(() => {
  console.log('Connecting');

  app.listen(PORT, () => {
    console.log(`${PORT} is conn`);
  })
}).catch(error => console.log(error));
app.use("/api", route);
client.connect();
designer.connect();