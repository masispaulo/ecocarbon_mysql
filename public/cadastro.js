document.getElementById('cep').addEventListener('blur', async function () {
  let cep = this.value.replace(/\D/g, '');
  if (cep.length !== 8) return;
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();
    if (!dados.erro) {
      document.getElementById('cidade').value = dados.localidade || '';
      document.getElementById('estado').value = dados.uf || '';
      document.getElementById('endereco').value = dados.logradouro || '';
    }
  } catch {}
});

function medirForcaSenha(senha) {
  let forca = 0;
  if (senha.length >= 8) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[a-z]/.test(senha)) forca++;
  if (/\d/.test(senha)) forca++;
  if (/[\W_]/.test(senha)) forca++;
  if (senha.length > 12) forca++;
  if (forca <= 2) return "Senha fraca";
  if (forca <= 4) return "Senha média";
  return "Senha forte";
}

document.addEventListener('DOMContentLoaded', function () {
  const senha = document.getElementById('senha');
  const confirmaSenha = document.getElementById('confirmaSenha');
  const senhaForca = document.getElementById('senhaForca');
  const senhaConfere = document.getElementById('senhaConfere');

  // Olhinho de senha
  document.getElementById('toggleSenha').addEventListener('click', function () {
    const olhoAberto = document.getElementById('olhoSenhaAberto');
    const olhoFechado = document.getElementById('olhoSenhaFechado');
    if (senha.type === "password") {
      senha.type = "text";
      olhoFechado.style.display = "none";
      olhoAberto.style.display = "";
    } else {
      senha.type = "password";
      olhoFechado.style.display = "";
      olhoAberto.style.display = "none";
    }
  });
  document.getElementById('toggleConfirmaSenha').addEventListener('click', function () {
    const olhoAberto = document.getElementById('olhoConfirmaAberto');
    const olhoFechado = document.getElementById('olhoConfirmaFechado');
    if (confirmaSenha.type === "password") {
      confirmaSenha.type = "text";
      olhoFechado.style.display = "none";
      olhoAberto.style.display = "";
    } else {
      confirmaSenha.type = "password";
      olhoFechado.style.display = "";
      olhoAberto.style.display = "none";
    }
  });

  senha.addEventListener('input', function () {
    senhaForca.textContent = medirForcaSenha(senha.value);
    senhaForca.style.color = senha.value.length > 0 && medirForcaSenha(senha.value) === 'Senha forte' ? 'green' : (medirForcaSenha(senha.value) === 'Senha média' ? 'orange' : 'red');
  });

  confirmaSenha.addEventListener('input', function () {
    if (senha.value !== confirmaSenha.value) {
      senhaConfere.textContent = "As senhas não conferem";
      senhaConfere.style.color = "red";
    } else {
      senhaConfere.textContent = "Senhas conferem";
      senhaConfere.style.color = "green";
    }
  });

  document.getElementById('cadastroCooperado').addEventListener('submit', async function (e) {
    e.preventDefault();
    if (senha.value !== confirmaSenha.value) {
      senhaConfere.textContent = "As senhas não conferem";
      senhaConfere.style.color = "red";
      return;
    }
    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      whatsapp: document.getElementById('whatsapp').value,
      endereco: document.getElementById('endereco').value,
      cep: document.getElementById('cep').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value,
      profissao: document.getElementById('profissao').value,
      usuario: document.getElementById('usuario').value,
      senha: senha.value
    };

    try {
      const resp = await fetch('https://ecocarbon-mysql.onrender.com/api/cooperados/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      });
      const resultado = await resp.json();
      if (resp.ok) {
        document.getElementById('cadastroStatus').textContent = "Cadastro realizado com sucesso!";
        document.getElementById('cadastroStatus').style.color = "green";
        this.reset();
        senhaForca.textContent = '';
        senhaConfere.textContent = '';
      } else {
        document.getElementById('cadastroStatus').textContent = resultado.msg || resultado.error || "Erro ao cadastrar!";
        document.getElementById('cadastroStatus').style.color = "red";
      }
    } catch {
      document.getElementById('cadastroStatus').textContent = "Erro ao conectar ao servidor!";
      document.getElementById('cadastroStatus').style.color = "red";
    }
  });
});
