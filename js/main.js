function iniciarMenu() {
    var toggle = document.getElementById('menu-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('aberto');
        navMenu.classList.toggle('aberto');
    });

    var links = navMenu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function () {
            toggle.classList.remove('aberto');
            navMenu.classList.remove('aberto');
        });
    }
}

function marcarLinkAtivo() {
    var pagina = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('nav ul li a');
    for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (href === pagina) {
            links[i].classList.add('ativo');
        }
    }
}

function iniciarFaq() {
    var perguntas = document.querySelectorAll('.faq-pergunta');
    if (perguntas.length === 0) return;

    for (var i = 0; i < perguntas.length; i++) {
        perguntas[i].addEventListener('click', function () {
            var resposta = this.nextElementSibling;
            var estaAberto = this.classList.contains('aberto');

            var todasPerguntas = document.querySelectorAll('.faq-pergunta');
            var todasRespostas = document.querySelectorAll('.faq-resposta');
            for (var j = 0; j < todasPerguntas.length; j++) {
                todasPerguntas[j].classList.remove('aberto');
                todasRespostas[j].classList.remove('visivel');
            }

            if (!estaAberto) {
                this.classList.add('aberto');
                resposta.classList.add('visivel');
            }
        });
    }
}

function iniciarFormulario() {
    var form = document.getElementById('form-contato');
    if (!form) return;

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();
        var valido = true;

        var campos = form.querySelectorAll('input, textarea, select');
        for (var i = 0; i < campos.length; i++) {
            campos[i].classList.remove('erro');
        }
        var erros = form.querySelectorAll('.msg-erro');
        for (var i = 0; i < erros.length; i++) {
            erros[i].classList.remove('visivel');
        }

        var nome = document.getElementById('nome');
        if (!nome || nome.value.trim().length < 3) {
            mostrarErro(nome, 'erro-nome', 'Digite seu nome completo.');
            valido = false;
        }

        var email = document.getElementById('email');
        if (!email || !validarEmail(email.value)) {
            mostrarErro(email, 'erro-email', 'Digite um e-mail valido.');
            valido = false;
        }

        var mensagem = document.getElementById('mensagem');
        if (!mensagem || mensagem.value.trim().length < 10) {
            mostrarErro(mensagem, 'erro-mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
            valido = false;
        }

        if (valido) {
            var sucesso = document.getElementById('form-sucesso');
            if (sucesso) {
                form.reset();
                sucesso.classList.add('visivel');
                setTimeout(function () {
                    sucesso.classList.remove('visivel');
                }, 4000);
            }
        }
    });
}

function mostrarErro(campo, idErro, mensagem) {
    if (campo) {
        campo.classList.add('erro');
    }
    var divErro = document.getElementById(idErro);
    if (divErro) {
        divErro.textContent = mensagem;
        divErro.classList.add('visivel');
    }
}

function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function iniciarFiltroAlertas() {
    var select = document.getElementById('filtro-nivel');
    if (!select) return;

    select.addEventListener('change', function () {
        var nivel = this.value;
        var cards = document.querySelectorAll('.alerta-card');

        for (var i = 0; i < cards.length; i++) {
            if (nivel === 'todos' || cards[i].classList.contains(nivel)) {
                cards[i].style.display = 'flex';
            } else {
                cards[i].style.display = 'none';
            }
        }
    });
}

function iniciarSimulador() {
    var form = document.getElementById('form-simulador');
    if (!form) return;

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var prob = parseInt(document.getElementById('sim-probabilidade').value);
        var dias = parseInt(document.getElementById('sim-dias').value);
        var tipo = document.getElementById('sim-tipo').value;
        var resultado = document.getElementById('sim-resultado');

        if (isNaN(prob) || prob < 0 || prob > 100) {
            alert('Digite uma probabilidade entre 0 e 100.');
            return;
        }
        if (isNaN(dias) || dias < 1 || dias > 30) {
            alert('Digite um numero de dias entre 1 e 30.');
            return;
        }

        var nivel = calcularNivel(prob, dias);
        var recomendacao = gerarRecomendacao(tipo);

        resultado.innerHTML =
            '<h3>Resultado da Simulacao</h3>' +
            '<p><strong>Tipo:</strong> ' + tipo + '</p>' +
            '<p><strong>Probabilidade:</strong> ' + prob + '%</p>' +
            '<p><strong>Antecedencia:</strong> ' + dias + ' dias</p>' +
            '<p><strong>Nivel de risco:</strong> <span class="badge badge-' + nivel.toLowerCase() + '">' + nivel + '</span></p>' +
            '<p><strong>Recomendacao:</strong> ' + recomendacao + '</p>';

        resultado.style.display = 'block';
    });
}

function calcularNivel(probabilidade, dias) {
    if (probabilidade >= 85 && dias >= 5) {
        return 'CRITICO';
    } else if (probabilidade >= 70) {
        return 'ALTO';
    } else if (probabilidade >= 50) {
        return 'MODERADO';
    } else {
        return 'BAIXO';
    }
}

function gerarRecomendacao(tipo) {
    var recomendacoes = {
        'Enchente':          'Evite areas proximas a rios. Tenha kit de emergencia pronto.',
        'Chuva Extrema':     'Evite areas de encosta. Fique em local seguro e elevado.',
        'Seca Prolongada':   'Reforce reservas de agua. Antecipe a colheita se possivel.',
        'Tempestade Severa': 'Evite areas abertas. Desligue aparelhos eletronicos.',
        'Deslizamento':      'Afaste-se de encostas. Acione a defesa civil da sua cidade.'
    };
    return recomendacoes[tipo] || 'Fique atento aos comunicados da defesa civil local.';
}

document.addEventListener('DOMContentLoaded', function () {
    iniciarMenu();
    marcarLinkAtivo();
    iniciarFaq();
    iniciarFormulario();
    iniciarFiltroAlertas();
    iniciarSimulador();
});
