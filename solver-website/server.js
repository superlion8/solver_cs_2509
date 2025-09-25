const express = require('express')
const path = require('path')
const app = express()
const port = 4000

// Serve static files
app.use(express.static(path.join(__dirname)))

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// API endpoint for extension download
app.get('/solver-extension.zip', (req, res) => {
  res.download(path.join(__dirname, '../solver-extension'), 'solver-extension.zip')
})

app.listen(port, () => {
  console.log(`Solver website running at http://localhost:${port}`)
  console.log(`Network access: http://192.168.1.148:${port}`)
})
