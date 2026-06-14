// ARRAY DE OBJETOS - CARROSSEL (Facilidade de manutenção de dados)
const depoimentosData = [
    {
        quote: "Voltar para a fazenda do meu pai foi a melhor escolha que fiz. Implementamos monitoramento por drone e telemetria. Hoje produzimos 35% mais, gastando menos insumos e regenerando a mata nativa.",
        name: "Mateus Camargo",
        role: "Diretor de Operações Tecnológicas - Fazenda Alvorada",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
    },
    {
        quote: "O grande desafio da sucessão familiar era o choque de gerações. A tecnologia sustentável uniu a sabedoria prática do meu avô com a minha formação em engenharia de dados. Nosso solo nunca esteve tão vivo.",
        name: "Beatriz Mello",
        role: "Gestora Agroambiental - Estância Vale Verde",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    }
];

// ARRAY DE OBJETOS - ACORDEÃO (FAQ)
const faqData = [
    {
        question: "Como iniciar a transição tecnológica sem dar prejuízo no início?",
        answer: "O segredo é a implementação em fases. Começamos com diagnósticos de precisão gratuitos ou via cooperativas locais, aplicando tecnologia primeiro nas áreas de maior gargalo de custos (como economia de fertilizantes e diesel), gerando retorno financeiro imediato para autofinanciar as próximas etapas."
    },
    {
        question: "Meus pais são resistentes a mudanças digitais. Como contornar?",
        answer: "O melhor argumento são os dados de economia real e a facilidade de uso. Demonstramos painéis intuitivos onde o controle financeiro e produtivo fica claro. A tecnologia não descarta a sabedoria tradicional dos pais, ela apenas potencializa os resultados comerciais e remove o peso do esforço puramente braçal."
    },
    {
        question: "Quais são os requisitos mínimos de conectividade necessários no campo?",
        answer: "Atualmente, com soluções de antenas direcionais privadas e a expansão de redes satelitais de alta velocidade de baixa órbita, é perfeitamente viável monitorar sensores e maquinários mesmo em áreas totalmente isoladas dos grandes centros urbanos."
    }
];

// INICIALIZAÇÃO DE COMPONENTES E ESTADOS
document.addEventListener('DOMContentLoaded', () => {
    initAccessibility();
    renderCarousel();
    renderAccordion();
    initFormHandler();
});

/* ==========================================================================
   LOGICA DE ACESSIBILIDADE (Controle de tamanho e contraste)
   ========================================================================== */
function initAccessibility() {
    let currentFontSize = 16;
    const bodyEl = document.body;
    
    document.getElementById('btn-font-increase').addEventListener('click', () => {
        if (currentFontSize < 24) { // Limite do checklist
            currentFontSize += 2;
            bodyEl.style.fontSize = `${currentFontSize}px`;
        }
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        if (currentFontSize > 12) { // Limite do checklist
            currentFontSize -= 2;
            bodyEl.style.fontSize = `${currentFontSize}px`;
        }
    });

    document.getElementById('btn-contrast').addEventListener('click', () => {
        bodyEl.classList.toggle('high-contrast');
    });
}

/* ==========================================================================
   RENDERIZAÇÃO E LÓGICA DO CARROSSEL
   ========================================================================== */
function renderCarousel() {
    const track = document.getElementById('carousel-track');
    if(!track) return;

    depoimentosData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `
            <div class="testimonial-card">
                <p class="testimonial-quote">"${item.quote}"</p>
                <div class="testimonial-author">
                    <img src="${item.img}" alt="${item.name}">
                    <h4>${item.name}</h4>
                    <span>${item.role}</span>
                </div>
            </div>
        `;
        track.appendChild(slide);
    });

    let index = 0;
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');
    const totalSlides = depoimentosData.length;

    function updateCarouselPosition() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) < totalSlides ? index + 1 : 0;
        updateCarouselPosition();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1) >= 0 ? index - 1 : totalSlides - 1;
        updateCarouselPosition();
    });
}

/* ==========================================================================
   RENDERIZAÇÃO E LÓGICA DO ACORDEÃO (FAQ)
   ========================================================================== */
function renderAccordion() {
    const container = document.getElementById('faq-accordion');
    if(!container) return;

    faqData.forEach((item, idx) => {
        const accItem = document.createElement('div');
        accItem.className = 'accordion-item';
        
        accItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-answer-${idx}">
                <span>${item.question}</span>
                <i class="fa-solid fa-chevron-down accordion-icon"></i>
            </button>
            <div id="faq-answer-${idx}" class="accordion-content">
                <p>${item.answer}</p>
            </div>
        `;
        container.appendChild(accItem);
    });

    const headers = container.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const isAlreadyActive = currentItem.classList.contains('active');
            
            // Fecha todos antes de abrir o atual (comportamento Single-open)
            container.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
                item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            if (!isAlreadyActive) {
                currentItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                const content = currentItem.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

/* ==========================================================================
   CAPTURA DE LEAD (FORMULÁRIO DE CONVERSÃO)
   ========================================================================== */
function initFormHandler() {
    const form = document.getElementById('lead-form');
    const successMsg = document.getElementById('form-success');
    
    if(!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulação de envio seguro de dados
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.style.animation = 'fadeIn 0.5s ease forwards';
    });
}