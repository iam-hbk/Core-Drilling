import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus, X } from "lucide-react"
import { useFormsStore } from "@/lib/stores/use-forms-store"
import { useAppStore } from "@/lib/stores/use-app-store"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const maintenanceFormSchema = z.object({
  date: z.date(),
  equipmentId: z.string(),
  type: z.enum(["preventive", "corrective"]),
  maintenanceItems: z.array(z.object({
    item: z.string(),
    status: z.enum(["good", "replaced", "repaired", "needs-attention"])
  })).min(1),
  technicianName: z.string().min(2),
  hoursSpent: z.number().min(0).max(24),
  notes: z.string(),
  nextMaintenanceDate: z.date(),
})

type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>

export function EquipmentMaintenanceForm() {
  const { language } = useAppStore()
  const { addMaintenanceLog } = useFormsStore()

  const form = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues: {
      date: new Date(),
      equipmentId: "DRILL-003",
      type: "preventive",
      maintenanceItems: [
        { item: "Drill bit", status: "replaced" },
        { item: "Hydraulic system", status: "good" },
        { item: "Cooling system", status: "needs-attention" },
        { item: "Drive shaft", status: "repaired" }
      ],
      technicianName: "Mike Anderson",
      hoursSpent: 4.5,
      notes: "Routine maintenance completed. Cooling system showing signs of wear - schedule replacement within next 2 weeks.",
      nextMaintenanceDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    },
  })
  function onSubmit(values: MaintenanceFormValues) {
    console.log("Equipment Maintenance Form Submission:", values);
    const log = {
      ...values,
      date: format(values.date, "yyyy-MM-dd"),
      nextMaintenanceDate: format(values.nextMaintenanceDate, "yyyy-MM-dd"),
      timestamp: new Date().toISOString(),
    };
    
    console.log("Processed Log:", log);
    addMaintenanceLog(log);
    
    toast.success(
      language === "en"
        ? "Maintenance log submitted"
        : "Journal de maintenance soumis"
    );
    
    form.reset();
  }

  const statusColors = {
    good: "bg-green-500",
    replaced: "bg-blue-500",
    repaired: "bg-yellow-500",
    "needs-attention": "bg-red-500",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Equipment Maintenance Log" : "Journal de maintenance des équipements"}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? "Record maintenance activities and equipment status"
            : "Enregistrer les activités de maintenance et l'état des équipements"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{language === 'en' ? "Date" : "Date"}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{language === 'en' ? "Pick a date" : "Choisir une date"}</span>
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

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === 'en' ? "Maintenance Type" : "Type de maintenance"}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            language === 'en' ? "Select type" : "Sélectionner le type"
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="preventive">
                          {language === 'en' ? "Preventive" : "Préventive"}
                        </SelectItem>
                        <SelectItem value="corrective">
                          {language === 'en' ? "Corrective" : "Corrective"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              {form.watch("maintenanceItems")?.map((_, index) => (
                <div key={index} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`maintenanceItems.${index}.item`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          {language === 'en' ? "Item" : "Élément"} {index + 1}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`maintenanceItems.${index}.status`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          {language === 'en' ? "Status" : "État"}
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="good">
                              {language === 'en' ? "Good" : "Bon"}
                            </SelectItem>
                            <SelectItem value="replaced">
                              {language === 'en' ? "Replaced" : "Remplacé"}
                            </SelectItem>
                            <SelectItem value="repaired">
                              {language === 'en' ? "Repaired" : "Réparé"}
                            </SelectItem>
                            <SelectItem value="needs-attention">
                              {language === 'en' ? "Needs Attention" : "Nécessite attention"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => {
                      const items = form.getValues("maintenanceItems")
                      if (items.length > 1) {
                        form.setValue(
                          "maintenanceItems",
                          items.filter((_, i) => i !== index)
                        )
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const items = form.getValues("maintenanceItems")
                  form.setValue("maintenanceItems", [
                    ...items,
                    { item: "", status: "good" },
                  ])
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                {language === 'en' ? "Add Item" : "Ajouter un élément"}
              </Button>
            </div>

            {/* Add other fields similar to the drilling form */}

            <Button type="submit">
              {language === 'en' ? "Submit Maintenance Log" : "Soumettre le journal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}