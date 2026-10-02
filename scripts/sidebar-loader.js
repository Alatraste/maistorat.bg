const currentScript = document.currentScript;
const siteRoot = new URL("../", currentScript.src);

async function loadPart(containerId, filePath) {
    const container = document.getElementById(containerId);

    if (!container) return;

    try {
        const response = await fetch(new URL(filePath, siteRoot));

        if (!response.ok) {
            throw new Error(`Не може да се зареди: ${filePath}`);
        }

        container.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

loadPart("header-container", "header.html");
loadPart("sidebar-container", "templates/sidebar-search.html");
loadPart("footer-container", "footer.html");
