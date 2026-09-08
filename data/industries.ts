export type Industry = {
  id: string;
  label: string;
  name: string;
  tag: string;
  sub: string;
  headline: string;
  body: string;
  image: string;
  outputs: string[];
  href: string;
  problem: {
    eyebrow: string;
    intro: string;
    challenges: string[];
    ctaLabel: string;
  };
  whatWeProvide: string[];
  howItWorks: { phase: string; note: string }[];
  typicalUseCases: string[];
  security: string[];
  relatedSolutions: { id: string; name: string; href: string }[];
  closing: { heading: string; body: string };
};

export const industries: Industry[] = [
  {
    id: "finance",
    label: "01",
    name: "Financial Services",
    tag: "Tier-1 Financial Systems",
    sub: "Banks · Insurers · Asset Managers · Clearing Houses & FinTech",
    headline: "Compliant, deterministic AI for mission-critical financial operations.",
    body: "Financial institutions handle highly regulated customer data, execute low-latency capital flows, and face unforgiving regulatory expectations. Standard cloud AI models with unknown data retention risks are unacceptable. Cuxton AI builds sovereign, auditable AI infrastructure deployed entirely within private VPCs or on-premise hardware, ensuring strict adherence to Basel, FINRA, FCA, and SEC compliance mandates.",
    image: "/industries/finance_enterprise_ai.jpg",
    outputs: [
      "Auditable real-time compliance review pipelines",
      "Private knowledge retrieval for policy & investment memorandums",
      "Explainable fraud & transaction anomaly alert engines",
      "Automated regulatory reporting & disclosure draft synthesizers",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Finance demands zero hallucination and total auditability.",
      intro: "Financial institutions face mounting regulatory scrutiny, complex distributed ledgers, and strict privacy boundaries that prohibit sending customer or transaction data to external multi-tenant APIs.",
      challenges: [
        "Unacceptable data exposure risks with public cloud LLM endpoints",
        "Strict regulatory mandates (SEC, FINRA, FCA, GDPR, Basel III/IV)",
        "Hallucination risks in mission-critical risk and credit assessments",
        "Siloed financial records, unstructured filings, and legacy mainframes",
        "Need for verifiable provenance and explainable audit trails",
      ],
      ctaLabel: "Schedule Financial AI Briefing",
    },
    whatWeProvide: [
      "VPC-isolated private LLM deployment with zero external data telemetry",
      "Knowledge-grounded retrieval systems referencing verified internal policies",
      "Transaction anomaly and suspicious activity pattern detection pipelines",
      "Automated regulatory disclosure synthesis and compliance auditing engines",
      "Fine-grained role-based access control with cryptographically signed logs",
      "Deterministic model evaluation with rigorous hallucination guardrails",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Comprehensive review of compliance frameworks, data residency requirements, and legacy banking system interfaces." },
      { phase: "Architecture & Sandbox", note: "Design air-gapped or private VPC topologies and validate deterministic model outputs on synthetic institutional data." },
      { phase: "Deploy & Harden", note: "Deploy hardened microservices into your secure infrastructure with continuous audit logging and role-based access control." },
      { phase: "Operate & Audit", note: "Continuous monitoring of latency, model drift, and audit trail integrity under formal change-management controls." },
    ],
    typicalUseCases: [
      "Automated KYC/AML document verification and adverse media screening assistants",
      "Private investment memorandum synthesis and portfolio risk document review",
      "Real-time fraud alert triage and suspicious transaction pattern explanation",
      "Regulatory filing generation (Form 10-K, ESG disclosures, MiFID II reporting)",
      "Institutional wealth advisory knowledge assistants operating on vetted guidelines",
      "Customer support routing and tier-1 query automation within strict policy bounds",
    ],
    security: [
      "Zero training or telemetry sent to public cloud or external third parties",
      "End-to-end AES-256 encryption at rest and TLS 1.3 in transit within client VPC",
      "SOC 2 Type II, ISO 27001, and PCI-DSS compliance alignment",
      "Immutable audit logs capturing prompt inputs, model outputs, and citations",
      "Strict data tenancy boundaries ensuring complete client data sovereignty",
    ],
    relatedSolutions: [
      { id: "private-ai", name: "Private AI Deployment", href: "/solutions/private-ai" },
      { id: "knowledge", name: "Knowledge-Grounded AI", href: "/solutions/knowledge" },
      { id: "governance", name: "AI Governance & Oversight", href: "/technology#governance" },
    ],
    closing: {
      heading: "Ready to deploy sovereign AI in financial services?",
      body: "Schedule a confidential discovery session with our financial infrastructure specialists. We will analyze your regulatory constraints and outline an air-gapped deployment plan.",
    },
  },
  {
    id: "healthcare",
    label: "02",
    name: "Healthcare & Life Sciences",
    tag: "Clinical & Life Sciences",
    sub: "Hospital Networks · Academic Medical Centers · Pharma · Diagnostic Labs",
    headline: "Clinical-grade AI systems engineered for patient privacy and research velocity.",
    body: "Healthcare and pharmaceutical organizations operate under intense patient data confidentiality regulations and rigorous clinical governance. Cuxton AI delivers HIPAA- and GDPR-compliant intelligence engines that assist clinicians with evidence retrieval, accelerate pharmaceutical research, and streamline hospital operations without exposing Protected Health Information (PHI) to public infrastructure.",
    image: "/industries/healthcare_clinical_ai.jpg",
    outputs: [
      "HIPAA-compliant clinical protocol knowledge assistants",
      "Unstructured medical record classification and extraction pipelines",
      "Accelerated biomedical literature and clinical trial synthesis",
      "Hospital resource allocation and triage support intelligence",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Patient privacy and clinical fidelity are non-negotiable.",
      intro: "Healthcare systems generate massive volumes of clinical narratives, diagnostic records, and scientific papers, but strict privacy regulations and patient safety require absolute control over where and how data is processed.",
      challenges: [
        "Stringent HIPAA, HITECH, and GDPR restrictions on patient data handling",
        "Clinical burnout caused by hours spent on repetitive documentation",
        "Fragmented Electronic Health Record (EHR) databases and unstructured notes",
        "High stakes: diagnostic or protocol guidance errors can directly impact patient outcomes",
        "Massive latency when researchers query petabyte-scale biomedical literature",
      ],
      ctaLabel: "Consult Healthcare AI Team",
    },
    whatWeProvide: [
      "On-premise or HIPAA-compliant private cloud deployments with zero data retention",
      "Evidence-based knowledge assistants strictly grounded in approved medical literature",
      "Automated extraction and structured coding from unstructured clinical notes",
      "Clinical trial matching and biomedical research discovery engines",
      "Strict guardrails preventing generative models from making autonomous clinical decisions",
      "Comprehensive PHI/PII anonymization and cryptographic sanitization filters",
    ],
    howItWorks: [
      { phase: "Clinical Governance Review", note: "Examine institutional review board (IRB) mandates, EHR integrations, and strict PHI isolation boundaries." },
      { phase: "Zero-Retention Architecture", note: "Construct dedicated inference endpoints inside your certified healthcare enclave with deterministic retrieval." },
      { phase: "EHR & System Integration", note: "Connect secure APIs to FHIR/HL7 feeds with real-time audit logging and clinician override controls." },
      { phase: "Clinical Validation & Drift Control", note: "Continuous validation against peer-reviewed ground truth datasets with clinician oversight." },
    ],
    typicalUseCases: [
      "Physician decision support tools referencing institutional care pathways and formulary guidelines",
      "Medical summary drafting and clinical note transcription within certified enclaves",
      "Biomarker discovery and pharmacovigilance adverse event report clustering",
      "Clinical trial cohort identification based on structured and unstructured patient criteria",
      "Hospital bed occupancy forecasting and surgical scheduling optimization",
      "Patient navigation portals answering routine pre-admission queries under medical review",
    ],
    security: [
      "HIPAA Business Associate Agreement (BAA) and GDPR-ready architectures",
      "Real-time PHI de-identification and redaction before tokenization",
      "Isolated infrastructure with no internet egress for healthcare data stores",
      "Comprehensive clinician audit logs documenting all retrieved evidence and queries",
      "Role-based access aligned to hospital clinical privileges and medical staff roles",
    ],
    relatedSolutions: [
      { id: "knowledge", name: "Knowledge-Grounded AI", href: "/solutions/knowledge" },
      { id: "private-ai", name: "Private AI Deployment", href: "/solutions/private-ai" },
      { id: "training", name: "AI Training & Enablement", href: "/solutions/training" },
    ],
    closing: {
      heading: "Elevate clinical operations with sovereign AI.",
      body: "Engage our healthcare technology practice to evaluate HIPAA-compliant architectures tailored to your hospital network or research institute.",
    },
  },
  {
    id: "government",
    label: "03",
    name: "Government & Public Sector",
    tag: "Sovereign & Defense Systems",
    sub: "Federal Ministries · National Security · Regional Authorities · Regulators",
    headline: "Sovereign AI systems engineered within national defense boundaries.",
    body: "Public sector institutions require sovereign AI architectures that eliminate external geopolitical dependencies, safeguard classified data, and uphold absolute public transparency. Cuxton AI designs air-gapped, sovereign infrastructure for government agencies, enabling automated citizen triage, policy synthesis, and secure intelligence analysis entirely on domestic sovereign compute.",
    image: "/industries/government_sovereign_ai.jpg",
    outputs: [
      "Air-gapped national intelligence and policy retrieval engines",
      "Citizen query routing and multiform administrative automation",
      "Inter-agency document reconciliation and regulatory compliance verification",
      "Sovereign data enclave architectures with complete cryptographic sovereignty",
    ],
    href: "/contact",
    problem: {
      eyebrow: "National security mandates total sovereign containment.",
      intro: "Public institutions cannot rely on foreign cloud infrastructure or proprietary closed models whose training data and data exfiltration paths cannot be independently verified.",
      challenges: [
        "Air-gap requirements preventing any external cloud network connectivity",
        "Geopolitical risks associated with proprietary offshore AI vendors",
        "Strict public record retention, Freedom of Information, and auditability laws",
        "Vast volumes of classified or confidential cross-agency policy documents",
        "Public trust requirements demanding verifiable fairness and zero hallucination",
      ],
      ctaLabel: "Request Sovereign AI Briefing",
    },
    whatWeProvide: [
      "Fully air-gapped inference clusters running open-weights verified foundation models",
      "Multi-classification level access control (Confidential, Secret, Top Secret architectures)",
      "Deterministic policy assistants strictly citing public laws, statutes, and codes",
      "Citizen-facing automated service delivery with transparent explainability",
      "National infrastructure telemetry and geospatial anomaly detection systems",
      "Complete code and weights ownership with zero vendor lock-in",
    ],
    howItWorks: [
      { phase: "Threat Modeling & Clearance", note: "Establish security classification boundaries, physical facility constraints, and air-gap specifications." },
      { phase: "Sovereign Enclave Build", note: "Provision on-premise GPU clusters, harden runtime environments, and load certified domestic models." },
      { phase: "Policy Integration & Hardening", note: "Index national archives, statutory legal corpora, and administrative guidelines with strict lineage tracking." },
      { phase: "Audited Deployment & Handoff", note: "Deliver full operational runbooks and train cleared personnel for 100% autonomous operation." },
    ],
    typicalUseCases: [
      "Constituent service triage and automated multilingual benefits information assistants",
      "Legislative drafting support, regulatory cross-referencing, and conflict detection",
      "Critical infrastructure sensor anomaly detection and predictive grid maintenance",
      "Inter-departmental intelligence synthesis across segregated security domains",
      "Procurement contract verification and public expenditure fraud anomaly detection",
      "Court record classification and evidentiary transcript indexing for public judiciaries",
    ],
    security: [
      "Physical and logical air-gapped operation with zero outbound network traffic",
      "Compliance with federal standards including NIST SP 800-53 and FedRAMP High benchmarks",
      "Hardware security module (HSM) key management and cryptographic attestations",
      "Zero telemetry backhaul: model weights and customer prompt contexts never leave custody",
      "Full source code and architecture delivery for internal security agency audit",
    ],
    relatedSolutions: [
      { id: "private-ai", name: "Private AI Deployment", href: "/solutions/private-ai" },
      { id: "governance", name: "AI Governance & Oversight", href: "/technology#governance" },
      { id: "strategy", name: "AI Strategy & Opportunity Discovery", href: "/solutions/strategy" },
    ],
    closing: {
      heading: "Architect sovereign AI for your agency.",
      body: "Connect with our public sector team to discuss secure, air-gapped deployments tailored to your government department or national security agency.",
    },
  },
  {
    id: "education",
    label: "04",
    name: "Education & Academic Research",
    tag: "Higher Ed & Deep Science",
    sub: "Research Universities · Academic Consortia · Medical Colleges · EdTech",
    headline: "Empowering academic breakthroughs while protecting institutional IP.",
    body: "Universities and research consortia face a dual challenge: unlocking the transformative power of generative AI for students and faculty while fiercely safeguarding proprietary laboratory research, patent disclosures, and student privacy. Cuxton AI builds high-performance research retrieval environments, personalized student learning scaffolds, and institutional knowledge systems that respect academic freedom and intellectual property.",
    image: "/industries/education_research_ai.jpg",
    outputs: [
      "Academic research synthesis pipelines with DOI citation grounding",
      "FERPA-compliant campus advising and administrative intelligence",
      "High-throughput laboratory data indexing and experimental synthesis",
      "Campus-wide sovereign AI compute clusters for student & faculty access",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Protect research breakthroughs without slowing scientific momentum.",
      intro: "Academic researchers risk intellectual property forfeiture by uploading proprietary grant findings and patent drafts to commercial AI platforms, while universities struggle to manage disparate student AI usage.",
      challenges: [
        "Leakage of unreleased laboratory research and patent disclosures to public models",
        "FERPA and student privacy regulations restricting educational data mining",
        "Academic integrity concerns regarding unverified student submissions",
        "Fragmented research papers, laboratory archives, and institutional repositories",
        "Budget constraints requiring cost-efficient, shared GPU compute architectures",
      ],
      ctaLabel: "Explore Academic Solutions",
    },
    whatWeProvide: [
      "Institutional private AI sandboxes guaranteeing zero research data exfiltration",
      "Deep scientific literature RAG systems connected to PubMed, arXiv, and university repositories",
      "Ethical academic AI tutors with step-by-step Socratic guidance rather than answer dumps",
      "Automated research grant compliance verification and documentation synthesis",
      "Shared high-performance inference clusters with departmental quota management",
      "Institutional AI literacy curricula and faculty governance frameworks",
    ],
    howItWorks: [
      { phase: "Academic Workflow Audit", note: "Map faculty research data workflows, student management systems (SIS/LMS), and intellectual property guidelines." },
      { phase: "Campus Sandbox Architecture", note: "Deploy dedicated on-campus or private cloud instances with single sign-on (SSO) and departmental tenancy." },
      { phase: "Repository & Library Ingestion", note: "Index university libraries, research datasets, and course catalogues with attribution tracking." },
      { phase: "Enablement & Scale", note: "Conduct faculty enablement workshops and implement quota controls to optimize campus compute utilization." },
    ],
    typicalUseCases: [
      "Scientific literature cross-referencing and grant proposal literature review synthesis",
      "Adaptive Socratic tutoring assistants embedded within university learning management systems",
      "Automated campus registrar and student financial aid guidance assistants",
      "Laboratory notebook indexing and chemical/biological experiment correlation",
      "Institutional policy search for faculty tenure, research ethics, and university bylaws",
      "Student retention predictive analytics operating strictly on anonymized historical metrics",
    ],
    security: [
      "FERPA-compliant data architecture ensuring total student record privacy",
      "Zero training on intellectual property, grant applications, or unpublished research",
      "Single Sign-On (SAML/OAuth2) integrated with university identity directories",
      "Strict data separation between academic departments, labs, and administrative units",
      "Full exportability of indexed data with zero lock-in",
    ],
    relatedSolutions: [
      { id: "knowledge", name: "Knowledge-Grounded AI", href: "/solutions/knowledge" },
      { id: "training", name: "AI Training & Enablement", href: "/solutions/training" },
      { id: "automation", name: "Operational AI & Process Automation", href: "/solutions/automation" },
    ],
    closing: {
      heading: "Accelerate academic discovery safely.",
      body: "Discover how top universities deploy Cuxton AI to empower faculty research and student success within protected institutional boundaries.",
    },
  },
  {
    id: "telecom",
    label: "05",
    name: "Telecommunications & Enterprise",
    tag: "Carrier & Hyperscale Ops",
    sub: "Mobile Network Operators · Fiber Carriers · Cloud Providers · Hyperscalers",
    headline: "Carrier-scale telemetry intelligence and autonomous network operations.",
    body: "Telecommunications operators and global enterprises operate under extreme throughput demands, managing petabytes of network telemetry, millions of subscriber interactions, and critical SLA commitments. Cuxton AI deploys real-time anomaly detection, predictive outage mitigation, and automated subscriber service agents engineered to operate reliably across hybrid cloud and multi-region telco infrastructure.",
    image: "/industries/telecom_network_ai.jpg",
    outputs: [
      "Real-time network telemetry anomaly detection and fault triage",
      "High-concurrency subscriber customer service automation engines",
      "Predictive infrastructure maintenance and capacity forecasting models",
      "Field engineering knowledge retrieval and automated diagnostics",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Carrier operations demand sub-second latency and five-nines reliability.",
      intro: "Telecom providers face skyrocketing traffic demands, complex multi-vendor network topologies, and razor-thin margins, where customer churn and network outages carry devastating costs.",
      challenges: [
        "Petabyte-scale log volumes overwhelming human network operations teams",
        "Outages requiring hours of manual root-cause analysis across distributed switches and towers",
        "High customer service operational costs with repetitive billing and provisioning queries",
        "Complex legacy telecom billing and OSS/BSS software stacks",
        "Strict subscriber privacy regulations (CPNI, GDPR, local telecommunications acts)",
      ],
      ctaLabel: "Request Telecom Architecture Review",
    },
    whatWeProvide: [
      "Carrier-grade AI microservices deployed at network edge or regional data centers",
      "High-throughput real-time stream processing for network syslog and SNMP trap analysis",
      "Context-aware customer service virtual agents with live OSS/BSS integration",
      "Automated field technician knowledge assistants with offline mobile capability",
      "Predictive fiber cut and cellular tower degradation early warning systems",
      "Enterprise SLA monitoring with autonomous escalation and incident runbook execution",
    ],
    howItWorks: [
      { phase: "OSS/BSS & Telemetry Audit", note: "Evaluate network logging pipelines, streaming architectures (Kafka/Flink), and subscriber privacy boundaries." },
      { phase: "Edge & Central Topology Build", note: "Construct distributed inference nodes optimized for low latency across edge and central data centers." },
      { phase: "Model Fine-Tuning & Runbook Ingestion", note: "Fine-tune models on domain-specific telecom protocols, RFCs, and internal engineering runbooks." },
      { phase: "Production Cutover & Monitoring", note: "Progressive traffic cutover with automated fallback and continuous telemetry performance auditing." },
    ],
    typicalUseCases: [
      "Autonomous network incident triage and root-cause correlation across multi-vendor gear",
      "Subscriber self-service assistants handling plan migrations, billing inquiries, and eSIM activations",
      "Predictive radio access network (RAN) energy optimization and capacity provisioning",
      "Technical support co-pilots guiding field engineers through fiber splice and cell tower repairs",
      "Churn prediction and personalized retention offer synthesis within privacy bounds",
      "Fraudulent SIM-swap and toll-fraud anomaly detection in real-time call records",
    ],
    security: [
      "CPNI (Customer Proprietary Network Information) and GDPR-compliant isolation",
      "Sub-second on-premise inference with zero external cloud round-trips",
      "Role-based administrative control with multi-factor biometric authentication",
      "High-availability active-active disaster recovery across redundant data centers",
      "Immutable audit trails for all autonomous network reconfigurations",
    ],
    relatedSolutions: [
      { id: "automation", name: "Operational AI & Process Automation", href: "/solutions/automation" },
      { id: "private-ai", name: "Private AI Deployment", href: "/solutions/private-ai" },
      { id: "governance", name: "AI Governance & Oversight", href: "/technology#governance" },
    ],
    closing: {
      heading: "Scale your telecommunications intelligence.",
      body: "Contact our telecommunications enterprise group to explore low-latency, carrier-grade AI architectures built for 99.999% uptime.",
    },
  },
  {
    id: "legal",
    label: "06",
    name: "Legal, Audit & Advisory",
    tag: "Enterprise Legal & Audit",
    sub: "Global Law Firms · Big 4 Audit Practices · In-House Corporate Counsel · Risk Consultancies",
    headline: "Precision contract intelligence and evidentiary audit verification.",
    body: "Legal practitioners, external auditors, and corporate compliance officers handle immense volumes of contracts, statutory filings, and transaction documentation where missing a single clause carries catastrophic financial liability. Cuxton AI builds sovereign document intelligence, contract discovery, and audit workpaper synthesis tools that enhance professional judgement with verifiable citations and zero data leakage.",
    image: "/industries/legal_audit_ai.jpg",
    outputs: [
      "Deep contract intelligence with clause extraction & deviation scoring",
      "Audit workpaper generation and financial assertion verification",
      "M&A due diligence acceleration with automated multi-document indexing",
      "Regulatory change tracking and institutional precedent knowledge engines",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Professional liability requires 100% evidence attribution.",
      intro: "Legal and audit firms are bound by client-attorney privilege and strict professional confidentiality standards that prohibit pasting client documents into public cloud AI services.",
      challenges: [
        "Breach of attorney-client privilege or auditor independence through public cloud tools",
        "Thousands of billable hours consumed by manual contract review and due diligence",
        "Hallucination risks in legal citations, statutory interpretations, or precedent case law",
        "Multitude of differing contract formats, scanned PDFs, and legacy document repositories",
        "Need for rigorous audit trails proving why an AI system reached a specific conclusion",
      ],
      ctaLabel: "Schedule Legal Tech Briefing",
    },
    whatWeProvide: [
      "Private legal enclave deployments with absolute client matter data segregation",
      "Deterministic contract review engines that link every extracted insight directly to source pages",
      "Automated deviation analysis comparing third-party agreements against standard playbook clauses",
      "Comprehensive audit workpaper synthesis mapped to ISA and PCAOB audit standards",
      "Multi-jurisdictional regulatory change monitoring and impact assessment pipelines",
      "Air-gapped deployment options for high-stakes litigation and classified arbitrations",
    ],
    howItWorks: [
      { phase: "Matter & Privilege Audit", note: "Define ethical walls, client matter segregation rules, and document management system (DMS) integrations." },
      { phase: "Isolated Enclave Setup", note: "Deploy dedicated single-tenant infrastructure with end-to-end encryption and zero persistent storage beyond client control." },
      { phase: "Playbook & Precedent Ingestion", note: "Ingest standard firm contract templates, past deal bibles, and regulatory frameworks with attribution indexing." },
      { phase: "Lawyer & Auditor Enablement", note: "Deliver firm-wide training on prompt craftsmanship, evidentiary verification, and ethical AI utilization." },
    ],
    typicalUseCases: [
      "M&A due diligence virtual data room indexing and key risk clause summarization",
      "Contract lifecycle review: identifying non-standard indemnification, liability, or termination rights",
      "Statutory audit sampling verification and financial statement cross-referencing",
      "Litigation e-discovery keyword and semantic relevance scoring across millions of communications",
      "Corporate compliance policy gap analysis against newly enacted EU AI Act or CSRD directives",
      "In-house legal helpdesk automating routine non-disclosure agreement (NDA) reviews",
    ],
    security: [
      "Strict matter-level data segregation preventing cross-client information leakage",
      "Zero model training or parameter updating on proprietary client contracts",
      "End-to-end encryption with client-held encryption keys (CMEK / BYOK)",
      "Strict compliance with legal bar association ethics opinions on generative AI",
      "Comprehensive audit logging for court admissibility and internal ethics verification",
    ],
    relatedSolutions: [
      { id: "knowledge", name: "Knowledge-Grounded AI", href: "/solutions/knowledge" },
      { id: "governance", name: "AI Governance & Oversight", href: "/technology#governance" },
      { id: "strategy", name: "AI Strategy & Opportunity Discovery", href: "/solutions/strategy" },
    ],
    closing: {
      heading: "Transform your legal and audit practice.",
      body: "Schedule a confidential consultation with our legal engineering team to review private deployment options that protect attorney-client privilege.",
    },
  },
];
