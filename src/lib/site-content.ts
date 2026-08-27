import thermalImg from "@/assets/service-thermal.jpg";
import windImg from "@/assets/service-wind.jpg";
import multiphaseImg from "@/assets/service-multiphase.jpg";

export const SITE_URL = "https://cfit-aero-indonesia.lovable.app";

export const services = [
  {
    title: "Aerodynamics & External Flow",
    body: "Drag, lift, and wake analysis for vehicles, aircraft components, and wind-exposed structures using validated turbulence modelling.",
    image: windImg,
    tags: ["RANS / LES", "Wind loading", "Pedestrian comfort"],
  },
  {
    title: "Thermal & Heat Transfer",
    body: "Conjugate heat transfer, electronics cooling, HVAC, furnace and heat exchanger performance with conduction–convection–radiation coupling.",
    image: thermalImg,
    tags: ["CHT", "Electronics cooling", "Heat exchangers"],
  },
  {
    title: "Multiphase & Process Flow",
    body: "Slug flow, mixing, cavitation, erosion and separator studies for oil & gas, chemical, and water treatment systems.",
    image: multiphaseImg,
    tags: ["VOF / Euler", "Erosion", "Mixing"],
  },
];

export const capabilities = [
  { title: "Combustion & Reacting Flow", body: "Burners, boilers, and flare systems with species transport and emissions prediction." },
  { title: "Rotating Machinery", body: "Pumps, fans, turbines and propellers — performance curves, cavitation, and MRF/sliding-mesh analysis." },
  { title: "FEA & Structural Integrity", body: "Static, fatigue, vibration, and FSI coupling to keep hardware inside code allowables." },
  { title: "Marine & Offshore Hydrodynamics", body: "Hull resistance, sloshing, mooring loads and green-water effects for Indonesian waters." },
  { title: "Design Optimisation", body: "Parametric sweeps and automated DOE to converge on the best geometry, not just a working one." },
  { title: "Training & Capability Building", body: "In-house CFD workshops so your engineering team can own the workflow after handover." },
];

export const processSteps = [
  { step: "01", title: "Scope & Objectives", body: "We translate your engineering question into measurable simulation targets and acceptance criteria." },
  { step: "02", title: "Model & Mesh", body: "Clean CAD, resolved boundary layers, and a mesh independence study — no black boxes." },
  { step: "03", title: "Solve & Validate", body: "Solver settings benchmarked against test data, correlations, or field measurements." },
  { step: "04", title: "Report & Decide", body: "Clear visuals, quantified margins, and a concrete design recommendation you can act on." },
];

export const industries = [
  "Oil & Gas", "Power Generation", "Petrochemical", "Marine & Shipyard",
  "Building & HVAC", "Automotive", "Mining", "Food & Pharma",
];

import plnLogo from "@/assets/clients/pln.jpg.asset.json";
import plnEnjiniringLogo from "@/assets/clients/pln-enjiniring.jpg.asset.json";
import pertaminaLogo from "@/assets/clients/pertamina.jpg.asset.json";
import pupukLogo from "@/assets/clients/pupuk-iskandar-muda.jpg.asset.json";
import esdmLogo from "@/assets/clients/kementerian-esdm.jpg.asset.json";
import rekindLogo from "@/assets/clients/rekind.jpg.asset.json";

export const clients: { name: string; logo: string }[] = [
  { name: "PLN", logo: plnLogo.url },
  { name: "PLN Enjiniring", logo: plnEnjiniringLogo.url },
  { name: "Pertamina", logo: pertaminaLogo.url },
  { name: "PT Pupuk Iskandar Muda", logo: pupukLogo.url },
  { name: "Kementerian ESDM", logo: esdmLogo.url },
  { name: "Rekind", logo: rekindLogo.url },
];



export const stats: [string, string][] = [
  ["120+", "Simulation studies delivered"],
  ["15+", "Industrial sectors served"],
  ["40%", "Average prototyping cost saved"],
  ["±5%", "Typical validation deviation"],
];

export const testimonials = [
  {
    quote:
      "The complexity of the North Jakarta reclamation project presented a significant risk to our cooling water systems. CCIT Group’s thermal dispersion study was instrumental in helping us visualize the long-term impact on PLTGU Muara Karang. Their proprietary CFDSOF solver provided a level of detail that gave our engineering team the confidence to proceed with critical infrastructure adjustments.",
    name: "Senior Engineer",
    role: "Power Generation",
    company: "PT PLN (Persero)",
  },
  {
    quote:
      "We faced persistent efficiency drops in our CO2 Stripper Reboiler that standard maintenance couldn’t solve. The CCIT team performed a ‘digital autopsy’ using CFD that revealed internal flow stagnation we hadn’t considered. Their subsequent redesign didn’t just fix the problem—it optimized our steam consumption and stabilized the entire process string.",
    name: "Plant Manager",
    role: "Petrochemical & Process",
    company: "PT Pupuk Iskandar Muda (PIM)",
  },
  {
    quote:
      "In offshore operations, vibration and erosion are constant threats to asset integrity. CCIT Group analyzed our compressor piping headers with extreme precision. By identifying the specific turbulence kinetic energy nodes, they provided a mitigation strategy that reduced pipe vibration by 40%, significantly extending our maintenance cycles.",
    name: "Lead Specialist",
    role: "Oil & Gas",
    company: "PT Pertamina",
  },
  {
    quote:
      "Working with CCIT on the Suralaya 8 thermal deflector project was a seamless experience. Their ability to recalculate complex thermal dispersion models quickly as reclamation plans evolved was vital to our project timeline. They are more than consultants; they are high-level technical partners who understand the rigors of EPC requirements.",
    name: "Project Director",
    role: "EPC & Infrastructure",
    company: "PT Rekayasa Industri",
  },
  {
    quote:
      "Designing a 100 KW wind turbine for the Indonesian landscape required specialized aerodynamic analysis. CCIT’s expertise in blade design and flow simulation was world-class. Their team’s deep understanding of fluid-structure interaction ensured our design met all performance targets before the first prototype was even built.",
    name: "Technical Advisor",
    role: "Renewable Energy & Aerodynamics",
    company: "Ministry of Energy and Mineral Resources (ESDM)",
  },
  {
    quote:
      "As we moved toward utilizing a wider range of coal ranks at PLTU Suralaya, we needed a roadmap for boiler safety. CCIT provided a comprehensive ‘Coal Wide Range Study’ that mapped out flame characteristics and slagging risks for every blend. This data-driven approach has been a cornerstone of our operational flexibility strategy.",
    name: "Operations Head",
    role: "Operational Excellence (Fuel Flexibility)",
    company: "PT PLN Enjiniring",
  },
];

export const successSecrets = {
  title: "The Secret of Success",
  subtitle: "Beyond the Black Box",
  intro:
    "In the world of high-stakes engineering, “good enough” is a liability. For PT. CCIT Group Indonesia, the secret of our success isn’t found in a brochure or a standard software license. It is found in our refusal to accept the limitations of the “Black Box.”",
  points: [
    {
      title: "The Power of Ownership: CFDSOF",
      body: "Most consultancy firms are users of technology; we are creators of it. The heart of our success is CFDSOF. By developing our own proprietary CFD code, we have stripped away the barriers of commercial solvers. We don’t wait for a software update to solve a unique multiphase flow problem in a Natuna Sea pipeline or a combustion instability in a Java power plant—we write the physics ourselves.",
    },
    {
      title: "Bridging the Academic-Industrial Divide",
      body: "Our success stems from our roots. Born from a deep foundation in research and computational fluid dynamics, CCIT Group maintains the rigor of a laboratory with the speed of a Tier-1 EPC contractor. We don’t just provide “pretty pictures”; we provide validated numerical certainty that stands up to the most stringent international audits.",
    },
    {
      title: "Precision in the “Grey Areas”",
      body: "Where others see a “general fluid,” we see the nuance of non-Newtonian drilling muds, the chaotic turbulence of a cooling tower plume, or the delicate thermal balance of a green building. Our secret is specialization. We focus on the high-energy, high-risk sectors—Power, Oil & Gas, and Mining—where the cost of error is highest and the demand for precision is absolute.",
    },
    {
      title: "The “Engineering First” Philosophy",
      body: "The code is our tool, but engineering is our soul. We measure our success not by the complexity of our meshes, but by the measurable ROI of our clients. Whether it is a 2% increase in boiler efficiency or a 30% reduction in erosion-driven maintenance, our results are grounded in the physical reality of the plant floor.",
    },
    {
      title: "Local Insight, Global Standard",
      body: "As an Indonesian company competing on the global stage, our success is built on local accessibility and global capability. We understand the specific environmental, regulatory, and operational challenges of the Indonesian energy landscape, and we solve them with world-class computational power.",
    },
  ],
  closing:
    "Our secret is simple: We own the code, we master the physics, and we deliver the reliability that keeps the world’s most critical industries moving.",
};