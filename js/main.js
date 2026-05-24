document.addEventListener("DOMContentLoaded", () => {
    /**
     * TEMA (DARK MODE)
     */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Função para aplicar o tema
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        } else {
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
        }
        localStorage.setItem('theme', theme);
    };

    // Carrega o tema salvo ou a preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    }

    // Toggle manual
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
    });

    /**
     * HEADER SCROLL
     */
    const header = document.getElementById('header');
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /**
     * MENU MOBILE
     */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /**
     * SCROLLSPY (Intersection Observer)
     */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const scrollSpyOptions = {
        threshold: 0.6,
        rootMargin: '0px 0px -25% 0px'
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => scrollSpyObserver.observe(section));

    /**
     * SISTEMA DO MODAL (IMAGEM EXPANDIDA)
     */
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const zoomableElements = document.querySelectorAll('.open-modal, .award-card, .experience-card');

    zoomableElements.forEach(element => {
        element.addEventListener('click', function () {
            const imgTarget = this.querySelector('img');
            if (imgTarget) {
                modalImg.src = imgTarget.src;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const fecharModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharModal();
    });
});