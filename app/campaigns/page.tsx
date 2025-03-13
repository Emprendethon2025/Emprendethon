import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CampaignCard } from "@/components/campaign-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

export default function CampaignsPage() {
  // Datos de ejemplo para campañas
  const campaigns = [
    {
      id: "1",
      title: "Reforestación Amazónica",
      organization: "EcoFuturo ONG",
      description: "Proyecto para plantar 10,000 árboles nativos en zonas deforestadas de la Amazonía.",
      raised: 15000,
      goal: 25000,
      backers: 128,
      daysLeft: 15,
      image: "/img/campana/Reforestación Amazónica.jpeg",
    },
    {
      id: "2",
      title: "Energía Solar para Comunidades",
      organization: "SolarTech",
      description: "Instalación de paneles solares en 5 comunidades rurales sin acceso a electricidad.",
      raised: 8500,
      goal: 20000,
      backers: 74,
      daysLeft: 21,
      image: "/img/campana/Energía Solar para Comunidades.jpg",
    },
    {
      id: "3",
      title: "Educación Digital Inclusiva",
      organization: "FuturoDigital",
      description: "Programa de capacitación en tecnología para jóvenes de bajos recursos.",
      raised: 12000,
      goal: 15000,
      backers: 95,
      daysLeft: 7,
      image: "/img/campana/Educación Digital Inclusiva.jpg",
    },
    {
      id: "4",
      title: "Agua Potable para Todos",
      organization: "AguaVida",
      description: "Construcción de pozos de agua potable en comunidades rurales sin acceso a agua limpia.",
      raised: 5000,
      goal: 12000,
      backers: 42,
      daysLeft: 30,
      image: "/img/campana/Agua Potable para Todos.jpg",
    },
    {
      id: "5",
      title: "Emprendimiento Juvenil",
      organization: "FuturoJoven",
      description: "Programa de mentoría y financiamiento para jóvenes emprendedores en zonas vulnerables.",
      raised: 7500,
      goal: 10000,
      backers: 63,
      daysLeft: 12,
      image: "/img/campana/Emprendimiento Juvenil.jpg",
    },
    {
      id: "6",
      title: "Conservación Marina",
      organization: "OcéanoVivo",
      description: "Proyecto para la limpieza y conservación de arrecifes de coral en peligro.",
      raised: 18000,
      goal: 30000,
      backers: 152,
      daysLeft: 25,
      image: "/img/campana/Conservación Marina.jpg",
    },
  ]

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explora Campañas</h1>
          <p className="text-muted-foreground">
            Descubre proyectos innovadores y causas sociales que necesitan tu apoyo
          </p>
        </div>
        <Button>Crear Campaña</Button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Buscar campañas..." className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="environment">Medio Ambiente</SelectItem>
              <SelectItem value="education">Educación</SelectItem>
              <SelectItem value="technology">Tecnología</SelectItem>
              <SelectItem value="social">Causas Sociales</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="popular">Más populares</SelectItem>
              <SelectItem value="funded">Mayor financiamiento</SelectItem>
              <SelectItem value="ending">Finalizan pronto</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lista de campañas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </main>
  )
}

