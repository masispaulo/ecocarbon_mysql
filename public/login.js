// LOGIN
document.getElementById('loginFormCooperado').addEventListener('submit', async function(e) {
    e.preventDefault();
    const usuario = document.getElementById('username').value;
    const senha = document.getElementById('password').value;
    const status = document.getElementById('loginStatus');
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      });
      const resultado = await resp.json();
      if (resp.ok) {
        status.textContent = "Login realizado!";
        status.style.color = "green";
        // Redirecionar se quiser:
        // setTimeout(()=>{window.location.href="pagina-destino.html"}, 1000);
      } else {
        status.textContent = resultado.msg || "Usuário ou senha inválidos.";
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
      const resp = await fetch('/api/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const resultado = await resp.json();
      if (resp.ok) {
        status.textContent = "Verifique seu e-mail!";
        status.style.color = "green";
      } else {
        status.textContent = resultado.msg || "E-mail não encontrado.";
        status.style.color = "red";
      }
    } catch {
      status.textContent = "Erro ao conectar ao servidor.";
      status.style.color = "red";
    }
  });