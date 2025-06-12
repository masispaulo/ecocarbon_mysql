const params = new URLSearchParams(window.location.search);
const token = params.get('token');

document.getElementById('resetForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const senha = document.getElementById('novaSenha').value;
  const confirma = document.getElementById('confirmaSenha').value;
  const status = document.getElementById('resetStatus');
  if (senha !== confirma) {
    status.textContent = "As senhas não conferem!";
    status.style.color = "red";
    return;
  }
  try {
    const resp = await fetch(`/api/auth/reset/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha })
    });
    const resultado = await resp.json();
    if (resp.ok) {
      status.textContent = "Senha redefinida! Faça login.";
      status.style.color = "green";
      setTimeout(() => { window.location.href = "login.html"; }, 1500);
    } else {
      status.textContent = resultado.msg || "Erro ao redefinir senha.";
      status.style.color = "red";
    }
  } catch {
    status.textContent = "Erro ao conectar ao servidor.";
    status.style.color = "red";
  }
});