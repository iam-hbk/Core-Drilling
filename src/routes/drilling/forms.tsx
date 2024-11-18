import { createFileRoute } from "@tanstack/react-router";
import { DrillingForm } from "@/components/forms/drilling-form";
import { CoreSampleForm } from "@/components/forms/core-sample-form";
import { DrillingProgressForm } from "@/components/forms/drilling-progress-form";
import { EquipmentMaintenanceForm } from "@/components/forms/equipment-maintenance-form";
import { useAppStore } from "@/lib/stores/use-app-store";
import { FileText, Settings, Database, TestTubes } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/drilling/forms")({
  component: DrillingFormsPage,
});

export default function DrillingFormsPage() {
  const { language } = useAppStore();

  const forms = [
    {
      id: "drilling",
      title: language === "en" ? "Drilling Details" : "Détails du forage",
      icon: Database,
      component: DrillingForm,
      description:
        language === "en"
          ? "Record drilling parameters and technical measurements"
          : "Enregistrer les paramètres de forage et les mesures techniques",
    },
    {
      id: "core-sample",
      title:
        language === "en" ? "Core Sample Analysis" : "Analyse d'échantillon",
      icon: TestTubes,
      component: CoreSampleForm,
      description:
        language === "en"
          ? "Document geological observations and sample analysis"
          : "Documenter les observations géologiques et l'analyse des échantillons",
    },
    {
      id: "progress",
      title: language === "en" ? "Drilling Progress" : "Progression du forage",
      icon: FileText,
      component: DrillingProgressForm,
      description:
        language === "en"
          ? "Record daily drilling activities and progress"
          : "Enregistrer les activités et la progression quotidienne du forage",
    },
    {
      id: "maintenance",
      title:
        language === "en"
          ? "Equipment Maintenance"
          : "Maintenance des équipements",
      icon: Settings,
      component: EquipmentMaintenanceForm,
      description:
        language === "en"
          ? "Log equipment maintenance and repairs"
          : "Enregistrer la maintenance et les réparations des équipements",
    },
  ];

  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {language === "en"
            ? "Core Diamond Drilling Data Entry"
            : "Saisie des données de forage au diamant"}
        </h1>
        <p className="text-muted-foreground">
          {language === "en"
            ? "Select a form type below to begin data entry"
            : "Sélectionnez un type de formulaire ci-dessous pour commencer la saisie"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {forms.map((form) => (
          <Card key={form.id} className="transition-colors hover:bg-accent/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {form.title}
              </CardTitle>
              <form.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {form.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="drilling" className="space-y-4">
        <TabsList>
          {forms.map((form) => (
            <TabsTrigger key={form.id} value={form.id}>
              {form.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {forms.map((form) => (
          <TabsContent key={form.id} value={form.id}>
            <Card>
              <CardHeader>
                <CardTitle>{form.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <form.component />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
