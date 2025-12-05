import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


//Conectar MongoDB 

mongoose.connect(process.env.MONGODB_URI, { dbName: 'Controlador'})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro na conexão:', err.message));

//Modelo do Financeiro

const financaSchema = new mongoose.Schema({
    nome: {type: String, required: true, trim: true, minlength: 2 },
    valor: {type: Number, required: true, min: 0, max: 100000},
    categoria: {type: String, required: true, trim: true},
}, { collection: 'Financas', timestamps: true});
const Financa = mongoose.model('financa', financaSchema, 'financas');

//Rota inicial
app.get('/', (req, res) => res.json({ msg: 'API rodando'}));

//Criar
app.post('/financas', async (req, res) => {
    const financa = await Financa.create(req.body);
    res.status(201).json(financa);
});

// Buscar todos os registros
app.get('/financas', async (req, res) => {
  const financas = await Financa.find();
  res.json(financas);
});

//Iniciar servidor
app.listen(process.env.PORT, () => 
console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
);
