// script.js - Tema: Agro forte, futuro sustentável

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa as funções principais
    initContadores();
    initGraficoEquilibrio();
    initFiltroProjetos();
});

/**
 * 1. ANIMAÇÃO DOS CONTADORES (Efeito de números subindo)
 */
function initContadores() {
    const contadores = document.querySelectorAll(".numero-animado");
    const velocidade = 200; // Quanto maior, mais lenta a animação

    const animar = (contador) => {
        const objetivo = +contador.getAttribute("data-target");
        const atual = +contador.innerText.replace(/[^0-9]/g, '');
        const incremento = objetivo / velocidade;

        if (atual < objetivo) {
            contador.innerText = Math.ceil(atual + incremento).toLocaleString('pt-BR');
            setTimeout(() => animar(contador), 1);
        } else {
            contador.innerText = objetivo.toLocaleString('pt-BR') + (contador.getAttribute("data-sufixo") || "");
        }
    };

    // Observer para iniciar a animação apenas quando o usuário rolar até a seção
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animar(entry.target);
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(contador => observer.observe(contador));
}

/**
 * 2. GRÁFICO DE EQUILÍBRIO (Utiliza a biblioteca Chart.js)
 * Demonstra o crescimento da produção alinhado à preservação
 */
function initGraficoEquilibrio() {
    const ctx = document.getElementById("graficoSustentavel");
    if (!ctx) return;

    // Configuração do gráfico (Exemplo: Evolução de 3 anos)
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2024', '2025', '2026'],
            datasets: [
                {
                    label: 'Produtividade (Toneladas/Hectare)',
                    data: [4.2, 4.5, 4.9],
                    backgroundColor: 'rgba(40, 167, 69, 0.7)', // Verde Agro
                    borderColor: 'rgb(40, 167, 69)',
                    borderWidth: 1,
                    yAxisID: 'y',
                },
                {
                    label: 'Área Preservada (Milhões de Hectares)',
                    data: [12, 14, 15.5],
                    type: 'line', // Gráfico misto para diferenciar as métricas
                    borderColor: '#20c997', // Verde Sustentável
                    backgroundColor: 'transparent',
                    tension: 0.3,
                    yAxisID: 'y1',
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Produção' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { drawOnChartArea: false }, // Evita linhas sobrepostas
                    title: { display: true, text: 'Preservação' }
                }
            }
        }
    });
}

/**
 * 3. FILTRO DE INICIATIVAS (Interatividade na vitrine de projetos)
 */
function initFiltroProjetos() {
    const botoesFiltro = document.querySelectorAll(".btn-filtro");
    const cardsProjetos = document.querySelectorAll(".card-projeto");

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", () => {
            // Atualiza classe ativa nos botões
            document.querySelector(".btn-filtro.ativo")?.classList.remove("ativo");
            botao.classList.add("ativo");

            const filtroSelecionado = botao.getAttribute("data-filter");

            // Filtra os cards com uma transição suave
            cardsProjetos.forEach(card => {
                const categoriaCard = card.getAttribute("data-category");
                
                if (filtroSelecionado === "todos" || categoriaCard === filtroSelecionado) {
                    card.style.display = "block";
                    setTimeout(() => card.style.opacity = "1", 10);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => card.style.display = "none", 300);
                }
            });
        });
    });
}
