import { createFileRoute } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import ahmadIndraPhoto from "@/assets/team/ahmad-indra-siswantara.jpg";
import hilmanPhoto from "@/assets/team/hilman-gumelar.jpg";
import candraPhoto from "@/assets/team/candra-damis.png";

export const Route = createFileRoute("/our-team")({
  head: () => ({
    meta: [
      { title: "Our Team — CCIT Simulation" },
      {
        name: "description",
        content:
          "Meet the CFD and engineering simulation specialists behind CCIT Simulation, PT CCIT Group Indonesia.",
      },
      { property: "og:title", content: "Our Team — CCIT Simulation" },
      {
        property: "og:description",
        content:
          "Meet the CFD and engineering simulation specialists behind CCIT Simulation, PT CCIT Group Indonesia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurTeamPage,
});

const team = [
  {
    name: "Prof. Dr. Ir. Ahmad Indra Siswantara",
    role: "Founder & CFD Expert",
    bio: "Professor in CFD at the University of Indonesia and the technical visionary behind CCIT Simulation. Decades of research and industrial practice in fluid dynamics, separation systems, and multiphase flows.",
    photo: ahmadIndraPhoto,
    linkedin: "https://www.linkedin.com/in/ahmadindrasiswantara",
  },
  {
    name: "Dr. Hilman Gumelar Syafei, S.T., M.T.",
    role: "CFD Engineer & Researcher",
    bio: "Mechanical engineering lecturer and doctoral researcher focused on computational fluid dynamics, numerical methods, and renewable-energy systems. Bridges academic rigor with practical simulation workflows.",
    photo: hilmanPhoto,
    linkedin: "https://www.linkedin.com/in/m-hilman-gumelar-syafei-32a23a125",
  },
  {
    name: "Dr. Candra Damis Widiawaty, S.T., M.T.",
    role: "CFD Engineer & Researcher",
    bio: "Engineering educator and researcher with deep experience in fluid mechanics, thermal systems, and industrial process simulation. Translates complex flow problems into reliable engineering insight.",
    photo: candraPhoto,
    linkedin: "https://id.linkedin.com/in/candra-damis-612908171",
  },
];

function OurTeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Our people"
            title="Meet the team"
            body="The engineers, researchers, and simulation specialists powering CCIT Simulation."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={0.1 + index * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[var(--shadow-red)]">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    {member.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
                    aria-label={`View LinkedIn profile of ${member.name}`}
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    View profile
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
