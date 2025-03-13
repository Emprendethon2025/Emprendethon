"use client"

import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"

interface Transaction {
  id: string
  date: string
  amount: number
  from?: string
  to?: string
  type: "donation" | "expense"
  purpose?: string
}

interface TransparencyTrackerProps {
  transactions: Transaction[]
}

export function TransparencyTracker({ transactions }: TransparencyTrackerProps) {
  const [view, setView] = useState<"list" | "chart">("list")

  const donations = transactions.filter((tx) => tx.type === "donation")
  const expenses = transactions.filter((tx) => tx.type === "expense")

  const totalDonations = donations.reduce((sum, tx) => sum + tx.amount, 0)
  const totalExpenses = expenses.reduce((sum, tx) => sum + tx.amount, 0)
  const balance = totalDonations - totalExpenses

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border border-skyblue/20 hover-glow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardDescription>Total Recaudado</CardDescription>
            <CardTitle className="text-2xl text-skyblue">{totalDonations.toLocaleString()} DOT</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border border-skyblue/20 hover-glow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardDescription>Total Gastado</CardDescription>
            <CardTitle className="text-2xl text-neonpink">{totalExpenses.toLocaleString()} DOT</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border border-skyblue/20 hover-glow transition-all duration-300">
          <CardHeader className="pb-2">
            <CardDescription>Balance Actual</CardDescription>
            <CardTitle className="text-2xl gradient-text">{balance.toLocaleString()} DOT</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="bg-card/30 p-4 rounded-lg backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all" className="data-[state=active]:bg-skyblue data-[state=active]:text-white">
              Todas
            </TabsTrigger>
            <TabsTrigger value="donations" className="data-[state=active]:bg-skyblue data-[state=active]:text-white">
              Donaciones
            </TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-skyblue data-[state=active]:text-white">
              Gastos
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <button
              onClick={() => setView("list")}
              className={`p-1 rounded ${view === "list" ? "bg-muted text-skyblue" : ""}`}
            >
              Lista
            </button>
            <button
              onClick={() => setView("chart")}
              className={`p-1 rounded ${view === "chart" ? "bg-muted text-skyblue" : ""}`}
            >
              Gráfico
            </button>
          </div>
        </div>

        <TabsContent value="all">
          {view === "list" ? (
            <TransactionList transactions={transactions} />
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Visualización de gráfico (simulada)</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="donations">
          {view === "list" ? (
            <TransactionList transactions={donations} />
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Visualización de donaciones (simulada)</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="expenses">
          {view === "list" ? (
            <TransactionList transactions={expenses} />
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Visualización de gastos (simulada)</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <a href="#" className="text-sm text-skyblue inline-flex items-center hover:underline">
          Ver todas las transacciones en el explorador <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      </div>
    </div>
  )
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No hay transacciones para mostrar</p>
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-muted/30 hover:border-skyblue/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${tx.type === "donation" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}
            >
              {tx.type === "donation" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
            </div>
            <div>
              <div className="font-medium">{tx.type === "donation" ? "Donación" : tx.purpose || "Gasto"}</div>
              <div className="text-xs text-muted-foreground">
                {tx.date} • {tx.type === "donation" ? `De: ${tx.from}` : `Para: ${tx.to}`}
              </div>
            </div>
          </div>
          <div
            className={`font-medium ${tx.type === "donation" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}
          >
            {tx.type === "donation" ? "+" : "-"}
            {tx.amount} DOT
          </div>
        </div>
      ))}
    </div>
  )
}

