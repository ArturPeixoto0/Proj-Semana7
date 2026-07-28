import { app } from './config/expressConfig';

const PORTA: number = 3333;

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});