const regionsData = {
  path3030: {
    name: "Norte de Minas",
    description:
      "Região marcada por clima semiárido, cultura diversa e forte papel agropecuário.",
    population: "1,61 milhão",
    area: "128.454 km²",
    cities: ["Montes Claros", "Januária", "Salinas"],
  },
  path3032: {
    name: "Jequitinhonha",
    description:
      "Conhecida pela riqueza cultural, artesanato e paisagens de vales e serras.",
    population: "0,29 milhão",
    area: "46.094 km²",
    cities: ["Diamantina", "Almenara", "Araçuaí"],
  },
  path3034: {
    name: "Central Mineira",
    description:
      "Região de transição com economia diversificada e áreas de cerrado.",
    population: "0,43 milhão",
    area: "42.433 km²",
    cities: ["Curvelo", "Sete Lagoas", "Três Marias"],
  },
  path3036: {
    name: "Metropolitana de Belo Horizonte",
    description:
      "Principal polo urbano e econômico do estado, com forte concentração industrial.",
    population: "6,0 milhões",
    area: "9.460 km²",
    cities: ["Belo Horizonte", "Betim", "Contagem"],
  },
  path3038: {
    name: "Oeste de Minas",
    description:
      "Região agrícola com destaque para o agronegócio e polos industriais regionais.",
    population: "1,14 milhão",
    area: "58.992 km²",
    cities: ["Divinópolis", "Formiga", "Itaúna"],
  },
  path3040: {
    name: "Sul/Sudoeste de Minas",
    description:
      "Conhecida pelo café, paisagens montanhosas e turismo rural.",
    population: "2,2 milhões",
    area: "53.386 km²",
    cities: ["Pouso Alegre", "Varginha", "Poços de Caldas"],
  },
  path3042: {
    name: "Zona da Mata",
    description:
      "Região histórica com centros universitários e indústria têxtil.",
    population: "2,1 milhões",
    area: "35.749 km²",
    cities: ["Juiz de Fora", "Viçosa", "Ubá"],
  },
  path3044: {
    name: "Triângulo Mineiro/Alto Paranaíba",
    description:
      "Forte produção agroindustrial e logística estratégica no Triângulo.",
    population: "2,4 milhões",
    area: "90.545 km²",
    cities: ["Uberlândia", "Uberaba", "Patos de Minas"],
  },
};

const regions = Array.from(document.querySelectorAll(".region"));
const tooltip = document.getElementById("tooltip");
const infoPanel = document.querySelector(".info-panel");
const infoTitle = infoPanel.querySelector("h2");
const infoDescription = infoPanel.querySelector(".info-description");
const infoDetails = infoPanel.querySelector(".info-details");
const infoFields = {
  population: infoPanel.querySelector('[data-field="population"]'),
  area: infoPanel.querySelector('[data-field="area"]'),
  cities: infoPanel.querySelector('[data-field="cities"]'),
};

let selectedRegion = null;

const showTooltip = (event, data) => {
  tooltip.textContent = data?.name || "Região";
  tooltip.classList.add("is-visible");
  tooltip.setAttribute("aria-hidden", "false");
  moveTooltip(event);
};

const hideTooltip = () => {
  tooltip.classList.remove("is-visible");
  tooltip.setAttribute("aria-hidden", "true");
};

const moveTooltip = (event) => {
  tooltip.style.left = `${event.clientX}px`;
  tooltip.style.top = `${event.clientY}px`;
};

const updatePanel = (data) => {
  if (!data) {
    infoTitle.textContent = "Selecione uma região";
    infoDescription.textContent =
      "Clique em uma região do mapa para ver informações detalhadas.";
    infoDetails.classList.add("is-hidden");
    return;
  }

  infoTitle.textContent = data.name;
  infoDescription.textContent = data.description;
  infoFields.population.textContent = data.population;
  infoFields.area.textContent = data.area;
  infoFields.cities.textContent = data.cities.join(", ");
  infoDetails.classList.remove("is-hidden");
};

regions.forEach((region) => {
  const data = regionsData[region.id];

  region.addEventListener("mouseenter", (event) => {
    region.classList.add("hover");
    showTooltip(event, data);
  });

  region.addEventListener("mousemove", (event) => {
    moveTooltip(event);
  });

  region.addEventListener("mouseleave", () => {
    region.classList.remove("hover");
    hideTooltip();
  });

  region.addEventListener("click", () => {
    if (selectedRegion) {
      selectedRegion.classList.remove("selected");
    }

    selectedRegion = region;
    selectedRegion.classList.add("selected");
    const fallbackData = {
      name: "Região sem dados",
      description: "Informações não disponíveis para esta região.",
      population: "-",
      area: "-",
      cities: ["-"],
    };
    updatePanel(data || fallbackData);
  });
});

updatePanel(null);
