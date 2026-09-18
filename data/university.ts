/* ═══════════════════════════════════════════════════════════════════
   CUXTONAI ACADEMY UNIVERSITY — content source

   Every public page reads from this file. There is no database and no
   CMS behind the university site: the content below is illustrative
   placeholder copy for a demonstration build.

   Two rules were applied when writing it:
     1. No invented head-counts, rankings, employment rates, ratings,
        testimonials or accreditation claims. Where a figure appears on
        the site it is derived from this file at render time, so it is
        always true of the site itself.
     2. Faculty and student names are fictional. Nothing here should be
        read as a credential for a real person.
   ═══════════════════════════════════════════════════════════════════ */

export type ProgramLevel =
  | "Undergraduate"
  | "Graduate"
  | "Doctoral"
  | "Professional";

export const PROGRAM_LEVELS: ProgramLevel[] = [
  "Undergraduate",
  "Graduate",
  "Doctoral",
  "Professional",
];

export type School = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  image: string;
  themes: string[];
};

export type CurriculumStage = {
  title: string;
  note: string;
  modules: { code: string; name: string; credits: number }[];
};

export type Program = {
  slug: string;
  name: string;
  award: string;
  level: ProgramLevel;
  school: string;          // School.slug
  duration: string;
  mode: string;
  credits: string;
  intake: string[];
  location: string;
  summary: string;
  overview: string[];
  highlights: { title: string; detail: string }[];
  curriculum: CurriculumStage[];
  assessment: string[];
  entry: string[];
  careers: string[];
  faculty: string[];       // FacultyMember.slug
  image: string;
};

export type FacultyMember = {
  slug: string;
  name: string;
  title: string;
  school: string;          // School.slug
  interests: string[];
  bio: string;
  teaches: string[];
  portrait: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  category: "Research" | "Campus" | "Events" | "Announcements";
  date: string;            // ISO
  readingTime: string;
  excerpt: string;
  body: string[];
  image: string;
};

export type CampusEvent = {
  title: string;
  date: string;            // ISO
  time: string;
  venue: string;
  type: "Open day" | "Lecture" | "Workshop" | "Deadline";
  detail: string;
};

/* ── Schools ────────────────────────────────────────────────────── */

export const SCHOOLS: School[] = [
  {
    slug: "school-artificial-intelligence",
    name: "School of Artificial Intelligence",
    short: "Artificial Intelligence",
    summary:
      "Machine learning, reasoning, language and vision, taught alongside the mathematics and ethics that hold them up.",
    image: "/university/plate-ai.svg",
    themes: ["Machine learning", "Natural language", "Computer vision", "AI ethics"],
  },
  {
    slug: "school-computing",
    name: "School of Computing and Software Engineering",
    short: "Computing",
    summary:
      "The craft of building software that other people depend on: systems, languages, architecture and engineering practice.",
    image: "/university/plate-software.svg",
    themes: ["Software architecture", "Distributed systems", "Programming languages", "Developer tooling"],
  },
  {
    slug: "school-data",
    name: "School of Data and Decision Science",
    short: "Data Science",
    summary:
      "Turning measurement into evidence, and evidence into decisions people can defend.",
    image: "/university/plate-data.svg",
    themes: ["Statistics", "Causal inference", "Data engineering", "Visualisation"],
  },
  {
    slug: "school-cyber",
    name: "School of Cybersecurity and Networks",
    short: "Cybersecurity",
    summary:
      "How systems fail under pressure, how attackers think, and how defences are designed to survive both.",
    image: "/university/plate-security.svg",
    themes: ["Applied cryptography", "Network security", "Digital forensics", "Secure design"],
  },
  {
    slug: "school-digital-business",
    name: "School of Digital Business and Innovation",
    short: "Digital Business",
    summary:
      "Where technical judgement meets organisational reality: strategy, governance, product and change.",
    image: "/university/commons.svg",
    themes: ["Technology strategy", "Product management", "AI governance", "Innovation"],
  },
];

export const getSchool = (slug: string) => SCHOOLS.find((s) => s.slug === slug);

/* ── Faculty ────────────────────────────────────────────────────── */

export const FACULTY: FacultyMember[] = [
  {
    slug: "amara-okonkwo",
    name: "Prof. Amara Okonkwo",
    title: "Dean, School of Artificial Intelligence",
    school: "school-artificial-intelligence",
    interests: ["Machine reasoning", "Learning theory", "Evaluation methods"],
    bio: "Leads the School of Artificial Intelligence and teaches the first-year foundations sequence. Research work concerns how learning systems generalise beyond the data they were trained on, and how that generalisation should be measured.",
    teaches: ["Foundations of Artificial Intelligence", "Learning Theory"],
    portrait: "/university/faculty-ao.svg",
  },
  {
    slug: "mateo-rossi",
    name: "Prof. Mateo Rossi",
    title: "Chair, School of Computing and Software Engineering",
    school: "school-computing",
    interests: ["Distributed systems", "Compilers", "Systems teaching"],
    bio: "Chairs the School of Computing and Software Engineering. Teaching and research both centre on what makes large systems comprehensible: interfaces, failure modes, and the tools engineers use to reason about running code.",
    teaches: ["Operating Systems", "Distributed Systems"],
    portrait: "/university/faculty-mr.svg",
  },
  {
    slug: "jun-tanaka",
    name: "Dr. Jun Tanaka",
    title: "Associate Professor of Artificial Intelligence",
    school: "school-artificial-intelligence",
    interests: ["Computer vision", "Multimodal learning", "Representation"],
    bio: "Works on vision and multimodal models, with a particular interest in what representations actually encode. Supervises undergraduate capstone projects in perception and robotics.",
    teaches: ["Computer Vision", "Deep Learning"],
    portrait: "/university/faculty-jt.svg",
  },
  {
    slug: "lena-novak",
    name: "Dr. Lena Novak",
    title: "Associate Professor of Statistics",
    school: "school-data",
    interests: ["Causal inference", "Experimental design", "Statistical practice"],
    bio: "Teaches the statistics spine that runs through the data science degrees. Research concerns causal inference in settings where controlled experiments are not available, and the failure modes of observational study design.",
    teaches: ["Statistical Inference", "Causal Analysis"],
    portrait: "/university/faculty-ln.svg",
  },
  {
    slug: "daniel-kwarteng",
    name: "Prof. Daniel Kwarteng",
    title: "Chair, School of Cybersecurity and Networks",
    school: "school-cyber",
    interests: ["Applied cryptography", "Protocol analysis", "Secure systems"],
    bio: "Chairs the School of Cybersecurity and Networks and runs the protocol analysis laboratory. Teaching emphasises reading a design adversarially before writing a line of it.",
    teaches: ["Applied Cryptography", "Network Security"],
    portrait: "/university/faculty-dk.svg",
  },
  {
    slug: "sofia-bianchi",
    name: "Dr. Sofia Bianchi",
    title: "Senior Lecturer in Software Engineering",
    school: "school-computing",
    interests: ["Human-computer interaction", "Developer tools", "Software design"],
    bio: "Teaches software design and the studio modules where students build for a real brief. Research looks at how development tools shape the decisions engineers make without their noticing.",
    teaches: ["Software Design Studio", "Human-Computer Interaction"],
    portrait: "/university/faculty-sb.svg",
  },
  {
    slug: "hana-choi",
    name: "Dr. Hana Choi",
    title: "Assistant Professor of Natural Language Processing",
    school: "school-artificial-intelligence",
    interests: ["Language models", "Evaluation", "Low-resource languages"],
    bio: "Researches language technology for languages with little written data, and the evaluation methods used to claim progress. Convenes the natural language processing modules across the graduate programmes.",
    teaches: ["Natural Language Processing", "Language Model Evaluation"],
    portrait: "/university/faculty-hc.svg",
  },
  {
    slug: "elias-mbeki",
    name: "Prof. Elias Mbeki",
    title: "Dean of Research",
    school: "school-computing",
    interests: ["Machine learning systems", "High-performance computing", "Research methods"],
    bio: "Dean of Research, responsible for the doctoral programmes and the research centres. Research background is in the systems engineering that makes large-scale training and inference practical.",
    teaches: ["Research Methods", "Machine Learning Systems"],
    portrait: "/university/faculty-em.svg",
  },
  {
    slug: "priya-varma",
    name: "Dr. Priya Varma",
    title: "Senior Lecturer in Data Engineering",
    school: "school-data",
    interests: ["Data systems", "Stream processing", "Data quality"],
    bio: "Teaches the data engineering sequence, from storage layouts to streaming pipelines. Particular interest in data quality as an engineering discipline rather than an afterthought.",
    teaches: ["Data Engineering", "Stream Processing"],
    portrait: "/university/faculty-pv.svg",
  },
  {
    slug: "noah-adler",
    name: "Dr. Noah Adler",
    title: "Assistant Professor of Technology Strategy",
    school: "school-digital-business",
    interests: ["Technology strategy", "AI governance", "Organisational change"],
    bio: "Teaches strategy and governance to students who arrived as engineers. Research examines how organisations decide which technical capabilities to build, buy, or decline.",
    teaches: ["Technology Strategy", "AI Governance and Policy"],
    portrait: "/university/faculty-na.svg",
  },
];

export const getFaculty = (slug: string) => FACULTY.find((f) => f.slug === slug);

/* ── Programmes ─────────────────────────────────────────────────── */

export const PROGRAMS: Program[] = [
  {
    slug: "bsc-artificial-intelligence",
    name: "Artificial Intelligence",
    award: "BSc (Hons)",
    level: "Undergraduate",
    school: "school-artificial-intelligence",
    duration: "3 years full-time",
    mode: "Full-time, on campus",
    credits: "360 credits",
    intake: ["September", "January"],
    location: "Main campus",
    summary:
      "A three-year honours degree that builds artificial intelligence from its mathematical foundations up to working systems, with ethics taught as engineering rather than epilogue.",
    overview: [
      "The degree begins with the mathematics and programming that everything else rests on, then moves through classical machine learning into modern deep learning. By the final year you are choosing specialisms and building something substantial under supervision.",
      "Studio work runs alongside the lecture modules from the first term. You will be writing, training and breaking models continuously, because the difference between understanding a method and being able to apply it is only ever closed by practice.",
      "Graduates leave able to read a research paper, implement what it describes, and say honestly what it does not prove.",
    ],
    highlights: [
      { title: "Mathematics taught for use", detail: "Linear algebra, probability and optimisation are taught against the models that need them, not in isolation." },
      { title: "Laboratory from term one", detail: "Weekly supervised lab sessions with access to the school's shared compute cluster." },
      { title: "Final-year project", detail: "A two-term individual project supervised by a member of research staff." },
    ],
    curriculum: [
      {
        title: "Year one",
        note: "Foundations. No prior programming experience is assumed.",
        modules: [
          { code: "AI-101", name: "Foundations of Artificial Intelligence", credits: 30 },
          { code: "CS-110", name: "Programming and Data Structures", credits: 30 },
          { code: "MA-120", name: "Linear Algebra and Calculus", credits: 30 },
          { code: "MA-130", name: "Probability and Statistics", credits: 30 },
        ],
      },
      {
        title: "Year two",
        note: "Core methods, plus the first optional module.",
        modules: [
          { code: "AI-210", name: "Machine Learning", credits: 30 },
          { code: "AI-220", name: "Deep Learning", credits: 30 },
          { code: "CS-230", name: "Algorithms and Complexity", credits: 30 },
          { code: "AI-240", name: "Ethics, Safety and Accountability", credits: 30 },
        ],
      },
      {
        title: "Year three",
        note: "Specialisation and the individual project.",
        modules: [
          { code: "AI-310", name: "Natural Language Processing", credits: 30 },
          { code: "AI-320", name: "Computer Vision", credits: 30 },
          { code: "AI-340", name: "Reinforcement Learning (option)", credits: 30 },
          { code: "AI-390", name: "Individual Project", credits: 60 },
        ],
      },
    ],
    assessment: [
      "Coursework and laboratory portfolios across every module",
      "Written examinations in the mathematics and theory modules",
      "An individual final-year project, assessed by report and viva",
    ],
    entry: [
      "Secondary qualifications including mathematics at an advanced level",
      "Evidence of quantitative aptitude where the mathematics grade is borderline",
      "A personal statement setting out why this subject and why now",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Machine learning engineer",
      "Research assistant or doctoral study",
      "Data scientist",
      "Applied research engineer",
    ],
    faculty: ["amara-okonkwo", "jun-tanaka", "hana-choi"],
    image: "/university/plate-ai.svg",
  },
  {
    slug: "bsc-computer-science",
    name: "Computer Science",
    award: "BSc (Hons)",
    level: "Undergraduate",
    school: "school-computing",
    duration: "3 years full-time",
    mode: "Full-time, on campus",
    credits: "360 credits",
    intake: ["September"],
    location: "Main campus",
    summary:
      "A broad computer science degree with a strong systems spine: what the machine is really doing, and how to build software that keeps working once other people depend on it.",
    overview: [
      "The first year covers programming, discrete mathematics and machine architecture. The second turns towards the systems layer: operating systems, networks, databases and concurrency.",
      "The third year is a mix of advanced options and a substantial project, most often built for an external brief. Students choosing the industrial placement route extend the degree by a year.",
      "The degree is deliberately unfashionable in one respect. Fundamentals come first, because frameworks age and the fundamentals do not.",
    ],
    highlights: [
      { title: "Systems spine", detail: "Operating systems, networking and concurrency are compulsory, not optional." },
      { title: "Design studio", detail: "Team-based design modules where the brief is ambiguous on purpose." },
      { title: "Placement route", detail: "An optional placement year between the second and final years." },
    ],
    curriculum: [
      {
        title: "Year one",
        note: "Programming, mathematics and how a computer actually works.",
        modules: [
          { code: "CS-110", name: "Programming and Data Structures", credits: 30 },
          { code: "CS-120", name: "Computer Architecture", credits: 30 },
          { code: "MA-140", name: "Discrete Mathematics", credits: 30 },
          { code: "CS-150", name: "Web and Application Development", credits: 30 },
        ],
      },
      {
        title: "Year two",
        note: "The systems layer.",
        modules: [
          { code: "CS-210", name: "Operating Systems", credits: 30 },
          { code: "CS-220", name: "Databases and Storage", credits: 30 },
          { code: "CS-230", name: "Algorithms and Complexity", credits: 30 },
          { code: "CS-240", name: "Software Design Studio", credits: 30 },
        ],
      },
      {
        title: "Year three",
        note: "Options and the individual project.",
        modules: [
          { code: "CS-310", name: "Distributed Systems", credits: 30 },
          { code: "CS-320", name: "Programming Languages and Compilers", credits: 30 },
          { code: "CS-350", name: "Advanced option", credits: 30 },
          { code: "CS-390", name: "Individual Project", credits: 60 },
        ],
      },
    ],
    assessment: [
      "Practical coursework in every programming and systems module",
      "Examinations in theory and architecture modules",
      "Team assessment in the design studio, individually moderated",
      "An individual final-year project",
    ],
    entry: [
      "Secondary qualifications including mathematics",
      "A portfolio or written statement is welcomed but not required",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Software engineer",
      "Systems or platform engineer",
      "Site reliability engineer",
      "Graduate study in computing",
    ],
    faculty: ["mateo-rossi", "sofia-bianchi", "elias-mbeki"],
    image: "/university/plate-software.svg",
  },
  {
    slug: "bsc-data-science",
    name: "Data Science",
    award: "BSc (Hons)",
    level: "Undergraduate",
    school: "school-data",
    duration: "3 years full-time",
    mode: "Full-time, on campus",
    credits: "360 credits",
    intake: ["September"],
    location: "Main campus",
    summary:
      "Statistics, engineering and communication taught together, so that an analysis is not finished until someone else can act on it.",
    overview: [
      "Half of this degree is statistical reasoning and half is engineering. The combination is deliberate: most analytical failures in practice are not failures of modelling but of data handling, framing or communication.",
      "Students work with messy, realistic datasets from the first term, including data that is incomplete, mislabelled or collected for another purpose entirely.",
      "The final year includes a consultancy module in which teams take a question from an external partner and report back to them.",
    ],
    highlights: [
      { title: "Evidence before models", detail: "Study design and causal reasoning are taught before predictive modelling." },
      { title: "Real data, early", detail: "Messy datasets from the first term, with the cleaning treated as part of the work." },
      { title: "Consultancy module", detail: "A final-year team engagement with an external brief and a presented outcome." },
    ],
    curriculum: [
      {
        title: "Year one",
        note: "Statistical and computational foundations.",
        modules: [
          { code: "MA-130", name: "Probability and Statistics", credits: 30 },
          { code: "CS-110", name: "Programming and Data Structures", credits: 30 },
          { code: "DS-140", name: "Data Handling and Visualisation", credits: 30 },
          { code: "MA-120", name: "Linear Algebra and Calculus", credits: 30 },
        ],
      },
      {
        title: "Year two",
        note: "Inference and the engineering around it.",
        modules: [
          { code: "DS-210", name: "Statistical Inference", credits: 30 },
          { code: "DS-220", name: "Data Engineering", credits: 30 },
          { code: "AI-210", name: "Machine Learning", credits: 30 },
          { code: "DS-240", name: "Causal Analysis", credits: 30 },
        ],
      },
      {
        title: "Year three",
        note: "Applied work and the project.",
        modules: [
          { code: "DS-310", name: "Experimental Design", credits: 30 },
          { code: "DS-330", name: "Data Consultancy", credits: 30 },
          { code: "DS-350", name: "Advanced option", credits: 30 },
          { code: "DS-390", name: "Individual Project", credits: 60 },
        ],
      },
    ],
    assessment: [
      "Analytical coursework with written interpretation, not code alone",
      "Examinations in statistical theory",
      "A consultancy report and client presentation",
      "An individual final-year project",
    ],
    entry: [
      "Secondary qualifications including mathematics at an advanced level",
      "A personal statement describing an analytical question you find interesting",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Data scientist",
      "Analytics engineer",
      "Research analyst",
      "Graduate study in statistics or data science",
    ],
    faculty: ["lena-novak", "priya-varma"],
    image: "/university/plate-data.svg",
  },
  {
    slug: "bsc-cybersecurity",
    name: "Cybersecurity",
    award: "BSc (Hons)",
    level: "Undergraduate",
    school: "school-cyber",
    duration: "3 years full-time",
    mode: "Full-time, on campus",
    credits: "360 credits",
    intake: ["September"],
    location: "Main campus",
    summary:
      "Security taught from the systems up: how software, networks and protocols fail, and how defences are designed, tested and operated.",
    overview: [
      "You cannot defend a system you do not understand, so the first year is computing fundamentals. Security-specific material begins in earnest in the second year, once there is something concrete to secure.",
      "Practical work takes place in an isolated laboratory network. All offensive technique is taught within that boundary and within a written code of conduct that students sign before laboratory access is granted.",
      "The final year covers digital forensics, incident response and secure architecture, alongside an individual project.",
    ],
    highlights: [
      { title: "Isolated laboratory", detail: "A segregated network for practical work, with a signed code of conduct." },
      { title: "Defensive emphasis", detail: "Attack technique is taught in service of design and detection." },
      { title: "Forensics and response", detail: "A full module on investigation, evidence handling and reporting." },
    ],
    curriculum: [
      {
        title: "Year one",
        note: "Computing fundamentals shared with computer science.",
        modules: [
          { code: "CS-110", name: "Programming and Data Structures", credits: 30 },
          { code: "CS-120", name: "Computer Architecture", credits: 30 },
          { code: "MA-140", name: "Discrete Mathematics", credits: 30 },
          { code: "SEC-150", name: "Introduction to Security", credits: 30 },
        ],
      },
      {
        title: "Year two",
        note: "Networks, cryptography and secure development.",
        modules: [
          { code: "SEC-210", name: "Network Security", credits: 30 },
          { code: "SEC-220", name: "Applied Cryptography", credits: 30 },
          { code: "CS-210", name: "Operating Systems", credits: 30 },
          { code: "SEC-240", name: "Secure Software Development", credits: 30 },
        ],
      },
      {
        title: "Year three",
        note: "Investigation, architecture and the project.",
        modules: [
          { code: "SEC-310", name: "Digital Forensics", credits: 30 },
          { code: "SEC-320", name: "Incident Response", credits: 30 },
          { code: "SEC-330", name: "Security Architecture", credits: 30 },
          { code: "SEC-390", name: "Individual Project", credits: 60 },
        ],
      },
    ],
    assessment: [
      "Laboratory portfolios with written analysis",
      "Examinations in cryptography and networks",
      "A forensic investigation exercise assessed on evidence and reasoning",
      "An individual final-year project",
    ],
    entry: [
      "Secondary qualifications including mathematics",
      "A personal statement; prior security experience is not expected",
      "Agreement to the laboratory code of conduct on enrolment",
    ],
    careers: [
      "Security engineer",
      "Security analyst or incident responder",
      "Digital forensics practitioner",
      "Graduate study in security",
    ],
    faculty: ["daniel-kwarteng", "mateo-rossi"],
    image: "/university/plate-security.svg",
  },
  {
    slug: "msc-machine-learning",
    name: "Machine Learning",
    award: "MSc",
    level: "Graduate",
    school: "school-artificial-intelligence",
    duration: "1 year full-time, 2 years part-time",
    mode: "Full-time or part-time, on campus",
    credits: "180 credits",
    intake: ["September", "January"],
    location: "Main campus",
    summary:
      "A conversion-capable master's for graduates with a quantitative background who want depth in modern machine learning and the judgement to apply it.",
    overview: [
      "The taught portion runs over two terms and covers learning theory, deep learning, and the systems engineering that makes models usable. A summer dissertation follows.",
      "The programme assumes comfort with linear algebra, probability and programming. It does not assume a prior degree in computer science, and each year takes students from physics, mathematics, engineering and economics.",
      "The dissertation may be laboratory-based or arranged with an external organisation, subject to supervision and a written agreement.",
    ],
    highlights: [
      { title: "Two-term taught stage", detail: "Six taught modules before the dissertation begins." },
      { title: "Systems as well as models", detail: "A compulsory module on training, serving and monitoring in production." },
      { title: "Supervised dissertation", detail: "A summer research project with an assigned academic supervisor." },
    ],
    curriculum: [
      {
        title: "Autumn term",
        note: "Core methods.",
        modules: [
          { code: "ML-510", name: "Statistical Learning", credits: 20 },
          { code: "ML-520", name: "Deep Learning", credits: 20 },
          { code: "ML-530", name: "Optimisation for Machine Learning", credits: 20 },
        ],
      },
      {
        title: "Spring term",
        note: "Application and systems.",
        modules: [
          { code: "ML-540", name: "Machine Learning Systems", credits: 20 },
          { code: "ML-550", name: "Natural Language Processing", credits: 20 },
          { code: "ML-560", name: "Responsible Machine Learning", credits: 20 },
        ],
      },
      {
        title: "Summer",
        note: "Independent research.",
        modules: [{ code: "ML-590", name: "Dissertation", credits: 60 }],
      },
    ],
    assessment: [
      "Module coursework, primarily implementation with written analysis",
      "Written examinations in the theory modules",
      "A dissertation of approximately 15,000 words with an oral examination",
    ],
    entry: [
      "An undergraduate degree in a quantitative discipline",
      "Demonstrated programming ability, evidenced by coursework or professional work",
      "A statement of research interest naming the areas you want to work in",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Machine learning engineer",
      "Applied scientist",
      "Doctoral study",
      "Quantitative analyst",
    ],
    faculty: ["amara-okonkwo", "hana-choi", "elias-mbeki"],
    image: "/university/plate-ai.svg",
  },
  {
    slug: "msc-software-engineering",
    name: "Software Engineering",
    award: "MSc",
    level: "Graduate",
    school: "school-computing",
    duration: "1 year full-time, 2 years part-time",
    mode: "Full-time or part-time, on campus",
    credits: "180 credits",
    intake: ["September"],
    location: "Main campus",
    summary:
      "For engineers who can already write software and want to become the person others bring an architecture to.",
    overview: [
      "The programme is built around design decisions and their consequences: how systems are decomposed, how failure is contained, and how teams keep a codebase legible over years rather than sprints.",
      "Each taught module carries a substantial build component. The spring term runs a single extended project through architecture, implementation, review and operation.",
      "The dissertation is usually an engineering investigation rather than a pure literature study.",
    ],
    highlights: [
      { title: "Architecture-led", detail: "Decisions and trade-offs are the assessed material, not framework familiarity." },
      { title: "Extended build", detail: "One project carried through the spring term from design to operation." },
      { title: "Code review practice", detail: "Structured peer review as a formal, assessed activity." },
    ],
    curriculum: [
      {
        title: "Autumn term",
        note: "Design and systems.",
        modules: [
          { code: "SE-510", name: "Software Architecture", credits: 20 },
          { code: "SE-520", name: "Distributed Systems Engineering", credits: 20 },
          { code: "SE-530", name: "Testing and Verification", credits: 20 },
        ],
      },
      {
        title: "Spring term",
        note: "The extended project and its supporting modules.",
        modules: [
          { code: "SE-540", name: "Engineering Project", credits: 20 },
          { code: "SE-550", name: "Operations and Reliability", credits: 20 },
          { code: "SE-560", name: "Secure Development", credits: 20 },
        ],
      },
      {
        title: "Summer",
        note: "Independent work.",
        modules: [{ code: "SE-590", name: "Dissertation", credits: 60 }],
      },
    ],
    assessment: [
      "Design documents and architectural decision records",
      "Implementation assessed on structure and clarity, not feature count",
      "Peer review participation",
      "A dissertation with an oral examination",
    ],
    entry: [
      "An undergraduate degree in computing or a related discipline",
      "Or equivalent professional experience with a portfolio of work",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Senior or lead software engineer",
      "Software architect",
      "Platform engineer",
      "Engineering manager",
    ],
    faculty: ["mateo-rossi", "sofia-bianchi"],
    image: "/university/plate-software.svg",
  },
  {
    slug: "msc-data-engineering",
    name: "Data Engineering and Analytics",
    award: "MSc",
    level: "Graduate",
    school: "school-data",
    duration: "1 year full-time, 2 years part-time",
    mode: "Full-time or part-time, on campus",
    credits: "180 credits",
    intake: ["September", "January"],
    location: "Main campus",
    summary:
      "The pipeline as a first-class engineering artefact: storage, movement, quality and the analysis that depends on all three.",
    overview: [
      "Analysis gets the attention; the pipeline underneath it decides whether the analysis is worth anything. This programme treats data infrastructure as the engineering discipline it is.",
      "Modules cover storage design, batch and stream processing, orchestration, and the measurement of data quality, alongside the analytical methods that consume the output.",
      "The dissertation typically takes a real pipeline and either rebuilds or instruments it.",
    ],
    highlights: [
      { title: "Quality as engineering", detail: "A dedicated module on measuring and enforcing data quality." },
      { title: "Batch and stream", detail: "Both processing models taught, with the trade-offs made explicit." },
      { title: "Cluster access", detail: "Practical work on the school's shared processing cluster." },
    ],
    curriculum: [
      {
        title: "Autumn term",
        note: "Storage and movement.",
        modules: [
          { code: "DE-510", name: "Data Systems and Storage", credits: 20 },
          { code: "DE-520", name: "Stream Processing", credits: 20 },
          { code: "DE-530", name: "Analytical Methods", credits: 20 },
        ],
      },
      {
        title: "Spring term",
        note: "Quality, orchestration and governance.",
        modules: [
          { code: "DE-540", name: "Data Quality and Observability", credits: 20 },
          { code: "DE-550", name: "Orchestration and Platform Design", credits: 20 },
          { code: "DE-560", name: "Data Governance", credits: 20 },
        ],
      },
      {
        title: "Summer",
        note: "Independent work.",
        modules: [{ code: "DE-590", name: "Dissertation", credits: 60 }],
      },
    ],
    assessment: [
      "Build coursework with written design rationale",
      "A data quality audit exercise",
      "A dissertation with an oral examination",
    ],
    entry: [
      "An undergraduate degree in a computing, engineering or quantitative discipline",
      "Programming ability in at least one language",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Data engineer",
      "Analytics engineer",
      "Data platform engineer",
      "Analytics lead",
    ],
    faculty: ["priya-varma", "lena-novak"],
    image: "/university/plate-data.svg",
  },
  {
    slug: "msc-cybersecurity",
    name: "Cybersecurity and Digital Forensics",
    award: "MSc",
    level: "Graduate",
    school: "school-cyber",
    duration: "1 year full-time, 2 years part-time",
    mode: "Full-time or part-time, on campus",
    credits: "180 credits",
    intake: ["September"],
    location: "Main campus",
    summary:
      "Advanced security practice for graduates and practitioners: cryptographic engineering, offensive reasoning used defensively, and investigation that stands up to scrutiny.",
    overview: [
      "The programme is split between prevention and investigation. The first term concerns how secure systems are designed and where designs fail; the second concerns what you do once something has already gone wrong.",
      "Laboratory work is conducted on an isolated network under a signed code of conduct. Evidence handling is assessed to the standard an investigation would actually require.",
      "The dissertation may be technical or policy-facing, provided it is grounded in practice.",
    ],
    highlights: [
      { title: "Isolated laboratory", detail: "Segregated infrastructure for all practical security work." },
      { title: "Evidence standards", detail: "Investigation assessed on chain of custody and reasoning, not tooling." },
      { title: "Practitioner-friendly", detail: "Part-time route designed around working hours." },
    ],
    curriculum: [
      {
        title: "Autumn term",
        note: "Prevention.",
        modules: [
          { code: "SEC-510", name: "Cryptographic Engineering", credits: 20 },
          { code: "SEC-520", name: "Offensive Security", credits: 20 },
          { code: "SEC-530", name: "Security Architecture", credits: 20 },
        ],
      },
      {
        title: "Spring term",
        note: "Investigation and response.",
        modules: [
          { code: "SEC-540", name: "Digital Forensics", credits: 20 },
          { code: "SEC-550", name: "Incident Response and Threat Intelligence", credits: 20 },
          { code: "SEC-560", name: "Law, Policy and Disclosure", credits: 20 },
        ],
      },
      {
        title: "Summer",
        note: "Independent work.",
        modules: [{ code: "SEC-590", name: "Dissertation", credits: 60 }],
      },
    ],
    assessment: [
      "Laboratory portfolios with adversarial analysis",
      "A forensic investigation assessed on evidence and reporting",
      "A dissertation with an oral examination",
    ],
    entry: [
      "An undergraduate degree in computing or a related discipline, or equivalent professional experience",
      "Agreement to the laboratory code of conduct on enrolment",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Security consultant",
      "Incident response lead",
      "Forensic investigator",
      "Security architect",
    ],
    faculty: ["daniel-kwarteng", "elias-mbeki"],
    image: "/university/plate-security.svg",
  },
  {
    slug: "msc-ai-strategy",
    name: "Artificial Intelligence and Business Strategy",
    award: "MSc",
    level: "Graduate",
    school: "school-digital-business",
    duration: "1 year full-time, 2 years part-time",
    mode: "Full-time or part-time, on campus",
    credits: "180 credits",
    intake: ["September", "January"],
    location: "Main campus",
    summary:
      "For people who will decide what gets built. Technical literacy deep enough to interrogate a proposal, paired with strategy, governance and economics.",
    overview: [
      "This is not a technical degree with management modules bolted on. It is a strategy degree for a technical domain, and it expects you to be able to read an architecture and a balance sheet.",
      "You will build small systems, not to become an engineer, but so that the estimates and risks you later assess are not abstractions.",
      "Assessment is weighted towards written argument: proposals, options appraisals and governance cases.",
    ],
    highlights: [
      { title: "Technical literacy", detail: "Hands-on modules so that technical claims can be interrogated, not taken on trust." },
      { title: "Governance in depth", detail: "Regulation, risk and accountability treated as core material." },
      { title: "Options appraisal", detail: "Assessment built around defending a recommendation under challenge." },
    ],
    curriculum: [
      {
        title: "Autumn term",
        note: "Literacy and landscape.",
        modules: [
          { code: "DB-510", name: "Applied AI for Decision Makers", credits: 20 },
          { code: "DB-520", name: "Technology Strategy", credits: 20 },
          { code: "DB-530", name: "Economics of Digital Systems", credits: 20 },
        ],
      },
      {
        title: "Spring term",
        note: "Governance and delivery.",
        modules: [
          { code: "DB-540", name: "AI Governance and Policy", credits: 20 },
          { code: "DB-550", name: "Product and Portfolio Management", credits: 20 },
          { code: "DB-560", name: "Organisational Change", credits: 20 },
        ],
      },
      {
        title: "Summer",
        note: "Independent work.",
        modules: [{ code: "DB-590", name: "Dissertation or Consultancy Project", credits: 60 }],
      },
    ],
    assessment: [
      "Written proposals and options appraisals",
      "A governance case defended orally",
      "A dissertation or supervised consultancy project",
    ],
    entry: [
      "An undergraduate degree in any discipline",
      "Professional experience is valued and may substitute for subject background",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Technology strategy roles",
      "Product management",
      "AI governance and risk",
      "Consulting",
    ],
    faculty: ["noah-adler", "amara-okonkwo"],
    image: "/university/commons.svg",
  },
  {
    slug: "phd-artificial-intelligence",
    name: "Artificial Intelligence",
    award: "PhD",
    level: "Doctoral",
    school: "school-artificial-intelligence",
    duration: "3 to 4 years full-time",
    mode: "Full-time or part-time, on campus",
    credits: "Thesis",
    intake: ["September", "January", "April"],
    location: "Main campus",
    summary:
      "A supervised research degree culminating in a thesis that makes an original contribution to artificial intelligence.",
    overview: [
      "Doctoral candidates work with a primary supervisor and a second supervisor from a different research group. Progression is reviewed formally at the end of the first year.",
      "Applications are considered against research fit. Before applying, read the interests listed on the faculty pages and contact a potential supervisor with a short outline.",
      "Candidates are expected to contribute to the research culture of the school: seminars, reading groups and, usually, some teaching support.",
    ],
    highlights: [
      { title: "Two supervisors", detail: "A primary supervisor plus a second from another group." },
      { title: "First-year review", detail: "A formal progression review with a written report and viva." },
      { title: "Research culture", detail: "Seminars, reading groups and teaching opportunities across the school." },
    ],
    curriculum: [
      {
        title: "Year one",
        note: "Grounding and progression.",
        modules: [
          { code: "RES-610", name: "Research Methods", credits: 0 },
          { code: "RES-620", name: "Literature Review and Proposal", credits: 0 },
          { code: "RES-630", name: "Progression Review", credits: 0 },
        ],
      },
      {
        title: "Years two and three",
        note: "The research programme.",
        modules: [
          { code: "RES-700", name: "Independent Research", credits: 0 },
          { code: "RES-710", name: "Publication and Dissemination", credits: 0 },
          { code: "RES-720", name: "Teaching Support (optional)", credits: 0 },
        ],
      },
      {
        title: "Final stage",
        note: "Writing up and examination.",
        modules: [
          { code: "RES-800", name: "Thesis", credits: 0 },
          { code: "RES-810", name: "Oral Examination", credits: 0 },
        ],
      },
    ],
    assessment: [
      "Annual progress review",
      "A thesis making an original contribution",
      "An oral examination with an external examiner",
    ],
    entry: [
      "A master's degree in a relevant discipline, or an outstanding undergraduate degree",
      "A research proposal of two to three pages",
      "Agreement in principle from a supervisor before formal application",
      "English language competence for applicants taught in another language",
    ],
    careers: [
      "Academic research and teaching",
      "Industrial research laboratories",
      "Senior applied research roles",
    ],
    faculty: ["elias-mbeki", "amara-okonkwo", "jun-tanaka"],
    image: "/university/research-lab.svg",
  },
  {
    slug: "phd-computing-systems",
    name: "Computing and Data Systems",
    award: "PhD",
    level: "Doctoral",
    school: "school-computing",
    duration: "3 to 4 years full-time",
    mode: "Full-time or part-time, on campus",
    credits: "Thesis",
    intake: ["September", "January", "April"],
    location: "Main campus",
    summary:
      "Doctoral research in systems, languages, data infrastructure and the engineering of large-scale computation.",
    overview: [
      "The programme structure matches the doctoral degree in artificial intelligence: two supervisors, a first-year progression review, and a thesis examined orally.",
      "Systems research here is empirical. Candidates are expected to build and measure, not only to model.",
      "Proposals that cut across schools, particularly with data science or security, are welcomed and jointly supervised.",
    ],
    highlights: [
      { title: "Empirical emphasis", detail: "Build-and-measure research with access to the shared cluster." },
      { title: "Cross-school supervision", detail: "Joint supervision arrangements across research groups." },
      { title: "First-year review", detail: "Formal progression with a written report and viva." },
    ],
    curriculum: [
      {
        title: "Year one",
        note: "Grounding and progression.",
        modules: [
          { code: "RES-610", name: "Research Methods", credits: 0 },
          { code: "RES-620", name: "Literature Review and Proposal", credits: 0 },
          { code: "RES-630", name: "Progression Review", credits: 0 },
        ],
      },
      {
        title: "Years two and three",
        note: "The research programme.",
        modules: [
          { code: "RES-700", name: "Independent Research", credits: 0 },
          { code: "RES-710", name: "Publication and Dissemination", credits: 0 },
          { code: "RES-720", name: "Teaching Support (optional)", credits: 0 },
        ],
      },
      {
        title: "Final stage",
        note: "Writing up and examination.",
        modules: [
          { code: "RES-800", name: "Thesis", credits: 0 },
          { code: "RES-810", name: "Oral Examination", credits: 0 },
        ],
      },
    ],
    assessment: [
      "Annual progress review",
      "A thesis making an original contribution",
      "An oral examination with an external examiner",
    ],
    entry: [
      "A master's degree in a relevant discipline, or an outstanding undergraduate degree",
      "A research proposal of two to three pages",
      "Agreement in principle from a supervisor before formal application",
    ],
    careers: [
      "Academic research and teaching",
      "Industrial systems research",
      "Principal engineering roles",
    ],
    faculty: ["elias-mbeki", "mateo-rossi", "priya-varma"],
    image: "/university/research-lab.svg",
  },
  {
    slug: "cert-applied-ai",
    name: "Applied AI Engineering",
    award: "Professional Certificate",
    level: "Professional",
    school: "school-artificial-intelligence",
    duration: "6 months part-time",
    mode: "Part-time, evenings on campus",
    credits: "60 credits",
    intake: ["September", "January", "April"],
    location: "Main campus",
    summary:
      "A short, credit-bearing certificate for working engineers who need to put machine learning into production and be accountable for it.",
    overview: [
      "Three modules over two terms, taught in the evening. The certificate carries credit that can later be transferred into the master's in machine learning, subject to the usual entry requirements.",
      "The emphasis is operational: evaluation, deployment, monitoring and the failure modes that only appear once a model has real traffic.",
      "Applicants are expected to be working in a technical role and to bring a problem from it.",
    ],
    highlights: [
      { title: "Credit-bearing", detail: "60 credits, transferable into the master's programme on application." },
      { title: "Evening delivery", detail: "Taught outside standard working hours across two terms." },
      { title: "Bring your own problem", detail: "Assessment applies the material to a problem from your own work." },
    ],
    curriculum: [
      {
        title: "Term one",
        note: "Method and evaluation.",
        modules: [
          { code: "PC-410", name: "Practical Machine Learning", credits: 20 },
          { code: "PC-420", name: "Evaluation and Error Analysis", credits: 20 },
        ],
      },
      {
        title: "Term two",
        note: "Production.",
        modules: [{ code: "PC-430", name: "Deployment and Monitoring", credits: 20 }],
      },
    ],
    assessment: [
      "Applied coursework against a problem from your own workplace",
      "A final written evaluation report",
    ],
    entry: [
      "Current employment in a technical role",
      "Programming ability in at least one language",
      "A short statement describing the problem you intend to work on",
    ],
    careers: [
      "Progression within an existing engineering role",
      "Transition into applied machine learning",
      "Entry route to the master's programme",
    ],
    faculty: ["hana-choi", "elias-mbeki"],
    image: "/university/plate-cloud.svg",
  },
  {
    slug: "cert-cloud-devops",
    name: "Cloud and Platform Engineering",
    award: "Professional Certificate",
    level: "Professional",
    school: "school-computing",
    duration: "6 months part-time",
    mode: "Part-time, evenings on campus",
    credits: "60 credits",
    intake: ["September", "January"],
    location: "Main campus",
    summary:
      "A credit-bearing certificate covering infrastructure, delivery pipelines and operational practice for engineers moving into platform work.",
    overview: [
      "Three evening modules over two terms, covering infrastructure design, continuous delivery, and the operational disciplines that keep a platform trustworthy.",
      "Like the applied AI certificate, the credit is transferable into a related master's programme on application.",
      "Teaching is deliberately tool-agnostic where it can be. Specific tools are used as examples, not as the syllabus.",
    ],
    highlights: [
      { title: "Tool-agnostic", detail: "Principles first; tools appear as worked examples." },
      { title: "Credit-bearing", detail: "60 credits, transferable into a related master's on application." },
      { title: "Operational practice", detail: "On-call design, incident review and capacity planning." },
    ],
    curriculum: [
      {
        title: "Term one",
        note: "Infrastructure and delivery.",
        modules: [
          { code: "PC-440", name: "Infrastructure Design", credits: 20 },
          { code: "PC-450", name: "Continuous Delivery", credits: 20 },
        ],
      },
      {
        title: "Term two",
        note: "Operations.",
        modules: [{ code: "PC-460", name: "Reliability and Operations", credits: 20 }],
      },
    ],
    assessment: [
      "A platform design exercise with written rationale",
      "An incident review produced to a professional standard",
    ],
    entry: [
      "Current employment in a technical role",
      "Familiarity with at least one operating system and one programming language",
    ],
    careers: [
      "Platform engineer",
      "Site reliability engineer",
      "Infrastructure lead",
    ],
    faculty: ["mateo-rossi", "priya-varma"],
    image: "/university/plate-cloud.svg",
  },
];

export const getProgram = (slug: string) => PROGRAMS.find((p) => p.slug === slug);
export const programsByLevel = (level: ProgramLevel) =>
  PROGRAMS.filter((p) => p.level === level);
export const programsBySchool = (school: string) =>
  PROGRAMS.filter((p) => p.school === school);
export const programsTaughtBy = (facultySlug: string) =>
  PROGRAMS.filter((p) => p.faculty.includes(facultySlug));

/* ── News ───────────────────────────────────────────────────────── */

export const NEWS: NewsArticle[] = [
  {
    slug: "language-evaluation-study",
    title: "School of Artificial Intelligence publishes work on language model evaluation",
    category: "Research",
    date: "2026-09-12",
    readingTime: "4 min read",
    excerpt:
      "A study from the natural language group argues that current benchmark suites reward memorisation and proposes a stricter protocol.",
    body: [
      "Researchers in the School of Artificial Intelligence have published work examining how language model evaluation is conducted, and what current benchmark suites actually measure.",
      "The central argument is that widely used benchmarks are contaminated by their own popularity. Once a test set circulates freely, strong performance on it stops being evidence of capability and starts being evidence of exposure.",
      "The paper proposes an evaluation protocol in which held-out material is generated after the model under test was trained, and in which the generating procedure is published while the material itself is not.",
      "The work is being taught into the graduate evaluation module from this term, and the protocol is in use for two ongoing doctoral projects.",
    ],
    image: "/university/plate-1.svg",
  },
  {
    slug: "autumn-open-day",
    title: "Autumn open day: programme talks, laboratory tours and admissions clinics",
    category: "Events",
    date: "2026-09-08",
    readingTime: "3 min read",
    excerpt:
      "Applicants and their families are invited to campus for a full day of talks, tours and one-to-one admissions conversations.",
    body: [
      "The autumn open day runs across the main campus, with programme talks in the lecture theatres, open laboratories in each school, and an admissions clinic running continuously through the afternoon.",
      "Each school gives two talks so that visitors can attend more than one. Talks cover the structure of the degree, what the first year actually looks like week to week, and the entry requirements.",
      "The admissions clinic is for specific questions: non-standard qualifications, transfers, deferred entry, part-time study and fee status. No appointment is needed.",
      "Laboratory tours are led by current students. The isolated security laboratory is open to visitors, with equipment demonstrations run by staff.",
    ],
    image: "/university/plate-2.svg",
  },
  {
    slug: "data-quality-laboratory-opens",
    title: "Data and Decision Science opens a dedicated data quality laboratory",
    category: "Campus",
    date: "2026-08-28",
    readingTime: "3 min read",
    excerpt:
      "A new teaching space built around the unglamorous half of analytical work: acquisition, cleaning, provenance and measurement.",
    body: [
      "The School of Data and Decision Science has opened a teaching laboratory dedicated to data quality, giving the subject the space it has long deserved in the curriculum.",
      "The laboratory supports the data engineering modules across the undergraduate and graduate programmes, with workstations configured for large-scale processing against the shared cluster.",
      "Teaching in the space begins with deliberately damaged datasets. Students are asked to detect the damage before they are told what was done to the data.",
      "The intention is straightforward. Most analytical failures in professional practice are not modelling failures, and the curriculum should reflect that.",
    ],
    image: "/university/plate-3.svg",
  },
  {
    slug: "applications-open-january-intake",
    title: "Applications open for the January intake",
    category: "Announcements",
    date: "2026-08-20",
    readingTime: "2 min read",
    excerpt:
      "Applications are now open for programmes with a January start, including three master's degrees and both professional certificates.",
    body: [
      "Applications are open for all programmes offering a January intake. The application process is the same as for the September entry, and applications are considered as they arrive rather than held to a single decision date.",
      "Applicants to doctoral programmes should approach a potential supervisor before submitting a formal application. The faculty pages list current research interests.",
      "Applicants offered a place in January follow the same induction and progression schedule as September entrants, on a shifted calendar.",
      "Questions about fee status, funding or non-standard qualifications should go to the admissions office.",
    ],
    image: "/university/plate-4.svg",
  },
  {
    slug: "security-laboratory-code-of-conduct",
    title: "Revised code of conduct for the security laboratory",
    category: "Announcements",
    date: "2026-08-05",
    readingTime: "2 min read",
    excerpt:
      "The School of Cybersecurity and Networks has revised the conduct agreement that governs practical work on the isolated network.",
    body: [
      "The School of Cybersecurity and Networks has issued a revised code of conduct for practical work in the isolated laboratory network.",
      "The substance is unchanged: offensive technique is taught for defensive purposes, all practical work stays inside the laboratory boundary, and nothing learned in the laboratory is applied to systems outside it without written authorisation.",
      "The revision clarifies the responsible disclosure process for vulnerabilities found in the course of project work, including work on external systems where a student has permission.",
      "All students taking security modules sign the agreement before laboratory access is granted.",
    ],
    image: "/university/plate-2.svg",
  },
  {
    slug: "public-lecture-machine-reasoning",
    title: "Public lecture: what machine reasoning does and does not do",
    category: "Events",
    date: "2026-07-22",
    readingTime: "2 min read",
    excerpt:
      "An evening lecture for a general audience on the gap between apparent reasoning and the mechanisms producing it.",
    body: [
      "The autumn public lecture takes on a question that has moved from the laboratory to the front page: when a system appears to reason, what is actually happening?",
      "The lecture is aimed at a general audience. No mathematical background is assumed, and the material is drawn from teaching rather than from a single research result.",
      "Public lectures are free and open to anyone. Seats are allocated on arrival.",
      "A recording is made available afterwards through the university's public lecture archive.",
    ],
    image: "/university/plate-1.svg",
  },
];

export const getArticle = (slug: string) => NEWS.find((n) => n.slug === slug);
export const NEWS_CATEGORIES = ["Research", "Campus", "Events", "Announcements"] as const;

/* ── Events ─────────────────────────────────────────────────────── */

export const EVENTS: CampusEvent[] = [
  {
    title: "Autumn open day",
    date: "2026-10-11",
    time: "09:30 – 16:00",
    venue: "Main campus",
    type: "Open day",
    detail: "Programme talks, laboratory tours and a continuous admissions clinic.",
  },
  {
    title: "Public lecture: machine reasoning",
    date: "2026-10-18",
    time: "18:30 – 20:00",
    venue: "Great Hall",
    type: "Lecture",
    detail: "A general-audience lecture from the School of Artificial Intelligence.",
  },
  {
    title: "Applicant workshop: writing a research proposal",
    date: "2026-10-29",
    time: "14:00 – 16:30",
    venue: "Research Centre, Room 2.4",
    type: "Workshop",
    detail: "For prospective doctoral applicants. Places are limited.",
  },
  {
    title: "January intake: application deadline",
    date: "2026-11-15",
    time: "23:59",
    venue: "Online",
    type: "Deadline",
    detail: "Final date for January entry to taught programmes.",
  },
  {
    title: "Winter open day",
    date: "2026-12-06",
    time: "10:00 – 15:00",
    venue: "Main campus",
    type: "Open day",
    detail: "A shorter programme, focused on the January intake.",
  },
];

/* ── Campus life ────────────────────────────────────────────────── */

export const CAMPUS_LIFE = {
  intro:
    "The campus is small enough that people know each other and large enough that there is always something running. What follows is what is actually here, not a brochure.",
  facilities: [
    {
      title: "Libraries and study space",
      detail:
        "A central library with silent, quiet and group floors, open late during term. Bookable study rooms in each school building.",
      image: "/university/library.svg",
    },
    {
      title: "Laboratories",
      detail:
        "Teaching laboratories in every school, including the isolated security network and the data quality laboratory, plus access to a shared processing cluster.",
      image: "/university/research-lab.svg",
    },
    {
      title: "The commons",
      detail:
        "A glazed central building with café, informal study tables and the spaces societies use for meetings and events.",
      image: "/university/commons.svg",
    },
    {
      title: "Residences",
      detail:
        "Campus residences a short walk from teaching buildings, with single study bedrooms and shared kitchens on each floor.",
      image: "/university/residence.svg",
    },
  ],
  societies: [
    { name: "Robotics and Autonomy", detail: "Builds and competes; open to all levels." },
    { name: "Security Society", detail: "Weekly capture-the-flag practice inside the laboratory network." },
    { name: "Data for Good", detail: "Pro bono analysis for local charitable organisations." },
    { name: "Debating Union", detail: "Weekly debates, including a standing technology and policy series." },
    { name: "Language Exchange", detail: "Paired conversation practice across the student body." },
    { name: "Music and Performance", detail: "Ensembles, an open-mic night and termly performances in the Great Hall." },
  ],
  housing: [
    {
      name: "Campus residences",
      detail:
        "Single study bedrooms with shared kitchens, arranged in flats of six to eight. Guaranteed for first-year undergraduates who apply by the housing deadline.",
    },
    {
      name: "Graduate housing",
      detail:
        "Studio and one-bedroom accommodation reserved for graduate and doctoral students, including couples.",
    },
    {
      name: "Private rental",
      detail:
        "The accommodation office maintains a list of vetted local landlords and runs contract-checking sessions before the signing season.",
    },
  ],
  support: [
    {
      title: "Academic advising",
      detail: "Every student has a named academic adviser, met at least twice a term.",
    },
    {
      title: "Wellbeing and counselling",
      detail: "A confidential service with same-week appointments and a drop-in hour each weekday.",
    },
    {
      title: "Disability and inclusion",
      detail: "Assessment, adjustments and assistive technology arranged through a single point of contact.",
    },
    {
      title: "Careers",
      detail: "Application review, interview practice and an employer programme run through the year.",
    },
    {
      title: "Financial guidance",
      detail: "Advice on funding, hardship provision and budgeting, independent of the admissions process.",
    },
    {
      title: "Students' union",
      detail: "Independent representation, societies administration and an advice service.",
    },
  ],
};

/* ── Admissions ─────────────────────────────────────────────────── */

export const ADMISSIONS = {
  intro:
    "One application route, four programme levels. The process below applies to every taught programme; doctoral study adds a supervisor conversation before the formal application.",
  steps: [
    {
      step: "01",
      title: "Choose a programme",
      detail:
        "Read the programme page in full, including the curriculum and entry requirements. If you are between two, the admissions office will talk it through with you.",
    },
    {
      step: "02",
      title: "Prepare your application",
      detail:
        "You will need your qualifications, a personal statement, and one academic or professional reference. Doctoral applicants add a research proposal.",
    },
    {
      step: "03",
      title: "Submit and interview",
      detail:
        "Applications are considered as they arrive. Some programmes invite a short conversation rather than a formal interview; you will be told which applies.",
    },
    {
      step: "04",
      title: "Offer and enrolment",
      detail:
        "Offers set out any conditions and the deadline for accepting. Enrolment opens once conditions are met, along with housing and induction.",
    },
  ],
  requirements: [
    {
      level: "Undergraduate" as ProgramLevel,
      items: [
        "Secondary qualifications meeting the level stated on the programme page",
        "Mathematics at an advanced level for the artificial intelligence and data science degrees",
        "A personal statement",
        "One academic reference",
      ],
    },
    {
      level: "Graduate" as ProgramLevel,
      items: [
        "An undergraduate degree in a relevant discipline, or equivalent professional experience",
        "A statement of purpose naming the areas you want to work in",
        "One academic or professional reference",
        "A portfolio where the programme page asks for one",
      ],
    },
    {
      level: "Doctoral" as ProgramLevel,
      items: [
        "A master's degree in a relevant discipline, or an outstanding undergraduate degree",
        "A research proposal of two to three pages",
        "Agreement in principle from a supervisor before you apply formally",
        "Two academic references",
      ],
    },
    {
      level: "Professional" as ProgramLevel,
      items: [
        "Current employment in a technical role",
        "A short statement describing the problem you intend to work on",
        "No formal degree requirement where experience is demonstrable",
      ],
    },
  ],
  fees: [
    {
      title: "Tuition",
      detail:
        "Tuition is set per programme and per academic year, and is confirmed in your offer letter before you are asked to accept. Nothing is payable at application.",
    },
    {
      title: "Scholarships",
      detail:
        "Merit and need-based awards are considered on the same application; there is no separate form. Doctoral funding is attached to specific projects and advertised with them.",
    },
    {
      title: "Payment arrangements",
      detail:
        "Fees may be paid in instalments across the academic year. Part-time students are charged per module rather than per year.",
    },
    {
      title: "Hardship provision",
      detail:
        "A confidential fund for students whose circumstances change during study, administered independently of admissions.",
    },
  ],
  faqs: [
    {
      q: "Can I apply without a computing background?",
      a: "Yes, for several programmes. The undergraduate degrees assume no prior programming. The master's in artificial intelligence and business strategy accepts any discipline. The technical master's programmes do expect quantitative preparation, which is stated on each programme page.",
    },
    {
      q: "Do you accept professional experience in place of qualifications?",
      a: "For the professional certificates, experience is the primary entry route. For master's programmes it can substitute for subject background where it is demonstrable, though the degree requirement generally stands.",
    },
    {
      q: "When should I apply?",
      a: "As early as you can. Applications are considered as they arrive rather than held to a single decision date, and both places and housing are finite.",
    },
    {
      q: "How do doctoral applications differ?",
      a: "You approach a potential supervisor first with a short outline. A formal application follows once there is agreement in principle, and includes a fuller proposal and two references.",
    },
    {
      q: "Can I transfer credit from another institution?",
      a: "Credit transfer is assessed case by case against the module content you have already covered. Send transcripts and module descriptions to the admissions office before applying.",
    },
    {
      q: "Is part-time study available?",
      a: "For the master's programmes and both professional certificates, yes. Undergraduate degrees are full-time only. Doctoral study is available part-time with an extended timescale.",
    },
  ],
};

/* ── About ──────────────────────────────────────────────────────── */

export const ABOUT = {
  mission:
    "CuxtonAI Academy University teaches the computing disciplines that now sit underneath everything else: artificial intelligence, software, data, security and the decisions made around them.",
  positioning: [
    "The university was established by CuxtonAI to do one thing properly. Rather than covering every subject, it covers a connected set of them in depth, and it teaches them together because that is how they are encountered in practice.",
    "Teaching is built around a simple sequence: understand the method, build something with it, then have the result examined. Nothing is assessed on attendance, and nothing is completed by clicking a button.",
    "Research and teaching are not separate tracks here. The people who publish also teach the modules, and undergraduate project students work inside active research groups.",
  ],
  values: [
    {
      title: "Depth before breadth",
      detail:
        "Fundamentals are taught first and examined properly. Tools change; the reasoning underneath them does not.",
    },
    {
      title: "Build to understand",
      detail:
        "Every taught module carries practical work. Understanding a method and being able to apply it are different achievements.",
    },
    {
      title: "Judgement, taught explicitly",
      detail:
        "Ethics, governance and accountability are compulsory material inside technical modules, not a separate lecture at the end of term.",
    },
    {
      title: "Honest assessment",
      detail:
        "Work is marked against what it demonstrates. Where artificial intelligence is used in producing it, that use is declared and assessed.",
    },
  ],
  leadership: [
    { slug: "amara-okonkwo", role: "Dean, School of Artificial Intelligence" },
    { slug: "mateo-rossi", role: "Chair, School of Computing and Software Engineering" },
    { slug: "elias-mbeki", role: "Dean of Research" },
    { slug: "daniel-kwarteng", role: "Chair, School of Cybersecurity and Networks" },
  ],
  research: [
    {
      title: "Machine Learning and Reasoning",
      detail: "Learning theory, generalisation, evaluation methodology and machine reasoning.",
      school: "school-artificial-intelligence",
    },
    {
      title: "Language and Perception",
      detail: "Natural language processing, computer vision and multimodal representation.",
      school: "school-artificial-intelligence",
    },
    {
      title: "Systems and Infrastructure",
      detail: "Distributed systems, compilers and the engineering of large-scale computation.",
      school: "school-computing",
    },
    {
      title: "Evidence and Causality",
      detail: "Causal inference, experimental design and statistical practice.",
      school: "school-data",
    },
    {
      title: "Secure Systems",
      detail: "Applied cryptography, protocol analysis, forensics and secure architecture.",
      school: "school-cyber",
    },
    {
      title: "Technology, Policy and Organisations",
      detail: "Governance, strategy and how institutions adopt or refuse new capability.",
      school: "school-digital-business",
    },
  ],
};

/* ── Contact ────────────────────────────────────────────────────── */

export const UNIVERSITY_CONTACT = {
  name: "CuxtonAI Academy University",
  offices: [
    {
      title: "Admissions",
      detail: "Applications, entry requirements, fee status and offers.",
      email: "admissions@cuxtonai.com",
    },
    {
      title: "Student services",
      detail: "Advising, wellbeing, disability support, housing and finance.",
      email: "students@cuxtonai.com",
    },
    {
      title: "Research office",
      detail: "Doctoral enquiries, supervision and research collaboration.",
      email: "research@cuxtonai.com",
    },
    {
      title: "General enquiries",
      detail: "Anything that does not belong to one of the offices above.",
      email: "hello@cuxtonai.com",
    },
  ],
  enquiryTopics: [
    "Undergraduate admissions",
    "Graduate admissions",
    "Doctoral study",
    "Professional certificates",
    "Fees and funding",
    "Campus visit or open day",
    "Something else",
  ],
};

/* ── Derived facts. Counted from the content above so that any
      figure shown on the site is true of the site itself. ──────── */

export const FACTS = {
  schools: SCHOOLS.length,
  programs: PROGRAMS.length,
  levels: PROGRAM_LEVELS.length,
  researchGroups: ABOUT.research.length,
  faculty: FACULTY.length,
};
