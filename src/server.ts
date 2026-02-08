import 'dotenv/config'
import app from './config/app.config'

const PORT = process.env.PORT || 3000

// Entrypoint of the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
