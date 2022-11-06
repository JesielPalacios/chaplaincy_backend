import mongoose from 'mongoose'
import app from './app'

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('DBConecction Successfull!'))
  .catch((error) => console.log(error))

app.listen(app.get('port'), () => {
  console.log('The backend server is ready running on port ' + app.get('port'))
  console.log('🔥 Visit http://localhost:' + app.get('port'))
})
