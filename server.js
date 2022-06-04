const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = require('./app')

dotenv.config({ path: './config/.env' })
const port = process.env.DEFAULT_PORT || 5000

// const DB = process.env.DATABASE_DOMAIN.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD
// )
const DB = process.env.DATABASE_LOCAL

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log(err))

app.listen(port, () => {
  console.log(`App running on port ${port}`)
}) // start the server
