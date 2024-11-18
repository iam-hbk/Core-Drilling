import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"
import { useAppStore } from "@/lib/stores/use-app-store"
import { useFormsStore } from "@/lib/stores/use-forms-store";

export function CoreSampleForm() {
  const { language } = useAppStore();
  const { addCoreSample } = useFormsStore();
  const form = useForm({
    defaultValues: {
      sampleId: "CS-2024-0123",
      holeId: "DCH-2024-001",
      fromDepth: 125.4,
      toDepth: 128.7,
      rockType: "igneous",
      mineralogy: "Quartz (40%), Plagioclase (35%), Biotite (15%), Hornblende (10%)",
      alterationType: "Potassic",
      alterationIntensity: "moderate",
      structuralFeatures: "Minor quartz veining, moderate fracturing",
      sampleType: "quarter-core",
      labId: "LAB-2024-456",
      assayResults: "Au: 2.5 g/t\nAg: 15 g/t\nCu: 0.5%",
      notes: "Notable sulphide mineralization present. Sample shows promising gold indicators.",
    },
  });

  function onSubmit(data: any) {
    console.log("Core Sample Form Submission:", data);
    addCoreSample({
      ...data,
      timestamp: new Date().toISOString(),
    });
    
    toast.success(
      language === "en" ? "Sample Analysis Submitted" : "Analyse d'échantillon soumise",
      {
        description: language === "en" 
          ? "Core sample analysis has been saved"
          : "L'analyse d'échantillon de carotte a été enregistrée",
      }
    );
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6">
          {/* Sample Identification */}
          <div className="rounded-lg border bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold">Sample Identification</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="sampleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sample ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter sample ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="holeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hole ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter hole ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Sample Interval */}
          <div className="rounded-lg border bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold">Sample Interval</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fromDepth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Depth (m)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toDepth" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Depth (m)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Geological Description */}
          <div className="rounded-lg border bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold">Geological Description</h2>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="rockType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rock Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rock type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="igneous">Igneous</SelectItem>
                          <SelectItem value="sedimentary">Sedimentary</SelectItem>
                          <SelectItem value="metamorphic">Metamorphic</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mineralogy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mineralogy</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe mineral composition" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="alterationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alteration Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alterationIntensity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alteration Intensity</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select intensity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weak">Weak</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="strong">Strong</SelectItem>
                            <SelectItem value="intense">Intense</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Laboratory Analysis */}
          <div className="rounded-lg border bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold">Laboratory Analysis</h2>
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="sampleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sample Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sample type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="whole-rock">Whole Rock</SelectItem>
                            <SelectItem value="channel">Channel</SelectItem>
                            <SelectItem value="chip">Chip</SelectItem>
                            <SelectItem value="quarter-core">Quarter Core</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="labId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Laboratory ID</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="assayResults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assay Results</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter assay results and values"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="rounded-lg border bg-background p-4">
            <h2 className="mb-4 text-lg font-semibold">Additional Notes</h2>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Submit Sample Analysis
          </Button>
        </div>
      </form>
    </Form>
  );
} 