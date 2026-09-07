export type Solution = {
  id: string;
  label: string;
  name: string;
  tag: string;
  headline: string;
  body: string;
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
  relatedIndustries: { id: string; name: string }[];
  closing: { heading: string; body: string };
};

export const solutions: Solution[] = [
  {
    id: "strategy",
    label: "01",
    name: "AI Strategy & Opportunity Discovery",
    tag: "AI Strategy",
    headline: "Find the right problems before choosing the technology.",
    body: "Many AI projects fail because they begin with a technology choice. Cuxton starts with the organisation  interviewing stakeholders, reviewing operational workflows, examining data availability and identifying where AI is likely to produce measurable value. The output is a structured opportunity map with prioritised use cases, value hypotheses and an honest feasibility assessment.",
    outputs: [
      "Structured AI opportunity map",
      "Prioritised use case shortlist with rationale",
      "Feasibility assessment per use case",
      "Recommended next steps and sequencing",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Not every AI idea is worth pursuing.",
      intro: "Organisations often have many potential AI opportunities but lack a clear way to determine what is valuable, feasible and aligned with their operations.",
      challenges: [
        "Fragmented processes and data",
        "Too many possible AI use cases",
        "Unclear business value",
        "Technology-first decisions",
        "Uncertainty about where to start",
      ],
      ctaLabel: "Find Your AI Opportunity",
    },
    whatWeProvide: [
      "AI readiness assessment",
      "Process and workflow mapping",
      "Data landscape review",
      "Use case identification",
      "Value/feasibility prioritisation",
      "AI roadmap and governance recommendations",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Structured interviews across stakeholders, workflows and data sources to surface where AI could genuinely help." },
      { phase: "Design & Prototype", note: "Opportunities are scored for feasibility and value, then sequenced into a practical roadmap  no build begins until priorities are clear." },
      { phase: "Deploy & Enable", note: "Handover of the opportunity map and roadmap to your team, with recommended next steps and governance guidance." },
      { phase: "Operate & Optimise", note: "Revisit the roadmap as priorities shift, data readiness improves, or new opportunities emerge." },
    ],
    typicalUseCases: [
      "Leadership team unsure where to begin an AI programme",
      "Multiple candidate AI ideas competing for budget and attention",
      "Need for an independent, vendor-neutral opportunity assessment before commissioning a build",
    ],
    security: [
      "No production systems or live data required to complete the assessment",
      "Stakeholder input and workflow documentation handled under mutual confidentiality",
      "Findings and roadmap remain your organisation's property",
      "Recommendations respect existing compliance and regulatory constraints",
    ],
    relatedIndustries: [
      { id: "finance", name: "Financial Services" },
      { id: "healthcare", name: "Healthcare" },
      { id: "government", name: "Government" },
    ],
    closing: {
      heading: "Not sure where AI could help most?",
      body: "Book a discovery conversation. We'll map your workflows and data, and tell you honestly where AI is likely  and unlikely  to create value.",
    },
  },
  {
    id: "private-ai",
    label: "02",
    name: "Private AI Deployment",
    tag: "Infrastructure",
    headline: "Deploy AI in controlled, approved environments.",
    body: "For organisations where data cannot be submitted to shared cloud services, Cuxton builds AI infrastructure within approved boundaries  local servers, on-premise GPU environments, private cloud instances or network-isolated tenancies. Architecture is designed around the organisation's data-sensitivity requirements, access policies and technical constraints.",
    outputs: [
      "Architecture design aligned to data sensitivity requirements",
      "Deployment within approved infrastructure",
      "Model selection and tuning",
      "Security, access and change management documentation",
    ],
    href: "/contact",
    problem: {
      eyebrow: "AI needs the right environment.",
      intro: "Sensitive information and critical operations require more than simply connecting to a public AI service.",
      challenges: [
        "Sensitive or proprietary data",
        "Strict security requirements",
        "Limited infrastructure control",
        "Regulatory and governance concerns",
        "Complex existing systems",
        "Uncertainty about deployment options",
      ],
      ctaLabel: "Explore Private AI",
    },
    whatWeProvide: [
      "Architecture design mapped to your data-sensitivity tiers",
      "Deployment on VPC, on-premise, or network-isolated infrastructure",
      "Model selection, tuning and performance benchmarking",
      "Identity, access and network security configuration",
      "Change management and operational runbooks",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Review data-sensitivity classifications, existing infrastructure and regulatory boundaries that shape where AI can run." },
      { phase: "Design & Prototype", note: "Architect the isolated environment and validate it with a controlled proof of concept before any production data is involved." },
      { phase: "Deploy & Enable", note: "Harden, integrate and deploy within the approved boundary, with access controls and monitoring in place from day one." },
      { phase: "Operate & Optimise", note: "Ongoing performance tuning, patching and capacity planning within the same controlled perimeter." },
    ],
    typicalUseCases: [
      "Regulated institutions barred from sending data to public cloud AI services",
      "Air-gapped or classified environments requiring fully isolated compute",
      "Organisations consolidating multiple point AI tools into one governed environment",
    ],
    security: [
      "Deployment confined to approved VPC, on-premise or isolated tenancy",
      "Zero training of public models on client data",
      "Role-based access control and full audit logging",
      "Documented change-management and incident-response procedures",
    ],
    relatedIndustries: [
      { id: "finance", name: "Financial Services" },
      { id: "government", name: "Government" },
      { id: "healthcare", name: "Healthcare" },
    ],
    closing: {
      heading: "Ready to deploy AI with greater control?",
      body: "Let's design an AI environment that fits your organisation's data, security and operational requirements.",
    },
  },
  {
    id: "knowledge",
    label: "03",
    name: "Knowledge-Grounded AI",
    tag: "Knowledge Systems",
    headline: "Connect AI to your institutional knowledge.",
    body: "General-purpose AI doesn't know your internal policies, terminology, protocols or documents. Cuxton builds retrieval-augmented systems that connect AI to an organisation's authorised knowledge stores  enabling AI to draw from the right sources, respect permission boundaries and support responses with traceable references.",
    outputs: [
      "Knowledge pipeline design and build",
      "Secure connection to authorised data sources",
      "Permission-aware retrieval aligned to access policies",
      "Attribution and source traceability",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Your organisation already has the knowledge.",
      intro: "Important information can be scattered across documents, databases, policies and internal repositories, making it difficult for teams to find and use.",
      challenges: [
        "Information spread across multiple systems",
        "Employees spending time searching for answers",
        "Large document and knowledge repositories",
        "Difficulty maintaining current information",
        "AI responses without sufficient organisational context",
      ],
      ctaLabel: "Unlock Your Knowledge",
    },
    whatWeProvide: [
      "Retrieval pipeline design connected to approved knowledge stores",
      "Permission-aware retrieval that respects existing access policies",
      "Source attribution and citation on every AI response",
      "Ongoing content freshness and re-indexing procedures",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Catalogue the documents, databases and repositories that matter, and confirm access permissions and update cadence." },
      { phase: "Design & Prototype", note: "Build a retrieval pipeline and test it against real questions from real users, checking accuracy and source attribution." },
      { phase: "Deploy & Enable", note: "Connect the pipeline to approved knowledge sources in production, with permission boundaries enforced end-to-end." },
      { phase: "Operate & Optimise", note: "Keep the index current as documents change, and expand coverage to additional repositories over time." },
    ],
    typicalUseCases: [
      "Internal knowledge assistants for policy, procedure and product questions",
      "Customer-facing support grounded in approved documentation only",
      "Research and compliance teams searching large document archives",
    ],
    security: [
      "Retrieval respects existing role-based access permissions",
      "No document content used to train external public models",
      "Full source traceability on every generated answer",
      "Access and query logging for audit purposes",
    ],
    relatedIndustries: [
      { id: "legal", name: "Legal & Audit" },
      { id: "education", name: "Education & Research" },
      { id: "finance", name: "Financial Services" },
    ],
    closing: {
      heading: "Turn your institutional knowledge into an intelligent resource.",
      body: "Give your teams a faster, more useful way to find and work with the information your organisation already has.",
    },
  },
  {
    id: "agents",
    label: "04",
    name: "AI Agents",
    tag: "AI Agents",
    headline: "AI that can act, not just answer.",
    body: "Cuxton develops AI agents that can perform defined, multi-step tasks on behalf of users and teams  retrieving and synthesising information, preparing outputs, routing requests, supporting customers and initiating workflows within approved boundaries. Access rules, escalation paths and human oversight are defined by the organisation.",
    outputs: [
      "Agent design and build within approved scope",
      "Integration with internal systems and data",
      "Defined escalation and human-in-the-loop controls",
      "Operational monitoring and logging",
    ],
    href: "/contact",
    problem: {
      eyebrow: "AI should do more than answer questions.",
      intro: "Many organisations still rely on people to handle repetitive, multi-step tasks that require searching information, preparing responses and moving work between systems.",
      challenges: [
        "Repetitive manual tasks",
        "High-volume requests",
        "Multi-step information workflows",
        "Slow response times",
        "Too much time spent on routine work",
        "Need for human approval on exceptions",
      ],
      ctaLabel: "Explore AI Agents",
    },
    whatWeProvide: [
      "Agent design scoped to a clearly defined, approved task set",
      "Integration with the internal systems and data agents need to act",
      "Defined escalation paths and human-in-the-loop checkpoints",
      "Operational monitoring, logging and performance review",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Identify candidate tasks with clear rules, defined boundaries and a measurable outcome." },
      { phase: "Design & Prototype", note: "Design the agent's scope, escalation rules and system integrations, then test it against real scenarios." },
      { phase: "Deploy & Enable", note: "Deploy within approved boundaries with monitoring, logging and human checkpoints active from launch." },
      { phase: "Operate & Optimise", note: "Review agent performance regularly and expand scope only as confidence and evidence build." },
    ],
    typicalUseCases: [
      "Customer or employee support agents that retrieve and draft responses for review",
      "Document processing agents that extract, classify and route information",
      "Operational agents that coordinate multi-step workflows across systems",
    ],
    security: [
      "Agents act only within explicitly approved scope and permissions",
      "Escalation to a human required for exceptions or high-consequence actions",
      "Full action and decision logging for audit and review",
      "No autonomous access to systems outside the agreed boundary",
    ],
    relatedIndustries: [
      { id: "telecom", name: "Telecommunications" },
      { id: "finance", name: "Financial Services" },
      { id: "healthcare", name: "Healthcare" },
    ],
    closing: {
      heading: "Ready to put AI to work?",
      body: "Let's identify the tasks your organisation can safely delegate to AI  and design an agent around your approved workflows.",
    },
  },
  {
    id: "automation",
    label: "05",
    name: "Workflow Automation",
    tag: "Automation",
    headline: "Reduce repetitive work. Focus skilled time where it matters.",
    body: "Cuxton identifies and automates repetitive, rules-based or information-handling tasks that consume skilled employees' time  data extraction and classification, document processing, report generation, response drafting and operational routing. Automation runs within the organisation's approved systems with clear monitoring and exception handling.",
    outputs: [
      "Workflow analysis and automation opportunity mapping",
      "Automation design and build",
      "Integration with existing operational systems",
      "Exception handling and escalation paths",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Repetitive work shouldn't slow your teams down.",
      intro: "Many organisations spend valuable employee time handling routine processes that involve documents, emails, classification, reporting and moving information between teams.",
      challenges: [
        "Repetitive administrative work",
        "Manual document and email processing",
        "Time-consuming classification and routing",
        "Slow reporting processes",
        "Too many handoffs between teams",
        "Limited time for higher-value work",
      ],
      ctaLabel: "Identify What to Automate",
    },
    whatWeProvide: [
      "Workflow analysis and automation opportunity mapping",
      "Automation design and build around existing systems",
      "Integration with current operational tools and platforms",
      "Exception handling and escalation paths for edge cases",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Map existing workflows end-to-end and identify the repetitive, rules-based steps worth automating first." },
      { phase: "Design & Prototype", note: "Design the automation logic and exception handling, then validate it against real documents and cases." },
      { phase: "Deploy & Enable", note: "Deploy into the live workflow with monitoring and clear escalation paths for anything automation can't resolve." },
      { phase: "Operate & Optimise", note: "Track exception rates and processing time, and extend automation to adjacent steps as it proves out." },
    ],
    typicalUseCases: [
      "Document intake, extraction and classification at scale",
      "Automated report generation and distribution",
      "Routing and triage of incoming requests across teams",
    ],
    security: [
      "Automation operates within existing system permissions, not new access",
      "Clear exception handling for anything outside defined rules",
      "Full processing logs for audit and quality review",
      "No workflow step automated without an agreed escalation path",
    ],
    relatedIndustries: [
      { id: "finance", name: "Financial Services" },
      { id: "telecom", name: "Telecommunications" },
      { id: "legal", name: "Legal & Audit" },
    ],
    closing: {
      heading: "Ready to reduce repetitive work?",
      body: "Let's identify the workflows that can be automated and design a solution that keeps your people focused on the work that requires human judgement.",
    },
  },
  {
    id: "integration",
    label: "06",
    name: "Enterprise AI Integration",
    tag: "Integration",
    headline: "Connect AI to your existing technology landscape.",
    body: "Cuxton integrates AI capabilities with enterprise applications  ERP, CRM, HRMS, document management and internal APIs  so AI is embedded in existing workflows rather than creating a parallel system. Integration is designed with security, authentication and access control in mind.",
    outputs: [
      "System and API integration architecture",
      "Secure connector build and testing",
      "Identity and access control integration",
      "Documentation and handover",
    ],
    href: "/contact",
    problem: {
      eyebrow: "AI shouldn't mean another disconnected system.",
      intro: "Point solutions that sit outside existing tools create duplicate work, inconsistent data and yet another login for already-stretched teams.",
      challenges: [
        "AI tools disconnected from core systems",
        "Duplicate data entry across platforms",
        "Inconsistent identity and access controls",
        "Fragmented reporting across tools",
        "Integration complexity across ERP, CRM and HRMS",
        "Uncertainty about where AI should sit in the stack",
      ],
      ctaLabel: "Plan Your Integration",
    },
    whatWeProvide: [
      "System and API integration architecture across your core platforms",
      "Secure connector build, testing and documentation",
      "Identity and access control integration with existing systems",
      "Handover documentation for your technical team",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Map the systems, APIs and data flows AI needs to connect to, and the access controls already in place." },
      { phase: "Design & Prototype", note: "Design connector architecture and validate it against a real integration scenario before full build." },
      { phase: "Deploy & Enable", note: "Build, test and deploy secure connectors, with identity and access control integrated end-to-end." },
      { phase: "Operate & Optimise", note: "Monitor integration health and extend connections as new systems or use cases are added." },
    ],
    typicalUseCases: [
      "Embedding AI capabilities directly into CRM or ERP workflows",
      "Single sign-on and permission-aware access across AI and core systems",
      "Consolidating multiple disconnected AI tools into one integrated layer",
    ],
    security: [
      "Integration respects existing identity and access management",
      "No new standalone credentials or shadow-IT access paths",
      "Encrypted connections and audited API access",
      "Documentation handed over for ongoing internal maintenance",
    ],
    relatedIndustries: [
      { id: "finance", name: "Financial Services" },
      { id: "telecom", name: "Telecommunications" },
      { id: "healthcare", name: "Healthcare" },
    ],
    closing: {
      heading: "Ready to connect AI to the systems you already run on?",
      body: "Let's map your technology landscape and design integrations that fit into your existing workflows, not around them.",
    },
  },
  {
    id: "custom",
    label: "07",
    name: "Custom AI Solutions",
    tag: "Custom Build",
    headline: "Specialised applications where standard approaches don't apply.",
    body: "Some problems require AI applications built specifically for the organisation's domain, data structure or operational context. Cuxton designs and builds custom AI solutions where an off-the-shelf product or generic integration would be inadequate  including specialised classification, prediction, analysis or decision-support tools.",
    outputs: [
      "Custom solution design and build",
      "Domain-specific model training or fine-tuning",
      "Evaluation and validation methodology",
      "Documentation and support",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Not every problem fits an off-the-shelf answer.",
      intro: "Some operational challenges are specific enough to the organisation's data, domain or process that a generic product or integration falls short.",
      challenges: [
        "Domain-specific data or terminology",
        "No suitable off-the-shelf product",
        "Highly specialised classification or prediction needs",
        "Unique operational or regulatory constraints",
        "Existing tools that don't fit the actual workflow",
        "Need for a defensible, validated methodology",
      ],
      ctaLabel: "Discuss a Custom Build",
    },
    whatWeProvide: [
      "Custom solution design scoped to your specific domain and data",
      "Domain-specific model training or fine-tuning where warranted",
      "Evaluation and validation methodology built into the build",
      "Documentation and ongoing support",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Understand the specific problem, data and constraints that make a standard approach unsuitable." },
      { phase: "Design & Prototype", note: "Design and prototype a solution architecture, testing early against real data and edge cases." },
      { phase: "Deploy & Enable", note: "Build, validate and deploy the solution, with evaluation criteria agreed and documented up front." },
      { phase: "Operate & Optimise", note: "Monitor accuracy and performance over time and retrain or adjust as conditions change." },
    ],
    typicalUseCases: [
      "Specialised classification or risk-scoring models for a specific domain",
      "Prediction or forecasting tools built on proprietary operational data",
      "Decision-support tools tailored to a unique regulatory or process context",
    ],
    security: [
      "Custom models trained only on data your organisation authorises",
      "Evaluation methodology documented for audit and regulatory review",
      "No proprietary logic locked behind an external vendor's platform",
      "Full handover of code, weights and documentation",
    ],
    relatedIndustries: [
      { id: "healthcare", name: "Healthcare" },
      { id: "finance", name: "Financial Services" },
      { id: "government", name: "Government" },
    ],
    closing: {
      heading: "Have a problem that doesn't fit a standard product?",
      body: "Let's talk through the specifics. We'll tell you honestly whether a custom build is warranted  and design it if it is.",
    },
  },
  {
    id: "realtime",
    label: "08",
    name: "Real-Time Data Intelligence",
    tag: "Analytics",
    headline: "Surface patterns and signals from operational data.",
    body: "Cuxton builds real-time and near-real-time AI systems that process operational data streams to detect patterns, anomalies, risks and opportunities  enabling faster, better-informed decisions without requiring human review of every data point.",
    outputs: [
      "Data pipeline and real-time processing design",
      "Pattern detection and alerting systems",
      "Dashboard and reporting integration",
      "Monitoring and model maintenance procedures",
    ],
    href: "/contact",
    problem: {
      eyebrow: "By the time you notice, it's already happened.",
      intro: "Operational data often reveals patterns, risks and opportunities  but only if someone reviews it in time, and most teams can't review every data point manually.",
      challenges: [
        "High-volume operational data streams",
        "Patterns and anomalies missed until after impact",
        "Manual review that can't scale with data volume",
        "Delayed decision-making",
        "Alerts that are too noisy or too late",
        "Limited visibility into emerging risk",
      ],
      ctaLabel: "Surface Your Signals",
    },
    whatWeProvide: [
      "Data pipeline and real-time processing design",
      "Pattern detection and anomaly alerting systems",
      "Dashboard and reporting integration for operational teams",
      "Monitoring and model maintenance procedures",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Identify the data streams and signals that matter most, and the decisions they should inform." },
      { phase: "Design & Prototype", note: "Design detection logic and validate it against historical data before it runs live." },
      { phase: "Deploy & Enable", note: "Deploy real-time processing and alerting, integrated into the dashboards your teams already use." },
      { phase: "Operate & Optimise", note: "Tune alert thresholds and detection models as patterns and operating conditions evolve." },
    ],
    typicalUseCases: [
      "Anomaly and fraud detection across transactional data",
      "Operational risk monitoring across systems and processes",
      "Early-warning signals for capacity, demand or quality issues",
    ],
    security: [
      "Processing occurs within your approved infrastructure boundary",
      "Alert and detection logic auditable by your own teams",
      "No operational data used to train external public models",
      "Access to dashboards and alerts governed by existing permissions",
    ],
    relatedIndustries: [
      { id: "finance", name: "Financial Services" },
      { id: "telecom", name: "Telecommunications" },
      { id: "government", name: "Government" },
    ],
    closing: {
      heading: "Ready to see problems before they escalate?",
      body: "Let's identify the operational signals worth watching and build a system that surfaces them in time to act.",
    },
  },
  {
    id: "training",
    label: "09",
    name: "AI Training & Enablement",
    tag: "Enablement",
    headline: "Prepare your people to use AI responsibly and effectively.",
    body: "Technology alone does not create value. Cuxton provides training and enablement for organisations adopting AI  covering AI literacy, safe use of AI tools, workflow integration, governance procedures and ongoing learning as capability develops.",
    outputs: [
      "Tailored AI literacy and safe-use training",
      "Governance and responsible-use procedures",
      "Workflow-specific enablement sessions",
      "Ongoing learning resources and support",
    ],
    href: "/contact",
    problem: {
      eyebrow: "Technology alone doesn't create value.",
      intro: "Even well-built AI systems under-deliver when teams don't know how to use them safely, effectively, or with appropriate judgement.",
      challenges: [
        "Low AI literacy across teams",
        "Inconsistent or unsafe AI use",
        "No clear governance or usage policy",
        "Uncertainty about what AI should and shouldn't be trusted with",
        "Resistance or over-reliance on new tools",
        "Capability that outpaces internal readiness",
      ],
      ctaLabel: "Build AI Readiness",
    },
    whatWeProvide: [
      "Tailored AI literacy and safe-use training for your teams",
      "Governance and responsible-use procedures aligned to your policies",
      "Workflow-specific enablement sessions tied to real tools",
      "Ongoing learning resources as capability develops",
    ],
    howItWorks: [
      { phase: "Discover & Assess", note: "Assess current AI literacy, usage patterns and gaps against your operational needs." },
      { phase: "Design & Prototype", note: "Design a tailored curriculum and governance materials, piloted with a representative group first." },
      { phase: "Deploy & Enable", note: "Deliver training and enablement sessions across the organisation, workflow by workflow." },
      { phase: "Operate & Optimise", note: "Refresh materials and extend training as tools, policies and capability evolve." },
    ],
    typicalUseCases: [
      "Organisation-wide AI literacy and safe-use programmes",
      "Governance and policy development for teams adopting AI tools",
      "Role-specific enablement for teams operating new AI systems",
    ],
    security: [
      "Training materials aligned to your existing governance and compliance policies",
      "No client data required to deliver general AI literacy training",
      "Clear guidance on what AI should and shouldn't be trusted with",
      "Documentation handed over for internal onboarding use",
    ],
    relatedIndustries: [
      { id: "education", name: "Education & Research" },
      { id: "government", name: "Government" },
      { id: "legal", name: "Legal & Audit" },
    ],
    closing: {
      heading: "Ready to prepare your people, not just your technology?",
      body: "Let's design a training and enablement programme that matches how your teams will actually use AI.",
    },
  },
];
