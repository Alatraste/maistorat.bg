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

        if (container.dataset.seriesFilter === "bosch-professional") {
            const button = container.querySelector(".filter-button");
            const group = document.createElement("div");
            group.className = "filter-group bosch-series-filter";
            group.innerHTML = `<span class="filter-title">Серия</span>
                <label class="series-option"><input type="checkbox" value="pro"> PRO</label>
                <label class="series-option"><input type="checkbox" value="expert"> EXPERT</label>
                <label class="series-option"><input type="checkbox" value="industrial"> INDUSTRIAL</label>`;
            button.before(group);

            const style = document.createElement("style");
            style.textContent = `.bosch-series-filter .series-option{display:flex;align-items:center;gap:9px;margin:8px 0;font-weight:400;cursor:pointer}.bosch-series-filter input{width:17px;height:17px;accent-color:#003b73}`;
            container.appendChild(style);

            const boxes = [...group.querySelectorAll("input[type=checkbox]")];
            const applySeriesFilter = () => {
                const selected = boxes.filter(box => box.checked).map(box => box.value);
                document.querySelectorAll("#produkti .product-card").forEach(card => {
                    card.style.display = !selected.length || selected.includes(card.dataset.series) ? "" : "none";
                });
            };
            boxes.forEach(box => box.addEventListener("change", applySeriesFilter));
        }
    } catch (error) {
        console.error(error);
    }
}

loadPart("header-container", "header.html");
loadPart("sidebar-container", "templates/sidebar-search.html");
loadPart("footer-container", "footer.html");
