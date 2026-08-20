import type { Document } from "@contentful/rich-text-types";
import windImg from "@/assets/service-wind.jpg";
import thermalImg from "@/assets/service-thermal.jpg";
import multiphaseImg from "@/assets/service-multiphase.jpg";

export type DummyCaseStudy = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  body: Document;
};

export const dummyCaseStudies: DummyCaseStudy[] = [
  {
    id: "dummy-1",
    slug: "wind-loading-high-rise-jakarta",
    title: "Wind Loading Assessment for a High-Rise Tower in Jakarta",
    category: "Wind Engineering",
    image: windImg,
    imageAlt: "Streamlines showing wind pressure distribution around a high-rise building.",
    excerpt:
      "Pedestrian comfort and cladding pressure study for a 40-storey mixed-use development in central Jakarta, using steady-state RANS and validated wind-tunnel correlations.",
    body: {
      nodeType: "document" as const,
      data: {},
      content: [
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "This is a dummy case study for layout preview. The final content will come from your Contentful Products entries once the space is restored.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Engineering challenge",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "The client needed to quantify wind pressures on the tower facade and evaluate pedestrian comfort at the podium level before finalising cladding specifications and landscape placement.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Simulation approach",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "We built a steady-state RANS model with the k-ω SST turbulence model, a 1:350 scale domain, and boundary-layer profiles derived from local meteorological data.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Results and outcome",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "Peak pressure coefficients were within 6% of wind-tunnel data. The study identified two zones where façade reinforcement was unnecessary, saving an estimated USD 120,000 in cladding costs.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    } as Document,
  },
  {
    id: "dummy-2",
    slug: "thermal-comfort-shopping-mall",
    title: "Thermal Comfort Study for a Shopping Mall Expansion",
    category: "Thermal & HVAC",
    image: thermalImg,
    imageAlt: "Temperature contours showing HVAC performance inside a retail atrium.",
    excerpt:
      "Conjugate heat transfer and air-distribution analysis to verify cooling capacity, avoid hot spots, and meet ASHRAE 55 comfort criteria across peak loads.",
    body: {
      nodeType: "document" as const,
      data: {},
      content: [
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Placeholder detail for the thermal comfort shopping mall case study.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Engineering challenge",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "The expanded atrium had to maintain thermal comfort during peak occupancy while hiding ductwork behind architectural features.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Simulation approach",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "A coupled CFD-energy model resolved air supply, return paths, solar heat gain through the glazed roof, and transient occupancy loads.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Results and outcome",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "PMV and PPD predictions showed comfort compliance across 95% of occupied floor area. The design team removed two redundant AHUs, saving capex and ceiling height.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    } as Document,
  },
  {
    id: "dummy-3",
    slug: "multiphase-separator-optimization",
    title: "Multiphase Separator Optimization for Offshore Platform",
    category: "Multiphase Flow",
    image: multiphaseImg,
    imageAlt: "Volume-of-fluid simulation of oil-water separation inside a vessel.",
    excerpt:
      "Eulerian multiphase and VOF simulation of a three-phase separator to reduce liquid carry-over, resize inlet distributors, and extend maintenance intervals.",
    body: {
      nodeType: "document" as const,
      data: {},
      content: [
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Placeholder detail for the multiphase separator optimization case study.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Engineering challenge",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "The existing separator was experiencing liquid carry-over and frequent trips under high gas-liquid ratio conditions.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Simulation approach",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "We combined VOF free-surface tracking in the inlet zone with an Eulerian multiphase model in the bulk separation volume, benchmarking against separator test data.",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "heading-2" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value: "Results and outcome",
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: "paragraph" as const,
          data: {},
          content: [
            {
              nodeType: "text" as const,
              value:
                "A redesigned inlet distributor and weir height reduced carry-over by 40% and extended maintenance intervals from 6 to 14 months.",
              marks: [],
              data: {},
            },
          ],
        },
      ],
    } as Document,
  },
];

export function findDummyCaseStudyBySlug(slug: string): DummyCaseStudy | undefined {
  return dummyCaseStudies.find((cs) => cs.slug === slug);
}
