// Sample course data for CuxtonAI Academy
export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  objectives: string[];
  content: string;
  order: number;
  hasQuiz: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // weeks
  thumbnail: string;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  modules: Module[];
  skills: string[];
  createdAt: string;
}

export const SAMPLE_COURSES: Course[] = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development",
    description: "Build modern web applications using React, Node.js, TypeScript and databases. Learn everything from frontend to backend to deployment.",
    level: "Intermediate",
    duration: 12,
    thumbnail: "/courses/web-dev.jpg",
    instructor: "Sarah Chen",
    rating: 4.8,
    studentsEnrolled: 3247,
    skills: ["React", "Node.js", "TypeScript", "SQL", "REST APIs", "Deployment"],
    createdAt: "2024-01-15",
    modules: [
      {
        id: "web-1-fundamentals",
        title: "Web Development Fundamentals",
        description: "HTML, CSS, and JavaScript basics for modern web development",
        order: 1,
        lessons: [
          {
            id: "web-1-1",
            title: "Introduction to Web Development",
            description: "Understand the client-server model and how the web works",
            duration: 45,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Understand how web browsers work",
              "Learn the role of HTML, CSS, and JavaScript",
              "Set up your development environment",
            ],
            content: "Introduction to web development covers the fundamental concepts of how websites work. You'll learn about browsers, servers, and the HTTP protocol.",
          },
          {
            id: "web-1-2",
            title: "HTML Fundamentals",
            description: "Learn semantic HTML5 and create well-structured web pages",
            duration: 60,
            order: 2,
            hasQuiz: true,
            objectives: [
              "Write semantic HTML5",
              "Create forms and input elements",
              "Understand accessibility in HTML",
            ],
            content: "HTML provides the structure for web pages. Learn semantic elements, forms, and accessibility best practices.",
          },
          {
            id: "web-1-3",
            title: "CSS Styling & Layouts",
            description: "Master CSS Grid and Flexbox for modern responsive layouts",
            duration: 75,
            order: 3,
            hasQuiz: true,
            objectives: [
              "Use Flexbox for layouts",
              "Master CSS Grid",
              "Create responsive designs",
            ],
            content: "CSS enables beautiful styling and responsive layouts. Learn Flexbox, Grid, and media queries for responsive design.",
          },
        ],
      },
      {
        id: "web-2-javascript",
        title: "JavaScript & Modern ES6+",
        description: "Master JavaScript syntax, async programming, and modern features",
        order: 2,
        lessons: [
          {
            id: "web-2-1",
            title: "JavaScript Fundamentals",
            description: "Variables, types, functions, and control flow",
            duration: 90,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Understand JavaScript variables and types",
              "Write functions and closures",
              "Use control flow statements",
            ],
            content: "JavaScript fundamentals cover the core language features needed for web development.",
          },
          {
            id: "web-2-2",
            title: "Async JavaScript & Promises",
            description: "Learn promises, async/await, and handling asynchronous operations",
            duration: 75,
            order: 2,
            hasQuiz: true,
            objectives: [
              "Understand promises",
              "Write async/await functions",
              "Handle errors in async code",
            ],
            content: "Asynchronous programming is essential for modern web development. Learn how to work with APIs and handle async operations.",
          },
        ],
      },
    ],
  },
  {
    id: "react-advanced",
    title: "Advanced React Patterns",
    description: "Master React hooks, state management, performance optimization, and advanced component patterns. Build scalable applications.",
    level: "Advanced",
    duration: 10,
    thumbnail: "/courses/react-advanced.jpg",
    instructor: "Alex Kumar",
    rating: 4.9,
    studentsEnrolled: 2156,
    skills: ["React Hooks", "State Management", "Performance", "Testing", "TypeScript"],
    createdAt: "2024-02-01",
    modules: [
      {
        id: "react-1-hooks",
        title: "React Hooks Deep Dive",
        description: "Master useState, useEffect, useContext, and custom hooks",
        order: 1,
        lessons: [
          {
            id: "react-1-1",
            title: "Understanding React Hooks",
            description: "Learn how hooks work and why they changed React development",
            duration: 60,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Understand hook rules",
              "Use useState for state management",
              "Master useEffect for side effects",
            ],
            content: "React Hooks provide a powerful way to use state and other features without class components.",
          },
          {
            id: "react-1-2",
            title: "Custom Hooks & Context",
            description: "Create reusable logic with custom hooks and manage global state with Context",
            duration: 75,
            order: 2,
            hasQuiz: true,
            objectives: [
              "Write custom hooks",
              "Use useContext for global state",
              "Avoid prop drilling",
            ],
            content: "Custom hooks let you extract component logic into reusable functions. Context API provides a way to pass data through the component tree.",
          },
        ],
      },
      {
        id: "react-2-performance",
        title: "Performance Optimization",
        description: "Optimize React applications for speed and efficiency",
        order: 2,
        lessons: [
          {
            id: "react-2-1",
            title: "Memoization & Code Splitting",
            description: "Learn React.memo, useMemo, useCallback, and dynamic imports",
            duration: 70,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Use React.memo effectively",
              "Implement useMemo and useCallback",
              "Split code for faster loading",
            ],
            content: "Performance is critical for user experience. Learn techniques to optimize render performance and bundle size.",
          },
        ],
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript for JavaScript Developers",
    description: "Add type safety to your JavaScript projects. Learn TypeScript syntax, advanced types, and practical patterns for building robust applications.",
    level: "Intermediate",
    duration: 8,
    thumbnail: "/courses/typescript.jpg",
    instructor: "Maria Garcia",
    rating: 4.7,
    studentsEnrolled: 2891,
    skills: ["TypeScript", "Type Safety", "Interfaces", "Generics", "Decorators"],
    createdAt: "2024-01-20",
    modules: [
      {
        id: "ts-1-basics",
        title: "TypeScript Basics",
        description: "Get started with TypeScript types and interfaces",
        order: 1,
        lessons: [
          {
            id: "ts-1-1",
            title: "Why TypeScript?",
            description: "Understand the benefits of static typing",
            duration: 45,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Understand type systems",
              "Learn TypeScript advantages",
              "Set up TypeScript project",
            ],
            content: "TypeScript adds optional static typing to JavaScript. Learn why it helps catch bugs early and improve code quality.",
          },
          {
            id: "ts-1-2",
            title: "Basic Types & Interfaces",
            description: "Work with primitive types, unions, and interfaces",
            duration: 60,
            order: 2,
            hasQuiz: true,
            objectives: [
              "Use basic types",
              "Define interfaces",
              "Understand type inference",
            ],
            content: "TypeScript provides built-in types and lets you define custom types with interfaces.",
          },
        ],
      },
    ],
  },
  {
    id: "python-ai",
    title: "Python for AI & Machine Learning",
    description: "Learn Python and build AI/ML applications. Cover NumPy, Pandas, scikit-learn, and neural networks.",
    level: "Beginner",
    duration: 14,
    thumbnail: "/courses/python-ai.jpg",
    instructor: "Dr. James Wilson",
    rating: 4.8,
    studentsEnrolled: 4521,
    skills: ["Python", "NumPy", "Pandas", "scikit-learn", "Machine Learning", "Neural Networks"],
    createdAt: "2024-01-10",
    modules: [
      {
        id: "py-1-basics",
        title: "Python Fundamentals",
        description: "Start with Python syntax and core concepts",
        order: 1,
        lessons: [
          {
            id: "py-1-1",
            title: "Getting Started with Python",
            description: "Install Python and write your first program",
            duration: 50,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Install Python and tools",
              "Write and run Python scripts",
              "Understand Python syntax",
            ],
            content: "Python is a powerful language for AI and data science. Learn the basics and set up your development environment.",
          },
        ],
      },
    ],
  },
  {
    id: "ai-fundamentals",
    title: "AI & Machine Learning Fundamentals",
    description: "Understand AI concepts, machine learning algorithms, and how neural networks work. Build your foundation in AI literacy.",
    level: "Beginner",
    duration: 6,
    thumbnail: "/courses/ai-fundamentals.jpg",
    instructor: "Dr. Emma Thompson",
    rating: 4.9,
    studentsEnrolled: 5823,
    skills: ["AI Concepts", "Machine Learning", "Neural Networks", "Deep Learning", "AI Ethics"],
    createdAt: "2024-01-05",
    modules: [
      {
        id: "ai-1-concepts",
        title: "What is AI?",
        description: "Foundational concepts in artificial intelligence",
        order: 1,
        lessons: [
          {
            id: "ai-1-1",
            title: "Introduction to Artificial Intelligence",
            description: "Understand what AI is and its applications",
            duration: 40,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Define artificial intelligence",
              "Learn AI applications",
              "Understand machine learning basics",
            ],
            content: "AI is transforming how we work and live. Learn the fundamentals and explore different types of AI systems.",
          },
          {
            id: "ai-1-2",
            title: "Machine Learning Algorithms",
            description: "Explore supervised and unsupervised learning",
            duration: 55,
            order: 2,
            hasQuiz: true,
            objectives: [
              "Understand supervised learning",
              "Learn about unsupervised learning",
              "Know when to use each approach",
            ],
            content: "Machine learning algorithms power most AI systems. Learn how they work and when to apply them.",
          },
        ],
      },
    ],
  },
  {
    id: "node-backend",
    title: "Backend Development with Node.js",
    description: "Build scalable backend applications using Node.js and Express. Learn APIs, databases, authentication, and deployment.",
    level: "Intermediate",
    duration: 10,
    thumbnail: "/courses/node-backend.jpg",
    instructor: "Michael Lee",
    rating: 4.6,
    studentsEnrolled: 2734,
    skills: ["Node.js", "Express", "REST APIs", "Databases", "Authentication", "DevOps"],
    createdAt: "2024-02-10",
    modules: [
      {
        id: "node-1-basics",
        title: "Node.js & Express Fundamentals",
        description: "Get started building servers with Node.js",
        order: 1,
        lessons: [
          {
            id: "node-1-1",
            title: "Node.js Basics",
            description: "Understand the Node.js runtime and event loop",
            duration: 50,
            order: 1,
            hasQuiz: true,
            objectives: [
              "Understand Node.js and npm",
              "Learn the event loop",
              "Work with modules",
            ],
            content: "Node.js allows you to write JavaScript on the server. Learn how it works and why it's popular for backend development.",
          },
        ],
      },
    ],
  },
];

export const LEARNING_PATHS = [
  {
    id: "web-dev-path",
    title: "Become a Web Developer",
    description: "Master full-stack web development from HTML/CSS to React and Node.js. Build real-world applications.",
    courses: ["web-dev", "react-advanced", "typescript", "node-backend"],
    duration: 24,
    level: "Beginner to Advanced",
  },
  {
    id: "ai-dev-path",
    title: "AI & Machine Learning Developer",
    description: "Learn AI fundamentals, build ML models, and create AI applications with Python.",
    courses: ["ai-fundamentals", "python-ai"],
    duration: 20,
    level: "Beginner to Intermediate",
  },
  {
    id: "frontend-path",
    title: "Frontend Specialist",
    description: "Become expert in React, TypeScript, and modern frontend development.",
    courses: ["web-dev", "react-advanced", "typescript"],
    duration: 16,
    level: "Beginner to Advanced",
  },
];
