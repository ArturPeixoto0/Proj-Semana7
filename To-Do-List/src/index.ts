import express from 'express';

const app = express();
const PORTA = 3333;

// Middleware "tradutor" de JSON (CRUCIAL)
app.use(express.json()); 

// --- NOSSAS ROTAS ---

// Rota 1: GET na raiz
app.get('/', (req, res) => {
  // Não usamos o 'req' aqui
  
  // Usamos o 'res' para enviar uma resposta
  res.status(200).json({ mensagem: 'API funcionando!' });
});

// Rota 2: POST na raiz
app.post('/tarefas', (req, res) => {
  // Não usamos o 'req'
  const dadosRecebidos = req.body; 
  console.log('Dados recebidos no POST:', dadosRecebidos);
  return res.status(201).json({
    mensagem: 'Tarefa criada com sucesso!',
    dados: dadosRecebidos
  });
  res.status(201).send('Recebemos seu POST! Obrigado!');
});

// --- FIM DAS ROTAS ---

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});