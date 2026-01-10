export type Technology =
  | "typescript"
  | "javascript"
  | "nodejs"
  | "csharp"
  | "java"
  | "react"
  | "mongodb"
  | "mysql"
  | "postgresql"
  | "redis"
  | "tailwind"
  | "linux"
  | "nginx"
  | "docker"
  | "kubernetes";

export type TechnologyDetails = {
  tech: Technology;
  label: string;
  backgroundColor: string;
};
