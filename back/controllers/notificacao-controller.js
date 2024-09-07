const database = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class NotificacaoController {
    create(req, res) {
        const { texto, dataHora, isRead } = req.body;

        // Primeiro, insere a notificação na tabela `notificacoes`
        database.query(
            'INSERT INTO optbusao.notificacoes (texto, dataHora) VALUES (?, ?)',
            [texto, dataHora],
            (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro interno do servidor' });
                    return;
                }

                const notificacaoId = results.insertId;  // Obtém o ID da notificação recém-criada

                // Recupera todos os usuários do sistema
                database.query('SELECT id FROM optbusao.usuarios', (userError, users) => {
                    if (userError) {
                        console.error(userError);
                        res.status(500).json({ error: 'Erro ao recuperar usuários' });
                        return;
                    }

                    // Insere uma linha para cada usuário na tabela `notificacoes_usuario`
                    const userQueries = users.map(user => {
                        return new Promise((resolve, reject) => {
                            database.query(
                                'INSERT INTO optbusao.notificacoes_usuario (idUser, notificacaoId, isRead) VALUES (?, ?, ?)',
                                [user.id, notificacaoId, isRead],
                                (insertError) => {
                                    if (insertError) {
                                        console.error(insertError);
                                        reject(insertError);
                                    } else {
                                        resolve();
                                    }
                                }
                            );
                        });
                    });

                    Promise.all(userQueries)
                        .then(() => {
                            res.json({ message: 'Notificação criada e associada a todos os usuários com sucesso' });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ error: 'Erro ao associar notificação aos usuários' });
                        });
                });
            }
        );
    }

    getAll(req, res) {
        const query = `
            SELECT n.id, n.texto, n.dataHora, nu.isRead 
            FROM optbusao.notificacoes AS n
            JOIN optbusao.notificacoes_usuario AS nu
            ON n.id = nu.notificacaoId`;
    
        database.query(query, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
    
            res.json(results);
        });
    }

    getById(req, res) {
        const { id } = req.params;
        const query = `
            SELECT n.id, n.texto, n.dataHora, nu.isRead
            FROM optbusao.notificacoes AS n
            JOIN optbusao.notificacoes_usuario AS nu
            ON n.id = nu.notificacaoId
            WHERE n.id = ?`;
    
        database.query(query, [id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
    
            if (results.length === 0) {
                res.status(404).json({ error: 'Notificação não encontrada' });
                return;
            }
    
            res.json(results[0]);
        });
    }
    

    getByUserId(req, res) {
        const { idUser } = req.params;
        const query = `
            SELECT n.id, n.texto, n.dataHora, nu.isRead
            FROM optbusao.notificacoes AS n
            JOIN optbusao.notificacoes_usuario AS nu
            ON n.id = nu.notificacaoId
            WHERE nu.idUser = ?`;
    
        database.query(query, [idUser], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            }
    
            if (results.length === 0) {
                res.status(404).json({ error: 'Nenhuma notificação encontrada' });
                return;
            }
    
            res.json(results);
        });
    }
    

    delete(req, res) {
        const { id } = req.params;
    
        // Primeiro, exclui a relação na tabela `notificacoes_usuario`
        database.query('DELETE FROM optbusao.notificacoes_usuario WHERE notificacaoId = ?', [id], (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro ao deletar a notificação' });
                return;
            }
    
            // Depois, exclui a notificação na tabela `notificacoes`
            database.query('DELETE FROM optbusao.notificacoes WHERE id = ?', [id], (deleteError) => {
                if (deleteError) {
                    console.error(deleteError);
                    res.status(500).json({ error: 'Erro ao deletar a notificação' });
                    return;
                }
    
                res.json({ message: 'Notificação deletada com sucesso' });
            });
        });
    }
    
    updateStatus(req, res) {
        const { idUser } = req.params;
        const { notificationId, isRead } = req.body;
    
        const query = 'UPDATE optbusao.notificacoes_usuario SET isRead = ? WHERE idUser = ? AND notificacaoId = ?';
    
        database.query(query, [isRead, idUser, notificationId], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar o status da notificação' });
                return;
            }
    
            res.json({ message: 'Status da notificação atualizado com sucesso' });
        });
    }
}

module.exports = new NotificacaoController;