import { Brain, ShieldAlert, Banknote, Activity, GraduationCap, Lightbulb, Rocket, Network } from "lucide-react";

export const domains = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    icon: Brain,
    difficulty: "Advanced",
    shortDescription: "Build intelligent systems and generative models.",
    objective: "Develop models that can process complex data, automate decision-making, or generate creative solutions using AI/ML.",
    technologies: ["TensorFlow", "PyTorch", "OpenAI APIs", "Hugging Face"],
    problemStatements: [
      {
        id: "PS-AI-01",
        title: "Predictive Resource Allocation for Urban Areas",
        description: "Create an AI model that predicts power and water consumption spikes in metropolitan areas based on historical data and weather patterns.",
        requirements: "Must ingest real-time JSON feeds. Must provide visual dashboard.",
        constraints: "Model inference must run under 500ms.",
        expectedOutcome: "A working prototype demonstrating accurate predictions with less than 15% error margin.",
        difficulty: "Hard",
        pdfLink: "#" // Dummy link
      }
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    slug: "cybersecurity",
    icon: ShieldAlert,
    difficulty: "Advanced",
    shortDescription: "Develop secure tools and mitigate exploits.",
    objective: "Create offensive or defensive security tools, zero-trust architectures, or privacy-enhancing technologies.",
    technologies: ["Rust", "Python", "Cryptography", "Network Protocols"],
    problemStatements: [
      {
        id: "PS-CYB-01",
        title: "Automated Phishing Mitigation System",
        description: "Build a system that intercepts and analyzes emails to classify and quarantine zero-day phishing attempts.",
        requirements: "Must analyze headers and payload. Should not rely solely on known blacklists.",
        constraints: "Must be privacy-preserving (no plaintext email storage).",
        expectedOutcome: "A functional email proxy or API that returns a threat score.",
        difficulty: "Medium",
        pdfLink: "#"
      }
    ]
  },
  {
    id: "fintech",
    name: "FinTech",
    slug: "fintech",
    icon: Banknote,
    difficulty: "Medium",
    shortDescription: "Innovate in finance and payment gateways.",
    objective: "Solve challenges related to financial inclusion, micro-transactions, fraud detection, or decentralized finance.",
    technologies: ["Web3", "Stripe API", "Solidity", "Node.js"],
    problemStatements: [
      {
        id: "PS-FIN-01",
        title: "Micro-lending Credit Scoring Engine",
        description: "Design an alternative credit scoring model for unbanked individuals using non-traditional data sources.",
        requirements: "Clear data ethics and user consent flow.",
        constraints: "Cannot use traditional credit bureau APIs.",
        expectedOutcome: "A mobile-first web app where users can input data and receive an instant micro-loan decision.",
        difficulty: "Medium",
        pdfLink: "#"
      }
    ]
  },
  {
    id: "healthtech",
    name: "HealthTech",
    slug: "healthtech",
    icon: Activity,
    difficulty: "Medium",
    shortDescription: "Digital health and telemedicine solutions.",
    objective: "Improve patient outcomes, streamline hospital workflows, or build accessible telemedicine platforms.",
    technologies: ["React Native", "WebRTC", "HIPAA-compliant structures"],
    problemStatements: [
      {
        id: "PS-HLT-01",
        title: "Remote Patient Monitoring Dashboard",
        description: "A comprehensive dashboard for doctors to monitor IoT medical device data from remote patients in real time.",
        requirements: "Must handle high-frequency data streams (e.g., heart rate).",
        constraints: "Data must be encrypted in transit and at rest.",
        expectedOutcome: "A responsive web portal with real-time charting and critical alert mechanisms.",
        difficulty: "Hard",
        pdfLink: "#"
      }
    ]
  },
  {
    id: "edtech",
    name: "EdTech",
    slug: "edtech",
    icon: GraduationCap,
    difficulty: "Beginner",
    shortDescription: "Transform education with interactive platforms.",
    objective: "Build tools that enhance remote learning, automate grading, or provide personalized learning paths.",
    technologies: ["React", "Firebase", "WebSockets"],
    problemStatements: [
      {
        id: "PS-EDT-01",
        title: "Gamified Concept Mastery Platform",
        description: "Create an interactive platform that turns high school mathematics into an RPG-style progression system.",
        requirements: "Must include a teacher portal to track class progress.",
        constraints: "UI must be accessible to visually impaired students.",
        expectedOutcome: "A working web app with at least one complete 'level' or learning module.",
        difficulty: "Medium",
        pdfLink: "#"
      }
    ]
  },
  {
    id: "sustainability",
    name: "Sustainability",
    slug: "sustainability",
    icon: Lightbulb,
    difficulty: "Beginner",
    shortDescription: "Tech for climate and environmental impact.",
    objective: "Develop solutions for carbon tracking, waste management optimization, or renewable energy distribution.",
    technologies: ["IoT Integration", "Data Visualization", "Mapping APIs"],
    problemStatements: [
      {
        id: "PS-SUS-01",
        title: "Smart Waste Bin Routing",
        description: "An optimization algorithm and UI for municipal waste collection based on fill-level predictions.",
        requirements: "Must map optimal routes.",
        constraints: "Assume a fleet of only 5 trucks for a city of 100k.",
        expectedOutcome: "A simulated map interface showing dynamic truck routing.",
        difficulty: "Medium",
        pdfLink: "#"
      }
    ]
  },
  {
    id: "smart-cities",
    name: "Smart Cities",
    slug: "smart-cities",
    icon: Network,
    difficulty: "Advanced",
    shortDescription: "Urban optimization and infrastructure.",
    objective: "Build systems to manage traffic flow, public transport, or civic engagement in modern cities.",
    technologies: ["Computer Vision", "GeoJSON", "Cloud Architecture"],
    problemStatements: [
      {
        id: "PS-SMC-01",
        title: "Adaptive Traffic Signal Control",
        description: "A computer vision-based system to dynamically adjust traffic light timings based on real-time vehicle density.",
        requirements: "Must simulate camera inputs.",
        constraints: "Must prioritize emergency vehicles.",
        expectedOutcome: "A dashboard showing a simulated intersection and traffic flow improvements.",
        difficulty: "Hard",
        pdfLink: "#"
      }
    ]
  },
  {
    id: "emerging-tech",
    name: "Emerging Tech",
    slug: "emerging-tech",
    icon: Rocket,
    difficulty: "Hard",
    shortDescription: "Web3, AR/VR, and Next-Gen innovation.",
    objective: "Push the boundaries using augmented reality, blockchain, or quantum computing concepts.",
    technologies: ["Three.js", "WebXR", "Smart Contracts"],
    problemStatements: [
      {
        id: "PS-EMG-01",
        title: "AR Indoor Navigation for Large Venues",
        description: "A WebAR application that helps users navigate complex indoor environments like universities or malls.",
        requirements: "Must work in a standard mobile browser.",
        constraints: "Cannot rely on GPS for indoor positioning.",
        expectedOutcome: "A working AR prototype using AR.js or WebXR.",
        difficulty: "Hard",
        pdfLink: "#"
      }
    ]
  }
];
