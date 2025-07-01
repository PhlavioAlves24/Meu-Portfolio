document.addEventListener('DOMContentLoaded', () => {
    // --- Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Previne scroll quando o menu está aberto
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // --- Animação de Scroll para o Cabeçalho ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adiciona a classe 'scrolled' após 50px de rolagem
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animações de Revelação (Intersection Observer) ---
    // Seleciona todos os elementos que terão a animação de "reveal"
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // viewport como root
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível para disparar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Adiciona a classe 'active'
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);

    // Observa cada elemento com a classe 'reveal'
    revealElements.forEach(element => {
        observer.observe(element);
    });
});
