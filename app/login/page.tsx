import type { Metadata } from "next";
import LoginForm from "@/components/dashboard/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Cuxton AI console sign in.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
