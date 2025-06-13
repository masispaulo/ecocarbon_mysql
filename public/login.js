document.getElementById('loginFormCooperado').addEventListener('submit', async function(e) {
  e.preventDefault();
  const usuarioOuEmail = document.getElementById('usuarioOuEmail').value;
  const senha = document.getElementById('password').value;
  const status = document.getElementById('loginStatus');
  try {
    const resp = await fetch('https://ecocarbon-mysql.onrender.com/api/cooperados/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioOuEmail, senha })
    });
    const resultado = await resp.json();
    if (resp.ok && resultado.success) {
      status.textContent = "Login realizado!";
      status.style.color = "green";
      setTimeout(() => {
        window.location.href = "transparencia.html";
      }, 1000);
    } else {
      status.textContent = resultado.message || resultado.msg || "Usuário/e-mail ou senha inválidos.";
      status.style.color = "red";
    }
  } catch {
    status.textContent = "Erro ao conectar ao servidor.";
    status.style.color = "red";
  }
});