export const profile = {
  name: 'Md Solaiman Chowdhury',
  role: 'Senior Software Engineer',
  location: 'Dhaka, Bangladesh',
  coords: '23.8103° N, 90.4125° E',
  bio: `I am Senior Software Engineer with around 6 years of experience building high-impact Android and cross-platform mobile
applications. Proven track record delivering fintech and MFS solutions at scale, including apps with 50M+
downloads. Experienced in leading features end-to-end, from architecture to App Store release. Currently seeking
to apply mobile app development expertise in the industry, with additional experience in AI/ML research and
LLM integration.`,
  github: 'https://github.com/solaiman6551',
  email: 'mailto:solaiman6551@gmail.com',
  linkedin: 'https://www.linkedin.com/in/solaiman247',
};

export const news = [
  { date: '2026-07-25', text: 'Started the PMIT program at Jahangirnagar University (Saturday batch).' },
  { date: '2026-06-01', text: 'Wrapped up a GIS pipeline-mapping project for Titas Gas — Flutter + PostGIS + GeoServer.' },
];

// TODO: replace placeholders with your actual paper titles / venues / links
export const research = [
  {
    title: 'Enhancing Septic Shock Detection through Interpretable Machine Learning',
    venue: 'Tech Science Press — Comput. Model. Eng. Sci',
    year: '2024',
    authors: 'Md Mahfuzur Rahman, Md Solaiman Chowdhury, Mohammad Shorfuzzaman, Lutful Karim, Md Shafiullah, Farag Azzedin',
    links: { doi: 'https://doi.org/10.32604/cmes.2024.055065', pdf: 'https://www.techscience.com/CMES/v141n3/58498' },
  },
  {
    title: 'Peer-to-Peer Power Energy Trading in Blockchain Using Efficient Machine Learning Model',
    venue: 'MDPI — Sustainability',
    year: '2023',
    authors: 'Hammoudeh M Rahman M, Chowdhury S, Shorfuzzaman M, Hossain MK',
    links: { doi: 'https://doi.org/10.3390/su151813640', pdf: 'https://www.mdpi.com/2071-1050/15/18/13640' },
  },
  {
    title: 'Preference aware smart hospital selection system for patients',
    venue: 'ACM — Workshop Proceedings of the 49th International Conference on Parallel Processing',
    year: '2020',
    authors: 'Md Solaiman Chowdhury, Jenifar Rahman, Md Mahfuzur Rahman',
    links: { doi: 'https://doi.org/10.1145/3409390.3409391', pdf: 'https://dl.acm.org/doi/abs/10.1145/3409390.3409391' },
  },
  {
    title: 'Preference-aware public transport matching',
    venue: 'IEEE — International Conference on Innovation in Engineering and Technology (ICIET)',
    year: '2018',
    authors: 'Md Solaiman Chowdhury, Md Abu Osman, Md Mahfuzur Rahman',
    links: { doi: 'https://doi.org/10.1109/CIET.2018.8660857', pdf: 'https://ieeexplore.ieee.org/abstract/document/8660857' },
  },
];

// TODO: fill in MADD Technology's role/location/bullets — cut off in your CV excerpt
export const experience = [
  {
    period: 'July 2024 — Present',
    org: 'Independent / Open Source',
    role: 'Self-Directed Learning & Development · Remote',
    description: 'Actively learning **React** to expand into modern web frontend development, building production-level UI components.',
    bullets: [
      'Actively learning **React** to expand into modern web frontend development, building production-level UI components.',
      'Developing an **AI agent project** using LLMs, published on GitHub, demonstrating initiative in emerging technologies.',
      'Deepening full-stack knowledge to bridge mobile expertise with web and AI capabilities.',
    ],
  },
  {
    period: 'July 2021 — June 2024',
    org: 'Red.Digital IT Limited',
    role: 'Senior Software Engineer · Dhaka, Bangladesh',
    description: 'Actively learning **React** to expand into modern web frontend development, building production-level UI components.',
    bullets: [
      'Contributed to revamp of **MyRobi (50M+ downloads)** and **MyAirtel (10M+ downloads)** Android apps — account management, feature search, Material3 UI (Kotlin, Coroutines, Retrofit).',
      'Led end-to-end development of **dCloud**, a digital financial app for FSIB PLC — eKYC, send money, biometric login, device binding (Flutter, Riverpod, SSL Pinning).',
      'Delivered Android features for **Trust Axiata Pay (TAP)** MFS app (500K+ downloads), achieving **99.92% crash-free stability** (Kotlin, MVVM, Hilt).',
      'Built **FirstCash MFS** from scratch in Flutter — customer, agent, and merchant workflows for Android & iOS.',
      'Developed **Smart LPG**, a Flutter distribution app with real-time location tracking for customer, agent, and delivery roles.',
      'Mentored team members; recognized as **Star Developer in 2021 and 2023**.',
    ],
  },
  {
    period: 'November 2020 — June 2021',
    org: 'MADD Technology',
    role: 'Software Engineer · Dhaka, Bangladesh',
    description: 'Actively learning **React** to expand into modern web frontend development, building production-level UI components.',
    bullets: [
      'TODO — fill in your MADD Technology highlights (Titas Gas Pipeline Mapping, etc.)',
    ],
  },
  {
    period: 'December 2018 — October 2020',
    org: 'Bengal Solutions Ltd',
    role: 'Software Engineer · Dhaka, Bangladesh',
    description: 'Actively learning **React** to expand into modern web frontend development, building production-level UI components.',
    bullets: [
      'TODO — fill in your MADD Technology highlights (Titas Gas Pipeline Mapping, etc.)',
    ],
  },
];

// Static blog posts for now — once the Django backend is live, swap this
// for a fetch() call to the API and delete this file's `posts` export.
export const posts = [
  {
    slug: 'hello-world',
    title: 'Hello, world',
    date: '2026-09-01',
    excerpt: 'Why I built this site, and what I plan to write about here.',
    content: `# Hello, world

This is the first post on the new site. More on Flutter, Kotlin/Android,
GIS tooling, and research notes to come.`,
  },
];

// TODO: adjust exact dates/CGPA if you want them shown
// TODO: adjust exact dates/CGPA if you want them shown
export const education = [
  {
    org: 'Jahangirnagar University',
    degree: 'Professional Master\'s of Science in Information Technology (PMIT)',
    period: 'Jul 2026 — Present',
    description: 'Placed 3rd on the admission test merit list. Coursework includes Data Mining, Software Testing, Cryptography, and MIS.',
  },
  {
    org: 'North South University (NSU)',
    degree: 'BSc in Computer Science & Engineering',
    period: 'May 2013 - Aug 2018',
    description: 'Thesis: A Queuing Theory Based Algorithm for Parking Space Sharing',
  },
];