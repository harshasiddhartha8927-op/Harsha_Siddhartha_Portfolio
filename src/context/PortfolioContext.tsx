import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Project, Skill, Service, AboutInfo, ContactInfo } from '../types/portfolio';

const INITIAL_ABOUT: AboutInfo = {
  name: 'P. Harsha Siddhartha',
  title: 'B.Tech CSE | Generative AI',
  subtitle: 'Computer Science & Engineering Student & Developer',
  bio: "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
  education: 'B.Tech — Computer Science and Engineering',
  specialization: 'Generative AI',
  careerGoal: 'Building innovative web applications and cutting-edge Generative AI solutions.',
  avatarUrl:
    'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png',
};

const INITIAL_SKILLS: Skill[] = [
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
  { id: 'sk-[#sk-11]', name: 'Git & GitHub Workflow', category: 'Development', level: 'Advanced', featured: true },
  { id: 'sk-12', name: 'System Design Basics', category: 'Development', level: 'Intermediate', featured: true },
];

const INITIAL_SERVICES: Service[] = [
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
];

const INITIAL_PROJECTS: Project[] = [
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
];

const INITIAL_CONTACT: ContactInfo = {
  email: 'harshasiddhartha8927@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
};

interface PortfolioContextType {
  about: AboutInfo;
  skills: Skill[];
  services: Service[];
  projects: Project[];
  contact: ContactInfo;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (username?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateAbout: (newAbout: Partial<AboutInfo>) => void;
  updateContact: (newContact: Partial<ContactInfo>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  moveServiceOrder: (id: string, direction: 'up' | 'down') => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleProjectStatus: (id: string) => void;
  toggleProjectFeatured: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [about, setAbout] = useState<AboutInfo>(() => {
    const saved = localStorage.getItem('harsha_portfolio_about');
    return saved ? JSON.parse(saved) : INITIAL_ABOUT;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('harsha_portfolio_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('harsha_portfolio_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('harsha_portfolio_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [contact, setContact] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('harsha_portfolio_contact');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Remove legacy insecure auth flag from localStorage if present
  useEffect(() => {
    localStorage.removeItem('harsha_portfolio_auth');
  }, []);

  // Check server session on mount
  useEffect(() => {
    let mounted = true;
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/session', { credentials: 'same-origin' });
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            setIsAuthenticated(!!data.authenticated);
          }
        } else {
          if (mounted) {
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error('Failed to check admin session:', err);
        if (mounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setIsAuthLoading(false);
        }
      }
    };

    checkSession();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('harsha_portfolio_about', JSON.stringify(about));
  }, [about]);

  useEffect(() => {
    localStorage.setItem('harsha_portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('harsha_portfolio_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('harsha_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('harsha_portfolio_contact', JSON.stringify(contact));
  }, [contact]);

  const login = async (usernameArg?: string, passwordArg?: string) => {
    try {
      const username = usernameArg || '';
      const password = passwordArg || '';

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        return { success: true };
      } else {
        setIsAuthenticated(false);
        return { success: false, error: data.error || 'Invalid login credentials.' };
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setIsAuthenticated(false);
      return { success: false, error: 'Server authentication request failed.' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsAuthenticated(false);
    }
  };

  const updateAbout = (newAbout: Partial<AboutInfo>) => {
    setAbout((prev) => ({ ...prev, ...newAbout }));
  };

  const updateContact = (newContact: Partial<ContactInfo>) => {
    setContact((prev) => ({ ...prev, ...newContact }));
  };

  const addSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: `sk-${Date.now()}`,
    };
    setSkills((prev) => [...prev, newSkill]);
  };

  const updateSkill = (id: string, skillData: Partial<Skill>) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...skillData } : s)));
  };

  const deleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      status: serviceData.status || 'published',
      order: services.length + 1,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, serviceData: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...serviceData } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleServiceStatus = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'published' ? 'draft' : 'published' } : s))
    );
  };

  const moveServiceOrder = (id: string, direction: 'up' | 'down') => {
    setServices((prev) => {
      const index = prev.findIndex((s) => s.id === id);
      if (index < 0) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...projectData } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProjectStatus = (id: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
          : p
      )
    );
  };

  const toggleProjectFeatured = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  return (
    <PortfolioContext.Provider
      value={{
        about,
        skills,
        services,
        projects,
        contact,
        isAuthenticated,
        isAuthLoading,
        login,
        logout,
        updateAbout,
        updateContact,
        addSkill,
        updateSkill,
        deleteSkill,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        moveServiceOrder,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectStatus,
        toggleProjectFeatured,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
