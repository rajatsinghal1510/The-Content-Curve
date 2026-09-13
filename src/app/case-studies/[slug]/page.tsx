import React from "react";
import { notFound } from "next/navigation";
import { caseStudiesData } from "@/lib/data";
import ImageReveal from "@/components/ui/ImageReveal";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { Metadata } from "next";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudiesData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudiesData.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | The Content Curve`,
      description: project.description,
      url: `https://thecontentcurve.com/case-studies/${project.slug}`,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | The Content Curve`,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const projectIndex = caseStudiesData.findIndex((p) => p.slug === slug);
  
  if (projectIndex === -1) {
    notFound();
  }

  const project = caseStudiesData[projectIndex];
  const nextProject = caseStudiesData[(projectIndex + 1) % caseStudiesData.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "headline": project.subtitle,
    "description": project.description,
    "image": project.coverImage,
    "creator": {
      "@type": "Organization",
      "name": "The Content Curve"
    },
    "provider": {
      "@type": "Organization",
      "name": "The Content Curve",
      "url": "https://thecontentcurve.com"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://thecontentcurve.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": project.title,
        "item": `https://thecontentcurve.com/case-studies/${project.slug}`
      }
    ]
  };

  return (
    <main className="w-full min-h-screen bg-obsidian text-primary-text flex flex-col relative z-10 overflow-hidden pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Editorial layout lines */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-4 opacity-[0.015] pointer-events-none">
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="border-r border-primary-text" />
        <div className="w-full" />
      </div>

      {/* Banner / Header */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 border-b border-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase">
            <span className="w-6 h-[1px] bg-brand-red" />
            <span>Case Study Archive</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-primary-text leading-none uppercase max-w-4xl">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-secondary-text font-light max-w-2xl font-sans mt-2">
            {project.subtitle}
          </p>
        </div>
      </section>

      {/* Main Cover Image - Natural color display */}
      <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
        <ImageReveal
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          className="w-full h-full transition-all duration-1000"
        />
      </section>

      {/* Project Meta Metrics & Summary */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 border-b border-surface relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Summary Details */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="text-xs font-mono tracking-widest text-brand-red uppercase">Summary</h2>
            <p className="text-base md:text-lg text-secondary-text leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Metadata Sidebar */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 border-t lg:border-t-0 lg:border-l border-surface pt-8 lg:pt-0 lg:pl-12">
            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-2">Client</h4>
              <p className="text-sm font-sans text-primary-text">{project.client}</p>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-2">Year</h4>
              <p className="text-sm font-sans text-primary-text">{project.year}</p>
            </div>
            <div className="col-span-2">
              <h4 className="text-[10px] tracking-[0.25em] font-mono text-brand-red uppercase mb-2">Services</h4>
              <p className="text-sm font-sans leading-relaxed text-primary-text">{project.services.join(" / ")}</p>
            </div>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6 pt-16 border-t border-surface mt-16">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold text-brand-red leading-none mb-2">
                {m.value}
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider font-mono text-secondary-text/50 uppercase">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge vs Solution Section */}
      <section className="w-full px-6 md:px-12 py-24 md:py-36 border-b border-surface relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Challenge column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase">
              <span className="w-6 h-[1px] bg-brand-red" />
              <span>The Challenge</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-primary-text">The Friction Curve</h3>
            <p className="text-sm sm:text-base text-secondary-text leading-relaxed font-sans">
              {project.challenge}
            </p>
          </div>

          {/* Solution column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase">
              <span className="w-6 h-[1px] bg-brand-red" />
              <span>The Solution</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-primary-text">The Trajectory Overhaul</h3>
            <p className="text-sm sm:text-base text-secondary-text leading-relaxed font-sans">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="w-full px-6 md:px-12 py-24 md:py-36 bg-charcoal/20 border-b border-surface relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase">
            <span className="w-6 h-[1px] bg-brand-red" />
            <span>Key Milestones</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.highlights.map((highlight, idx) => (
              <div 
                key={idx} 
                className="border border-surface p-8 bg-charcoal flex flex-col gap-4 rounded-none"
              >
                <span className="font-mono text-xs text-brand-red tracking-widest font-semibold block">
                  PHASE {(idx + 1).toString().padStart(2, "0")}
                </span>
                <p className="text-sm text-secondary-text leading-relaxed font-sans">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="w-full px-6 md:px-12 py-24 md:py-36 border-b border-surface relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-4 text-xs font-mono tracking-[0.25em] text-brand-red uppercase">
            <span className="w-6 h-[1px] bg-brand-red" />
            <span>Conversions</span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-primary-text leading-tight tracking-wider">
            THE ECONOMIC IMPACT
          </h3>
          <p className="text-sm sm:text-base text-secondary-text leading-relaxed font-sans max-w-2xl mt-2">
            {project.impactDescription}
          </p>
        </div>
      </section>

      {/* Next Project CTA Link */}
      <section className="w-full px-6 md:px-12 py-32 md:py-48 bg-charcoal/40 relative z-10 border-b border-surface">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="text-[10px] tracking-[0.3em] font-mono text-brand-red uppercase">Next Up</span>
          <Link 
            href={`/case-studies/${nextProject.slug}`}
            className="text-4xl sm:text-6xl md:text-8xl font-serif text-primary-text hover:text-brand-red transition-colors leading-none uppercase block font-medium group"
          >
            {nextProject.title}
          </Link>
          <span className="text-xs tracking-wider font-mono text-secondary-text/45 uppercase mt-2">
            {nextProject.subtitle}
          </span>

          <Magnetic>
            <Link
              href={`/case-studies/${nextProject.slug}`}
              className="text-[10px] uppercase tracking-[0.2em] font-mono text-obsidian bg-brand-red hover:bg-primary-text hover:text-obsidian px-10 py-5 rounded-none mt-10 transition-colors duration-300 font-bold select-none cursor-pointer inline-block"
            >
              Explore Next Case Study
            </Link>
          </Magnetic>
        </div>
      </section>

      <Footer />
    </main>
  );
}
