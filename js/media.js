const form = document.querySelector("#boletim");
const erro = document.querySelector("#erro");
const resultado = document.querySelector("#resultado");
const aluno = document.querySelector("#aluno");
const mediaEl = document.querySelector("#media");
const situacao = document.querySelector("#situacao");

document.querySelectorAll(".nota").forEach((input) => {
  input.addEventListener("input", () => limitarNota(input));
  input.addEventListener("change", () => limitarNota(input));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  erro.hidden = true;
  resultado.hidden = true;

  const nome = document.querySelector("#nome").value.trim();
  const notas = [...document.querySelectorAll(".nota")].map((input) => Number(input.value));

  if (!nome) {
    mostrarErro("Informe o nome do aluno.");
    return;
  }

  if (notas.some((nota) => Number.isNaN(nota) || nota < 0 || nota > 10)) {
    mostrarErro("Cada nota precisa ser um número entre 0 e 10.");
    return;
  }

  const media = notas.reduce((soma, nota) => soma + nota, 0) / notas.length;
  const status = classificar(media);

  aluno.textContent = nome;
  mediaEl.textContent = media.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  situacao.textContent = status.texto;
  situacao.className = `situacao ${status.classe}`;
  resultado.hidden = false;
});

function classificar(media) {
  if (media > 7) {
    return { texto: "Aprovado", classe: "aprovado" };
  }
  if (media >= 4) {
    return { texto: "Recuperação", classe: "recuperacao" };
  }
  return { texto: "Reprovado", classe: "reprovado" };
}

function limitarNota(input) {
  if (input.value === "") {
    return;
  }

  const nota = Number(input.value);
  if (Number.isNaN(nota) || nota < 0) {
    input.value = "0";
    return;
  }
  if (nota > 10) {
    input.value = "10";
  }
}

function mostrarErro(mensagem) {
  erro.textContent = mensagem;
  erro.hidden = false;
}
