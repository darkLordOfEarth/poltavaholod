function initFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('data-cat');
  if (cat && tabFilters[cat]) {
    currentTab = cat;
    // Активуємо потрібний таб у розмітці
    $('.cat__tab').removeClass('active');
    $(`.cat__tab[data-cat="${cat}"]`).addClass('active');
  }
}

const products = [
  { id: 1, name: 'Хумус з грибами', img: 'images/humus.png', badge: null, filter: 'humus', subfilter: 'humus_gryby', },
  {
    id: 2,
    name: 'Хумус з томатами і базиліком',
    img: 'images/humus_2.png',
    badge: null,
    filter: 'humus_tomat',
  },
  { id: 3, name: 'Пельмені курячі', img: 'images/pelm_chiken.png', badge: null, filter: 'frozen', subfilter: 'pelmeny', },
  {
    id: 4,
    name: 'Вареники з печінкою та серцем',
    img: 'images/varen_pechin.png',
    badge: null,
    filter: 'frozen',
    subfilter: 'vareniky',
  },
  { id: 5, name: 'Хінкалі пікантні', img: 'images/hinkali_pic.png', badge: null, filter: 'frozen', subfilter: 'hinkaly', },
  {
    id: 6,
    name: 'Морозиво пломбір “перлина dubaj”',
    img: 'images/perl.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'stakanchyk',
  },
  {
    id: 7,
    name: 'Морозиво манго та малина “mango boom”',
    img: 'images/mango_boom.png',
    badge: 'без лактози',
    filter: 'icecream',
    subfilter: 'frukt',
  },
  {
    id: 8,
    name: 'Морозиво грейпфрут-смородина',
    img: 'images/grey.png',
    badge: 'без лактози',
    filter: 'icecream',
    subfilter: 'frukt',
  },
  {
    id: 9,
    name: 'Морозиво пломбір "Золота птаха',
    img: 'images/ptaha.png',
    badge: 'без лактози',
    filter: 'icecream',
    subfilter: 'eskimo',
  },
  {
    id: 10,
    name: 'Нагетси класичні смажені “годівниця”',
    img: 'images/naggetsy.png',
    badge: null,
    filter: 'napiv',
  },
  {
    id: 11,
    name: 'Стріпси курячі смажені “годівниця”',
    img: 'images/stripsy.png',
    badge: null,
    filter: 'napiv',
  },
  {
    id: 12,
    name: 'Закуска бутербродна з креветками',
    img: 'images/zakuska_krev.png',
    badge: null,
    filter: 'zakusky_krev',
  },
  {
    id: 13,
    name: 'Закуска бутербродна з грибами',
    img: 'images/zakuska_gryb.png',
    badge: null,
    filter: 'zakusky_gryb',
  },
  {
    id: 14,
    name: 'Закуска бутербродна зі смаком домашньої ковбаси',
    img: 'images/zakuska_kovb.png',
    badge: null,
    filter: 'zakusky_kovb',
  },
  {
    id: 15,
    name: 'Закуска бутербродна з бужениною',
    img: 'images/zakuska_buzh.png',
    badge: null,
    filter: 'zakusky_buzh',
  },
  {
    id: 16,
    name: 'Морозиво ескімо',
    img: 'images/no_image.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'eskimo',
  },
  {
    id: 17,
    name: 'Морозиво ріжок',
    img: 'images/no_image.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'rizhky',
  },
  {
    id: 18,
    name: 'Фруктовий лід',
    img: 'images/no_image.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'frukt',
  },
  {
    id: 19,
    name: 'Вафельний стаканчик',
    img: 'images/no_image.png',
    badge: 'Новинка',
    filter: 'icecream',
    subfilter: 'vafel',
  },
  {
    id: 20,
    name: 'Ескімо шоколадне',
    img: 'images/no_image.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'eskimo',
  },
  {
    id: 21,
    name: 'Вагове морозиво',
    img: 'images/no_image.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'vagove',
  },
  {
    id: 22,
    name: 'Морозиво у відерку',
    img: 'images/no_image.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'vidro',
  },
  {
    id: 23,
    name: 'Морозиво у лотку',
    img: 'images/no_image.png',
    badge: null,
    filter: 'icecream',
    subfilter: 'lotok',
  },
  { id: 24, name: 'Пельмені свинячі', img: 'images/no_image.png', badge: null, filter: 'frozen', subfilter: 'pelmeny', },
  {
    id: 25,
    name: 'Морозиво пломбір',
    img: 'images/no_image.png',
    badge: 'Новинка',
    filter: 'icecream',
    subfilter: 'rizhky',
  },
];

// Фільтри для кожного таба
const tabFilters = {
  all: [{ key: 'all', label: 'Всі продукти' }],
  icecream: [
    { key: 'all', label: 'Всі продукти' },
    { key: 'rizhky', label: 'Ріжки' },
    { key: 'frukt', label: 'Фруктовий лід' },
    { key: 'eskimo', label: 'Ескімо' },
    { key: 'vafel', label: 'Вафельний стаканчик' },
    { key: 'stakanchyk', label: 'Стаканчик' },
    { key: 'vagove', label: 'Вагове' },
    { key: 'vidro', label: 'У відерку' },
    { key: 'lotok', label: 'У лотку' },
  ],
  humus: [
    { key: 'all', label: 'Всі продукти' },
    { key: 'humus_gryby', label: 'З грибами' },
    { key: 'humus_tomat', label: 'З томатами' },
  ],
  zakusky: [
    { key: 'all', label: 'Всі продукти' },
    { key: 'zakusky', label: 'Бутербродні' },
    { key: 'zakusky', label: 'Бутербродні' },
  ],
  napiv: [
    { key: 'all', label: 'Всі продукти' },
    { key: 'napiv', label: 'Напівфабрикати' },
  ],
  frozen: [
    { key: 'all', label: 'Всі продукти' },
    { key: 'vareniky', label: 'Вареники' },
    { key: 'pelmeny', label: 'Пельмені' },
    { key: 'hinkaly', label: 'Хінкалі' },
  ],
};

const ITEMS_PER_PAGE = 15;
let currentPage = 1;
let currentTab = 'all';
let currentFilter = 'all';
let searchQuery = '';

// Возвращает товары подходящие под текущий таб (без учёта subfilter)
function getTabProducts(tab) {
  if (tab === 'all') return products;
  return products.filter((p) => p.filter === tab || p.filter.startsWith(tab));
}

function getFiltered() {
  return products.filter((p) => {
    const tabProducts = getTabProducts(currentTab);
    const matchTab = tabProducts.includes(p);

    let matchFilter;
    if (currentFilter === 'all') {
      matchFilter = true;
    } else if (p.subfilter) {
      // товар з підкатегорією — перевіряємо subfilter
      matchFilter = p.subfilter === currentFilter;
    } else {
      // товар без підкатегорії — перевіряємо filter
      matchFilter = p.filter === currentFilter;
    }

    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchFilter && matchSearch;
  });
}

function countForFilter(tab, filterKey) {
  if (filterKey === 'all') return getTabProducts(tab).length;
  return getTabProducts(tab).filter(
    (p) => (p.subfilter && p.subfilter === filterKey) || (!p.subfilter && p.filter === filterKey),
  ).length;
}

function renderFilters() {
  const filters = tabFilters[currentTab] || tabFilters['all'];
  const $aside = $('.filters');
  $aside.find('.filter-item').remove();

  filters.forEach((f) => {
    const count = countForFilter(currentTab, f.key);
    // Не показуємо фільтр якщо товарів 0 (крім "Всі продукти")
    if (f.key !== 'all' && count === 0) return;
    const countHtml = f.key !== 'all' ? ` <span class="filter-count">(${count})</span>` : '';
    const isActive = f.key === currentFilter ? ' active' : '';
    const btn = $(
      `<button class="filter-item${isActive}" data-filter="${f.key}">${f.label}${countHtml}</button>`,
    );
    btn.on('click', function () {
      $('.filter-item').removeClass('active');
      $(this).addClass('active');
      currentFilter = $(this).data('filter');
      currentPage = 1;
      renderGrid();
    });
    $aside.append(btn);
  });
}

function renderGrid() {
  const filtered = getFiltered();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  const $grid = $('#productGrid').empty();
  if (filtered.length === 0) {
    $grid.html(`
      <div class="no-results">
        <div class="no-results__icon">
          
        </div>
        <p class="no-results__title">За вашим запитом нічого не знайдено</p>
        <p class="no-results__subtitle">Можливо, ви шукали щось інше — спробуйте новий запит.</p>
      </div>
    `);
    $("#pagination").empty();
    return;
  }
  pageItems.forEach((p, i) => {
    const badgeHtml = p.badge ? `<span class="product-badge lactose">${p.badge}</span>` : '';
    const card = $(`
      <div class="product-card" style="animation-delay:${i * 0.04}s">
        <div class="product-img-wrap">
          ${badgeHtml}
          <div class="img-placeholder">
            ${p.img ? `<img src="${p.img}" alt="${p.name}">` : ``}
          </div>
        </div>
        <div class="product-name">${p.name}</div>
      </div>
    `);
    $grid.append(card);
  });

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const $pag = $('#pagination').empty();
  if (totalPages <= 1) return;

  const prev =
    $(`<button class="page-btn page-arrow page-arrow-prev"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
    <g clip-path="url(#clip0_378_1439)">
    <rect width="60" height="60" rx="30" fill="#CD7F23"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.0606 22.9395C34.3418 23.2208 34.4998 23.6022 34.4998 24C34.4998 24.3977 34.3418 24.7792 34.0606 25.0605L29.1211 30L34.0606 34.9395C34.2039 35.0779 34.3182 35.2434 34.3968 35.4264C34.4754 35.6094 34.5168 35.8062 34.5185 36.0054C34.5202 36.2046 34.4823 36.4021 34.4069 36.5864C34.3314 36.7708 34.2201 36.9382 34.0792 37.0791C33.9384 37.2199 33.7709 37.3313 33.5866 37.4067C33.4022 37.4821 33.2047 37.5201 33.0055 37.5184C32.8064 37.5166 32.6095 37.4753 32.4265 37.3966C32.2435 37.318 32.078 37.2037 31.9396 37.0605L25.9396 31.0605C25.6584 30.7792 25.5004 30.3977 25.5004 30C25.5004 29.6022 25.6584 29.2208 25.9396 28.9395L31.9396 22.9395C32.2209 22.6583 32.6024 22.5003 33.0001 22.5003C33.3979 22.5003 33.7793 22.6583 34.0606 22.9395Z" fill="#552914"/>
    </g>
    <defs><clipPath id="clip0_378_1439"><rect width="60" height="60" rx="30" fill="white"/></clipPath></defs>
  </svg></button>`).on('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderGrid();
      }
    });
  $pag.append(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = $(`<button class="page-btn${i === currentPage ? ' active' : ''}">${i}</button>`);
    btn.on('click', function () {
      currentPage = i;
      renderGrid();
    });
    $pag.append(btn);
  }

  const next =
    $(`<button class="page-btn page-arrow page-arrow-next"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
    <g clip-path="url(#clip0_378_1444)">
    <rect width="60" height="60" rx="30" transform="matrix(-1 0 0 1 60 0)" fill="#CD7F23"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9394 22.9395C25.6582 23.2208 25.5002 23.6022 25.5002 24C25.5002 24.3977 25.6582 24.7792 25.9394 25.0605L30.8789 30L25.9394 34.9395C25.7961 35.0779 25.6818 35.2434 25.6032 35.4264C25.5246 35.6094 25.4832 35.8062 25.4815 36.0054C25.4798 36.2046 25.5177 36.4021 25.5931 36.5864C25.6686 36.7708 25.7799 36.9382 25.9208 37.0791C26.0616 37.2199 26.2291 37.3313 26.4134 37.4067C26.5978 37.4821 26.7953 37.5201 26.9945 37.5184C27.1936 37.5166 27.3905 37.4753 27.5735 37.3966C27.7565 37.318 27.922 37.2037 28.0604 37.0605L34.0604 31.0605C34.3416 30.7792 34.4996 30.3977 34.4996 30C34.4996 29.6022 34.3416 29.2208 34.0604 28.9395L28.0604 22.9395C27.7791 22.6583 27.3976 22.5003 26.9999 22.5003C26.6021 22.5003 26.2207 22.6583 25.9394 22.9395Z" fill="#552914"/>
    </g>
    <defs><clipPath id="clip0_378_1444"><rect width="60" height="60" rx="30" transform="matrix(-1 0 0 1 60 0)" fill="white"/></clipPath></defs>
  </svg></button>`).on('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderGrid();
      }
    });
  $pag.append(next);
}

// Таби категорій
$('.cat__tab').on('click', function () {
  $('.cat__tab').removeClass('active');
  $(this).addClass('active');
  currentTab = $(this).data('cat');
  currentFilter = 'all'; // скидаємо фільтр при зміні таба
  currentPage = 1;
  renderFilters(); // перемальовуємо фільтри
  renderGrid();
});

// Пошук
$('#searchBtn').on('click', function () {
  searchQuery = $('#searchInput').val().trim();
  currentPage = 1;
  renderGrid();
});
$('#searchInput').on('keydown', function (e) {
  if (e.key === 'Enter') {
    $('#searchBtn').trigger('click');
  }
});
$('#searchInput').on('input', function () {
  if ($(this).val() === '') {
    searchQuery = '';
    renderGrid();
  }
});

// Ініціалізація
initFromUrl(); // ← додай цей рядок перед renderFilters()
renderFilters();
renderGrid();
