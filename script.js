const formulario = document.querySelector('#formulario-notas');
const camposNota = [...document.querySelectorAll('input[type="number"]')];
const visorMedia = document.querySelector('#visor-media');
const visorStatus = document.querySelector('#visor-status');
const statusAluno = document.querySelector('#status-aluno');
const detalheStatus = document.querySelector('#detalhe-status');
const mensagemErro = document.querySelector('#mensagem-erro');
const botaoLimpar = document.querySelector('#botao-limpar');

function obterNotas() {
  return camposNota.map((campo) => Number(campo.value));
}

function validarNotas(notas) {
  let campoInvalido = null;

  camposNota.forEach((campo, indice) => {
    const notaValida = campo.value !== '' && Number.isFinite(notas[indice]) && notas[indice] >= 0 && notas[indice] <= 10;
    campo.classList.toggle('invalido', !notaValida);

    if (!notaValida && !campoInvalido) {
      campoInvalido = campo;
    }
  });

  if (campoInvalido) {
    mensagemErro.textContent = 'Digite todas as notas com valores entre 0 e 10.';
    campoInvalido.focus();
    return false;
  }

  mensagemErro.textContent = '';
  return true;
}

function exibirResultado(media) {
  const mediaFormatada = media.toFixed(1).replace('.', ',');
  visorMedia.textContent = mediaFormatada;
  visorStatus.classList.remove('status-aprovado', 'status-recuperacao', 'status-reprovado');

  if (media >= 6) {
    statusAluno.textContent = 'Aprovado';
    detalheStatus.textContent = 'Parabéns! O aluno atingiu a média mínima.';
    visorStatus.classList.add('status-aprovado');
  } else if (media >= 4) {
    statusAluno.textContent = 'Em recuperação';
    detalheStatus.textContent = 'O aluno precisa fazer a recuperação.';
    visorStatus.classList.add('status-recuperacao');
  } else {
    statusAluno.textContent = 'Reprovado';
    detalheStatus.textContent = 'A média ficou abaixo do mínimo necessário.';
    visorStatus.classList.add('status-reprovado');
  }
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const notas = obterNotas();
  if (!validarNotas(notas)) {
    return;
  }

  const media = notas.reduce((total, nota) => total + nota, 0) / notas.length;
  exibirResultado(media);
});

camposNota.forEach((campo) => {
  campo.addEventListener('input', () => {
    campo.classList.remove('invalido');
    mensagemErro.textContent = '';
  });
});

botaoLimpar.addEventListener('click', () => {
  camposNota.forEach((campo) => campo.classList.remove('invalido'));
  mensagemErro.textContent = '';
  visorMedia.textContent = '--';
  statusAluno.textContent = 'Aguardando notas';
  detalheStatus.textContent = 'Preencha os campos acima.';
  visorStatus.classList.remove('status-aprovado', 'status-recuperacao', 'status-reprovado');
});
