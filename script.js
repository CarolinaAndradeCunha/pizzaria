const produtos = {
  pizzas: [
    { nome: 'Pizza Vegetariana', preco: 35, img: 'https://www.shutterstock.com/shutterstock/photos/105950027/display_1500/stock-photo-pizza-vegetariana-105950027.jpg' },
    { nome: 'Pizza Margherita', preco: 30, img: 'https://www.shutterstock.com/shutterstock/photos/2449810755/display_1500/stock-photo-freshly-baked-margherita-pizza-with-basil-leaves-on-a-dark-textured-background-2449810755.jpg' },
    { nome: 'Pizza Pepperoni', preco: 40, img: 'https://www.shutterstock.com/shutterstock/photos/2476509605/display_1500/stock-photo-pizza-pepperoni-isolated-on-white-background-clipping-path-full-depth-of-field-2476509605.jpg' },
  ],
  bebidas: [
    { nome: 'Refrigerante', preco: 7, img: 'https://www.shutterstock.com/shutterstock/photos/2517636059/display_1500/stock-photo-woman-opening-white-cold-can-with-water-drops-against-blue-background-mockup-minimalistic-design-2517636059.jpg' },
    { nome: 'Suco Natural', preco: 10, img: 'https://www.shutterstock.com/shutterstock/photos/2319264123/display_1500/stock-photo-orange-juice-with-fresh-orange-in-in-wooden-crate-in-orange-farming-background-2319264123.jpg' },
    { nome: 'Água Mineral', preco: 5, img: 'https://www.shutterstock.com/shutterstock/photos/2485110637/display_1500/stock-photo-bottle-of-chilled-water-in-water-splash-conceptual-picture-of-refreshing-chilling-and-purity-2485110637.jpg' },
  ],
  sobremesas: [
    { nome: 'Pudim', preco: 12, img: 'https://www.shutterstock.com/shutterstock/photos/2515351685/display_1500/stock-photo-chocolate-pudding-with-mint-leaf-2515351685.jpg' },
    { nome: 'Sorvete', preco: 15, img: 'https://www.shutterstock.com/shutterstock/photos/2242973769/display_1500/stock-photo-box-of-strawberry-and-vanilla-ice-cream-top-view-2242973769.jpg' },
    { nome: 'Brownie', preco: 14, img: 'https://www.shutterstock.com/shutterstock/photos/602985842/display_1500/stock-photo-chocolate-brownie-cake-dessert-with-nuts-on-dark-background-directly-above-602985842.jpg' },
  ],
};

const btnNovoPedido = document.getElementById('btn-novo-pedido');
const btnAcompanhar = document.getElementById('btn-acompanhar');
const btnOlharCardapio = document.getElementById('btn-olhar-cardapio');

const sectionBoasVindas = document.querySelector('.boas-vindas');
const sectionCardapio = document.getElementById('cardapio');
const novoPedidoSection = document.getElementById('novo-pedido');
const acompanharPedidoSection = document.getElementById('acompanhar-pedido');

const navCategorias = document.getElementById('nav-categorias');
const cardsContainer = document.getElementById('cards-container');
const btnVoltarInicio = document.getElementById('btn-voltar-inicio');

const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const carrinhoDiv = document.getElementById('carrinho');

const inputCodigoPedido = document.getElementById('input-codigo-pedido');
const btnBuscarPedido = document.getElementById('btn-buscar-pedido');
const resultadoPedido = document.getElementById('resultado-pedido');

const btnFinalizarPedido = document.getElementById('btn-finalizar-pedido');

let categoriaAtual = 'pizzas';
let carrinhoItens = [];
let pedidos = {};

function mostrarSecao(secao) {
  sectionBoasVindas.style.display = secao === 'boasVindas' ? 'block' : 'none';
  sectionCardapio.style.display = secao === 'cardapio' ? 'block' : 'none';
  acompanharPedidoSection.style.display = secao === 'acompanharPedido' ? 'block' : 'none';
  novoPedidoSection.style.display = secao === 'novoPedido' ? 'block' : 'none';
}

function renderizarCards() {
  cardsContainer.innerHTML = '';

  produtos[categoriaAtual].forEach((produto, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${produto.img}" alt="${produto.nome}" class="card-img" />
      <div class="card-content">
        <h3 class="card-title">${produto.nome}</h3>
        <p class="card-preco">R$ ${produto.preco.toFixed(2)}</p>
        <button class="card-btn" data-index="${index}">Adicionar</button>
      </div>
    `;

    cardsContainer.appendChild(card);
  });

  document.querySelectorAll('.card-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      adicionarAoCarrinho(produtos[categoriaAtual][idx]);
    });
  });
}

function adicionarAoCarrinho(produto) {
  carrinhoItens.push(produto);
  alert(`Adicionado ${produto.nome} ao carrinho.`);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  if (carrinhoItens.length === 0) {
    carrinhoDiv.style.display = 'none';
    return;
  }

  carrinhoDiv.style.display = 'block';
  listaCarrinho.innerHTML = '';

  let total = 0;

  carrinhoItens.forEach((item, i) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.marginBottom = '8px';

    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.classList.add('btn-remover'); // Use CSS para estilizar

    btnRemover.addEventListener('click', () => {
      carrinhoItens.splice(i, 1);
      atualizarCarrinho();
    });

    li.appendChild(btnRemover);
    listaCarrinho.appendChild(li);

    total += item.preco;
  });

  totalCarrinho.textContent = total.toFixed(2);
}

function gerarCodigoPedido() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function finalizarPedido() {
  if (carrinhoItens.length === 0) {
    alert('Seu carrinho está vazio! Adicione itens antes de finalizar.');
    return;
  }

  const codigo = gerarCodigoPedido();
  pedidos[codigo] = {
    itens: [...carrinhoItens],
    status: 'Pedido recebido',
  };

  alert(`Pedido finalizado! Seu código de acompanhamento é: ${codigo}`);

  carrinhoItens = [];
  atualizarCarrinho();
  mostrarSecao('boasVindas');
}

function buscarPedido() {
  const codigo = inputCodigoPedido.value.trim();

  if (!codigo) {
    resultadoPedido.textContent = 'Digite um código válido.';
    return;
  }

  const pedido = pedidos[codigo];

  if (!pedido) {
    resultadoPedido.textContent = 'Pedido não encontrado.';
    return;
  }

  let texto = `Status do pedido: ${pedido.status}\nItens:\n`;

  pedido.itens.forEach(item => {
    texto += `- ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
  });

  resultadoPedido.textContent = texto;
}

navCategorias.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    navCategorias.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    categoriaAtual = btn.getAttribute('data-cat');
    renderizarCards();
  });
});

btnVoltarInicio.addEventListener('click', () => {
  mostrarSecao('boasVindas');
});

btnNovoPedido.addEventListener('click', () => {
  mostrarSecao('cardapio');
  renderizarCards();
});

btnOlharCardapio.addEventListener('click', () => {
  mostrarSecao('cardapio');
  renderizarCards();
});

btnAcompanhar.addEventListener('click', () => {
  mostrarSecao('acompanharPedido');
  resultadoPedido.textContent = '';
  inputCodigoPedido.value = '';
});

btnFinalizarPedido.addEventListener('click', finalizarPedido);

btnBuscarPedido.addEventListener('click', buscarPedido);

mostrarSecao('boasVindas');
