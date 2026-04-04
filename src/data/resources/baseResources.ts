export type ResourceType = "Government" | "Organization" | "Program";

export type BaseResource = {
  name: string;
  url: string;
  tags: string[];
  type: ResourceType;
  description: string;
};

export type ResourceCategory = {
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  resources: BaseResource[];
};

export type ResourceCategoryKey =
  | "career"
  | "education"
  | "housing"
  | "healthcare"
  | "finance"
  | "community";

export const baseResourceCategories: Record<ResourceCategoryKey, ResourceCategory> = {
  career: {
    title: "Career Transition",
    description: "Tools and programs to translate military experience into civilian careers.",
    bgColor: "bg-[var(--military-green)]",
    textColor: "text-white",
    resources: [
      {
        name: "VET TEC Program",
        url: "https://www.va.gov/education/about-gi-bill-benefits/how-to-use-benefits/vettec-high-tech-program/",
        tags: ["tech", "cybersecurity", "training", "career", "it"],
        type: "Government",
        description:
          "VA-funded high-tech training for careers in IT, computer programming, and related fields.",
      },
      {
        name: "Military Skills Translator",
        url: "https://www.onetonline.org/crosswalk/MOC/",
        tags: ["career", "job", "resume", "skills"],
        type: "Program",
        description:
          "Map your military occupation codes to civilian job titles and required skills.",
      },
    ],
  },

  education: {
    title: "Education",
    description: "GI Bill, school comparison, and tuition support for degree and certificate paths.",
    bgColor: "bg-[var(--dark-brown)]",
    textColor: "text-white",
    resources: [
      {
        name: "GI Bill Comparison Tool",
        url: "https://www.va.gov/gi-bill-comparison-tool/",
        tags: ["school", "degree", "college", "education", "gi bill"],
        type: "Government",
        description:
          "Compare schools and programs covered by VA education benefits side by side.",
      },
      {
        name: "Yellow Ribbon Program",
        url: "https://www.va.gov/education/about-gi-bill-benefits/post-9-11/yellow-ribbon-program/",
        tags: ["tuition", "college", "education", "gi bill"],
        type: "Government",
        description:
          "Additional funding for tuition and fees at participating schools not fully covered by the Post-9/11 GI Bill.",
      },
    ],
  },

  housing: {
    title: "Housing",
    description: "Home loans, rental support, and programs for stable housing.",
    bgColor: "bg-[var(--deep-army-green)]",
    textColor: "text-white",
    resources: [
      {
        name: "VA Home Loans",
        url: "https://www.va.gov/housing-assistance/home-loans/",
        tags: ["home", "house", "mortgage", "housing", "buy"],
        type: "Government",
        description:
          "VA-backed home loans with competitive terms and no down payment in many cases.",
      },
      {
        name: "HUD-VASH",
        url: "https://www.va.gov/homeless/hud-vash.asp",
        tags: ["housing", "homeless", "support"],
        type: "Government",
        description:
          "Combined HUD housing vouchers and VA supportive services for veterans experiencing homelessness.",
      },
    ],
  },

  healthcare: {
    title: "Healthcare",
    description: "VA medical care, mental health, and crisis resources.",
    bgColor: "bg-[var(--coyote-tan)]",
    textColor: "text-white",
    resources: [
      {
        name: "VA Healthcare",
        url: "https://www.va.gov/health-care/",
        tags: ["health", "medical", "mental health", "ptsd"],
        type: "Government",
        description:
          "Enroll in VA health care and access medical, mental health, and specialty services.",
      },
      {
        name: "Veterans Crisis Line",
        url: "https://www.veteranscrisisline.net/",
        tags: ["mental health", "crisis", "ptsd"],
        type: "Government",
        description:
          "24/7 confidential crisis support for veterans, service members, and their families.",
      },
    ],
  },

  finance: {
    title: "Financial",
    description: "Disability compensation, pensions, and financial stability programs.",
    bgColor: "bg-[var(--desert-khaki)]",
    textColor: "text-white",
    resources: [
      {
        name: "VA Disability Compensation",
        url: "https://www.va.gov/disability/",
        tags: ["disability", "money", "benefits", "income"],
        type: "Government",
        description:
          "Tax-free monthly payments for service-connected disabilities and related conditions.",
      },
      {
        name: "VA Pension",
        url: "https://www.va.gov/pension/",
        tags: ["income", "financial", "support"],
        type: "Government",
        description:
          "Needs-based pension benefits for wartime veterans and surviving spouses who qualify.",
      },
    ],
  },

  community: {
    title: "Community",
    description: "Veteran organizations, peer support, and local connection.",
    bgColor: "bg-[var(--pale-olive)]",
    textColor: "text-white",
    resources: [
      {
        name: "American Legion",
        url: "https://www.legion.org/",
        tags: ["community", "support", "network"],
        type: "Organization",
        description:
          "Nationwide veteran service organization focused on advocacy, benefits assistance, and community.",
      },
      {
        name: "Team RWB",
        url: "https://teamrwb.org/",
        tags: ["community", "fitness", "connection"],
        type: "Organization",
        description:
          "Programs that enrich veterans’ lives through physical activity and social connection.",
      },
    ],
  },
};
