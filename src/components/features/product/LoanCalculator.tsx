"use client"

import * as React from "react"
import { Calculator } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Slider } from "@/components/ui/Slider"
import { Button } from "@/components/ui/Button"

interface LoanCalculatorProps {
  vehiclePrice: number
  currency: string
}

export function LoanCalculator({ vehiclePrice, currency }: LoanCalculatorProps) {
  const [downPayment, setDownPayment] = React.useState(Math.floor(vehiclePrice * 0.2))
  const [term, setTerm] = React.useState(60) // Months
  const [interestRate, setInterestRate] = React.useState(5.9) // %

  const calculateMonthlyPayment = () => {
    const principal = vehiclePrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = term

    if (interestRate === 0) return principal / numberOfPayments

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return monthlyPayment
  }

  const monthlyPayment = calculateMonthlyPayment()

  return (
    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b border-border/50 pb-4">
        <Calculator className="h-5 w-5 text-gold" />
        <h3 className="font-serif font-bold text-lg">Calculadora de Financiamiento</h3>
      </div>

      <div className="space-y-4">
        {/* Down Payment */}
        <div className="space-y-3">
           <div className="flex justify-between text-sm">
              <Label>Pie (Anticipo)</Label>
              <span className="font-mono">{currency} {downPayment.toLocaleString()}</span>
           </div>
           <Slider
             min={0}
             max={vehiclePrice}
             step={1000}
             value={downPayment}
             onValueChange={(val) => setDownPayment(val)}
           />
        </div>

        {/* Term */}
        <div className="space-y-3">
           <div className="flex justify-between text-sm">
              <Label>Plazo (Meses)</Label>
              <span className="font-mono">{term} meses</span>
           </div>
           <Slider
             min={12}
             max={84}
             step={12}
             value={term}
             onValueChange={(val) => setTerm(val)}
           />
           <div className="flex justify-between text-xs text-muted-foreground">
              <span>12</span>
              <span>84</span>
           </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
           <div className="flex justify-between text-sm">
              <Label>Tasa de Interés (%)</Label>
           </div>
           <Input
             type="number"
             value={interestRate}
             onChange={(e) => setInterestRate(Number(e.target.value))}
             step={0.1}
             className="font-mono"
           />
        </div>
      </div>

      <div className="bg-secondary/50 rounded-lg p-4 text-center space-y-1">
         <p className="text-sm text-muted-foreground">Cuota Mensual Estimada</p>
         <p className="text-3xl font-serif font-bold text-primary">
            {currency} {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
         </p>
      </div>

      <Button variant="outline" className="w-full text-xs">
         Solicitar Financiamiento
      </Button>
    </div>
  )
}
