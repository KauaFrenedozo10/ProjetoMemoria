let listaDeNumerosSortidos = [];
let listaDeNumerosUsuario = [];
let nivelAtual = 1;
let score = 0;

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
        4: 'yellow'
    };

    let corSorteada = cores[listaDeNumerosSortidos[index]];
    let div = document.querySelector(`.section.${corSorteada}`);

    if (div) {
        div.classList.add('active');
        setTimeout(() => {
            div.classList.remove('active');
            setTimeout(() => mostrarSequencia(index + 1), 500);
        }, 600);
    }
}

function habilitarClicks() {
    document.querySelectorAll('.section').forEach(div => {
        div.addEventListener('click', registrarClique);
    });
}

function desabilitarClicks() {
    document.querySelectorAll('.section').forEach(div => {
        div.removeEventListener('click', registrarClique);
    });
}

function registrarClique(e) {
    let cor = e.target.classList[1];
    let cores = {
        'red': 1,
        'blue': 2,
        'green': 3,
        'yellow': 4
    };
    let numero = cores[cor];
    listaDeNumerosUsuario.push(numero);

    e.target.classList.add('active');
    setTimeout(() => e.target.classList.remove('active'), 300);

    checarInputUsuario();
}

function checarInputUsuario() {
    let i = listaDeNumerosUsuario.length - 1;

    if (listaDeNumerosUsuario[i] !== listaDeNumerosSortidos[i]) {
        desabilitarClicks();

        const nomesCores = {
            1: 'Vermelho',
            2: 'Azul',
            3: 'Verde',
            4: 'Amarelo'
        };

        const sequenciaCores = listaDeNumerosSortidos.map(n => nomesCores[n]).join(', ');

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
        }
        }).then(() => {
            setTimeout(() => {
            iniciar();
        }, 1000); 
    });
        return;
}

    if (listaDeNumerosUsuario.length === listaDeNumerosSortidos.length) {
        desabilitarClicks();

        nivelAtual++;
        score += 5;
        atualizarNivel();
        atualizarScore();

        listaDeNumerosUsuario = [];

        setTimeout(() => mostrarSequencia(0), 1500);
    }
}

function configurar() {
    let btnInicio = document.getElementById('btnInicio');
    if (btnInicio) {
        btnInicio.addEventListener('click', iniciar);
    }
}

document.addEventListener('DOMContentLoaded', configurar);
