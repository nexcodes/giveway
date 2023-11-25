import { Metadata } from "next";
import LoginPageContent from "../_components/login-page-content";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <LoginPageContent />
  );
}
