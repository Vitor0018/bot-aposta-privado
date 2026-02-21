import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [filas, setFilas] = useState([]);
  const [apostas, setApostas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    fetch(`${API}/filas`).then(r => r.json()).then(setFilas).catch(console.error);
    fetch(`${API}/apostas`).then(r => r.json()).then(setApostas).catch(console.error);
    fetch(`${API}/usuarios`).then(r => r.json()).then(data => {
      // sort by ranking descending
      data.sort((a,b) => (b.ranking||0) - (a.ranking||0));
      setUsuarios(data);
    }).catch(console.error);
    fetch(`${API}/historico`).then(r => r.json()).then(setHistorico).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl">NULLA Dashboard</h1>
      </header>
      <main className="p-4 space-y-6">
        <section>
          <h2 className="text-lg font-semibold">Filas Ativas</h2>
          <ul className="list-disc list-inside">
            {filas.map(f => (
              <li key={f._id}>{f.vs} {f.modo} R$ {f.valor.toFixed(2)} [{f.status}]</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Apostas</h2>
          <ul className="list-disc list-inside">
            {apostas.map(a => (
              <li key={a._id}>{a.vs} {a.modo} R$ {a.valor.toFixed(2)} [{a.status}]</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Ranking</h2>
          <ol className="list-decimal list-inside">
            {usuarios.map(u => (
              <li key={u._id}>{u.nome || u.discordId}: {u.ranking}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Histórico</h2>
          <ul className="list-disc list-inside break-words">
            {historico.map(h => (
              <li key={h._id}>{new Date(h.createdAt).toLocaleString()} - {h.usuario} - {h.acao} {h.detalhes ? JSON.stringify(h.detalhes) : ''}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
