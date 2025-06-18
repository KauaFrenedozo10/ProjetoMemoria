document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('usernameInput').value.trim();
    const senha = document.getElementById('senhaInput').value.trim();

    if (!username || !senha) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Preencha o username e a senha.',
      });
      return;
    }

    const loginDTO = {
      username: username,
      senha: senha,
    };

    try {
      const response = await axios.post(
        'http://192.168.56.1:8080/jogadores/login',
        loginDTO,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const jogador = response.data;

      Swal.fire({
        icon: 'success',
        title: 'Login bem-sucedido!',
        text: `Bem-vindo, ${jogador.username || 'Jogador'}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        const nextPageURL = `pages/jogo.html?username=${encodeURIComponent(
          jogador.username
        )}`;
        window.location.href = nextPageURL;
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro no login',
        text:
          error.response?.data?.message ||
          'Ocorreu um erro ao tentar fazer login.',
      });
    }
  });
});
