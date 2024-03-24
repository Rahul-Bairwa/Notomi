require('./config')
const express =require('express')
const app =express()
const port =3300
const cors=require('cors')
app.use(express.json())
app.use(cors())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/note'))

app.listen(port,()=>console.log(`server is running on http://localhost:${port}`))