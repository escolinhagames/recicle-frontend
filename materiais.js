// Lista de materiais extraída da estrutura do eCycle (item = categoria pai,
// itemcategoria = subcategoria específica). Agrupados por categoria pra ficar
// fácil de navegar no <select>.
const MATERIAIS = [
  {
    grupo: "Construção e Demolição",
    itens: [
      { nome: "Amianto", item: 1, itemcategoria: 1 },
      { nome: "Cerâmicas", item: 1, itemcategoria: 113 },
      { nome: "Entulhos", item: 1, itemcategoria: 3 },
      { nome: "Fios e cabos elétricos", item: 1, itemcategoria: 114 },
      { nome: "Madeiras", item: 1, itemcategoria: 4 },
      { nome: "Tijolos", item: 1, itemcategoria: 5 },
    ],
  },
  {
    grupo: "Eletrônicos",
    itens: [
      { nome: "Celulares", item: 4, itemcategoria: 151 },
      { nome: "Computadores", item: 4, itemcategoria: 17 },
      { nome: "Impressoras", item: 4, itemcategoria: 18 },
      { nome: "Monitores LED", item: 4, itemcategoria: 196 },
      { nome: "Televisores de LCD/LED/Plasma", item: 4, itemcategoria: 146 },
      { nome: "Videogames", item: 4, itemcategoria: 149 },
    ],
  },
  {
    grupo: "Eletrodomésticos",
    itens: [
      { nome: "Geladeiras", item: 3, itemcategoria: 13 },
      { nome: "Máquinas lavadoras de roupas", item: 3, itemcategoria: 15 },
      { nome: "Fornos de microondas", item: 3, itemcategoria: 191 },
      { nome: "Ferros de passar roupa", item: 3, itemcategoria: 132 },
    ],
  },
  {
    grupo: "Pilhas e Baterias",
    itens: [
      { nome: "Baterias de celular", item: 10, itemcategoria: 179 },
      { nome: "Pilhas portáteis", item: 10, itemcategoria: 161 },
    ],
  },
  {
    grupo: "Lâmpadas",
    itens: [
      { nome: "Lâmpadas Fluorescentes", item: 5, itemcategoria: 26 },
      { nome: "Lâmpadas Incandescentes", item: 5, itemcategoria: 28 },
    ],
  },
  {
    grupo: "Vidro",
    itens: [
      { nome: "Garrafas de vidro", item: 15, itemcategoria: 105 },
      { nome: "Vidros de Janela", item: 15, itemcategoria: 106 },
      { nome: "Espelhos", item: 15, itemcategoria: 174 },
    ],
  },
  {
    grupo: "Papel e Papelão",
    itens: [
      { nome: "Caixas de papelão", item: 9, itemcategoria: 49 },
      { nome: "Jornais", item: 9, itemcategoria: 53 },
      { nome: "Livros", item: 9, itemcategoria: 55 },
      { nome: "Revistas", item: 9, itemcategoria: 59 },
    ],
  },
  {
    grupo: "Plástico",
    itens: [
      { nome: "Garrafas plásticas - PET", item: 11, itemcategoria: 83 },
      { nome: "Sacolas - supermercado", item: 11, itemcategoria: 169 },
      { nome: "Isopor", item: 11, itemcategoria: 85 },
    ],
  },
  {
    grupo: "Metais",
    itens: [
      { nome: "Lata de aluminio", item: 8, itemcategoria: 43 },
      { nome: "Panelas", item: 8, itemcategoria: 157 },
    ],
  },
  {
    grupo: "Vestuário",
    itens: [
      { nome: "Roupas", item: 14, itemcategoria: 173 },
      { nome: "Calçados", item: 14, itemcategoria: 103 },
    ],
  },
  {
    grupo: "Veículos",
    itens: [
      { nome: "Baterias Automotivas", item: 13, itemcategoria: 172 },
      { nome: "Óleos automotivos", item: 13, itemcategoria: 99 },
      { nome: "Pneus", item: 13, itemcategoria: 100 },
    ],
  },
  {
    grupo: "Remédios",
    itens: [{ nome: "Medicamentos", item: 19, itemcategoria: 33 }],
  },
  {
    grupo: "Óleos",
    itens: [{ nome: "Óleos de cozinha", item: 17, itemcategoria: 108 }],
  },
  {
    grupo: "Móveis",
    itens: [
      { nome: "Móveis de madeira", item: 16, itemcategoria: 107 },
      { nome: "Móveis de metal", item: 16, itemcategoria: 193 },
    ],
  },
];
