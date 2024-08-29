// upload-controller.js
const multer = require('multer');
const path = require('path');
const database = require('../database/connection');

// Configuração do Multer para armazenamento de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
  }
});
const upload = multer({ storage: storage });

// Função para lidar com o upload de arquivos
const uploadFile = (req, res) => {
  const { filename, size, mimetype } = req.file;

  // Salvar metadados no banco de dados
  const query = 'INSERT INTO arquivos (nome, caminho, tamanho, tipo) VALUES (?, ?, ?, ?)';
  const values = [filename, req.file.path, size, mimetype];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar arquivo no banco de dados.' });
    }
    res.status(200).json({ message: 'Arquivo enviado e salvo com sucesso!' });
  });
};

// Exporta o middleware e a função de upload
module.exports = {
  upload,
  uploadFile
};
