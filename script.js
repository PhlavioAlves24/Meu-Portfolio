// Função para o efeito de máquina de escrever
function typeWriter(element, speed = 250) {
    const text = element.textContent;
    element.innerHTML = ''; // Limpa o conteúdo inicial
    let i = 0;

    // Cria um elemento para o cursor
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('typing-cursor'); // Adiciona uma classe para estilização via CSS
    element.appendChild(cursorSpan); // Adiciona o cursor inicialmente ao elemento

    function type() {
        if (i < text.length) {
            // Adiciona o próximo caractere ANTES do cursor
            const char = text.charAt(i);
            cursorSpan.insertAdjacentText('beforebegin', char);
            i++;
            setTimeout(type, speed); // Usa a velocidade ajustada
        } else {
            // Ao final da digitação, remove a animação de piscar do cursor
            cursorSpan.style.animation = 'none';
            cursorSpan.style.opacity = '0'; // Opcional: faz o cursor sumir suavemente
            setTimeout(() => {
                cursorSpan.remove(); // Remove o cursor do DOM após a animação
            }, 500); // Espera um pouco antes de remover para que a transição seja visível
        }
    }
    
    // Inicia a digitação com um pequeno atraso para melhor visualização
    setTimeout(type, 500);
}


// Animação de carregamento das habilidades
function animateSkills() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  // Primeiro mostra o efeito de loading
  skillItems.forEach(item => {
    item.classList.add('loading');
  });
  
  // Depois de 1.5s, remove o loading e anima as barras
  setTimeout(() => {
    skillItems.forEach((item, index) => {
      item.classList.remove('loading');
      
      const progressBar = item.querySelector('.progress-bar');
      const width = progressBar.getAttribute('aria-valuenow');
      
      // Anima cada barra com um delay progressivo
      setTimeout(() => {
        progressBar.style.width = width + '%';
        
        // Efeito extra quando terminar
        setTimeout(() => {
          progressBar.style.transform = 'scaleY(1.2)';
          setTimeout(() => {
            progressBar.style.transform = 'scaleY(1)';
          }, 200);
        }, 300);
      }, index * 200);
    });
  }, 1500);
}

// Inicia todas as animações quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Efeito de máquina de escrever no Navbar Brand
  const navbarBrand = document.getElementById('navbarBrand');
  if (navbarBrand) {
      typeWriter(navbarBrand, 200); // Navbar brand can be slower
  }

  // Atualiza o ano no footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Efeito na navbar ao scrollar
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
  
  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animação ao scroll
  function animateOnScroll() {
    document.querySelectorAll('.animate').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 150) {
        el.classList.add('animated');
      }
    });
  }
  
  // Inicia animações
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  animateSkills();
  
  // Adiciona ícones às habilidades
  const skills = {
    html: '<i class="fab fa-html5"></i>',
    css: '<i class="fab fa-css3-alt"></i>',
    js: '<i class="fab fa-js-square"></i>',
    bootstrap: '<i class="fab fa-bootstrap"></i>',
    react: '<i class="fab fa-react"></i>',
    uiux: '<i class="fas fa-paint-brush"></i>'
  };
  
  for (const [skill, icon] of Object.entries(skills)) {
    document.querySelectorAll(`.skill-${skill} .skill-name`).forEach(el => {
      el.insertAdjacentHTML('afterbegin', icon);
    });
  }
});
