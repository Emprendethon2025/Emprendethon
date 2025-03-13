import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, Wallet, LineChart } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { CampaignCard } from "@/components/campaign-card"

export default function Home() {
  // Datos de ejemplo para campañas destacadas
  const featuredCampaigns = [
    {
      id: "1",
      title: "Reforestación Amazónica",
      organization: "EcoFuturo ONG",
      description: "Proyecto para plantar 10,000 árboles nativos en zonas deforestadas de la Amazonía.",
      raised: 15000,
      goal: 25000,
      backers: 128,
      daysLeft: 15,
      image: "/placeholder.svg?height=200&width=400",
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
      image: "/placeholder.svg?height=200&width=400",
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
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      {/* Sección de características */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">¿Cómo funciona TrustFund DAO?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Nuestra plataforma combina la transparencia de blockchain con una experiencia de usuario intuitiva
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Identidad Verificada"
              description="Verificación de identidad en blockchain para garantizar la legitimidad de las organizaciones."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Campañas Transparentes"
              description="Crea y gestiona campañas con total transparencia en la asignación de fondos."
            />
            <FeatureCard
              icon={<Wallet className="h-10 w-10" />}
              title="Donaciones en Crypto"
              description="Recibe fondos en DOT y otros tokens con comisiones mínimas y máxima seguridad."
            />
            <FeatureCard
              icon={<LineChart className="h-10 w-10" />}
              title="Seguimiento en Tiempo Real"
              description="Visualiza en tiempo real cómo se utilizan los fondos donados en la blockchain."
            />
          </div>
        </div>
      </section>

      {/* Sección de campañas destacadas */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-background/95 to-background">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Campañas Destacadas</h2>
            <Link href="/campaigns" passHref>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-skyblue/30 hover:bg-skyblue/10 transition-colors"
              >
                Ver todas <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección CTA */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-darkblue via-darkblue to-darkblue/90 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neonpink/20 via-transparent to-transparent"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">¿Listo para impulsar tu proyecto?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Únete a TrustFund DAO y comienza a recaudar fondos con la confianza y transparencia que ofrece la tecnología
            blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-neonpink hover:bg-neonpink/80 text-white transition-colors hover-scale">
              Crear Campaña
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-skyblue/50 text-skyblue hover:bg-skyblue/10 hover:text-skyblue transition-colors"
            >
              Explorar Proyectos
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

