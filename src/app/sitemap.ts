import { MetadataRoute } from "next";
import { caseStudiesData } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thecontentcurve.com";
  
  // Dynamic project routes
  const projects = caseStudiesData.map((project) => ({
    url: `${baseUrl}/case-studies/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Home route
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    }
  ];

  return [...routes, ...projects];
}
