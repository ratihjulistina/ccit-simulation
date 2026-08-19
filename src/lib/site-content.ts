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

export const stats: [string, string][] = [
  ["120+", "Simulation studies delivered"],
  ["15+", "Industrial sectors served"],
  ["40%", "Average prototyping cost saved"],
  ["±5%", "Typical validation deviation"],
];