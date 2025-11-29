const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Quand on clique sur le burger
    burger.addEventListener('click', () => {
        // 1. Activer/Désactiver le menu (Ajoute la classe .nav-active au CSS)
        nav.classList.toggle('nav-active');

        // 2. Animer les liens (Effet cascade)
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                // Délai progressif pour chaque lien (index / 7)
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // 3. Animation du Burger en Croix (Ajoute la classe .toggle au CSS)
        burger.classList.toggle('toggle');
    });

    // 4. (Optionnel) Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

// Lancer la fonction
navSlide();

// Gestion basique de l'envoi du formulaire (pour éviter le rechargement de page par défaut)
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // empêche le rechargement par défaut

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Vider tous les champs du formulaire
                contactForm.reset();

                // Rediriger vers la page de remerciement
                window.location.href = "https://formspree.io/thanks?language=fr";
            } else {
                alert("Oups ! Une erreur est survenue. Veuillez réessayer.");
            }

        } catch (error) {
            alert("Oups ! Une erreur est survenue. Veuillez réessayer.");
        }
    });
}


// Changement de couleur de la navbar au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});