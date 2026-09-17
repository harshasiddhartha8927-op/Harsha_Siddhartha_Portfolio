import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Initial default data used ONLY when database is completely empty
const DEFAULT_INITIAL_DATA = {
  about: {
    name: 'P. Harsha Siddhartha',
    title: 'B.Tech CSE | Generative AI',
    subtitle: 'Computer Science & Engineering Student & Developer',
    bio: "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
    education: 'B.Tech — Computer Science and Engineering',
    specialization: 'Generative AI',
    careerGoal: 'Building innovative web applications and cutting-edge Generative AI solutions.',
    avatarUrl:
      'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png',
  },
  skills: [
    { id: 'sk-1', name: 'Frontend Development', category: 'Frontend', level: 'Advanced', featured: true },
    { id: 'sk-2', name: 'React & TypeScript', category: 'Frontend', level: 'Advanced', featured: true },
    { id: 'sk-3', name: 'Tailwind CSS & Motion', category: 'Frontend', level: 'Advanced', featured: true },
    { id: 'sk-4', name: 'Backend Development', category: 'Backend', level: 'Advanced', featured: true },
    { id: 'sk-5', name: 'Node.js & Python', category: 'Backend', level: 'Intermediate', featured: true },
    { id: 'sk-6', name: 'REST APIs & Databases', category: 'Backend', level: 'Intermediate', featured: true },
    { id: 'sk-7', name: 'Generative AI', category: 'AI', level: 'Specialized', featured: true },
    { id: 'sk-8', name: 'LLMs & Prompting', category: 'AI', level: 'Specialized', featured: true },
    { id: 'sk-9', name: 'LangChain & PyTorch', category: 'AI', level: 'Intermediate', featured: true },
    { id: 'sk-10', name: 'Web Development', category: 'Development', level: 'Advanced', featured: true },
    { id: 'sk-11', name: 'Git & GitHub Workflow', category: 'Development', level: 'Advanced', featured: true },
    { id: 'sk-12', name: 'System Design Basics', category: 'Development', level: 'Intermediate', featured: true },
  ],
  services: [
    {
      id: 'srv-01',
      name: '3D Modeling',
      description:
        'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
      status: 'published',
      order: 1,
    },
    {
      id: 'srv-02',
      name: 'Rendering',
      description:
        'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
      status: 'published',
      order: 2,
    },
    {
      id: 'srv-03',
      name: 'Motion Design',
      description:
        'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
      status: 'published',
      order: 3,
    },
    {
      id: 'srv-04',
      name: 'Branding',
      description:
        'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
      status: 'published',
      order: 4,
    },
    {
      id: 'srv-05',
      name: 'Web Design',
      description:
        'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
      status: 'published',
      order: 5,
    },
  ],
  projects: [
    {
      id: 'proj-01',
      name: 'Traffic Violation Intelligence',
      category: 'Generative AI & Vision',
      shortDescription: 'AI-driven computer vision system detecting traffic compliance in real-time.',
      detailedDescription: 'An automated computer vision and generative analytics system engineered for intelligent urban traffic regulation. Uses deep neural networks for helmet detection, lane violation detection, and licence plate extraction.',
      status: 'published',
      featured: true,
      technologies: {
        all: ['Python', 'PyTorch', 'OpenCV', 'React', 'FastAPI'],
        frontend: ['React', 'Tailwind CSS', 'Framer Motion'],
        backend: ['FastAPI', 'Python', 'PostgreSQL'],
        ai: ['PyTorch', 'YOLOv8', 'Generative Vision Models'],
      },
      story: {
        problem: 'Manual traffic regulation lacks real-time precision and scalability across dense metropolitan areas.',
        solution: 'Automated AI pipeline combining computer vision with generative reporting to detect violations instantaneously.',
        features: ['Real-time object tracking', 'Automatic license plate recognition', 'Generative violation report generation'],
        role: 'Lead Developer & AI Architect',
        challenges: 'Optimizing high FPS inference speeds on edge servers without dropping bounding box accuracy.',
        learned: 'Advanced tensor pipeline optimization and real-time WebSocket communication in full-stack web apps.',
        futureImprovements: 'Integrating edge TPU acceleration and multi-camera spatial tracking.',
      },
      links: {
        github: 'https://github.com',
        live: '#contact',
        demo: 'https://github.com',
      },
      thumbnailUrl:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Img1:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Img2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2Img:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
      createdAt: '2026-01-15',
    },
    {
      id: 'proj-02',
      name: 'Neural Code Assistant',
      category: 'Generative AI & Web Dev',
      shortDescription: 'Context-aware code refactoring and automatic documentation workspace.',
      detailedDescription: 'A developer workspace powered by generative AI that analyzes complex AST syntax trees, suggests performant code refactors, and generates unit test suites automatically.',
      status: 'published',
      featured: true,
      technologies: {
        all: ['React', 'TypeScript', 'Node.js', 'LangChain', 'OpenAI'],
        frontend: ['React', 'TypeScript', 'Tailwind CSS'],
        backend: ['Node.js', 'Express', 'Redis'],
        ai: ['LangChain', 'OpenAI API', 'Vector DB'],
      },
      story: {
        problem: 'Developers spend upwards of 30% of their day writing boilerplate tests and reading legacy code.',
        solution: 'An intelligent IDE extension and companion web dashboard for instant contextual refactoring.',
        features: ['Automated AST parsing', 'One-click unit test generation', 'Multi-file codebase Q&A'],
        role: 'Full Stack & AI Engineer',
        challenges: 'Handling token context limits effectively for large multi-file repositories.',
        learned: 'Vector embedding search indexing (RAG) and streaming response hydration in modern React.',
        futureImprovements: 'Local LLM support via Ollama for offline air-gapped development.',
      },
      links: {
        github: 'https://github.com',
        live: '#contact',
        demo: 'https://github.com',
      },
      thumbnailUrl:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Img1:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Img2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2Img:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
      createdAt: '2026-02-10',
    },
    {
      id: 'proj-03',
      name: 'Generative Canvas Studio',
      category: 'Frontend & Generative AI',
      shortDescription: 'Interactive node-based canvas for multi-modal generative AI workflows.',
      detailedDescription: 'A node-based visual workflow builder that connects image generation, text prompting, and audio synthesis in a seamless interactive canvas.',
      status: 'published',
      featured: true,
      technologies: {
        all: ['React', 'TypeScript', 'Framer Motion', 'Python', 'PyTorch'],
        frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Python', 'FastAPI'],
        ai: ['Stable Diffusion', 'Whisper', 'LLMs'],
      },
      story: {
        problem: 'Chaining multi-modal AI models currently requires switching between disjointed command-line utilities.',
        solution: 'A unified infinite canvas allowing visual connection of prompts, text outputs, and image nodes.',
        features: ['Drag-and-drop node graph', 'Real-time WebSocket rendering', 'Exportable pipeline recipes'],
        role: 'Frontend Architect & UI Developer',
        challenges: 'Maintaining 60 FPS canvas pan and zoom with hundreds of interactive image DOM nodes.',
        learned: 'GPU-accelerated CSS transform layers and state isolation techniques in React.',
        futureImprovements: 'Collaborative real-time canvas editing via WebSockets.',
      },
      links: {
        github: 'https://github.com',
        live: '#contact',
        demo: 'https://github.com',
      },
      thumbnailUrl:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Img1:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Img2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2Img:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
      createdAt: '2026-03-01',
    },
  ],
  contact: {
    email: 'harshasiddhartha8927@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
};

const DOC_ID = 'harsha_portfolio_data';

// Singleton MongoDB client connection pool across serverless invocations
let mongoClientPromise: Promise<MongoClient> | null = null;

function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!uri) return null;

  if (!mongoClientPromise) {
    const client = new MongoClient(uri);
    mongoClientPromise = client.connect();
  }
  return mongoClientPromise;
}

// Fallback disk store filepath in /tmp (ephemeral/local serverless disk)
const FALLBACK_FILE_PATH = path.join(process.platform === 'win32' ? process.cwd() : '/tmp', 'portfolio_db_fallback.json');

function getFallbackData(): any {
  try {
    if (fs.existsSync(FALLBACK_FILE_PATH)) {
      const content = fs.readFileSync(FALLBACK_FILE_PATH, 'utf-8');
      if (content && content.trim()) {
        return JSON.parse(content);
      }
    }
  } catch (err) {
    console.error('[dbStore] Error reading fallback file:', err);
  }
  return null;
}

function saveFallbackData(data: any): boolean {
  try {
    fs.writeFileSync(FALLBACK_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[dbStore] Error writing fallback file:', err);
    return false;
  }
}

export async function getPortfolioData(): Promise<any> {
  const mongoPromise = getMongoClient();
  if (mongoPromise) {
    try {
      const client = await mongoPromise;
      const db = client.db('harsha_portfolio');
      const collection = db.collection('portfolio');
      const doc = await collection.findOne({ _id: DOC_ID as any });

      if (doc && doc.data) {
        return doc.data;
      } else {
        // First time initialization in MongoDB: seed default data ONCE
        await collection.updateOne(
          { _id: DOC_ID as any },
          { $set: { data: DEFAULT_INITIAL_DATA, updatedAt: new Date() } },
          { upsert: true }
        );
        return DEFAULT_INITIAL_DATA;
      }
    } catch (mongoErr) {
      console.error('[dbStore] MongoDB read failed, falling back to disk store:', mongoErr);
    }
  }

  // Fallback disk store
  const saved = getFallbackData();
  if (saved) {
    return saved;
  }

  // First time disk initialization
  saveFallbackData(DEFAULT_INITIAL_DATA);
  return DEFAULT_INITIAL_DATA;
}

export async function savePortfolioData(data: any): Promise<boolean> {
  let savedSuccess = false;

  const mongoPromise = getMongoClient();
  if (mongoPromise) {
    try {
      const client = await mongoPromise;
      const db = client.db('harsha_portfolio');
      const collection = db.collection('portfolio');
      await collection.updateOne(
        { _id: DOC_ID as any },
        { $set: { data, updatedAt: new Date() } },
        { upsert: true }
      );
      savedSuccess = true;
    } catch (mongoErr) {
      console.error('[dbStore] MongoDB save error:', mongoErr);
    }
  }

  // Always update local disk fallback as well
  const diskSuccess = saveFallbackData(data);
  return savedSuccess || diskSuccess;
}
