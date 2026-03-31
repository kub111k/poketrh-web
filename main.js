
$(document).ready(function() {
    
    console.log("Galerie je připravena k použití.");

    // Když uživatel klikne na odkaz, který má třídu 'galerie-nahled'
    $('.galerie-nahled').on('click', function(udalost) {
        
        // 1. Zabráníme tomu, aby nás odkaz přesměroval na jinou stránku
        udalost.preventDefault();

        // 2. Získáme cestu k VELKÉMU obrázku z atributu 'href' toho odkazu
        let velkyObrazekUrl = $(this).attr('href');

        // 3. Vytvoříme ztmavené pozadí a vložíme do něj velký obrázek (HTML struktura)
        let lightboxHtml = `
            <div id="moje-vyskakovaci-okno" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 9999; cursor: pointer;">
                <img src="${velkyObrazekUrl}" style="max-width: 90%; max-height: 90%; border: 5px solid white; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
                <span style="position: absolute; top: 20px; right: 40px; color: white; font-size: 50px; font-weight: bold;">&times;</span>
            </div>
            `;

        // 4. Přidáme toto okno na konec stránky, aby se zobrazilo
        $('body').append(lightboxHtml);
    });

    // Když uživatel klikne kamkoliv do ztmaveného okna (nebo na křížek)
    $('body').on('click', '#moje-vyskakovaci-okno', function() {
        // Okno se celé vymaže a zmizí
        $(this).remove(); 
    });

    // Načtení patičky
    $("#sablona-paticka").load("sablony/paticka.html");

    // Načtení menu a chytré nastavení třídy 'active'
    $("#sablona-menu").load("sablony/menu.html", function() {
        // Zjistí, na jaké stránce uživatel zrovna je (např. 'trziste.html')
        let aktualniStranka = window.location.pathname.split('/').pop();
        if (aktualniStranka === "") aktualniStranka = "index.html"; // Pokud je to jen hlavní doména
        
        // Najde v načteném menu odkaz s touto adresou a přidá mu třídu 'active'
        $('.nav-link[href="' + aktualniStranka + '"]').addClass('active');
    });

});