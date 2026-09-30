// URL do backend. Como o backend também serve esse frontend (mesma origem),
// dá pra usar caminho relativo mesmo.
const API_URL = "https://recicle-backend-production.up.railway.app/api/buscar-postos";

const form = document.getElementById("formBusca");
const selectMaterial = document.getElementById("material");
const selectRaio = document.getElementById("raio");
const inputCep = document.getElementById("cep");
const inputEmail = document.getElementById("email");
const btnBuscar = document.getElementById("btnBuscar");
const mensagemEl = document.getElementById("mensagem");
const resumoEl = document.getElementById("resumo");
const listaEl = document.getElementById("listaResultados");
const paginacaoEl = document.getElementById("paginacao");

let ultimaBusca = null; // guarda os dados da última busca pra poder paginar

// -----------------------------------------------------------------
// Popula o <select> de materiais a partir de materiais.js
// -----------------------------------------------------------------
function popularSelectMateriais() {
  MATERIAIS.forEach((grupo) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = grupo.grupo;

    grupo.itens.forEach((material) => {
      const option = document.createElement("option");
      option.value = `${material.item}|${material.itemcategoria}`;
      option.textContent = material.nome;
      optgroup.appendChild(option);
    });

    selectMaterial.appendChild(optgroup);
  });
}
popularSelectMateriais();

// -----------------------------------------------------------------
// Máscara simples de CEP (00000-000)
// -----------------------------------------------------------------
inputCep.addEventListener("input", () => {
  let v = inputCep.value.replace(/\D/g, "").slice(0, 8);
  if (v.length > 5) {
    v = v.slice(0, 5) + "-" + v.slice(5);
  }
  inputCep.value = v;
});

// -----------------------------------------------------------------
// Helpers de UI
// -----------------------------------------------------------------
function mostrarMensagem(texto, tipo = "carregando") {
  mensagemEl.textContent = texto;
  mensagemEl.className = `mensagem ${tipo}`;
  mensagemEl.hidden = false;
}

function esconderMensagem() {
  mensagemEl.hidden = true;
}

function limparResultados() {
  listaEl.innerHTML = "";
  resumoEl.hidden = true;
  paginacaoEl.hidden = true;
}

function renderizarResultados(dados) {
  const raioExibido = ultimaBusca?.raioMaxKm
    ? `${ultimaBusca.raioMaxKm} km`
    : dados.raioTexto;

  resumoEl.innerHTML = `
    Endereço buscado: <strong>${dados.endereco}</strong><br/>
    ${dados.postos.length} ponto(s) encontrado(s)
    ${raioExibido ? `em um raio de <strong>${raioExibido}</strong>` : ""}
  `;
  resumoEl.hidden = false;

  listaEl.innerHTML = "";

  if (!dados.postos || dados.postos.length === 0) {
    listaEl.innerHTML =
      "<li>Nenhum posto encontrado para esse material nesse raio. Tente aumentar a distância.</li>";
    return;
  }

  dados.postos.forEach((posto) => {
    const li = document.createElement("li");
    li.className = "item-resultado";
    li.innerHTML = `
      <div class="info">
        <h3>${posto.nome}</h3>
        <p>${posto.distancia ? `Distância: ${posto.distancia}` : ""}</p>
      </div>
      ${
        posto.link
          ? `<a class="ver-mais" href="${posto.link}" target="_blank" rel="noopener">Ver mais</a>`
          : ""
      }
    `;
    listaEl.appendChild(li);
  });

  renderizarPaginacao(dados.totalPaginas || 1);
}

function renderizarPaginacao(totalPaginas) {
  paginacaoEl.innerHTML = "";

  if (totalPaginas <= 1) {
    paginacaoEl.hidden = true;
    return;
  }

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === (ultimaBusca?.pagina || 1)) {
      btn.classList.add("ativo");
    }
    btn.addEventListener("click", () => buscar(i));
    paginacaoEl.appendChild(btn);
  }

  paginacaoEl.hidden = false;
}

// -----------------------------------------------------------------
// Requisição ao backend
// -----------------------------------------------------------------
async function buscar(pagina = 1) {
  const cep = inputCep.value.trim();
  const email = inputEmail.value.trim();
  const materialValor = selectMaterial.value;
  const raioMaxKm = selectRaio.value; // "" = sem filtro (padrão do site)

  if (!cep || !email || !materialValor) {
    mostrarMensagem("Preencha todos os campos antes de buscar.", "erro");
    return;
  }

  const [item, itemcategoria] = materialValor.split("|");

  ultimaBusca = { cep, email, item, itemcategoria, pagina, raioMaxKm };

  btnBuscar.disabled = true;
  limparResultados();
  mostrarMensagem("Buscando pontos de coleta perto de você...", "carregando");

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cep,
        item,
        itemcategoria,
        email,
        pagina,
        raioMaxKm: raioMaxKm || null,
      }),
    });

    const dados = await resp.json();

    if (!resp.ok) {
      throw new Error(dados.erro || "Erro ao buscar postos.");
    }

    esconderMensagem();
    renderizarResultados(dados);
  } catch (err) {
    mostrarMensagem(err.message, "erro");
  } finally {
    btnBuscar.disabled = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  buscar(1);
});
