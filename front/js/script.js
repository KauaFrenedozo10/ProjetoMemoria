let usernameGlobal = null;
let listaDeNumerosSortidos = [];
let listaDeNumerosUsuario = [];
let nivelAtual = 1;
let score = 0;

const scoreboardListDiv = document.getElementById('scoreboardList');

async function carregarPlacar() {
  try {
    const response = await axios.get(
      'http://192.168.56.1:8080/jogadores/scoreboard'
    );
    const jogadoresNoPlacar = response.data;

    scoreboardListDiv.innerHTML = '';

    if (jogadoresNoPlacar && jogadoresNoPlacar.length > 0) {
      const ol = document.createElement('ol');
      jogadoresNoPlacar.forEach((jogador, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${jogador.username}</span>: <span>${jogador.pontuacao}</span> pontos`;
        ol.appendChild(li);
      });
      scoreboardListDiv.appendChild(ol);
    } else {
      const t = document.createElement('p');
      t.textContent = 'Nenhum jogador no placar ainda.';
      scoreboardListDiv.appendChild(t);
    }
  } catch (error) {
    console.error(
      'Erro ao carregar o placar:',
      error.response?.data || error.message
    );
    const t = document.createElement('p');
    t.className = 'error';
    t.textContent = 'Erro ao carregar placar.';
    scoreboardListDiv.innerHTML = '';
    scoreboardListDiv.appendChild(t);
  }
}

function iniciar() {
  listaDeNumerosSortidos = [];
  listaDeNumerosUsuario = [];
  nivelAtual = 1;
  score = 0;
  atualizarNivel();
  atualizarScore();
  desabilitarClicks();
  mostrarSequencia(0);
}

function atualizarNivel() {
  const levelSpan = document.getElementById('levelNumero');
  levelSpan.innerText = nivelAtual;
}

function atualizarScore() {
  const scoreSpan = document.querySelector('.score span');
  scoreSpan.innerText = score;
}

function randomizar() {
  return Math.floor(Math.random() * 4) + 1;
}

function mostrarSequencia(index) {
  if (index === 0) {
    listaDeNumerosSortidos.push(randomizar());
  }

  if (index >= listaDeNumerosSortidos.length) {
    habilitarClicks();
    return;
  }

  let cores = {
    1: 'red',
    2: 'blue',
    3: 'green',
    4: 'yellow',
  };

  let corSorteada = cores[listaDeNumerosSortidos[index]];
  let div = document.querySelector(`.section.${corSorteada}`);

  if (div) {
    div.classList.add('active');
    setTimeout(() => {
      div.classList.remove('active');
      setTimeout(() => mostrarSequencia(index + 1), 200);
    }, 350);
  }
}

function habilitarClicks() {
  document.querySelectorAll('.section').forEach((div) => {
    div.addEventListener('click', registrarClique);
  });
}

function desabilitarClicks() {
  document.querySelectorAll('.section').forEach((div) => {
    div.removeEventListener('click', registrarClique);
  });
}

function registrarClique(e) {
  let cor = e.target.classList[1];
  let cores = {
    red: 1,
    blue: 2,
    green: 3,
    yellow: 4,
  };
  let numero = cores[cor];
  listaDeNumerosUsuario.push(numero);

  e.target.classList.add('active');
  setTimeout(() => e.target.classList.remove('active'), 300);

  checarInputUsuario();
}

async function checarInputUsuario() {
  let i = listaDeNumerosUsuario.length - 1;

  if (listaDeNumerosUsuario[i] !== listaDeNumerosSortidos[i]) {
    desabilitarClicks();

    if (usernameGlobal) {
      try {
        await axios.patch(
          `http://192.168.56.1:8080/jogadores/${usernameGlobal}/pontuacao`,
          score,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.error(
          `Erro ao atualizar pontuação para ${usernameGlobal}:`,
          error.response?.data || error.message
        );
      }
    }

    carregarPlacar();

    const nomesCores = {
      1: 'Vermelho',
      2: 'Azul',
      3: 'Verde',
      4: 'Amarelo',
    };

    const sequenciaCores = listaDeNumerosSortidos
      .map((n) => nomesCores[n])
      .join(', ');

    Swal.fire({
      icon: 'error',
      title: 'Você errou!',
      text: 'A sequência correta era: ' + sequenciaCores,
      confirmButtonText: 'Tentar novamente',
      focusConfirm: false,
      backdrop: 'rgba(0,0,0,0.5)',
      heightAuto: false,
      didOpen: () => {
        document.body.style.overflow = 'visible';
        document.body.style.position = 'static';
      },
      willClose: () => {
        document.body.style.overflow = 'hidden';
      },
    }).then(() => {
      setTimeout(() => {
        iniciar();
      }, 1000);
    });
    return;
  }

  if (listaDeNumerosUsuario.length === listaDeNumerosSortidos.length) {
    desabilitarClicks();

    if (nivelAtual >= 50) {
        Swal.fire({
            icon: 'success',
            title: 'Parabéns!',
            text: 'Você completou as 50 rodadas!',
            confirmButtonText: 'Reiniciar',
            focusConfirm: false,
            backdrop: 'rgba(0,0,0,0.5)',
            heightAuto: false,
            didOpen: () => {
                document.body.style.overflow = 'visible';
                document.body.style.position = 'static';
            },
            willClose: () => {
                document.body.style.overflow = 'hidden';
            },
        }).then(() => {
            iniciar(); 
        });
        return;
    }

    nivelAtual++;
    score += 5;
    atualizarNivel();
    atualizarScore();

    listaDeNumerosUsuario = [];

    setTimeout(() => mostrarSequencia(0), 800);
  }
}

function configurar() {
  let btnInicio = document.getElementById('btnInicio');
  if (btnInicio) {
    btnInicio.addEventListener('click', iniciar);
  }
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  carregarPlacar();

  if (username) {
    usernameGlobal = username;
    console.log('Bem-vindo ao jogo, ' + username + '!');
  } else {
    console.log('Username não encontrado na URL.');
  }
}

document.addEventListener('DOMContentLoaded', configurar);
