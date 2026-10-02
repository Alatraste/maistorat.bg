const sidebarContainer = document.getElementById("sidebar-container");

if (sidebarContainer) {
    const scriptUrl = new URL(document.currentScript.src);
    const sidebarUrl = new URL("../templates/sidebar-search.html", scriptUrl);

    fetch(sidebarUrl)
        .then(response => response.text())
        .then(html => {
            sidebarContainer.innerHTML = html;
        })
        .catch(error => {
            console.error("Грешка при зареждане на търсачката:", error);
        });
}
