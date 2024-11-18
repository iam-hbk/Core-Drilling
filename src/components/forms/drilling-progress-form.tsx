import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useFormsStore } from "@/lib/stores/use-forms-store";
import { useAppStore } from "@/lib/stores/use-app-store";
import { toast } from "sonner"

const drillingFormSchema = z.object({
  date: z.date(),
  shift: z.enum(["day", "night"]),
  siteId: z.string(),
  operator: z.string().min(2, {
    message: "Operator name must be at least 2 characters.",
  }),
  startDepth: z.number().min(0),
  endDepth: z.number().min(0),
  coreRecovery: z.number().min(0).max(100),
  timeBreakdown: z.object({
    drilling: z.number().min(0).max(12),
    coring: z.number().min(0).max(12),
    maintenance: z.number().min(0).max(12),
    delays: z.number().min(0).max(12),
  }),
  notes: z.string(),
});

export function DrillingProgressForm() {
  const { language } = useAppStore();
  const { addProgressReport } = useFormsStore();

  const form = useForm<z.infer<typeof drillingFormSchema>>({
    resolver: zodResolver(drillingFormSchema),
    defaultValues: {
      date: new Date(),
      shift: "day",
      siteId: "SITE-001",
      operator: "James Wilson",
      startDepth: 145.6,
      endDepth: 157.3,
      coreRecovery: 97.5,
      timeBreakdown: {
        drilling: 6.5,
        coring: 3.5,
        maintenance: 1.0,
        delays: 1.0,
      },
      notes: "Achieved good progress. Minor delay due to bit change. Ground conditions remain stable.",
    },
  });

  function onSubmit(values: z.infer<typeof drillingFormSchema>) {
    console.log("Drilling Progress Form Submission:", values);
    const totalMeters = values.endDepth - values.startDepth;
    const report = {
      ...values,
      date: values.date.toISOString(),
      totalMeters,
      timestamp: new Date().toISOString(),
    };
    
    console.log("Processed Report:", report);
    addProgressReport(report);
    
    toast.success(
      language === "en" ? "Report submitted" : "Rapport soumis",
      {
        description: language === "en"
          ? "Drilling progress report has been saved"
          : "Le rapport de progression du forage a été enregistré",
      }
    );
    
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{language === "en" ? "Date" : "Date"}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>
                            {language === "en"
                              ? "Pick a date"
                              : "Choisir une date"}
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="shift"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {language === "en" ? "Shift" : "Quart de travail"}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            language === "en"
                              ? "Select shift"
                              : "Sélectionner le quart"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="day">
                        {language === "en" ? "Day Shift" : "Quart de jour"}
                      </SelectItem>
                      <SelectItem value="night">
                        {language === "en" ? "Night Shift" : "Quart de nuit"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDepth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === "en"
                    ? "Start Depth (m)"
                    : "Profondeur initiale (m)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDepth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === "en"
                    ? "End Depth (m)"
                    : "Profondeur finale (m)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="timeBreakdown.drilling"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === "en" ? "Drilling Hours" : "Heures de forage"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add similar fields for coring, maintenance, and delays */}
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{language === "en" ? "Notes" : "Notes"}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                {language === "en"
                  ? "Add any relevant notes about the drilling progress."
                  : "Ajoutez des notes pertinentes sur la progression du forage."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {language === "en" ? "Submit Report" : "Soumettre le rapport"}
        </Button>
      </form>
    </Form>
  );
}
