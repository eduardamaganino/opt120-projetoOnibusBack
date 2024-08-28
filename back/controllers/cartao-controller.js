const database = require('../database/connection');

class CartaoController {
    create(req, res) {
        const { idUser, dataCriacao, dataVencimento, valor, tipo } = req.body;
    
        // Verifica se já existe um cartão com o idUser fornecido
        database.query(
            'SELECT * FROM optbusao.cartoes WHERE idUser = ?',
            [idUser],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro interno do servidor' });
                }
                
                // Se resultados não forem vazios, significa que já existe um cartão
                if (results.length > 0) {
                    return res.status(400).json({ error: 'Já existe um cartão para este usuário.' });
                }
    
                // Caso não exista, insere o novo cartão
                database.query(
                    'INSERT INTO optbusao.cartoes (idUser, dataCriacao, dataVencimento, valor, tipo) VALUES (?, ?, ?, ?, ?)',
                    [idUser, dataCriacao, dataVencimento, valor, tipo],
                    (err, results) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Erro interno do servidor' });
                            return;
                        }
                        console.log(results);
                        res.status(201).json({ message: 'Cartão criado com sucesso!', cardId: results.insertId });
                    }
                );
            }
        );
    }
    

       getByIdUser(req, res) {
        const { id } = req.params; 
        const query = 'SELECT * FROM optbusao.cartoes WHERE idUser = ?';
        
        database.query(query, [id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
    
            if (results.length === 0) {
                res.json(null);
                return;
            }
    
            const cartao = results[0];
            res.json(cartao);
        });
    }

    getById(req, res) {
        const { id } = req.params;
        const query = 'SELECT * FROM optbusao.cartoes WHERE id = ?';

        database.query(query, [id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'cartão não encontrado' });
                return;
            }

            const usuario = results[0];
            res.json(usuario);
        });
    }

    delete(req, res) {
        const { id } = req.params;

        // Check if the user exists
        database.query('SELECT * FROM optbusao.cartoes WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'cartão não encontrado' });
                return;
            }

            // Delete the user
            database.query('DELETE FROM optbusao.cartoes WHERE id = ?', [id], (deleteError) => {
                if (deleteError) {
                    console.error(deleteError);
                    res.status(500).json({ error: 'Erro ao deletar o cartão' });
                    return;
                }

                res.json({ message: 'cartão deletado com sucesso' });
            });
        });
    }

    createTable(req, res) {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS cartoes (
                idUser INT NOT NULL,
                dataCriacao DATETIME NOT NULL,
                dataVencimento DATETIME NOT NULL,
                valor DECIMAL(10, 2) NOT NULL,
                tipo VARCHAR(50) NOT NULL,
                PRIMARY KEY (idUser)
            );
        `;
    
        database.query(createTableQuery, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
    
            res.json({ message: 'Tabela cartoes criada com sucesso' });
        });
    }

}

module.exports = new CartaoController;