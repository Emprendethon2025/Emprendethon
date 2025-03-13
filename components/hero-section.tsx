import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 md:px-6 overflow-hidden bg-darkblue text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-darkblue via-darkblue/95 to-darkblue/90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonpink/10 via-transparent to-transparent"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Financiamiento transparente</span> con blockchain
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0 text-gray-300">
              Plataforma de crowdfunding Web3 donde ONG, emprendedores y grupos comunitarios pueden recaudar fondos con
              identidad verificada en blockchain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/campaigns/create" passHref>
                <Button size="lg" className="bg-neonpink hover:bg-neonpink/80 text-white hover-scale">
                  Crear Campaña
                </Button>
              </Link>
              <ConnectWalletButton />
            </div>
          </div>
          <div className="flex-1 w-full max-w-md animate-slide-up">
            <div className="bg-darkblue/40 backdrop-blur-sm p-6 rounded-xl border border-skyblue/20 shadow-lg hover-glow">
              <div className="aspect-video bg-gradient-to-br from-skyblue/20 to-neonpink/20 rounded-lg flex items-center justify-center overflow-hidden relative">
                <Image
                  src="/img/herosection.png"
                  alt="TrustFund DAO Platform"
                  fill
          
                  className="rounded-lg transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-darkblue/60 border border-skyblue/10">
                  <span className="text-sm text-gray-300">Campañas Activas</span>
                  <span className="font-bold text-skyblue">127</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-darkblue/60 border border-skyblue/10">
                  <span className="text-sm text-gray-300">Fondos Recaudados</span>
                  <span className="font-bold text-skyblue">1.2M DOT</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-darkblue/60 border border-skyblue/10">
                  <span className="text-sm text-gray-300">Organizaciones Verificadas</span>
                  <span className="font-bold text-skyblue">89</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

