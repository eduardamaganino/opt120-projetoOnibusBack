const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const routes = require('./routes');
const multer = require('multer');
const path = require('path');

// Importa o controlador de upload
const uploadController = require('./controllers/upload-controller');

app.use(cors());
app.use(express.json());


// Diretório para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Usa as rotas definidas no arquivo routes.js
app.use('/', routes);

// Endpoint para upload de PDF usando o controlador de upload
app.post('/uploadPdf', uploadController.upload.single('file'), uploadController.uploadFile);




app.listen(port, () => {
    console.log('Aplicacao rodando na porta 3000');
});
