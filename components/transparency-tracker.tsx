"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Calendar, Wallet, Users } from "lucide-react"

interface Transaction {
  id: string
  date: string
  amount: number
  from?: string
  to?: string
  type: "donation" | "expense"
  purpose?: string
  status: "completed" | "pending" | "failed"
}

interface TransparencyTrackerProps {
  transactions: Transaction[]
  totalBudget: number
  spentBudget: number
  donorsCount: number
}

export function TransparencyTracker({ 
  transactions, 
  totalBudget,
  spentBudget,
  donorsCount
}: TransparencyTrackerProps) {
  const [view, setView] = useState<"list" | "chart">("list")

  const donations = transactions.filter((tx) => tx.type === "donation")
  const expenses = transactions.filter((tx) => tx.type === "expense")

  const totalDonations = donations.reduce((sum, tx) => sum + tx.amount, 0)
  const totalExpenses = expenses.reduce((sum, tx) => sum + tx.amount, 0)
  const balance = totalDonations - totalExpenses
  const budgetProgress = (spentBudget / totalBudget) * 100

  return (
    <Card className="border-skyblue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-skyblue" />
          Seguimiento de Fondos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-skyblue/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Donaciones Totales</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{totalDonations.toLocaleString()} DOT</div>
            </CardContent>
          </Card>

          <Card className="border-skyblue/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownLeft className="h-4 w-4 text-red-500" />
                <span className="text-sm text-muted-foreground">Gastos Totales</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} DOT</div>
            </CardContent>
          </Card>

          <Card className="border-skyblue/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-skyblue" />
                <span className="text-sm text-muted-foreground">Donantes</span>
              </div>
              <div className="text-2xl font-bold text-skyblue">{donorsCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span>Presupuesto Utilizado</span>
            <span className="font-medium">{spentBudget.toLocaleString()} / {totalBudget.toLocaleString()} DOT</span>
          </div>
          <Progress value={budgetProgress} className="h-2 bg-muted [&>div]:bg-skyblue" />
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Lista de Transacciones</TabsTrigger>
            <TabsTrigger value="chart">Gráfico</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="space-y-4">
              {transactions.map((tx) => (
                <Card key={tx.id} className="border-skyblue/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {tx.type === "donation" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <ArrowDownLeft className="h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <h4 className="font-medium">
                            {tx.type === "donation" ? "Donación" : "Gasto"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {tx.purpose || "Sin descripción"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {tx.type === "donation" ? "+" : "-"}{tx.amount.toLocaleString()} DOT
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(tx.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="chart">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Gráfico de transacciones en desarrollo...
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

