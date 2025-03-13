"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, ArrowDownLeft, Wallet, Users } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

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

// Datos de ejemplo para el gráfico
const transactionData = [
  { date: '2024-01', amount: 15000, transactions: 45 },
  { date: '2024-02', amount: 25000, transactions: 62 },
  { date: '2024-03', amount: 32000, transactions: 78 },
  { date: '2024-04', amount: 45000, transactions: 95 },
  { date: '2024-05', amount: 52000, transactions: 112 },
  { date: '2024-06', amount: 68000, transactions: 128 },
  { date: '2024-07', amount: 75000, transactions: 145 },
].map(item => ({
  ...item,
  formattedDate: new Date(item.date).toLocaleDateString('es-ES', { month: 'short' })
}))

export function TransparencyTracker({ 
  transactions, 
  totalBudget,
  spentBudget,
  donorsCount
}: TransparencyTrackerProps) {
  const donations = transactions.filter((tx) => tx.type === "donation")
  const expenses = transactions.filter((tx) => tx.type === "expense")

  const totalDonations = donations.reduce((sum, tx) => sum + tx.amount, 0)
  const totalExpenses = expenses.reduce((sum, tx) => sum + tx.amount, 0)
  const budgetProgress = (spentBudget / totalBudget) * 100

  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="list">Lista de Transacciones</TabsTrigger>
        <TabsTrigger value="chart">Gráfico</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
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
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="chart">
        <Card>
          <CardHeader>
            <CardTitle>Transparencia de Fondos</CardTitle>
            <CardDescription>
              Visualización del flujo de fondos y transacciones en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={transactionData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(147, 51, 234)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="rgb(147, 51, 234)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(236, 72, 153)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="rgb(236, 72, 153)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="formattedDate"
                    className="text-muted-foreground text-xs"
                  />
                  <YAxis
                    yAxisId="left"
                    className="text-muted-foreground text-xs"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    className="text-muted-foreground text-xs"
                    tickFormatter={(value) => `${value} tx`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="amount"
                    stroke="rgb(147, 51, 234)"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                    name="Monto Total"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="transactions"
                    stroke="rgb(236, 72, 153)"
                    fillOpacity={1}
                    fill="url(#colorTransactions)"
                    name="Transacciones"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

