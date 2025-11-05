export interface Company {
  _id: string;
  slug: string;
  name: string;
  bio: string;
  website: string;
  avatar: string;
  coverPhoto: string;
  skills: string[];
  socialLinks: [
    {
      platform: string;
      url: string;
      _id: string;
    }
  ];
  interests: string[];
  email: string;
  theme: {
    primaryColor: string;
    darkMode: boolean;
    logoPosition: "left" | "center" | "right";
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  }
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
