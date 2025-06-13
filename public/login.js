// LOGIN
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
        // Redirecionar se quiser:
        // setTimeout(()=>{window.location.href="pagina-destino.html"}, 1000);
      } else {
        status.textContent = resultado.message || resultado.msg || "Usuário/e-mail ou senha inválidos.";
        status.style.color = "red";
      }
    } catch {
      status.textContent = "Erro ao conectar ao servidor.";
      status.style.color = "red";
    }
  });
  
// MODAL DE RECUPERAÇÃO DE SENHA
const modal = document.getElementById('modalRecuperar');
document.getElementById('linkEsqueci').onclick = function() { modal.style.display = "block"; }
document.getElementById('fecharModal').onclick = function() { modal.style.display = "none"; }

// RECUPERAR SENHA
document.getElementById('recuperarForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('recEmail').value;
  const status = document.getElementById('recStatus');
  try {
    const resp = await fetch('https://ecocarbon-mysql.onrender.com/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const resultado = await resp.json();
    if (resp.ok) {
      status.textContent = "Verifique seu e-mail!";
      status.style.color = "green";
    } else {
      status.textContent = resultado.message || resultado.msg || "E-mail não encontrado.";
      status.style.color = "red";
    }
  } catch {
    status.textContent = "Erro ao conectar ao servidor.";
    status.style.color = "red";
  }
});
// Sucesso no login
if (resp.ok) {
  window.location.href = "transparencia.html";
  return;
}