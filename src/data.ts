export const projects = [
  {
    id: 'flood-detector',
    title: 'Flood Detector',
    category: 'AI/ML • Hackathon Winner',
    description: 'AI-based flood prediction and alert system using real-time data from APIs and sensors. Features mapping integration and region-specific warnings.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=500',
    tech: ['Python', 'APIs', 'Machine Learning'],
    timeline: 'Jan 2025 – Feb 2025',
    links: { github: '#', external: '#' }
  },
  {
    id: 'eduverse',
    title: 'EduVerse – Rural Education Platform',
    category: 'Mobile Development • Education',
    description: 'Mobile app delivering offline educational content to rural areas. Built with Flutter and Firebase, enabling lecture downloads and interactive modules.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
    tech: ['Flutter', 'Firebase', 'Offline Sync'],
    timeline: 'Mar 2024 – Apr 2025',
    links: { github: '#', external: '#' }
  },
  {
    id: 'tapnex',
    title: 'TAPnex Mobile Application',
    category: 'Mobile App • FinTech',
    description: 'Mobile app with role-based login, NFC payment integration, Firebase authentication, and UPI payments. Enhanced volunteer workflows and operations.',
    image: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=500',
    tech: ['Flutter', 'Firebase', 'NFC', 'UPI'],
    timeline: '2025 – Present',
    links: { github: '#', external: '#' }
  },
  {
    id: 'legalyze',
    title: 'Legalyze',
    category: 'AI/ML • Web App',
    description: 'Transform Complex Legal Contracts Into Visual Stories',
    image: 'Legal.jpeg',
    tech: ['Python', 'Flask', 'JavaScript', 'HTML/CSS'],
    timeline: '2025 – Present',
    links: { github: 'https://github.com/Abhyoday-001/Legalyze', external: 'https://legalyze-1.onrender.com/' }
  }
];

export const skills = [
  // AI/ML & Data - The Core
  { id: 'python', name: 'Python', level: 95, category: 'AI/ML', description: 'Advanced system architecture and data processing.' },
  { id: 'gen-ai', name: 'Gen AI', level: 92, category: 'AI/ML', description: 'LLM orchestration, prompt engineering, and agentic workflows.' },
  { id: 'llms', name: 'LLMs/RAG', level: 88, category: 'AI/ML', description: 'Building context-aware systems with Retrieval Augmented Generation.' },
  { id: 'langchain', name: 'LangChain', level: 85, category: 'AI/ML', description: 'Orchestrating complex AI agent chains and tool use.' },
  { id: 'numpy', name: 'Numpy', level: 90, category: 'AI/ML', description: 'High-performance numerical computing and array processing.' },
  { id: 'sklearn', name: 'Scikit-learn', level: 88, category: 'AI/ML', description: 'Machine learning algorithms and predictive modeling.' },
  
  // Web Ecosystem - The Interface
  { id: 'react', name: 'React.js', level: 92, category: 'Web', description: 'Modern component-based UI development and state management.' },
  { id: 'nextjs', name: 'Next.js', level: 90, category: 'Web', description: 'Server-side rendering and optimized full-stack architectures.' },
  { id: 'nodejs', name: 'Node.js', level: 85, category: 'Web', description: 'Scalable server-side JavaScript and API development.' },
  { id: 'flask', name: 'Flask', level: 85, category: 'Web', description: 'Lightweight Python web services and RESTful APIs.' },
  { id: 'rest', name: 'REST APIs', level: 90, category: 'Web', description: 'Secure and efficient system-to-system communication.' },
  
  // Infrastructure & Tools
  { id: 'firebase', name: 'Firebase', level: 88, category: 'Tools', description: 'Real-time databases, authentication, and cloud functions.' },
  { id: 'mongodb', name: 'MongoDB', level: 82, category: 'Tools', description: 'NoSQL document storage for flexible data modeling.' },
  { id: 'git', name: 'Git', level: 92, category: 'Tools', description: 'Distributed version control and collaboration.' },
  { id: 'github', name: 'GitHub', level: 90, category: 'Tools', description: 'Development platform and continuous integration.' }
];

export const experience = [
  {
    role: 'Tech Member',
    company: 'The Cognito Club',
    period: 'Jan 2026 – Present | India',
    description: 'Leading technical initiatives and collaborative project development in a high-impact tech community.',
    tech: ['Leadership', 'Tech Strategy', 'Software Architecture']
  },
  {
    role: 'Mobile Application Developer Intern',
    company: 'TAPnex',
    period: '2025 – Dec 2025 | India',
    description: 'Built a mobile app/website featuring role-based login, NFC payment integration, Firebase authentication, and UPI payments. Enhanced volunteer workflows and streamlined operations.',
    tech: ['Flutter', 'Firebase', 'NFC', 'UPI Integration']
  },
  {
    role: 'Campus Ambassador',
    company: 'E-Cell, IIT Bombay',
    period: '2024 – Dec 2025 | Remote',
    description: 'Promoted E-Cell events and improved campus engagement and outreach. Led initiatives to bridge entrepreneurship and technology.',
    tech: ['Event Management', 'Outreach', 'Leadership']
  }
];

export const stats = [
  { label: 'CGPA', value: 9.025, target: 9.025 },
  { label: 'Projects', value: 3, target: 10 },
  { label: 'Certifications', value: 5, target: 5 }
];

export const certificates = [
  {
    id: 'tata-genai',
    title: 'Tata - GenAI Powered Data Analytics Job Simulation',
    org: 'Forage',
    link: '#',
    issuer: 'Tata',
    date: 'Oct 2025'
  },
  {
    id: 'cloud-fundamentals',
    title: 'Fundamentals of Cloud Computing',
    org: 'LearnQuest',
    link: '#',
    issuer: 'LearnQuest',
    date: 'Aug 2025'
  },
  {
    id: 'deloitte-js',
    title: 'Engineering & Technology Job Simulation',
    org: 'Deloitte (Forage)',
    link: '#',
    issuer: 'Deloitte'
  },
  {
    id: 'jpmc-js',
    title: 'Software Engineering Job Simulation',
    org: 'J.P. Morgan Chase & Co. (Forage)',
    link: '#',
    issuer: 'JPMC'
  },
  {
    id: 'google-gen-ai',
    title: 'Generative AI: Transforming Your Organization',
    org: 'Google Cloud via Coursera',
    link: '#',
    issuer: 'Google Cloud'
  }
];

export const achievements = [
  {
    id: 'tagx-winner',
    title: 'Winner – TagX',
    org: 'Jain University',
    type: 'Win'
  },
  {
    id: 'iiitl-level-3',
    title: 'Reached Level 3',
    org: 'IIIT Lucknow Hackathon',
    type: 'Win'
  },
  {
    id: 'decryptx-3rd',
    title: '3rd position – Decryptx',
    org: 'Jain University',
    type: 'Win'
  },
  {
    id: 'cheat-better-2nd',
    title: '2nd position – Cheat Better',
    org: 'Jain University',
    type: 'Win'
  },
  {
    id: 'google-agentic-ai-2',
    title: '2nd level – Google Agentic AI hackathon',
    org: 'Google',
    type: 'Selection'
  },
  {
    id: 'bjs-finalist',
    title: 'Top 50 Finalist',
    org: 'BJS IT Hackathon',
    type: 'Selection'
  },
  {
    id: 'tutedude-rank',
    title: 'Secured 18th position',
    org: 'Tutedude Web Dev Hackathon (PAN India)',
    type: 'Win'
  }
];
