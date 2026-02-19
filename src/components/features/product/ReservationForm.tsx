"use client"

import * as React from "react"
import { Car } from "@/types/automotive"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Button } from "@/components/ui/Button"
import { CheckCircle2, Send } from "lucide-react"

interface ReservationFormProps {
  car: Car
}

export function ReservationForm({ car }: ReservationFormProps) {
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => setIsSuccess(true), 1000)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50/50 border border-green-200 rounded-xl text-center animate-in fade-in zoom-in duration-500 h-full min-h-[400px]">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
           <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-green-900 mb-2">Inquiry Sent!</h3>
        <p className="text-green-800/80 mb-8 max-w-xs mx-auto">
          A specialist will contact you shortly regarding the <span className="font-semibold">{car.model}</span>.
        </p>
        <Button
           variant="outline"
           className="border-green-600 text-green-700 hover:bg-green-100 w-full"
           onClick={() => setIsSuccess(false)}
        >
          Submit Another Inquiry
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden sticky top-24">
       <div className="p-6 border-b border-border/50 bg-muted/20">
        <h3 className="font-serif font-bold text-xl text-foreground">Interest Inquiry</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Complete the form below to connect with a sales advisor.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" required className="bg-background" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" required className="bg-background" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-background" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <textarea
            id="message"
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder={`I am interested in the ${car.year} ${car.model}...`}
          />
        </div>

        <Button type="submit" size="lg" className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 shadow-lg shadow-primary/20">
          <Send className="h-4 w-4" /> Request Information
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By submitting, you agree to our <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
        </p>
      </form>
    </div>
  )
}
