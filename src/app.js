import express from 'express'
import indexRoutes from './routes/index.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import transaccionessRoutes from './routes/transaccioness.routes.js'
import cajasRoutes from './routes/cajas.routes.js'
import gastossRoutes from './routes/gastoss.routes.js'
import usuariossRoutes from './routes/usuarioss.routes.js'
import mesassRoutes from './routes/mesass.routes.js'
import facturacionesRoutes from './routes/facturaciones.routes.js'
import ventassRoutes from './routes/ventass.routes.js'
import materiaPrimasRoutes from './routes/materiaPrimas.routes.js'
import proveedoressRoutes from './routes/proveedoress.routes.js'
import inventariosRoutes from './routes/inventarios.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',categoriasRoutes)
app.use('/api',transaccionessRoutes)
app.use('/api',cajasRoutes)
app.use('/api',gastossRoutes)
app.use('/api',usuariossRoutes)
app.use('/api',mesassRoutes)
app.use('/api',facturacionesRoutes)
app.use('/api',ventassRoutes)
app.use('/api',materiaPrimasRoutes)
app.use('/api',proveedoressRoutes)
app.use('/api',inventariosRoutes)



app.use((req,res, next)=>{
    res.status(404).json({
        message: 'EndPoint No Encontrado'
    })
})

export default app