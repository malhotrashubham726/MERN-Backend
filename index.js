const express=require('express');
const port=3000;
const app=express();
const mongoDB=require('./db');

mongoDB();

app.use(express.json());
app.use('/auth', require('./routes/User'));
// app.use('/validate/', require('./routes/Validation'));

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
})