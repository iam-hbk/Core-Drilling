import { create } from "zustand";
import { DrillingFormValues } from "@/lib/schemas/drilling-form";

// Core Sample type based on core-sample-form.tsx
interface CoreSample {
  sampleId: string;
  holeId: string;
  fromDepth: number;
  toDepth: number;
  rockType: "igneous" | "sedimentary" | "metamorphic";
  mineralogy: string;
  alterationType: string;
  alterationIntensity: "weak" | "moderate" | "strong" | "intense";
  structuralFeatures: string;
  sampleType: "whole-rock" | "channel" | "chip" | "quarter-core";
  labId: string;
  assayResults: string;
  notes: string;
  timestamp: string;
}

// Drilling Progress type based on drilling-progress-form.tsx
interface DrillingProgress {
  date: string;
  shift: "day" | "night";
  siteId: string;
  operator: string;
  startDepth: number;
  endDepth: number;
  coreRecovery: number;
  timeBreakdown: {
    drilling: number;
    coring: number;
    maintenance: number;
    delays: number;
  };
  notes: string;
  totalMeters: number;
  timestamp: string;
}

// Equipment Maintenance type based on equipment-maintenance-form.tsx
interface MaintenanceItem {
  item: string;
  status: "good" | "replaced" | "repaired" | "needs-attention";
}

interface EquipmentMaintenance {
  date: string;
  equipmentId: string;
  type: "preventive" | "corrective";
  maintenanceItems: MaintenanceItem[];
  technicianName: string;
  hoursSpent: number;
  notes: string;
  nextMaintenanceDate: string;
  timestamp: string;
}

// Utility functions for generating random data
const randomFromArray = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateRandomDrillingRecord = (id: number): DrillingFormValues => {
  const projects = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];
  const drillers = [
    "John Smith",
    "Jane Doe",
    "Bob Wilson",
    "Alice Brown",
    "Mike Johnson",
  ];
  const date = new Date(2024, 0, 1 + id);
  return {
    projectName: `Project ${randomFromArray(projects)}`,
    holeId: `H${String(id).padStart(3, "0")}`,
    date: date,
    location: {
      latitude: -33.865143 + Math.random(),
      longitude: 151.2099 + Math.random(),
      elevation: 100 + Math.random() * 1000,
    },
    depth: 100 + Math.random() * 400,
    diameter: 50 + Math.random() * 25,
    angle: Math.random() * 90,
    azimuth: Math.random() * 360,
    coreRecovery: 75 + Math.random() * 25,
    rqd: 70 + Math.random() * 30,
    driller: randomFromArray(drillers),
    supervisor: randomFromArray(drillers), // Added missing required field
  };
};

const generateRandomCoreSample = (id: number): CoreSample => {
  const rockTypes = ["igneous", "sedimentary", "metamorphic"] as const;
  const minerals = ["Quartz", "Feldspar", "Mica", "Hornblende", "Calcite"];
  const alterations = [
    "Silicification",
    "Chloritization",
    "Sericitization",
    "Carbonatization",
  ];
  const intensities = ["weak", "moderate", "strong", "intense"] as const;
  const sampleTypes = [
    "whole-rock",
    "channel",
    "chip",
    "quarter-core",
  ] as const;

  return {
    sampleId: `CS${String(id).padStart(3, "0")}`,
    holeId: `H${String(id).padStart(3, "0")}`,
    fromDepth: Math.random() * 200,
    toDepth: 200 + Math.random() * 200,
    rockType: randomFromArray([...rockTypes]),
    mineralogy: `${randomFromArray(minerals)}, ${randomFromArray(minerals)}`,
    alterationType: randomFromArray(alterations),
    alterationIntensity: randomFromArray([...intensities]),
    structuralFeatures: "Fractures, joints, and veins",
    sampleType: randomFromArray([...sampleTypes]),
    labId: `LAB${String(id).padStart(3, "0")}`,
    assayResults: `Au: ${(Math.random() * 10).toFixed(2)} g/t, Ag: ${(Math.random() * 100).toFixed(2)} g/t`,
    notes: "Standard sampling procedure followed",
    timestamp: new Date(2024, 0, 1 + id).toISOString(),
  };
};

const generateRandomProgressReport = (id: number): DrillingProgress => {
  const shifts = ["day", "night"] as const;
  const operators = ["Alex Green", "Sam White", "Chris Black", "Pat Brown"];

  return {
    date: new Date(2024, 0, 1 + id).toISOString().split("T")[0],
    shift: randomFromArray([...shifts]),
    siteId: `H${String(id).padStart(3, "0")}`,
    operator: randomFromArray(operators),
    startDepth: Math.random() * 200,
    endDepth: 200 + Math.random() * 200,
    coreRecovery: 75 + Math.random() * 25,
    timeBreakdown: {
      drilling: 4 + Math.random() * 4,
      coring: 2 + Math.random() * 4,
      maintenance: Math.random() * 2,
      delays: Math.random() * 2,
    },
    notes: "Normal operations",
    totalMeters: Math.random() * 50,
    timestamp: new Date(2024, 0, 1 + id).toISOString(),
  };
};

const generateRandomMaintenanceLog = (id: number): EquipmentMaintenance => {
  const statuses = ["good", "replaced", "repaired", "needs-attention"] as const;
  const types = ["preventive", "corrective"] as const;
  const technicians = ["Tom Tech", "Sarah Fix", "Ray Repair", "Mary Mend"];

  const maintenanceItems: MaintenanceItem[] = [
    { item: "Drill bit", status: randomFromArray([...statuses]) },
    { item: "Hydraulic system", status: randomFromArray([...statuses]) },
    { item: "Engine", status: randomFromArray([...statuses]) },
    { item: "Control panel", status: randomFromArray([...statuses]) },
  ];

  return {
    date: new Date(2024, 0, 1 + id).toISOString().split("T")[0],
    equipmentId: `EQ${String(id).padStart(3, "0")}`,
    type: randomFromArray([...types]),
    maintenanceItems,
    technicianName: randomFromArray(technicians),
    hoursSpent: 1 + Math.random() * 8,
    notes: "Routine maintenance completed",
    nextMaintenanceDate: new Date(2024, 1, 1 + id).toISOString().split("T")[0],
    timestamp: new Date(2024, 0, 1 + id).toISOString(),
  };
};

// Generate initial data
const initialDrillingRecords = Array.from({ length: 20 }, (_, i) =>
  generateRandomDrillingRecord(i + 1),
);

const initialCoreSamples = Array.from({ length: 20 }, (_, i) =>
  generateRandomCoreSample(i + 1),
);

const initialProgressReports = Array.from({ length: 20 }, (_, i) =>
  generateRandomProgressReport(i + 1),
);

const initialMaintenanceLogs = Array.from({ length: 20 }, (_, i) =>
  generateRandomMaintenanceLog(i + 1),
);

interface FormsStore {
  // Drilling Details
  drillingRecords: DrillingFormValues[];
  addDrillingRecord: (record: DrillingFormValues) => void;

  // Core Samples
  coreSamples: CoreSample[];
  addCoreSample: (sample: CoreSample) => void;

  // Drilling Progress
  progressReports: DrillingProgress[];
  addProgressReport: (report: DrillingProgress) => void;

  // Equipment Maintenance
  maintenanceLogs: EquipmentMaintenance[];
  addMaintenanceLog: (log: EquipmentMaintenance) => void;
}

export const useFormsStore = create<FormsStore>((set) => ({
  // Drilling Details
  drillingRecords: initialDrillingRecords,
  addDrillingRecord: (record) => {
    set((state) => ({
      drillingRecords: [...state.drillingRecords, record],
    }));
  },

  // Core Samples
  coreSamples: initialCoreSamples,
  addCoreSample: (sample) => {
    set((state) => ({
      coreSamples: [...state.coreSamples, sample],
    }));
  },

  // Drilling Progress
  progressReports: initialProgressReports,
  addProgressReport: (report) => {
    set((state) => ({
      progressReports: [...state.progressReports, report],
    }));
  },

  // Equipment Maintenance
  maintenanceLogs: initialMaintenanceLogs,
  addMaintenanceLog: (log) => {
    set((state) => ({
      maintenanceLogs: [...state.maintenanceLogs, log],
    }));
  },
}));
