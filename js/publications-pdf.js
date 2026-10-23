document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("downloadPublicationsBtn");

    if (button) {
        button.addEventListener("click", generatePublicationsPDF);
    }
});

function generatePublicationsPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("Unable to load PDF generation library.");
        return;
    }

    const records = window.filteredPublications;

    if (!Array.isArray(records)) {
        alert("Publication data is not ready.");
        return;
    }

    if (records.length === 0) {
        alert("No records match the current filters.");
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

    const getValue = (id, fallback = "all") => {
        const element = document.getElementById(id);
        return element ? element.value : fallback;
    };

    const filters = {
        search: getValue("searchInput", "").trim(),
        year: getValue("yearFilter"),
        type: getValue("typeFilter"),
        language: getValue("languageFilter"),
        keywords: Array.isArray(window.selectedKeywords)
            ? [...window.selectedKeywords]
            : []
    };

    if (
        typeof selectedKeywords !== "undefined" &&
        Array.isArray(selectedKeywords)
    ) {
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

    const hasActiveFilters = activeFilters.length > 0;

    // ----------------------------------
    // HELPERS
    // ----------------------------------

    function clean(value) {
        const div = document.createElement("div");
        div.innerHTML = String(value ?? "");

        return div.textContent || "";
    }

    function newPageIfNeeded(height) {
        if (y + height > H - 23) {
            doc.addPage();
            y = 22;
        }
    }

    function getLines(text, fontSize, style = "normal") {
        doc.setFont("helvetica", style);
        doc.setFontSize(fontSize);

        return doc.splitTextToSize(clean(text), CW - 3);
    }

    function getTextHeight(text, fontSize, style = "normal") {
        const lines = getLines(text, fontSize, style);
        return lines.length * fontSize * 0.46 + 2;
    }

    function writeWrapped(
        text,
        x,
        fontSize,
        color,
        style = "normal"
    ) {
        const lines = getLines(text, fontSize, style);
        const lineHeight = fontSize * 0.46;

        doc.setTextColor(...color);

        lines.forEach(line => {
            newPageIfNeeded(lineHeight);

            doc.text(line, x, y);
            y += lineHeight;
        });

        y += 2;
    }

    function getRecordLinks(record) {
        const activityTypes = ["Talk", "Workshop", "Interview"];

        return [
            {
                value: record.link,
                label: activityTypes.includes(record.type)
                    ? "View Details"
                    : "View Publication"
            },
            {
                value: record.youtube,
                label: "Watch Video"
            },
            {
                value: record.github,
                label: "View Repository"
            }
        ].filter(item => item.value);
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
    doc.setFontSize(17);
    doc.setTextColor(255, 255, 255);
    doc.text("Publications and Academic Activities", M, 27);

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

    const summaryFilters = hasActiveFilters
        ? activeFilters
        : [["Selection", "All Records"]];

    summaryFilters.forEach(([label, value]) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        const lines = doc.splitTextToSize(
            clean(value),
            CW - 46
        );

        // Render long filter values in chunks across pages.
        let index = 0;

        while (index < lines.length) {
            newPageIfNeeded(12);

            const availableLines = Math.max(
                1,
                Math.floor((H - 23 - y - 7) / 4.5)
            );

            const chunk = lines.slice(
                index,
                index + availableLines
            );

            const rowHeight = Math.max(
                10,
                chunk.length * 4.5 + 5
            );

            doc.setFillColor(241, 245, 249);
            doc.roundedRect(
                M,
                y - 3,
                CW,
                rowHeight,
                2,
                2,
                "F"
            );

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(...navy);
            doc.text(
                index === 0 ? label + ":" : "Continued:",
                M + 5,
                y + 2
            );

            doc.setFont("helvetica", "normal");
            doc.setTextColor(...gray);
            doc.text(chunk, M + 42, y + 2);

            y += rowHeight + 2;
            index += chunk.length;
        }
    });

    y += 5;

    // ----------------------------------
    // RESULTS SUMMARY
    // ----------------------------------

    newPageIfNeeded(25);

    const databaseTotal =
        typeof publications !== "undefined" &&
        Array.isArray(publications)
            ? publications.length
            : Array.isArray(window.publications)
                ? window.publications.length
                : null;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...navy);

    doc.text(
        "Matching Records: " + records.length,
        M,
        y
    );

    if (databaseTotal !== null) {
        doc.text(
            "Database Total: " + databaseTotal,
            W - M,
            y,
            { align: "right" }
        );
    }

    y += 7;

    doc.setDrawColor(200, 210, 220);
    doc.line(M, y, W - M, y);

    y += 12;

    // ----------------------------------
    // CATEGORIES
    // ----------------------------------

    const categories = [
        ["Journal", "Journal Articles"],
        ["Conference", "Conference Papers"],
        ["Thesis", "Theses"],
        ["Patent", "Patents"],
        ["Talk", "Talks"],
        ["Workshop", "Workshops and Tutorials"],
        ["Interview", "Interviews"]
    ];

    // Include any additional record types automatically.
    const knownTypes = new Set(
        categories.map(([type]) => type)
    );

    records.forEach(record => {
        if (!knownTypes.has(record.type)) {
            knownTypes.add(record.type);

            categories.push([
                record.type,
                record.type || "Other Activities"
            ]);
        }
    });

    categories.forEach(([type, heading]) => {
        const group = records
            .filter(record => record.type === type)
            .sort((a, b) => Number(b.year) - Number(a.year));

        if (!group.length) return;

        // Reserve space for the heading and the start of a record.
        newPageIfNeeded(40);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(...navy);
        doc.text(clean(heading), M, y);

        y += 5;

        doc.setDrawColor(180, 195, 210);
        doc.line(M, y, W - M, y);

        y += 9;

        group.forEach(record => {
            const title = number + ". " + clean(record.title);
            const authors = clean(record.authors);
            const venue =
                clean(record.venue) + " (" + record.year + ")";

            const links = getRecordLinks(record);

            const height =
                getTextHeight(title, 10, "bold") +
                getTextHeight(authors, 9) +
                getTextHeight(venue, 9, "italic") +
                (
                    record.doi
                        ? getTextHeight("DOI: " + record.doi, 8)
                        : 0
                ) +
                links.length * 6 +
                5;

            newPageIfNeeded(height);

            writeWrapped(title, M, 10, navy, "bold");
            writeWrapped(authors, M, 9, gray);
            writeWrapped(venue, M, 9, gray, "italic");

            if (record.doi) {
                writeWrapped(
                    "DOI: " + record.doi,
                    M,
                    8,
                    blue
                );
            }

            links.forEach(({ value, label }) => {
                let url;

                try {
                    url = new URL(
                        value,
                        window.location.href
                    ).href;
                } catch {
                    return;
                }

                newPageIfNeeded(6);

                doc.setFont("helvetica", "normal");
                doc.setFontSize(8);
                doc.setTextColor(...blue);

                doc.textWithLink(label, M, y, { url });

                y += 6;
            });

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
            "Bruno Senzio-Savino | Publications and Academic Activities",
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

    const suffix = hasActiveFilters ? "_Filtered" : "";

    doc.save(
        "Bruno_Senzio_Savino_Publications_and_Activities" +
        suffix +
        ".pdf"
    );
}