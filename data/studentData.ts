// Sample student data for dashboard
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  totalHoursLearned: number;
  currentStreak: number;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseName: string;
  progress: number; // 0-100
  status: "in_progress" | "completed" | "paused";
  enrolledDate: string;
  lastAccessedDate: string;
}

export interface SkillProgress {
  skill: string;
  progress: number; // 0-100
  level: "Novice" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface LessonProgress {
  lessonId: string;
  lessonTitle: string;
  completed: boolean;
  completedAt?: string;
  score?: number;
  timeSpent: number; // minutes
}

export const SAMPLE_STUDENT: StudentProfile = {
  id: "student-1",
  name: "Ryan Fabrice",
  email: "ryanfabrice98@gmail.com",
  avatar: "/avatars/ryan.jpg",
  joinedDate: "2024-01-15",
  totalHoursLearned: 156,
  currentStreak: 7,
  level: "Intermediate",
};

export const SAMPLE_ENROLLMENTS: Enrollment[] = [
  {
    id: "enroll-1",
    courseId: "web-dev",
    courseName: "Full-Stack Web Development",
    progress: 65,
    status: "in_progress",
    enrolledDate: "2024-01-20",
    lastAccessedDate: "2026-09-18",
  },
  {
    id: "enroll-2",
    courseId: "react-advanced",
    courseName: "Advanced React Patterns",
    progress: 42,
    status: "in_progress",
    enrolledDate: "2024-02-10",
    lastAccessedDate: "2026-09-17",
  },
  {
    id: "enroll-3",
    courseId: "typescript",
    courseName: "TypeScript for JavaScript Developers",
    progress: 100,
    status: "completed",
    enrolledDate: "2024-01-25",
    lastAccessedDate: "2026-08-30",
  },
];

export const SAMPLE_SKILLS: SkillProgress[] = [
  { skill: "JavaScript", progress: 80, level: "Advanced" },
  { skill: "React", progress: 70, level: "Intermediate" },
  { skill: "TypeScript", progress: 90, level: "Advanced" },
  { skill: "CSS", progress: 75, level: "Intermediate" },
  { skill: "Node.js", progress: 55, level: "Beginner" },
  { skill: "HTML", progress: 85, level: "Advanced" },
];

export const SAMPLE_LESSON_PROGRESS: LessonProgress[] = [
  {
    lessonId: "web-1-1",
    lessonTitle: "Introduction to Web Development",
    completed: true,
    completedAt: "2026-09-10",
    score: 95,
    timeSpent: 45,
  },
  {
    lessonId: "web-1-2",
    lessonTitle: "HTML Fundamentals",
    completed: true,
    completedAt: "2026-09-11",
    score: 88,
    timeSpent: 65,
  },
  {
    lessonId: "web-1-3",
    lessonTitle: "CSS Styling & Layouts",
    completed: true,
    completedAt: "2026-09-12",
    score: 92,
    timeSpent: 75,
  },
  {
    lessonId: "web-2-1",
    lessonTitle: "JavaScript Fundamentals",
    completed: true,
    completedAt: "2026-09-15",
    score: 87,
    timeSpent: 95,
  },
  {
    lessonId: "web-2-2",
    lessonTitle: "Async JavaScript & Promises",
    completed: false,
    timeSpent: 30,
  },
];

export const SAMPLE_RECOMMENDED_PRACTICE = [
  {
    id: "practice-1",
    type: "coding_challenge" as const,
    title: "Build a Todo App",
    description: "Practice React state management by building an interactive todo list",
    duration: 60,
    difficulty: "Intermediate",
    relatedSkill: "React",
  },
  {
    id: "practice-2",
    type: "quiz" as const,
    title: "JavaScript Quiz: Promises & Async/Await",
    description: "Test your understanding of asynchronous JavaScript",
    duration: 20,
    difficulty: "Intermediate",
    relatedSkill: "JavaScript",
  },
  {
    id: "practice-3",
    type: "project" as const,
    title: "Build a Weather App",
    description: "Create a weather application using React and a public API",
    duration: 120,
    difficulty: "Advanced",
    relatedSkill: "React",
  },
];
