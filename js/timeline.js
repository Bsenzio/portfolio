// Career archive in English, updated from the supplied dated CV screenshots.
// date is YYYY-MM when the month was supplied; project/publication dates retain year precision.
const careerEvents = [
  {
    "id": "chapter-1",
    "year": "2006",
    "kind": "Education",
    "title": "Mechatronics studies at UNAM",
    "description": "Began undergraduate studies in mechatronics at the Faculty of Engineering, National Autonomous University of Mexico.",
    "link": "",
    "date": "2006-08"
  },
  {
    "id": "chapter-12",
    "year": "2009",
    "kind": "Projects",
    "title": "Mobile Robot Development",
    "description": "Robotics · Autonomous Robot Hardware Development and Deployment",
    "link": "projects.html"
  },
  {
    "id": "chapter-13",
    "year": "2009",
    "kind": "Projects",
    "title": "Wiimote SCARA Arm",
    "description": "Robotics · A pioneer SCARA arm prototype controlled with Wiimote",
    "link": "projects.html"
  },
  {
    "id": "chapter-68",
    "year": "2009",
    "kind": "Publications",
    "title": "Experimental Determination of an Irregular Object's Moment of Inertia",
    "description": "ICIAS",
    "link": "publications.html"
  },
  {
    "id": "chapter-69",
    "year": "2009",
    "kind": "Publications",
    "title": "Mobile Robot Navigation with a Wiimote",
    "description": "ICIAS",
    "link": "publications.html"
  },
  {
    "id": "chapter-14",
    "year": "2010",
    "kind": "Projects",
    "title": "Bruno Kart",
    "description": "Robotics · A pioneer Wiimote Controlled Mobile Robot",
    "link": "projects.html"
  },
  {
    "id": "chapter-15",
    "year": "2010",
    "kind": "Projects",
    "title": "Cannonball",
    "description": "Robotics · A pioneer Wiimote Controlled Mobile Robot",
    "link": "projects.html"
  },
  {
    "id": "dated-84",
    "year": "2010",
    "date": "2010-07",
    "kind": "Career",
    "title": "Joined Proveedora Mexicana de Monofilamentos S.A. de C.V.",
    "description": "Started as Plant Engineer.",
    "link": ""
  },
  {
    "id": "chapter-3",
    "year": "2010",
    "kind": "Awards",
    "title": "Faculty of Engineering Best Student Award",
    "description": "Faculty of Engineering Best Student Award, National Autonomous University of Mexico.",
    "link": "",
    "date": "2010-10"
  },
  {
    "id": "chapter-29",
    "year": "2011",
    "kind": "Projects",
    "title": "AoLDC",
    "description": "Products · One layer of different acrylic products",
    "link": "projects.html"
  },
  {
    "id": "chapter-66",
    "year": "2011",
    "kind": "Publications",
    "title": "Remote Operation of a Parabolic Motion and Free Fall Experiment",
    "description": "ICIAS",
    "link": "publications.html"
  },
  {
    "id": "chapter-67",
    "year": "2011",
    "kind": "Publications",
    "title": "Instrumentation and Control for the Remote Operation of the Projectile Motion and Free-Fall Experiment",
    "description": "Bachelor Thesis",
    "link": "publications.html"
  },
  {
    "id": "chapter-2",
    "year": "2011",
    "kind": "Education",
    "title": "Undergraduate graduation — UNAM",
    "description": "Completed undergraduate studies in mechatronics engineering.",
    "link": "",
    "date": "2011-05"
  },
  {
    "id": "dated-85",
    "year": "2011",
    "date": "2011-05",
    "kind": "Career",
    "title": "Concluded appointment — Proveedora Mexicana de Monofilamentos S.A. de C.V.",
    "description": "Concluded the Plant Engineer appointment.",
    "link": ""
  },
  {
    "id": "dated-86",
    "year": "2011",
    "date": "2011-06",
    "kind": "Career",
    "title": "Joined Arrow Electronics Inc.",
    "description": "Started as Field Applications Engineer.",
    "link": ""
  },
  {
    "id": "dated-88",
    "year": "2011",
    "date": "2011-11",
    "kind": "Career",
    "title": "Joined Recicla para Ayudar a Quien Más lo Necesita A.C.",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-20",
    "year": "2012",
    "kind": "Projects",
    "title": "BCI Neurocar",
    "description": "BCI · A BCI car prototype to be used from PET recycling funding to help handicap.",
    "link": "projects.html"
  },
  {
    "id": "chapter-27",
    "year": "2012",
    "kind": "Projects",
    "title": "Laser Engravings",
    "description": "Products · Special Engravings and fabrications",
    "link": "projects.html"
  },
  {
    "id": "chapter-28",
    "year": "2012",
    "kind": "Projects",
    "title": "AoLDC Apparrel",
    "description": "Products · One layer of different acrylic products Light Displays",
    "link": "projects.html"
  },
  {
    "id": "chapter-36",
    "year": "2012",
    "kind": "Projects",
    "title": "BCI and Robotics for Schools",
    "description": "Social Causes · Trading PET for BCI Robotics education at schools",
    "link": "projects.html"
  },
  {
    "id": "chapter-37",
    "year": "2012",
    "kind": "Projects",
    "title": "Recicla para Ayudar",
    "description": "Social Causes · A social cause project PET recycling to support lighting marginalized communities",
    "link": "projects.html"
  },
  {
    "id": "chapter-38",
    "year": "2012",
    "kind": "Projects",
    "title": "Local PET Gathering",
    "description": "Social Causes · PET Gathering at schools",
    "link": "projects.html"
  },
  {
    "id": "chapter-75",
    "year": "2012",
    "kind": "Activities",
    "title": "Arduino and Applications in the Industry",
    "description": "Speaker, Instituto Politécnico Nacional, March 2012. Demonstrations and practical exploration of academic and industrial Arduino applications.",
    "link": ""
  },
  {
    "id": "dated-89",
    "year": "2012",
    "date": "2012-12",
    "kind": "Career",
    "title": "Concluded appointment — Recicla para Ayudar a Quien Más lo Necesita A.C.",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-26",
    "year": "2013",
    "kind": "Projects",
    "title": "Electric Fence",
    "description": "Products · Electric Fence and Gate controllers",
    "link": "projects.html"
  },
  {
    "id": "dated-90",
    "year": "2013",
    "date": "2013-01",
    "kind": "Career",
    "title": "Joined Azul 257",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-19",
    "year": "2014",
    "kind": "Projects",
    "title": "3D Mindwave Unity Environment",
    "description": "BCI · A 3D Interactive BCI Environment",
    "link": "projects.html"
  },
  {
    "id": "chapter-65",
    "year": "2014",
    "kind": "Publications",
    "title": "Test and Development of a Brainwave Password Application",
    "description": "IEEE/SICE",
    "link": "publications.html"
  },
  {
    "id": "dated-91",
    "year": "2014",
    "date": "2014-01",
    "kind": "Career",
    "title": "Concluded appointment — Azul 257",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-4",
    "year": "2014",
    "kind": "Awards",
    "title": "MEXT Scholarship",
    "description": "Japanese Government Scholarship, embassy recommendation route.",
    "link": "",
    "date": "2014-04"
  },
  {
    "id": "dated-87",
    "year": "2014",
    "date": "2014-04",
    "kind": "Career",
    "title": "Concluded appointment — Arrow Electronics Inc.",
    "description": "Concluded the Field Applications Engineer appointment.",
    "link": ""
  },
  {
    "id": "chapter-47",
    "year": "2015",
    "kind": "Projects",
    "title": "Ganbare Shisa",
    "description": "Games · Small Blender Animation Drafting",
    "link": "projects.html"
  },
  {
    "id": "chapter-52",
    "year": "2015",
    "kind": "Publications",
    "title": "Path Detection in Virtual Environment for Synchronous EEG by Density-Based Support Vector Machine",
    "description": "Journal of Information and Communications Engineering",
    "link": "publications.html"
  },
  {
    "id": "chapter-62",
    "year": "2015",
    "kind": "Publications",
    "title": "Density Based Support Vector Machine Classification for a Synchronous EEG Path Tracing Virtual Environment",
    "description": "ICIIBMS",
    "link": "publications.html"
  },
  {
    "id": "chapter-63",
    "year": "2015",
    "kind": "Publications",
    "title": "Synchronous Emotion Pattern Recognition with a Virtual Training Environment",
    "description": "ICAI",
    "link": "publications.html"
  },
  {
    "id": "chapter-64",
    "year": "2015",
    "kind": "Publications",
    "title": "Stability and Performance Evaluation of Wireless Tele-Control System for MIMO Plant",
    "description": "ICWN",
    "link": "publications.html"
  },
  {
    "id": "chapter-5",
    "year": "2015",
    "kind": "Education",
    "title": "Master’s studies — University of the Ryukyus",
    "description": "Entered the master’s program in information engineering, Graduate School of Engineering and Science.",
    "link": "",
    "date": "2015-04"
  },
  {
    "id": "dated-92",
    "year": "2015",
    "date": "2015-08",
    "kind": "Career",
    "title": "Joined Mirai Innovation Lab",
    "description": "Started as Lead Hardware and Product Developer.",
    "link": ""
  },
  {
    "id": "chapter-10",
    "year": "2016",
    "kind": "Projects",
    "title": "Machine Learning for BCI",
    "description": "AI · Unsupervised and Supervised Learning for BCI",
    "link": "projects.html"
  },
  {
    "id": "chapter-16",
    "year": "2016",
    "kind": "Projects",
    "title": "Hand Augmentation",
    "description": "Robotics · A supernumerary robotic limb hand robot",
    "link": "projects.html"
  },
  {
    "id": "chapter-51",
    "year": "2016",
    "kind": "Publications",
    "title": "Brain Wave Pattern Classification: Towards the Design of an Effective Online Classifier",
    "description": "European Journal of Information Science and Technology",
    "link": "publications.html"
  },
  {
    "id": "chapter-56",
    "year": "2016",
    "kind": "Publications",
    "title": "Brain Wave Pattern Classification from Virtual Training Environment by Self-Organizing Maps",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-57",
    "year": "2016",
    "kind": "Publications",
    "title": "Disturbance Response and Stability Analysis of Wireless Tele-Control System for MIMO Plant",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-58",
    "year": "2016",
    "kind": "Publications",
    "title": "On the Effect of Informed Nodes on Learning over Complex Adaptive Networks",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-59",
    "year": "2016",
    "kind": "Publications",
    "title": "A New Double Adaptation Algorithm for Acoustic Noise Control",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-60",
    "year": "2016",
    "kind": "Publications",
    "title": "Classification of Attention Deficit Hyperactivity Disorder (ADHD) Using Non-Linear EEG Features",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-61",
    "year": "2016",
    "kind": "Publications",
    "title": "Tractor Oil Pump Fault Diagnosis by Pseudo-Spectrum Analysis",
    "description": "ITC-CSCC",
    "link": "publications.html"
  },
  {
    "id": "chapter-70",
    "year": "2016",
    "kind": "Publications",
    "title": "Feature Extraction and Classification of Attention and Meditation EEG Signals Using Moving Average Methods",
    "description": "IEEJ",
    "link": "publications.html"
  },
  {
    "id": "chapter-9",
    "year": "2016",
    "kind": "Projects",
    "title": "Face Mask Detection",
    "description": "AI · Edge AI Implementation on NPU",
    "link": "projects.html"
  },
  {
    "id": "chapter-18",
    "year": "2017",
    "kind": "Projects",
    "title": "Aura EEG Device",
    "description": "BCI · An EEG Reading Harwdare Device",
    "link": "projects.html"
  },
  {
    "id": "chapter-50",
    "year": "2017",
    "kind": "Publications",
    "title": "An Online Synchronous Brain Wave Signal Pattern Classifier with Parallel Processing Optimization for Embedded System Implementation",
    "description": "International Journal of Advanced Computer Science and Applications",
    "link": "publications.html"
  },
  {
    "id": "chapter-53",
    "year": "2017",
    "kind": "Publications",
    "title": "BrainWave Processing Modular System",
    "description": "Master Thesis",
    "link": "publications.html"
  },
  {
    "id": "chapter-54",
    "year": "2017",
    "kind": "Publications",
    "title": "Non-Linear EEG Signal Feature Extraction and Healthy or Epileptic User Seizure Discrimination",
    "description": "ICTES",
    "link": "publications.html"
  },
  {
    "id": "chapter-55",
    "year": "2017",
    "kind": "Publications",
    "title": "Implementation of a Cloud Processing Based Voice Communication and Noise Reduction Embedded System Network",
    "description": "ICTES",
    "link": "publications.html"
  },
  {
    "id": "chapter-6",
    "year": "2017",
    "kind": "Education",
    "title": "M.S. in Information Engineering",
    "description": "Completed the master’s program at the University of the Ryukyus.",
    "link": "",
    "date": "2017-03"
  },
  {
    "id": "chapter-7",
    "year": "2017",
    "kind": "Awards",
    "title": "Graduate School Dean’s Award",
    "description": "Graduate School of Engineering and Science, University of the Ryukyus.",
    "link": "",
    "date": "2017-03"
  },
  {
    "id": "dated-78",
    "year": "2017",
    "date": "2017-04",
    "kind": "Education",
    "title": "Doctoral studies — Osaka University",
    "description": "Entered the doctoral program at the Graduate School of Engineering Science, Osaka University.",
    "link": ""
  },
  {
    "id": "dated-94",
    "year": "2017",
    "date": "2017-04",
    "kind": "Career",
    "title": "Joined Advanced Telecommunications Research Institute International (ATR)",
    "description": "Started as Research Trainee.",
    "link": ""
  },
  {
    "id": "chapter-11",
    "year": "2018",
    "kind": "Projects",
    "title": "OCR Pharmacy Prescription for Fillers",
    "description": "AI · An AI OCR recognition platform for medical prescription filling machines",
    "link": "projects.html"
  },
  {
    "id": "chapter-21",
    "year": "2018",
    "kind": "Projects",
    "title": "BMI for Supernumerary",
    "description": "BCI · BMI to perform a goal-oriented task while simultaneously using their own arms to do a different task.",
    "link": "projects.html"
  },
  {
    "id": "dated-79",
    "year": "2018",
    "date": "2018-03",
    "kind": "Education",
    "title": "Osaka University — withdrawal from doctoral studies",
    "description": "Withdrew from the doctoral program; no doctoral degree is claimed.",
    "link": ""
  },
  {
    "id": "dated-95",
    "year": "2018",
    "date": "2018-03",
    "kind": "Career",
    "title": "Concluded appointment — Advanced Telecommunications Research Institute International (ATR)",
    "description": "Concluded the Research Trainee appointment.",
    "link": ""
  },
  {
    "id": "dated-93",
    "year": "2018",
    "date": "2018-06",
    "kind": "Career",
    "title": "Concluded appointment — Mirai Innovation Lab",
    "description": "Concluded the Lead Hardware and Product Developer appointment.",
    "link": ""
  },
  {
    "id": "dated-96",
    "year": "2018",
    "date": "2018-06",
    "kind": "Career",
    "title": "Joined ZMP Inc.",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "chapter-73",
    "year": "2018",
    "kind": "Patents",
    "title": "Interactive Biosignal Processing System with Sensor Feedback",
    "description": "Granted patent No. 388756. Interactive biosignal processing system with sensor feedback.",
    "link": "publications.html",
    "date": "2018-09"
  },
  {
    "id": "chapter-23",
    "year": "2019",
    "kind": "Projects",
    "title": "BCI e-Textile",
    "description": "BCI · BMI Headset with e-textiles and use of wearable neurofeedback",
    "link": "projects.html"
  },
  {
    "id": "dated-80",
    "year": "2019",
    "date": "2019-06",
    "kind": "Education",
    "title": "Quantic School of Business and Technology — enrollment",
    "description": "Enrolled at Quantic School of Business and Technology.",
    "link": ""
  },
  {
    "id": "dated-81",
    "year": "2020",
    "date": "2020-06",
    "kind": "Education",
    "title": "Quantic School of Business and Technology — graduation",
    "description": "Graduated from Quantic School of Business and Technology. The specific program title has not been supplied.",
    "link": ""
  },
  {
    "id": "dated-97",
    "year": "2020",
    "date": "2020-09",
    "kind": "Career",
    "title": "Concluded appointment — ZMP Inc.",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "dated-98",
    "year": "2021",
    "date": "2021-03",
    "kind": "Career",
    "title": "Joined Arrow Electronics Inc.",
    "description": "Started as Dedicated Field Applications Engineer.",
    "link": ""
  },
  {
    "id": "chapter-24",
    "year": "2022",
    "kind": "Projects",
    "title": "Touch Water Dispenser",
    "description": "Products · Touch panel water dispensing machine with RFID",
    "link": "projects.html"
  },
  {
    "id": "chapter-25",
    "year": "2022",
    "kind": "Projects",
    "title": "Bus Tracking Device",
    "description": "Products · Bus GPS and GPRS Tracker",
    "link": "projects.html"
  },
  {
    "id": "dated-100",
    "year": "2022",
    "date": "2022-04",
    "kind": "Career",
    "title": "Joined University of Advanced Technologies",
    "description": "Started an appointment with the organization.",
    "link": ""
  },
  {
    "id": "dated-82",
    "year": "2022",
    "date": "2022-04",
    "kind": "Education",
    "title": "Master’s studies — University of Advanced Technologies",
    "description": "Entered a master’s program at the University of Advanced Technologies.",
    "link": ""
  },
  {
    "id": "dated-102",
    "year": "2022",
    "date": "2022-10",
    "kind": "Career",
    "title": "Joined Capgemini S. de R.L. de C.V.",
    "description": "Started as Senior Hardware Engineer.",
    "link": ""
  },
  {
    "id": "dated-99",
    "year": "2022",
    "date": "2022-10",
    "kind": "Career",
    "title": "Concluded appointment — Arrow Electronics Inc.",
    "description": "Concluded the Dedicated Field Applications Engineer appointment.",
    "link": ""
  },
  {
    "id": "chapter-17",
    "year": "2023",
    "kind": "Projects",
    "title": "Verdopplerbot AI V1",
    "description": "Robotics · Archwire bending Robot Machine",
    "link": "projects.html"
  },
  {
    "id": "chapter-30",
    "year": "2023",
    "kind": "Projects",
    "title": "VaSenzios",
    "description": "Products · An interactive inductive glass prototype",
    "link": "projects.html"
  },
  {
    "id": "chapter-31",
    "year": "2023",
    "kind": "Projects",
    "title": "Retail Level RGB LED Lamp",
    "description": "Products · An IR remote RGB Commercial Level Lamp",
    "link": "projects.html"
  },
  {
    "id": "chapter-32",
    "year": "2023",
    "kind": "Projects",
    "title": "Inductive Braille",
    "description": "Products · A dynamic Braille proposed",
    "link": "projects.html"
  },
  {
    "id": "chapter-39",
    "year": "2023",
    "kind": "Projects",
    "title": "Senior People Manufacturing",
    "description": "Social Causes · Senior people employment for electronics assembly program",
    "link": "projects.html"
  },
  {
    "id": "chapter-45",
    "year": "2023",
    "kind": "Projects",
    "title": "PDO 3D",
    "description": "Games · Mexican 3D Politics game",
    "link": "projects.html"
  },
  {
    "id": "chapter-46",
    "year": "2023",
    "kind": "Projects",
    "title": "PDO 2D",
    "description": "Games · Mexican 2D retro type game",
    "link": "projects.html"
  },
  {
    "id": "chapter-72",
    "year": "2024",
    "kind": "Patents",
    "title": "Matrix Electromagnetic Transduction System",
    "description": "Patent application MXa2023002399. Inductive array / matrix electromagnetic transduction system. Patent pending, as listed in the career record.",
    "link": "publications.html",
    "date": "2024-01"
  },
  {
    "id": "dated-101",
    "year": "2024",
    "date": "2024-04",
    "kind": "Career",
    "title": "Concluded appointment — University of Advanced Technologies",
    "description": "Concluded the appointment with the organization.",
    "link": ""
  },
  {
    "id": "dated-83",
    "year": "2024",
    "date": "2024-04",
    "kind": "Education",
    "title": "University of Advanced Technologies — withdrawal from master’s studies",
    "description": "Withdrew from the master’s program without submitting a thesis. No completed master’s degree is claimed for this program.",
    "link": ""
  },
  {
    "id": "chapter-8",
    "year": "2024",
    "kind": "Career",
    "title": "SenzioTek — independent venture",
    "description": "Established SenzioTek. Activities listed in the CV include freelance interpreting, electronics engineering and vehicle rental services.",
    "link": "",
    "date": "2024-09"
  },
  {
    "id": "dated-103",
    "year": "2024",
    "date": "2024-09",
    "kind": "Career",
    "title": "Concluded appointment — Capgemini S. de R.L. de C.V.",
    "description": "Concluded the Senior Hardware Engineer appointment.",
    "link": ""
  },
  {
    "id": "chapter-33",
    "year": "2025",
    "kind": "Projects",
    "title": "XR Interaction System",
    "description": "Products · A modular interaction framework for XR applications supporting hand tracking, eye tracking and immersive interfaces.",
    "link": "projects.html"
  },
  {
    "id": "chapter-35",
    "year": "2025",
    "kind": "Projects",
    "title": "Vegetables here, games there...",
    "description": "Social Causes · Spreading AI and AL through gaming experiences",
    "link": "projects.html"
  },
  {
    "id": "chapter-42",
    "year": "2025",
    "kind": "Projects",
    "title": "Where Are my Veggies",
    "description": "Games · GoL NES Implementation",
    "link": "projects.html"
  },
  {
    "id": "chapter-48",
    "year": "2025",
    "kind": "Projects",
    "title": "8-bit Trouble",
    "description": "Games · Fusion begins 2012, all your base are belong to us!!",
    "link": "projects.html"
  },
  {
    "id": "chapter-71",
    "year": "2025",
    "kind": "Patents",
    "title": "Mixed Reality Environment Generation Technology",
    "description": "Patent application MXa2025009159. Mixed reality system for generating interactive environments. Patent pending, as listed in the career record.",
    "link": "publications.html",
    "date": "2025-08"
  },
  {
    "id": "chapter-22",
    "year": "2026",
    "kind": "Projects",
    "title": "ALIFE26 BMI/AL Tutorial",
    "description": "BCI · From neural signals to AL interactive systems.",
    "link": "projects.html"
  },
  {
    "id": "chapter-34",
    "year": "2026",
    "kind": "Projects",
    "title": "Interative Arcade Machine",
    "description": "Products · An interactive Arcade machine with AI and custom games",
    "link": "projects.html"
  },
  {
    "id": "chapter-40",
    "year": "2026",
    "kind": "Projects",
    "title": "Okinawa Adventure 3D",
    "description": "Games · Okinawa culture 3D Experience",
    "link": "projects.html"
  },
  {
    "id": "chapter-41",
    "year": "2026",
    "kind": "Projects",
    "title": "Okinawa Adventure 2D",
    "description": "Games · Okinawa culture 2D Retro NES Game",
    "link": "projects.html"
  },
  {
    "id": "chapter-43",
    "year": "2026",
    "kind": "Projects",
    "title": "Stay Good: Barber Assault",
    "description": "Games · WebGL Implementation",
    "link": "projects.html"
  },
  {
    "id": "chapter-44",
    "year": "2026",
    "kind": "Projects",
    "title": "Nara Adventure",
    "description": "Games · Game of Nara Prefecture for Local Festivals",
    "link": "projects.html"
  },
  {
    "id": "chapter-49",
    "year": "2026",
    "kind": "Publications",
    "title": "Vegetables, Enemies, and Emergence: A Playable Game of Life on Nintendo for Educational Purposes",
    "description": "Innovations in Machine Intelligence",
    "link": "publications.html"
  },
  {
    "id": "chapter-76",
    "year": "2026",
    "kind": "Activities",
    "title": "Vegetables Here, Games There: BCI and New Horizons",
    "description": "Cross Labs YouTube interview, May 2026. A. Adam and B. Senzio-Savino; unconventional computing, Artificial Life and practical BCI applications.",
    "link": ""
  },
  {
    "id": "chapter-77",
    "year": "2026",
    "kind": "Activities",
    "title": "Hands-on Tutorial on Brain–Computer Interfaces (BCI)",
    "description": "ALIFE26, August 2026. Co-organizer with M. Khosravy, A. Adams and O. Witkowsky; integrating neural signals with adaptive and evolving systems.",
    "link": ""
  },
  {
    "id": "dated-104",
    "year": "2026",
    "date": "2026-03",
    "kind": "Qualifications",
    "title": "Class 3 Amateur Radio Operator License",
    "description": "Japan · License identifier EBYL00403.",
    "link": ""
  },
  {
    "id": "chapter-74",
    "year": "2026",
    "kind": "Patents",
    "title": "Liquid container assembly with removable optical projection base, and projection base module",
    "description": "Application identifier 100233478. Liquid container assembly with removable optical projection base, and projection base module. Patent pending.",
    "link": "publications.html",
    "date": "2026-06"
  }
];

const timelineData = careerEvents.map(event => ({year:event.year,title:event.title,description:event.description}));
