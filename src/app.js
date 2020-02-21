const Express = require("express");
const BodyParser= require('body-parser')
const Mongoose = require("mongoose");
const cors = require('cors');
const pdvsRouter = require('./routes/pdvs');

var app = Express();
app.use(cors());
app.use(BodyParser.urlencoded({extended: true}))

Mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use('/pdvs', pdvsRouter);
app.route('/*').get((req, res) => {
    res.sendStatus(404);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
