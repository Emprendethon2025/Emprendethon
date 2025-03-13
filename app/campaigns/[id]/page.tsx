import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DonationForm } from "@/components/donation-form"
import { TransparencyTracker } from "@/components/transparency-tracker"
import { Clock, Users, Award, Shield, ExternalLink } from "lucide-react"

interface PageProps {
  params: {
    id: string
  }
}

export default function CampaignDetailPage({ params }: PageProps) {
  // En una implementación real, estos datos vendrían de una API o blockchain
  const campaign = {
    id: params.id,
    title: "Reforestación Amazónica",
    organization: "EcoFuturo ONG",
    description:
      "Proyecto para plantar 10,000 árboles nativos en zonas deforestadas de la Amazonía. Este proyecto busca restaurar ecosistemas degradados, proteger la biodiversidad y combatir el cambio climático a través de la reforestación con especies nativas.\n\nLos fondos recaudados se utilizarán para:\n- Adquisición de semillas y plántulas nativas\n- Capacitación de comunidades locales en técnicas de reforestación\n- Monitoreo y mantenimiento de las áreas reforestadas\n- Educación ambiental para prevenir la deforestación futura",
    raised: 15000,
    goal: 25000,
    backers: 128,
    daysLeft: 15,
    image: "/placeholder.svg?height=400&width=800",
    verified: true,
    category: "Medio Ambiente",
    location: "Amazonía, Brasil",
    website: "https://ecofuturo.org",
    rewards: [
      {
        id: "1",
        title: "Certificado Digital",
        description: "NFT que certifica tu contribución a la plantación de un árbol",
        minDonation: 50,
        claimed: 87,
      },
      {
        id: "2",
        title: "Árbol Dedicado",
        description: "Un árbol plantado con tu nombre y coordenadas GPS para que puedas visitarlo",
        minDonation: 200,
        claimed: 32,
      },
      {
        id: "3",
        title: "Patrocinador Oficial",
        description: "Tu nombre/logo en nuestro sitio web y materiales promocionales + 10 árboles plantados",
        minDonation: 1000,
        claimed: 5,
      },
    ],
    updates: [
      {
        id: "1",
        date: "2023-10-15",
        title: "¡Comenzamos la campaña!",
        content: "Hoy lanzamos oficialmente nuestra campaña de reforestación. Gracias a todos por su apoyo inicial.",
      },
      {
        id: "2",
        date: "2023-10-28",
        title: "Primera meta alcanzada",
        content: "Hemos alcanzado el 25% de nuestra meta. Ya hemos comenzado a adquirir las primeras semillas.",
      },
      {
        id: "3",
        date: "2023-11-10",
        title: "Preparación del terreno",
        content:
          "El equipo ha comenzado a preparar las primeras hectáreas para la plantación que comenzará el próximo mes.",
      },
    ],
    transactions: [
      {
        id: "tx1",
        date: "2023-10-15",
        amount: 1000,
        from: "5GrwvaEF...utQY",
        type: "donation",
      },
      {
        id: "tx2",
        date: "2023-10-16",
        amount: 500,
        from: "5FHneW46...v3VPc",
        type: "donation",
      },
      {
        id: "tx3",
        date: "2023-10-28",
        amount: 2000,
        to: "Vivero Amazonas",
        type: "expense",
        purpose: "Compra de semillas",
      },
    ],
  }

  const progress = Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100)

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">
          <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} className="w-full h-auto rounded-xl" />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-primary border-primary">
                {campaign.category}
              </Badge>
              {campaign.verified && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Shield className="h-3 w-3 mr-1" /> Verificado
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <span>Por {campaign.organization}</span>
              <span>•</span>
              <span>{campaign.location}</span>
            </div>

            <Tabs defaultValue="about">
              <TabsList className="mb-4">
                <TabsTrigger value="about">Acerca del Proyecto</TabsTrigger>
                <TabsTrigger value="updates">Actualizaciones</TabsTrigger>
                <TabsTrigger value="transparency">Transparencia</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-6">
                <div className="whitespace-pre-line text-muted-foreground">{campaign.description}</div>

                {campaign.website && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={campaign.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Visitar sitio web <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="updates">
                <div className="space-y-6">
                  {campaign.updates.map((update) => (
                    <div key={update.id} className="border-l-2 border-primary pl-4 pb-6">
                      <div className="text-sm text-muted-foreground mb-1">{update.date}</div>
                      <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                      <p className="text-muted-foreground">{update.content}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="transparency">
                <TransparencyTracker transactions={campaign.transactions} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Barra lateral */}
        <div className="space-y-8">
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="space-y-4 mb-6">
              <Progress value={progress} className="h-2" />

              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">{campaign.raised.toLocaleString()} DOT</div>
                  <div className="text-muted-foreground">de {campaign.goal.toLocaleString()} DOT</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{progress}%</div>
                  <div className="text-muted-foreground">Completado</div>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{campaign.backers} donantes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{campaign.daysLeft} días restantes</span>
                </div>
              </div>
            </div>

            <DonationForm campaignId={campaign.id} />
          </div>

          {/* Recompensas */}
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Recompensas
            </h3>
            <div className="space-y-4">
              {campaign.rewards.map((reward) => (
                <div key={reward.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <h4 className="font-semibold mb-1">{reward.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Mínimo: {reward.minDonation} DOT</div>
                    <div className="text-xs text-muted-foreground">{reward.claimed} reclamados</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

