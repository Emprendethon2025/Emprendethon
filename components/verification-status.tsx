"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, CheckCircle, AlertCircle } from "lucide-react"

interface VerificationStatusProps {
  isVerified: boolean
  onVerify: () => void
}

export function VerificationStatus({ isVerified, onVerify }: VerificationStatusProps) {
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)

    // Simulación de proceso de verificación
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onVerify()
    setIsVerifying(false)
  }

  if (isVerified) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Verificación Completada</AlertTitle>
        <AlertDescription className="text-green-700">
          Tu identidad ha sido verificada correctamente. Puedes continuar con la creación de tu campaña.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Verificación Requerida</AlertTitle>
        <AlertDescription>
          Para garantizar la transparencia y confianza en la plataforma, necesitamos verificar tu identidad o la de tu
          organización antes de que puedas crear una campaña.
        </AlertDescription>
      </Alert>

      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Proceso de Verificación
        </h3>

        <p className="text-muted-foreground mb-6">
          El proceso de verificación utiliza tecnología blockchain para crear una identidad digital verificable. Esto
          permite a los donantes confiar en que su dinero va a organizaciones o individuos legítimos.
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-medium">Conecta tu Wallet</h4>
              <p className="text-sm text-muted-foreground">
                Necesitarás una wallet compatible con Polkadot para el proceso de verificación.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-medium">Proporciona Documentación</h4>
              <p className="text-sm text-muted-foreground">
                Sube documentos que verifiquen tu identidad o la de tu organización.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-medium">Recibe tu Credencial Verificada</h4>
              <p className="text-sm text-muted-foreground">
                Una vez verificado, recibirás una credencial digital en la blockchain que certifica tu identidad.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleVerify} disabled={isVerifying}>
            {isVerifying ? "Verificando..." : "Iniciar Verificación"}
          </Button>
        </div>
      </div>
    </div>
  )
}

