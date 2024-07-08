import { sql } from '../db.js';

(async () => {
  try {
    const result = await sql`SELECT 1 + 1 AS result`;
    console.log(result);
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
})();
