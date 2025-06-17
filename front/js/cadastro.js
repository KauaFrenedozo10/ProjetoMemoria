document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("usernameInput").value.trim();
            const senha = document.getElementById("senhaInput").value.trim();

            if (!username || !senha) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos obrigatórios',
                    text: 'Por favor, preencha todos os campos.'
                });
                return;
            }

            if (senha.length < 6) {
                Swal.fire({
                    icon: 'error',
                    title: 'Senha muito curta',
                    text: 'A senha deve ter no mínimo 6 caracteres.'
                });
                return;
            }

            const jogadorDTO = {
                username: username,
                senha: senha
            };

            try {
                const response = await axios.post("http://10.110.12.50:5000/jogador/post", jogadorDTO, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Cadastro realizado!',
                    text: 'Jogador cadastrado com sucesso.'
                });

                console.log(response.data);
                form.reset();
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao cadastrar',
                    text: 'Verifique os dados e tente novamente.'
                });
            }
        });
    }
});
