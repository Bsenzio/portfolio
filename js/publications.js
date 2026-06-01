// =========================
// PUBLICATIONS DATABASE
// =========================

const publications = [

{
id:1,
title:"Vegetables, Enemies, and Emergence: A Playable Game of Life on Nintendo for Educational Purposes",
authors:"<strong>Bruno Senzio-Savino</strong>, F. Alsharif",
venue:"Innovations in Machine Intelligence",
year:2026,
type:"Journal",
image:"game_of_life_nintendo.jpg",
link:"assets/pdf/Journals/IMI2025_01.pdf",
youtube:"https://youtu.be/6K8MLqRcPp8",
github:"https://github.com/Bsenzio/wamg",
language:["English"],
keywords:["NES","CA065","Game Based Learning","Artificial Life"],
abstract:"Educational implementation of Conway's Game of Life on Nintendo hardware for machine intelligence teaching."
},

{
id:2,
title:"An Online Synchronous Brain Wave Signal Pattern Classifier with Parallel Processing Optimization for Embedded System Implementation",
authors:"<strong>Bruno Senzio-Savino</strong>, M.R. Alsharif, C.E. Gutierrez, K. Setarehdan",
venue:"International Journal of Advanced Computer Science and Applications",
year:2017,
type:"Journal",
image:"online_eeg_classifier.jpg",
youtube:"https://youtu.be/FN6Tui_sEzo?si=7YFRzopRgCEv1mxE",
doi:"10.14569/IJACSA.2017.080152",
link:"https://doi.org/10.14569/IJACSA.2017.080152",
language:["English"],
keywords:["EEG","BCI","Embedded Systems","Parallel Processing"],
abstract:"Online EEG pattern classifier using parallel processing and embedded implementation."
},

{
id:3,
title:"Brain Wave Pattern Classification: Towards the Design of an Effective Online Classifier",
authors:"<strong>Bruno Senzio-Savino</strong>, M.R. Alsharif et al.",
venue:"European Journal of Information Science and Technology",
year:2016,
type:"Journal",
image:"brainwave_classifier.jpg",
link:"assets/pdf/Journals/EJIST-1-1-pp-18-29-Bruno-Senzio-Savino.pdf",
language:["English"],
youtube:"https://youtu.be/FN6Tui_sEzo?si=7YFRzopRgCEv1mxE",
keywords:["EEG","BCI","SVM","Machine Learning", "Self-Organizing Maps","Arduino"],
abstract:"EEG attention and meditation signal classification for online systems."
},

{
id:4,
title:"Path Detection in Virtual Environment for Synchronous EEG by Density-Based Support Vector Machine",
authors:"<strong>Bruno Senzio-Savino</strong>, M.R. Alsharif et al.",
venue:"Journal of Information and Communications Engineering",
year:2015,
type:"Journal",
image:"dbsvm_path_detection.jpg",
youtube:"https://youtu.be/FN6Tui_sEzo?si=7YFRzopRgCEv1mxE",
language:["English"],
keywords:["EEG","BCI","SVM","Machine Learning", "Game Development", "Pattern Recognition","Arduino"],
link:"https://www.ascspublications.org/product/path-detection-in-virtual-environment-for-synchronous-eeg-by-density-based-support-vector-machine/",
abstract:"DBSVM-based path detection in virtual EEG environments."
},

{
id:5,
title:"BrainWave Processing Modular System",
authors:"<strong>Bruno Senzio-Savino</strong>",
venue:"Master Thesis",
year:2017,
type:"Thesis",
image:"brainwave_modular_system.jpg",
youtube:"https://youtu.be/FN6Tui_sEzo?si=7YFRzopRgCEv1mxE",
language:["English"],
keywords:["EEG","BCI","SVM","Machine Learning", "Game Development", "Pattern Recognition","Arduino"],
link:"assets/pdf/Thesis/MS_Thesis.pdf",
abstract:"Modular architecture for EEG processing and low-cost BCI systems."
},

{
id:6,
title:"Non-Linear EEG Signal Feature Extraction and Healthy or Epileptic User Seizure Discrimination",
authors:"<strong>Bruno Senzio-Savino</strong> et al.",
venue:"ICTES",
year:2017,
type:"Conference",
image:"epileptic_eeg_detection.jpg",
language:["English"],
keywords:["EEG","SVM","DSP", "Hilbert-Huang Transform", "EMD", "Weighted Frequency","Arduino"],
link:"assets/pdf/International_First_Author/Non_linear_Epilepsy.pdf"
},

{
id:7,
title:"Implementation of a Cloud Processing Based Voice Communication and Noise Reduction Embedded System Network",
authors:"<strong>Bruno Senzio-Savino</strong>, M.R. Alsharif, Y. Yabiku",
venue:"ICTES",
year:2017,
type:"Conference",
image:"cloud_voice_processing.jpg",
github:"https://github.com/Bsenzio/Wtransfer_Arduino",
language:["English"],
keywords:["Arduino","Intel Edison","DSP", "Cloud", "Weighted Averaging"],
link:"assets/pdf/International_First_Author/Cloud_NR_System.pdf"
},

{
id:8,
title:"Brain Wave Pattern Classification from Virtual Training Environment by Self-Organizing Maps",
authors:"<strong>Bruno Senzio-Savino</strong> et al.",
venue:"ITC-CSCC",
year:2016,
type:"Conference",
image:"brainwave_som.jpg",
youtube:"https://youtu.be/FN6Tui_sEzo?si=7YFRzopRgCEv1mxE",
language:["English"],
keywords:["EEG","BCI","SOM","Machine Learning", "Game Development", "Pattern Recognition","Arduino"],
link:"assets/pdf/International_First_Author/Brain_Wave_Pattern_Classification_from_Virtual_Training_Environment_by_Self-Organizing_Maps.pdf"
},

{
id:9,
title:"Disturbance Response and Stability Analysis of Wireless Tele-Control System for MIMO Plant",
authors:"F. Alsharif et al., <strong>Bruno Senzio-Savino</strong>",
venue:"ITC-CSCC",
year:2016,
type:"Conference",
image:"wireless_mimo_control.jpg",
language:["English"],
keywords:["Wireless Control","MIMO", "Multipath Channel Equalization"],
link:"assets/pdf/International_Coauthor/Disturbance_Response_and_Stability_Analysis_of_Wireless_Telecontrol_System_for_MIMO_Plant.pdf"
},

{
id:10,
title:"On the Effect of Informed Nodes on Learning over Complex Adaptive Networks",
authors:"M. Farhid et al., <strong>Bruno Senzio-Savino</strong>",
venue:"ITC-CSCC",
year:2016,
type:"Conference",
image:"adaptive_network_learning.jpg",
language:["English"],
keywords:["Adaptive Network","Diffusion LMS", "Mean Square Dervation", "Distributed Estimation"],
link:"assets/pdf/International_Coauthor/On_the_Effect_of_Informed_Nodes_on_Learning_Over_Complex_Adaptative_Networks.pdf"
},

{
id:11,
title:"A New Double Adaptation Algorithm for Acoustic Noise Control",
authors:"M.R. Alsharif et al., <strong>Bruno Senzio-Savino</strong>",
venue:"ITC-CSCC",
year:2016,
type:"Conference",
image:"acoustic_noise_control.jpg",
language:["English"],
keywords:["Adaptive Filtering","LMS Adaptation", "Filtered-x LMS", "Smart Acoustic Room"],
link:"assets/pdf/International_Coauthor/A_New_Double_Adaptation_Algorithm_for_Acoustic_Noise_Control.pdf"
},

{
id:12,
title:"Classification of Attention Deficit Hyperactivity Disorder (ADHD) Using Non-Linear EEG Features",
authors:"A. Heidarpour et al., <strong>Bruno Senzio-Savino</strong>",
venue:"ITC-CSCC",
year:2016,
type:"Conference",
image:"adhd_eeg_classification.jpg",
language:["English"],
keywords:["ADHD","EMD", "Wilcoxon Test", "SVM"],
link:"assets/pdf/International_Coauthor/Classification_of_Attention_deficit_hyperactivity_disorder_ADHD_by_Extracting_nonlinear_Features_of_Childrens_EEG.pdf"
},

{
id:13,
title:"Tractor Oil Pump Fault Diagnosis by Pseudo-Spectrum Analysis",
authors:"S. Gupta et al., <strong>Bruno Senzio-Savino</strong>",
venue:"ITC-CSCC",
year:2016,
type:"Conference",
image:"tractor_fault_diagnosis.jpg",
language:["English"],
keywords:["Fault Diagnosis", "Oil Pump","Pseudo Spectrum", "Vibration Sound Track"],
link:"assets/pdf/International_Coauthor/Tractor_Oil_Pump_Fault_Diagnosis_by_Pseudospectrum_Analysis_of_Vehicle_Sound_Records.pdf"
},

{
id:14,
title:"Density Based Support Vector Machine Classification for a Synchronous EEG Path Tracing Virtual Environment",
authors:"<strong>Bruno Senzio-Savino</strong> et al.",
venue:"ICIIBMS",
year:2015,
type:"Conference",
image:"dbsvm_path.jpg",
youtube:"https://youtu.be/FN6Tui_sEzo?si=7YFRzopRgCEv1mxE",
language:["English"],
keywords:["BCI", "MindWave","SVM", "Game Development", "Machine Learning", "Pattern Recognition","Arduino"],
doi:"10.1109/ICIIBMS.2015.7439486",
link:"assets/pdf/International_First_Author/EEGSVMBrunoT2-20822.pdf"
},

{
id:15,
title:"Synchronous Emotion Pattern Recognition with a Virtual Training Environment",
authors:"<strong>Bruno Senzio-Savino</strong>",
venue:"ICAI",
year:2015,
type:"Conference",
image:"emotion_recognition_vr.jpg",
youtube:"https://youtu.be/FN6Tui_sEzo?si=7YFRzopRgCEv1mxE",
language:["English"],
keywords:["BCI", "MindWave","SVM", "Game Development", "Machine Learning", "Pattern Recognition","Arduino"],
link:"assets/pdf/International_First_Author/ICA2627.pdf"
},

{
id:16,
title:"Stability and Performance Evaluation of Wireless Tele-Control System for MIMO Plant",
authors:"F. Alsharif et al., <strong>Bruno Senzio-Savino</strong>",
venue:"ICWN",
year:2015,
type:"Conference",
image:"stability_mimo.jpg",
language:["English"],
keywords:["Wireless Control","MIMO", "Multipath Channel Equalization"],
link:"assets/pdf/International_Coauthor/ICW2737.pdf"
},

{
id:17,
title:"Test and Development of a Brainwave Password Application",
authors:"<strong>Bruno Senzio-Savino</strong>, K. Yamada",
venue:"IEEE/SICE",
year:2014,
type:"Conference",
image:"brainwave_password.jpg",
language:["English", "Japanese"],
keywords:["BCI","EEG", "Pattern Recognition"],
link:"assets/pdf/International_First_Author/SIP2014.pdf"
},

{
id:18,
title:"Remote Operation of a Parabolic Motion and Free Fall Experiment",
authors:"<strong>Bruno Senzio-Savino</strong>",
venue:"ICIAS",
year:2011,
type:"Conference",
image:"remote_parabolic_motion.jpg",
youtube:"https://youtu.be/BFOjEwmgu6E",
language:["English", "Spanish"],
keywords:["Parabolic Motion","Teleoperation", "Embedded Systems", "System Control"],
link:"https://www.researchgate.net/publication/280599430_Remote_operation_of_a_parabolic_motion_and_free_fall_experiment"
},

{
id:19,
title:"Instrumentation and Control for the Remote Operation of the Projectile Motion and Free-Fall Experiment",
authors:"<strong>Bruno Senzio-Savino</strong>",
venue:"Bachelor Thesis",
year:2011,
type:"Thesis",
image:"projectile_motion_lab.jpg",
youtube:"https://youtu.be/BFOjEwmgu6E",
language:["Spanish"],
keywords:["Parabolic Motion","Teleoperation", "Embedded Systems", "System Control"],
link:"assets/pdf/Thesis/BS_Thesis.pdf"
},

{
id:20,
title:"Experimental Determination of an Irregular Object's Moment of Inertia",
authors:"Y. Minami Koyama et al., <strong>Bruno Senzio-Savino</strong>",
venue:"ICIAS",
year:2009,
type:"Conference",
image:"pmoment_of_inertia.jpg",
language:["English", "Spanish"],
keywords:["Moment of intertia","Irregular Objects", "Experimental Method", "Oscillating Platform"],
link:"https://www.researchgate.net/publication/267379166_EXPERIMENTAL_DETERMINATION_OF_AN_IRREGULAR_OBJECT'S_MOMENT_OF_INERTIA"
},

{
id:21,
title:"Mobile Robot Navigation with a Wiimote",
authors:"<strong>Bruno Senzio-Savino</strong>",
venue:"ICIAS",
year:2009,
type:"Conference",
image:"wiimote_robot.jpg",
youtube:"https://youtu.be/qE38qtjhbLs",
language:["English", "Spanish"],
keywords:["Wiimote","Navigation", "Teleoperation", "Mobile Robot", "HMI"],
link:"https://www.researchgate.net/publication/269278243_Mobile_robot_navigation_with_a_Wiimote"
},

{
id:22,
title:"Feature Extraction and Classification of Attention and Meditation EEG Signals Using Moving Average Methods",
authors:"H. Takahashi et al., <strong>Bruno Senzio-Savino</strong>",
venue:"IEEJ",
year:2016,
type:"Conference",
image:"featureEEG.jpg",
language:["English", "Japanese"],
keywords:["BCI","Feature Extraction", "SVM", "ARMA", "Moving Average", "PCA"],
link:"assets/pdf/National_Coauthor/16-19.pdf"
},

{
id:23,
title:"Mixed Reality Environment Generation Technology",
authors:"<strong>Bruno Senzio-Savino</strong>, Alfredo Gilbert",
venue:"Patent MXa2025009159",
year:2025,
type:"Patent",
image:"mixed_reality_patent.jpg",
language:["Spanish"],
keywords:["XR", "Embedded Systems", "Augmented Reality"],
youtube:"https://youtu.be/AeA8wv9oNZQ",
link:"assets/pdf/Patents/mixed_reality_patent.pdf"
},

{
id:24,
title:"Matrix Electromagnetic Transduction System",
authors:"<strong>Bruno Senzio-Savino</strong>",
venue:"Patent MXa2023002399",
year:2024,
type:"Patent",
image:"electromagnetic_transduction.jpg",
youtube:"https://youtu.be/TWv7ySUl4P0?si=9eY6XIpPea0iGKkp",
language:["Spanish"],
keywords:["Electromagnetic Transduction", "Wireless Power Transfer", "Inductive Coupling Matrix", "Interactive Smart Objects"],
link:"assets/pdf/Patents/electromagnetic_transduction.pdf"
},

{
id:25,
title:"Interactive Biosignal Processing System with Sensor Feedback",
authors:"<strong>Bruno Senzio-Savino</strong>",
venue:"Patent 388756",
year:2018,
type:"Patent",
image:"biosignal_feedback_system.jpg",
language:["Spanish"],
keywords:["BCI", "Embedded Systems", "Wearables", "E-textiles"],
link:"assets/pdf/Patents/biosignal_feedback_system.pdf"
}

];
// =========================
// GLOBALS
// =========================

let selectedKeywords = [];

// =========================
// KEYWORD TAGS
// =========================

function renderSelectedKeywords() {

    const container =
    document.getElementById("selectedKeywords");

    if(!container) return;

    container.innerHTML = "";

    selectedKeywords.forEach(keyword => {

        const tag =
        document.createElement("span");

        tag.className =
        "selected-keyword";

        tag.innerHTML = `
            ${keyword}
            <button
                class="remove-keyword"
                data-keyword="${keyword}">
                ×
            </button>
        `;

        container.appendChild(tag);

    });

    document
    .querySelectorAll(".remove-keyword")
    .forEach(button => {

        button.addEventListener("click", () => {

            removeKeyword(
                button.dataset.keyword
            );

        });

    });

}

function removeKeyword(keyword){

    selectedKeywords =
    selectedKeywords.filter(
        k => k !== keyword
    );

    renderSelectedKeywords();
    renderPublications();

}

// =========================
// RENDER ENGINE
// =========================

function renderPublications() {

    const search =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    const year =
    document
    .getElementById("yearFilter")
    .value;

    const type =
    document
    .getElementById("typeFilter")
    .value;

    const language =
    document
    .getElementById("languageFilter")
    .value;

    const filtered =
    publications.filter(pub => {

        const matchesSearch =

            pub.title
            .toLowerCase()
            .includes(search)

            ||

            pub.authors
            .toLowerCase()
            .includes(search)

            ||

            pub.venue
            .toLowerCase()
            .includes(search)

            ||

            (
                pub.keywords &&
                pub.keywords
                .join(" ")
                .toLowerCase()
                .includes(search)
            );

        const matchesYear =

            year === "all" ||

            pub.year.toString() === year;

        const matchesType =

            type === "all" ||

            pub.type === type;

        const matchesLanguage =

            language === "all" ||

            (
                pub.language &&
                pub.language.includes(language)
            );

        const matchesKeyword =

            selectedKeywords.length === 0 ||

            selectedKeywords.every(
                keyword =>
                (pub.keywords || [])
                .includes(keyword)
            );

        return (
            matchesSearch &&
            matchesYear &&
            matchesType &&
            matchesLanguage &&
            matchesKeyword
        );

    });

    filtered.sort(
        (a,b) => b.year - a.year
    );

    document
    .getElementById("resultCount")
    .innerHTML =

    `Showing <strong>${filtered.length}</strong> of ${publications.length} records`;

    const container =
    document.getElementById(
        "publicationsContainer"
    );

    container.innerHTML = "";

    filtered.forEach(pub => {

    const languageTags =
    (pub.language || [])
    .map(lang =>
    `<span class="tag language-tag">${lang}</span>`)
    .join("");

    const keywordTags =
    (pub.keywords || [])
    .map(keyword =>
    `<span class="tag keyword-tag">${keyword}</span>`)
    .join("");

    const abstractSection =
    pub.abstract
    ?
    `
    <div class="publication-abstract">
        <strong>Abstract:</strong>
        ${pub.abstract}
    </div>
    `
    :
    "";

    const doiSection =
    pub.doi
    ?
    `
    <p class="publication-doi">
        <strong>DOI:</strong>
        ${pub.doi}
    </p>
    `
    :
    "";

    // ---------------------
    // BUTTONS
    // ---------------------

    const publicationButton =
    pub.link
    ?
    `
    <a
        href="${pub.link}"
        target="_blank"
        class="paper-button"
    >
        📄 Publication
    </a>
    `
    :
    "";

    const youtubeButton =
    pub.youtube
    ?
    `
    <a
        href="${pub.youtube}"
        target="_blank"
        class="paper-button youtube-btn"
    >
        <i class="fab fa-youtube"></i>
        Video
    </a>
    `
    :
    "";

    const githubButton =
    pub.github
    ?
    `
    <a
        href="${pub.github}"
        target="_blank"
        class="paper-button github-btn"
    >
        <i class="fab fa-github"></i>
        Repository
    </a>
    `
    :
    "";

	container.innerHTML += `

	<div class="publication-card">

		<div class="publication-glow"></div>

		<div class="publication-thumbnail">

			<img
				src="assets/publications/${pub.image}"
				alt="${pub.title}"
			>

		</div>

		<div class="publication-content">

			<div class="publication-header">

				<span class="publication-year">
					${pub.year}
				</span>

				<span class="publication-type">
					${pub.type}
				</span>

			</div>

			<h3 class="publication-title">
				${pub.title}
			</h3>

			<p class="publication-authors">
				${pub.authors}
			</p>

			<p class="publication-venue">
				<em>${pub.venue}</em>
			</p>

			${doiSection}

			${abstractSection}

			<div class="publication-tags">
				${languageTags}
			</div>

			<div class="publication-tags">
				${keywordTags}
			</div>

			<div class="publication-links">
				${publicationButton}
				${youtubeButton}
				${githubButton}
			</div>

		</div>

	</div>

	`;

});

}

// =========================
// INITIALIZATION
// =========================

document.addEventListener(
"DOMContentLoaded",
() => {

    // YEARS

    const years =

    [...new Set(
        publications.map(
            p => p.year
        )
    )]
    .sort((a,b)=>b-a);

    const yearSelect =
    document.getElementById(
        "yearFilter"
    );

    years.forEach(year => {

        const option =
        document.createElement(
            "option"
        );

        option.value = year;
        option.textContent = year;

        yearSelect.appendChild(
            option
        );

    });

    // LANGUAGES

    const languages =

    [...new Set(

        publications.flatMap(
            p => p.language || []
        )

    )]
    .sort();

    const languageSelect =
    document.getElementById(
        "languageFilter"
    );

    languages.forEach(language => {

        const option =
        document.createElement(
            "option"
        );

        option.value = language;
        option.textContent = language;

        languageSelect
        .appendChild(option);

    });

    // KEYWORDS

    const keywords =

    [...new Set(

        publications.flatMap(
            p => p.keywords || []
        )

    )]
    .sort();

    const keywordSelect =
    document.getElementById(
        "keywordFilter"
    );

    keywords.forEach(keyword => {

        const option =
        document.createElement(
            "option"
        );

        option.value = keyword;
        option.textContent = keyword;

        keywordSelect
        .appendChild(option);

    });

    // EVENTS

    document
    .getElementById(
        "searchButton"
    )
    .addEventListener(
        "click",
        renderPublications
    );

    document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "keyup",
        function(event){

            if(
                event.key === "Enter"
            ){
                renderPublications();
            }

        }
    );

    document
    .getElementById(
        "yearFilter"
    )
    .addEventListener(
        "change",
        renderPublications
    );

    document
    .getElementById(
        "typeFilter"
    )
    .addEventListener(
        "change",
        renderPublications
    );

    document
    .getElementById(
        "languageFilter"
    )
    .addEventListener(
        "change",
        renderPublications
    );

    document
    .getElementById(
        "keywordFilter"
    )
    .addEventListener(
        "change",
        function(){

            const keyword =
            this.value;

            if(
                keyword !== "all" &&
                !selectedKeywords.includes(keyword)
            ){
                selectedKeywords.push(
                    keyword
                );
            }

            renderSelectedKeywords();
            renderPublications();

            this.value = "all";

        }
    );

    renderPublications();

});