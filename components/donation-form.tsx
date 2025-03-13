"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface DonationFormProps {
  campaignId: string
}

export function DonationForm({ campaignId }: DonationFormProps) {
  const [amount, setAmount] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount) return

    setIsSubmitting(true)

    try {
      // Simulación de transacción blockchain
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aquí iría la lógica real de transacción con Polkadot.js
      console.log(`Donación de ${amount} DOT a la campaña ${campaignId}`)

      // Resetear formulario
      setAmount("")
      setIsAnonymous(false)

      // Mostrar mensaje de éxito (en una implementación real)
      alert("¡Donación realizada con éxito! Gracias por tu apoyo.")
    } catch (error) {
      console.error("Error al procesar donación:", error)
      alert("Hubo un error al procesar tu donación. Por favor intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const presetAmounts = [50, 100, 500, 1000]

  // Simulación de wallet conectado para demo
  const handleConnectWallet = () => {
    setIsWalletConnected(true)
  }

  if (!isWalletConnected) {
    return (
      <div className="text-center">
        <p className="mb-4 text-muted-foreground">Conecta tu wallet para donar a este proyecto</p>
        <Button
          onClick={handleConnectWallet}
          className="w-full bg-skyblue hover:bg-skyblue/80 transition-colors hover-scale"
        >
          Conectar Wallet
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleDonate}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Cantidad a donar (DOT)</Label>
          <Input
            id="amount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingresa la cantidad"
            required
            className="mt-1 bg-card border-skyblue/20 focus:border-skyblue"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {presetAmounts.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setAmount(preset.toString())}
              className="border-skyblue/30 hover:bg-skyblue/10 transition-colors"
            >
              {preset} DOT
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={(checked) => setIsAnonymous(checked === true)}
            className="border-skyblue/30 data-[state=checked]:bg-neonpink data-[state=checked]:border-neonpink"
          />
          <Label htmlFor="anonymous" className="text-sm">
            Donar anónimamente
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-neonpink hover:bg-neonpink/80 transition-colors hover-scale"
          disabled={isSubmitting || !amount}
        >
          {isSubmitting ? "Procesando..." : "Donar Ahora"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Tu donación quedará registrada en la blockchain para garantizar transparencia
        </p>
      </div>
    </form>
  )
}

