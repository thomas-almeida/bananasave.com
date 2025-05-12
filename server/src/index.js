import api from "./route.js"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use(api)

app.listen(PORT, () => {
  console.log(`BananaSave🍌 Online in ${PORT}`)
})

