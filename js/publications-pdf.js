
document.addEventListener("DOMContentLoaded", () => {

    const downloadButton = document.getElementById(
        "downloadPublicationsBtn"
    );

    if (!downloadButton) return;

    downloadButton.addEventListener("click", generatePublicationsPDF);

});

function generatePublicationsPDF() {

    if (!window.jspdf) {
        alert("PDF library could not be loaded.");
        return;
    }

    const { jsPDF } = window.jspdf;

	// Get only the currently filtered publications
	const publicationsToExport = window.filteredPublications || [];

	// Prevent empty PDF downloads
	if (publicationsToExport.length === 0) {
		alert("No publications match the current filters.");
		return;
	}

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let y = 25;

    const authorName = "Bruno Senzio-Savino Barzellato";

    // Remove HTML tags from author strings
    function cleanText(value) {
        const element = document.createElement("div");
        element.innerHTML = value || "";
        return element.textContent || "";
    }

    // New page when content exceeds available space
    function checkPageSpace(requiredHeight) {

        if (y + requiredHeight > pageHeight - 22) {
            doc.addPage();
            y = 25;
        }

    }

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(21);
    doc.setTextColor(30, 45, 65);

    doc.text("Research Publications", margin, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(65, 75, 85);

    doc.text(authorName, margin, y);

    y += 7;

    doc.setFontSize(9);
    doc.text(
        "Journal Articles | Conference Papers | Theses | Patents",
        margin,
        y
    );

    y += 8;

    const today = new Date();

    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);

    doc.text(
        "Generated: " + today.toLocaleDateString("en-US"),
        margin,
        y
    );

    y += 6;

    doc.text(
        "Total records: " + publicationsToExport.length,
        margin,
        y
    );

    y += 10;

    doc.setDrawColor(190, 200, 210);
    doc.line(margin, y, pageWidth - margin, y);

    y += 12;

    // Group publications by type
    const categories = [
        { type: "Journal", heading: "Journal Articles" },
        { type: "Conference", heading: "Conference Papers" },
        { type: "Thesis", heading: "Theses" },
        { type: "Patent", heading: "Patents" }
    ];

    let publicationNumber = 1;

    categories.forEach(category => {

        const records = publicationsToExport
            .filter(pub => pub.type === category.type)
            .sort((a, b) => b.year - a.year);

        if (records.length === 0) return;

        checkPageSpace(20);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(25, 65, 100);

        doc.text(category.heading, margin, y);

        y += 9;

        records.forEach(pub => {

            const title = cleanText(pub.title);
            const authors = cleanText(pub.authors);
            const venue = cleanText(pub.venue);

            const titleLines = doc.splitTextToSize(
                publicationNumber + ". " + title,
                contentWidth
            );

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            const authorLines = doc.splitTextToSize(
                authors,
                contentWidth
            );

            const venueLines = doc.splitTextToSize(
                venue + " (" + pub.year + ")",
                contentWidth
            );

            const requiredHeight =
                titleLines.length * 5 +
                authorLines.length * 4.5 +
                venueLines.length * 4.5 +
                (pub.doi ? 5 : 0) +
                (pub.link ? 5 : 0) +
                8;

            checkPageSpace(requiredHeight);

            // Publication title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(35, 45, 60);

            doc.text(titleLines, margin, y);

            y += titleLines.length * 5 + 2;

            // Authors
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(65, 65, 65);

            doc.text(authorLines, margin, y);

            y += authorLines.length * 4.5 + 1;

            // Venue and year
            doc.setFont("helvetica", "italic");
            doc.setTextColor(90, 90, 90);

            doc.text(venueLines, margin, y);

            y += venueLines.length * 4.5 + 1;

            // DOI
            if (pub.doi) {

                doc.setFont("helvetica", "normal");
                doc.setFontSize(8);
                doc.setTextColor(40, 90, 150);

                doc.text("DOI: " + pub.doi, margin, y);

                y += 5;
            }

            // Publication hyperlink
            if (pub.link) {

                const url = new URL(
                    pub.link,
                    window.location.href
                ).href;

                doc.setFont("helvetica", "normal");
                doc.setFontSize(8);
                doc.setTextColor(25, 100, 170);

                doc.textWithLink(
                    "View Publication",
                    margin,
                    y,
                    { url: url }
                );

                y += 5;
            }

            y += 7;

            publicationNumber++;

        });

        y += 5;

    });

    // Footer on all pages
    const totalPages = doc.internal.getNumberOfPages();

    for (let page = 1; page <= totalPages; page++) {

        doc.setPage(page);

        doc.setDrawColor(210, 210, 210);

        doc.line(
            margin,
            pageHeight - 17,
            pageWidth - margin,
            pageHeight - 17
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(130, 130, 130);

        doc.text(
            authorName + " | Research Publications",
            margin,
            pageHeight - 12
        );

        doc.text(
            "Page " + page + " of " + totalPages,
            pageWidth - margin,
            pageHeight - 12,
            { align: "right" }
        );

    }

	const isFiltered =
		publicationsToExport.length !== publications.length;

	const filename = isFiltered
		? "Bruno_Senzio_Savino_Filtered_Publications.pdf"
		: "Bruno_Senzio_Savino_Publications.pdf";

	doc.save(filename);

}
