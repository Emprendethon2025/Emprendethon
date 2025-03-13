import { AboutSection } from "@/components/about-section"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Acerca de TrustFund DAO</h1>
        <p className="text-muted-foreground mb-8">
          TrustFund DAO es una plataforma revolucionaria que combina la transparencia de la tecnología blockchain
          con el poder del crowdfunding para impulsar proyectos sociales y ambientales.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <p className="text-muted-foreground">
              Nuestro objetivo es democratizar el acceso a la financiación de proyectos de impacto social y ambiental,
              eliminando las barreras tradicionales y creando un ecosistema transparente y confiable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Transparencia</h3>
                <p className="text-sm text-muted-foreground">
                  Creemos en la transparencia total en todas las operaciones y el uso de fondos.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Impacto Social</h3>
                <p className="text-sm text-muted-foreground">
                  Nos enfocamos en proyectos que generan un impacto positivo en la sociedad.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Innovación</h3>
                <p className="text-sm text-muted-foreground">
                  Utilizamos tecnología blockchain para revolucionar el crowdfunding.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">Comunidad</h3>
                <p className="text-sm text-muted-foreground">
                  Fomentamos una comunidad activa y participativa.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Nuestro Impacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-3xl font-bold text-skyblue mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Proyectos Financiados</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-3xl font-bold text-skyblue mb-2">50K+</div>
                <p className="text-sm text-muted-foreground">Donantes Activos</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <div className="text-3xl font-bold text-skyblue mb-2">1M+</div>
                <p className="text-sm text-muted-foreground">DOT Donados</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Únete a Nosotros</h2>
            <div className="p-6 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground mb-4">
                ¿Tienes un proyecto que quieres impulsar? ¿O quieres contribuir a proyectos de impacto?
                Únete a nuestra comunidad y sé parte del cambio.
              </p>
              <div className="flex gap-4">
                <a
                  href="/campaigns/create"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neonpink text-white hover:bg-neonpink/80 h-10 px-4 py-2"
                >
                  Crear Campaña
                </a>
                <a
                  href="/campaigns"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Explorar Proyectos
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 