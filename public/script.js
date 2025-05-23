// Cadastro de usuário
document.getElementById('registerFormCooperado')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;

  fetch('https://ecocarbon-mysql.onrender.com/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      const status = document.getElementById('registerStatus');
      if (data.message) {
        status.textContent = data.message;
        status.style.color = 'green';
        alert('Cadastro realizado com sucesso!');
      } else {
        status.textContent = data.error || 'Erro ao cadastrar!';
        status.style.color = 'red';
      }
    })
    .catch(err => {
      console.error('Erro ao cadastrar:', err);
      const status = document.getElementById('registerStatus');
      status.textContent = 'Erro na comunicação com o servidor.';
      status.style.color = 'red';
    });
});

// Login de usuário
document.getElementById('loginFormCooperado')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('https://ecocarbon-mysql.onrender.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      const status = document.getElementById('loginStatus');
      if (data.token) {
        localStorage.setItem('token', data.token);
        status.textContent = 'Login bem-sucedido!';
        status.style.color = 'green';
        alert('Login bem-sucedido!');
        window.location.href = 'transparencia.html';
      } else {
        status.textContent = data.error || 'Usuário ou senha inválidos!';
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