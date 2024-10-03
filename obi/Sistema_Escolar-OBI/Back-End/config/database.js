const mongose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
   try {
      await mongose.connect(process.env.MONGO_URI)
      console.log("MongoDB connected...")    
   } catch (err) {
      console.log(err.message)
      process.exit(1)    
   }       
}

module.exports = connectDB;