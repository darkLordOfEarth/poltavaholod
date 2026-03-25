const products = [
  { id:1, name:"Хумус з грибами", emoji:"🍄", color:"#f5e8c8", badge:null, filter:"all" },
  { id:2, name:"Хумус з томатами і б...", emoji:"🍅", color:"#fde0c8", badge:null, filter:"all" },
  { id:3, name:"Пельмені курячі", emoji:"🥟", color:"#dce8f5", badge:null, filter:"all" },
  { id:4, name:"Вареники з печінко...", emoji:"🫔", color:"#dce8f5", badge:null, filter:"frozen" },
  { id:5, name:"Вареники з печінко...", emoji:"🫔", color:"#d8f0dc", badge:null, filter:"frozen" },
  { id:6, name:'Морозиво пломбір "...', emoji:"🍦", color:"#f5e8c8", badge:null, filter:"stakanchyk" },
  { id:7, name:"Морозиво манго та...", emoji:"🥭", color:"#fde8b8", badge:"без лактози", filter:"frukt" },
  { id:8, name:"Морозиво манго та...", emoji:"🫐", color:"#eed8f5", badge:"без лактози", filter:"frukt" },
  { id:9, name:'Морозиво пломбір "З...', emoji:"🍫", color:"#3a2010", badgeText:"#fff", badge:"без лактози", filter:"eskimo" },
  { id:10, name:"Нагетси класичні см...", emoji:"🍗", color:"#e8f0d8", badge:null, filter:"napiv" },
  { id:11, name:"Стріпси курячі смаже...", emoji:"🍟", color:"#fde8b0", badge:null, filter:"napiv" },
  { id:12, name:"Закуска бутербродн...", emoji:"🦐", color:"#dce8f5", badge:null, filter:"zakusky" },
  { id:13, name:"Закуска бутербродн...", emoji:"🧅", color:"#f5f0d8", badge:null, filter:"zakusky" },
  { id:14, name:"Закуска бутербродн...", emoji:"🍄", color:"#d8f0dc", badge:null, filter:"zakusky" },
  { id:15, name:"Закуска бутербродн...", emoji:"🥩", color:"#f5e0d0", badge:null, filter:"zakusky" },
  { id:16, name:"Морозиво ескімо", emoji:"🍦", color:"#dce8f5", badge:null, filter:"eskimo" },
  { id:17, name:"Морозиво ріжок", emoji:"🍨", color:"#fde8c8", badge:null, filter:"rizhky" },
  { id:18, name:"Фруктовий лід", emoji:"🧊", color:"#d0f0ff", badge:null, filter:"frukt" },
  { id:19, name:"Вафельний стаканчик", emoji:"🧇", color:"#f5e8c0", badge:"Новинка", filter:"vafel" },
  { id:20, name:"Ескімо шоколадне", emoji:"🍫", color:"#e0d0c8", badge:null, filter:"eskimo" },
  { id:21, name:"Вагове морозиво", emoji:"⚖️", color:"#f0ece0", badge:null, filter:"vagove" },
  { id:22, name:"Морозиво у відерку", emoji:"🪣", color:"#d8e8f8", badge:null, filter:"vidro" },
  { id:23, name:"Морозиво у лотку", emoji:"📦", color:"#f0f0d8", badge:null, filter:"lotok" },
  { id:24, name:"Пельмені свинячі", emoji:"🥟", color:"#f5d8d8", badge:null, filter:"frozen" },
  { id:25, name:"Морозиво пломбір", emoji:"🍧", color:"#fde8f0", badge:"Новинка", filter:"stakanchyk" },
];
 
const ITEMS_PER_PAGE = 15;
let currentPage = 1;
let currentFilter = "all";
let searchQuery = "";
 
function getFiltered() {
  return products.filter(p => {
    const matchFilter = currentFilter === "all" || p.filter === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });
}
 
function renderGrid() {
  const filtered = getFiltered();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);
 
  const $grid = $("#productGrid").empty();
  pageItems.forEach((p, i) => {
    const badgeHtml = p.badge
      ? `<span class="product-badge lactose">${p.badge}</span>`
      : "";
    const card = $(`
      <div class="product-card" style="animation-delay:${i * 0.04}s">
        <div class="product-img-wrap">
          ${badgeHtml}
          <div class="img-placeholder" style="background:${p.color}; font-size:52px;">${p.emoji}</div>
        </div>
        <div class="product-name">${p.name}</div>
      </div>
    `);
    $grid.append(card);
  });
 
  renderPagination(totalPages);
}
 
function renderPagination(totalPages) {
  const $pag = $("#pagination").empty();
  if (totalPages <= 1) return;
 
  const prev = $(`<button class="page-btn page-arrow page-arrow-prev"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <g clip-path="url(#clip0_378_1439)">
              <rect width="60" height="60" rx="30" fill="#CD7F23"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M34.0606 22.9395C34.3418 23.2208 34.4998 23.6022 34.4998 24C34.4998 24.3977 34.3418 24.7792 34.0606 25.0605L29.1211 30L34.0606 34.9395C34.2039 35.0779 34.3182 35.2434 34.3968 35.4264C34.4754 35.6094 34.5168 35.8062 34.5185 36.0054C34.5202 36.2046 34.4823 36.4021 34.4069 36.5864C34.3314 36.7708 34.2201 36.9382 34.0792 37.0791C33.9384 37.2199 33.7709 37.3313 33.5866 37.4067C33.4022 37.4821 33.2047 37.5201 33.0055 37.5184C32.8064 37.5166 32.6095 37.4753 32.4265 37.3966C32.2435 37.318 32.078 37.2037 31.9396 37.0605L25.9396 31.0605C25.6584 30.7792 25.5004 30.3977 25.5004 30C25.5004 29.6022 25.6584 29.2208 25.9396 28.9395L31.9396 22.9395C32.2209 22.6583 32.6024 22.5003 33.0001 22.5003C33.3979 22.5003 33.7793 22.6583 34.0606 22.9395Z" fill="#552914"/>
              </g>
              <defs>
              <clipPath id="clip0_378_1439">
              <rect width="60" height="60" rx="30" fill="white"/>
              </clipPath>
              </defs>
            </svg></button>`).on("click", () => {
    if (currentPage > 1) { currentPage--; renderGrid(); }
  });
  $pag.append(prev);
 
  for (let i = 1; i <= totalPages; i++) {
    const btn = $(`<button class="page-btn${i === currentPage ? " active" : ""}">${i}</button>`);
    btn.on("click", function() {
      currentPage = i;
      renderGrid();
    });
    $pag.append(btn);
  }
 
  const next = $(`<button class="page-btn page-arrow page-arrow-next"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <g clip-path="url(#clip0_378_1444)">
              <rect width="60" height="60" rx="30" transform="matrix(-1 0 0 1 60 0)" fill="#CD7F23"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M25.9394 22.9395C25.6582 23.2208 25.5002 23.6022 25.5002 24C25.5002 24.3977 25.6582 24.7792 25.9394 25.0605L30.8789 30L25.9394 34.9395C25.7961 35.0779 25.6818 35.2434 25.6032 35.4264C25.5246 35.6094 25.4832 35.8062 25.4815 36.0054C25.4798 36.2046 25.5177 36.4021 25.5931 36.5864C25.6686 36.7708 25.7799 36.9382 25.9208 37.0791C26.0616 37.2199 26.2291 37.3313 26.4134 37.4067C26.5978 37.4821 26.7953 37.5201 26.9945 37.5184C27.1936 37.5166 27.3905 37.4753 27.5735 37.3966C27.7565 37.318 27.922 37.2037 28.0604 37.0605L34.0604 31.0605C34.3416 30.7792 34.4996 30.3977 34.4996 30C34.4996 29.6022 34.3416 29.2208 34.0604 28.9395L28.0604 22.9395C27.7791 22.6583 27.3976 22.5003 26.9999 22.5003C26.6021 22.5003 26.2207 22.6583 25.9394 22.9395Z" fill="#552914"/>
              </g>
              <defs>
              <clipPath id="clip0_378_1444">
              <rect width="60" height="60" rx="30" transform="matrix(-1 0 0 1 60 0)" fill="white"/>
              </clipPath>
              </defs>
            </svg></button>`).on("click", () => {
    if (currentPage < totalPages) { currentPage++; renderGrid(); }
  });
  $pag.append(next);
}
 
// Filter buttons
$(".filter-item").on("click", function() {
  $(".filter-item").removeClass("active");
  $(this).addClass("active");
  currentFilter = $(this).data("filter");
  currentPage = 1;
  renderGrid();
});
 
// Category tabs
$(".cat-tab").on("click", function() {
  $(".cat-tab").removeClass("active");
  $(this).addClass("active");
  currentPage = 1;
  renderGrid();
});
 
// Search
$("#searchBtn").on("click", function() {
  searchQuery = $("#searchInput").val().trim();
  currentPage = 1;
  renderGrid();
});
$("#searchInput").on("keydown", function(e) {
  if (e.key === "Enter") { $("#searchBtn").trigger("click"); }
});
$("#searchInput").on("input", function() {
  if ($(this).val() === "") { searchQuery = ""; renderGrid(); }
});
 
// Init
renderGrid();