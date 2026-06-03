document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Mobile (Hambúrguer)
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.nav-links');

    menu.addEventListener('click', () => {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    });

    // Fechar o menu mobile ao clicar em algum link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-active');
            menuLinks.classList.remove('active');
        });
    });

    // 2. Envio do Formulário de Contato (Simulação)
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página
            
            // Aqui você capturaria os dados se houvesse backend
            alert('Obrigado pelo contato! Nossa equipe de especialistas em sustentabilidade retornará em breve.');
            contactForm.reset();
        });
    }

    // 3. Efeito de scroll suave no header ao rolar a página
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
});
