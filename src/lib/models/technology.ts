export type Technology = "typescript" | "javascript" | "csharp" | "java" | "react" | "mongodb" | "mysql" | "redis" | "tailwind";
export type TechnologyDetails = Record<Technology, {
    label: string;
    backgroundColor: string;
}>;
