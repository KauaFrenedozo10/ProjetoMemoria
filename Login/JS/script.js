document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("usernameInput").value.trim();
        const senha = document.getElementById("senhaInput").value.trim();

        if (!username || !senha) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos obrigatórios',
                text: 'Preencha o username e a senha.'
            });
            return;
        }

        const loginDTO = {
            username: username,
            senha: senha
        };

        try {
            const response = await axios.post("http://10.110.12.50:5000/jogador/login", loginDTO, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            
            const jogador = response.data;

            Swal.fire({
                icon: 'success',
                title: 'Login bem-sucedido!',
                text: `Bem-vindo, ${jogador.username || 'Jogador'}!`,
                timer: 2000,
                showConfirmButton: false
            });

            
            setTimeout(() => {
                window.location.href = ""; 
            }, 2000);

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Falha no login',
                text: 'Usuário ou senha inválidos.'
            });
        }
    });
});
