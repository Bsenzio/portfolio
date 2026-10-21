
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("downloadPublicationsBtn");

    if (button) {
        button.addEventListener("click", generatePublicationsPDF);
    }
});

function generatePublicationsPDF() {

    if (!window.jspdf) {
        alert("Unable to load PDF generation library.");
        return;
    }

    const records = window.filteredPublications;

    if (!Array.isArray(records)) {
        alert("Publication data is not ready.");
        return;
    }

    if (records.length === 0) {
        alert("No publications match the current filters.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const M = 18;
    const CW = W - M * 2;

    const navy = [36, 59, 85];
    const gray = [90, 105, 120];
    const blue = [35, 100, 170];

    let y = 20;
    let number = 1;

    // ----------------------------------
    // FILTER INFORMATION
    // ----------------------------------

    const getValue = id => {
        const el = document.getElementById(id);
        return el ? el.value : "all";
    };

    const filters = {
        search: getValue("searchInput").trim(),
        year: getValue("yearFilter"),
        type: getValue("typeFilter"),
        language: getValue("languageFilter"),
        keywords: Array.isArray(window.selectedKeywords)
            ? window.selectedKeywords
            : []
    };

    // If selectedKeywords is declared with let in
    // publications.js, read it directly when available.
    if (typeof selectedKeywords !== "undefined") {
        filters.keywords = [...selectedKeywords];
    }

    const activeFilters = [];

    if (filters.search) {
        activeFilters.push(["Search", filters.search]);
    }

    if (filters.year !== "all") {
        activeFilters.push(["Year", filters.year]);
    }

    if (filters.type !== "all") {
        activeFilters.push(["Type", filters.type]);
    }

    if (filters.language !== "all") {
        activeFilters.push(["Language", filters.language]);
    }

    if (filters.keywords.length) {
        activeFilters.push([
            "Keywords",
            filters.keywords.join(", ")
        ]);
    }

    // ----------------------------------
    // HELPERS
    // ----------------------------------

    function clean(value) {
        const div = document.createElement("div");
        div.innerHTML = value || "";
        return div.textContent || "";
    }

    function newPageIfNeeded(height) {
        if (y + height > H - 23) {
            doc.addPage();
            y = 22;
        }
    }

    function writeWrapped(text, x, fontSize, color, style = "normal") {
        doc.setFont("helvetica", style);
        doc.setFontSize(fontSize);
        doc.setTextColor(...color);

        const lines = doc.splitTextToSize(clean(text), CW - 3);
        const lineHeight = fontSize * 0.46;

        doc.text(lines, x, y);
        y += lines.length * lineHeight + 2;
    }

    // ----------------------------------
    // COVER HEADER
    // ----------------------------------

    doc.setFillColor(...navy);
    doc.rect(0, 0, W, 49, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(190, 215, 235);
    doc.text("ACADEMIC RESEARCH PORTFOLIO", M, 14);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    doc.setTextColor(255, 255, 255);
    doc.text("Research Publications", M, 27);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Bruno Senzio-Savino Barzellato", M, 36);

    doc.setFontSize(8);
    doc.text(
        "Generated: " + new Date().toLocaleDateString("en-US"),
        M,
        43
    );

    y = 59;

    // ----------------------------------
    // FILTER SUMMARY
    // ----------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...navy);
    doc.text("Applied Filters", M, y);

    y += 7;

    if (activeFilters.length === 0) {
        activeFilters.push(["Selection", "All Publications"]);
    }

    const filterRows = activeFilters.map(([label, value]) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(
            clean(value),
            CW - 46
        );
        return { label, lines };
    });

    const boxHeight = 10 + filterRows.reduce(
        (sum, row) => sum + Math.max(6, row.lines.length * 4.5),
        0
    );

    newPageIfNeeded(boxHeight + 18);

    doc.setFillColor(241, 245, 249);
    doc.roundedRect(M, y - 3, CW, boxHeight, 2, 2, "F");

    let fy = y + 4;

    filterRows.forEach(row => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...navy);
        doc.text(row.label + ":", M + 5, fy);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(...gray);
        doc.text(row.lines, M + 42, fy);

        fy += Math.max(6, row.lines.length * 4.5);
    });

    y += boxHeight + 7;

    // ----------------------------------
    // RESULTS SUMMARY
    // ----------------------------------

    newPageIfNeeded(25);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...navy);

    doc.text(
        "Matching Publications: " + records.length,
        M,
        y
    );

    doc.text(
        "Database Total: " + publications.length,
        W - M,
        y,
        { align: "right" }
    );

    y += 7;

    doc.setDrawColor(200, 210, 220);
    doc.line(M, y, W - M, y);

    y += 12;

    // ----------------------------------
    // PUBLICATION CATEGORIES
    // ----------------------------------

    const categories = [
        ["Journal", "Journal Articles"],
        ["Conference", "Conference Papers"],
        ["Thesis", "Theses"],
        ["Patent", "Patents"]
    ];

    categories.forEach(([type, heading]) => {

        const group = records
            .filter(p => p.type === type)
            .sort((a, b) => b.year - a.year);

        if (!group.length) return;

        newPageIfNeeded(18);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(...navy);
        doc.text(heading, M, y);

        y += 5;

        doc.setDrawColor(180, 195, 210);
        doc.line(M, y, W - M, y);

        y += 9;

        group.forEach(pub => {

            const title = number + ". " + clean(pub.title);
            const authors = clean(pub.authors);
            const venue = clean(pub.venue) + " (" + pub.year + ")";

            doc.setFontSize(10);
            const titleLines = doc.splitTextToSize(title, CW - 3);

            doc.setFontSize(9);
            const authorLines = doc.splitTextToSize(authors, CW - 3);
            const venueLines = doc.splitTextToSize(venue, CW - 3);

            const height =
                titleLines.length * 4.6 +
                authorLines.length * 4.2 +
                venueLines.length * 4.2 +
                (pub.doi ? 5 : 0) +
                (pub.link ? 6 : 0) +
                10;

            newPageIfNeeded(height);

            writeWrapped(title, M, 10, navy, "bold");
            writeWrapped(authors, M, 9, gray);
            writeWrapped(venue, M, 9, gray, "italic");

            if (pub.doi) {
                writeWrapped("DOI: " + pub.doi, M, 8, blue);
            }

            if (pub.link) {
                const url = new URL(pub.link, window.location.href).href;

                doc.setFont("helvetica", "normal");
                doc.setFontSize(8);
                doc.setTextColor(...blue);

                doc.textWithLink(
                    "View Publication",
                    M,
                    y,
                    { url }
                );

                y += 6;
            }

            y += 5;
            number++;
        });

        y += 5;
    });

    // ----------------------------------
    // PAGE FOOTERS
    // ----------------------------------

    const pages = doc.internal.getNumberOfPages();

    for (let page = 1; page <= pages; page++) {

        doc.setPage(page);

        doc.setDrawColor(205, 215, 225);
        doc.line(M, H - 18, W - M, H - 18);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(120, 130, 140);

        doc.text(
            "Bruno Senzio-Savino | Research Publications",
            M,
            H - 12
        );

        doc.text(
            "Page " + page + " of " + pages,
            W - M,
            H - 12,
            { align: "right" }
        );
    }

    // ----------------------------------
    // DOWNLOAD
    // ----------------------------------

    const suffix = activeFilters.some(
        ([label]) => label !== "Selection"
    ) ? "_Filtered" : "";

    doc.save(
        "Bruno_Senzio_Savino_Publications" + suffix + ".pdf"
    );
}
