"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import dynamic from "next/dynamic"
import { formatAddress } from "@/lib/polkadot/utils"
import { WEB3_EXTENSIONS, ERROR_MESSAGES } from "@/lib/polkadot/constants"
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'

// Import the wallet hook with no SSR to avoid window is not defined errors
const WalletHookImport = dynamic(
  () => import("@/lib/polkadot/WalletContext").then(mod => {
    return {
      usePolkadotWallet: mod.usePolkadotWallet
    }
  }),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="outline"
        size="lg"
        className="border-skyblue/50 text-skyblue hover:bg-skyblue/10 hover:text-skyblue transition-colors"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Cargando...
      </Button>
    )
  }
)

// Wrapper component that uses the dynamic import
function ConnectWalletContent() {
  // Access the wallet context through the dynamic import
  const { usePolkadotWallet } = WalletHookImport
  const { isConnected, selectedAccount, accounts, connect, disconnect, selectAccount } = usePolkadotWallet()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async (extensionName?: string) => {
    setError(null)
    setIsConnecting(true)

    try {
      await connect()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al conectar wallet:", error)
      setError(
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.CONNECTION_FAILED
      )
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  // If connected, show account address with disconnect option
  if (isConnected && selectedAccount) {
    return (
      <Button
        variant="outline"
        size="lg"
        className="border-skyblue/50 text-skyblue hover:bg-skyblue/10 hover:text-skyblue transition-colors"
        onClick={handleDisconnect}
      >
        <Wallet className="mr-2 h-4 w-4" />
        {formatAddress(selectedAccount.address)}
      </Button>
    )
  }

  // If not connected, show connect dialog
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="border-skyblue/50 text-skyblue hover:bg-skyblue/10 hover:text-skyblue transition-colors"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Conectar Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border border-skyblue/20 bg-card/95 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Conectar Wallet</DialogTitle>
          <DialogDescription>Conecta tu wallet para interactuar con la plataforma TrustFund DAO</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && (
            <div className="p-3 text-sm bg-red-500/10 text-red-500 rounded-md">
              {error}
            </div>
          )}

          <Button
            onClick={() => handleConnect(WEB3_EXTENSIONS.POLKADOT_JS)}
            className="w-full bg-skyblue hover:bg-skyblue/80 transition-colors"
            disabled={isConnecting}
          >
            {isConnecting ? "Conectando..." : "Polkadot.js Extension"}
          </Button>

          <Button
            variant="outline"
            className="w-full border-skyblue/30 hover:bg-skyblue/10 transition-colors"
            onClick={() => handleConnect(WEB3_EXTENSIONS.SUBWALLET)}
            disabled={isConnecting}
          >
            SubWallet
          </Button>

          <Button
            variant="outline"
            className="w-full border-skyblue/30 hover:bg-skyblue/10 transition-colors"
            onClick={() => handleConnect(WEB3_EXTENSIONS.TALISMAN)}
            disabled={isConnecting}
          >
            Talisman
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Export a client-only component
export function ConnectWalletButton() {
  return (
    <WalletHookImport>
      <ConnectWalletContent />
    </WalletHookImport>
  )
}
