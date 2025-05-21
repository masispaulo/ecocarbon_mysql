document.getElementById('loginFormCooperado')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login bem-sucedido!');
        window.location.href = 'transparencia.html';
      } else {
        const status = document.getElementById('loginStatus');
        status.textContent = data.message || 'Usuário ou senha inválidos!';
        status.style.color = 'red';
      }
    })
    .catch(err => {
      console.error('Erro ao fazer login:', err);
      const status = document.getElementById('loginStatus');
      status.textContent = 'Erro na comunicação com o servidor.';
      status.style.color = 'red';
    });
});
