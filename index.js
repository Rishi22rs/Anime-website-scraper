const express = require('express')
const router = require('./Routes/route')
const bodyParser = require("body-parser");
const cors=require('cors')
const app = express()
const port = process.env.PORT || 6699

app.get('/', (req, res) => {
  res.send('i am runnin')
})

app.use(cors())
app.use(bodyParser());
app.use('/api',router)

app.listen(port, () => {
  console.log(`Anime app listening at http://localhost:${port}`)
})
