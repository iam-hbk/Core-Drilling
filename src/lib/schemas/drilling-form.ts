import * as z from "zod"

export const drillingFormSchema = z.object({
  // Basic Info
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  holeId: z.string().min(1, "Hole ID is required"),
  date: z.date(),
  
  // Location Info
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    elevation: z.number(),
  }),
  
  // Drilling Parameters
  depth: z.number().min(0, "Depth must be positive"),
  diameter: z.number().min(0, "Diameter must be positive"),
  angle: z.number().min(0).max(90, "Angle must be between 0 and 90 degrees"),
  azimuth: z.number().min(0).max(360, "Azimuth must be between 0 and 360 degrees"),
  
  // Core Recovery
  coreRecovery: z.number().min(0).max(100, "Core recovery must be between 0-100%"),
  rqd: z.number().min(0).max(100, "RQD must be between 0-100%"),
  
  // Additional Info
  notes: z.string().optional(),
  driller: z.string().min(2, "Driller name required"),
  supervisor: z.string().min(2, "Supervisor name required"),
})

export type DrillingFormValues = z.infer<typeof drillingFormSchema> 