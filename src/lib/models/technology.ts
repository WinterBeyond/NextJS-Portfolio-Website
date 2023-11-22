export type Technology = "typescript" | "javascript" | "csharp" | "java" | "react" | "mongodb" | "mysql" | "redis" | "tailwind";

export type TechnologyDetails = {
    [technology in Technology]: {
        label: string;
        backgroundColor: string;
    };
};
