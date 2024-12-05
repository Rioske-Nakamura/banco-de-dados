const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '2323',
  port: 5432,
});

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const search = req.query.search || '';  
  let query = 'SELECT * FROM registro';
  let params = [];

  if (search) {
    query += ' WHERE nome ILIKE $1';
    params.push(`%${search}%`);
  }

  try {
    const result = await pool.query(query, params);
    const registros = result.rows;

    let html = `
      <html>
        <head>
          <title>Registros</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f3e5f5; color: #333; }
            h1 { text-align: center; color: #6a1b9a; }
            .search-container { text-align: center; margin-bottom: 20px; }
            .search-container input[type="text"] { padding: 8px; width: 200px; }
            .search-container button { padding: 8px 12px; background-color: #6a1b9a; color: #fff; border: none; cursor: pointer; }
            .search-container button:hover { background-color: #4a148c; }
            table { width: 80%; margin: auto; border-collapse: collapse; }
            th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #ce93d8; color: #6a1b9a; }
            tr:nth-child(even) { background-color: #f3e5f5; }
          </style>
        </head>
        <body>
          <h1>Registros</h1>
          <div class="search-container">
            <form action="/" method="get">
              <input type="text" name="search" placeholder="Pesquisar por nome" value="${search}">
              <button type="submit">Pesquisar</button>
            </form>
          </div>
          <table>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>RA</th>
              <th>Data de Nascimento</th>
              <th>CPF</th>
              <th>Educação</th>
            </tr>`;

    registros.forEach((registro) => {
      html += `
        <tr>
          <td>${registro.id}</td>
          <td>${registro.nome}</td>
          <td>${registro.ra}</td>
          <td>${registro.data_nascimento.toISOString().split('T')[0]}</td>
          <td>${registro.cpf}</td>
          <td>${registro.educacao || ''}</td>
        </tr>`;
    });

    html += `
          </table>
        </body>
      </html>`;

    res.send(html);
  } catch (err) {
    console.error('Erro ao puxar dados:', err);
    res.status(500).send('Erro ao puxar dados');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
