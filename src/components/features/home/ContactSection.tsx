"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

const SHOWROOMS = [
    {
        name: "MONTEVIDEO",
        address: "Av. Agraciada 3324.",
        phone: "091 838 500",
    },
    {
        name: "ROCHA",
        address: "Rambla Brava Lote Claro",
        phone: "098 227 0463",
    },
    {
        name: "LASCANO",
        address: "Avenida 1304 - Nro 208",
        phone: "074 469 5264",
    },
]

export function ContactSection() {
    const [formState, setFormState] = React.useState({ name: "", phone: "", message: "" })
    const [submitted, setSubmitted] = React.useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const text = `Hola, soy ${formState.name}. ${formState.message}. Mi teléfono: ${formState.phone}`
        const url = `https://wa.me/59891838500?text=${encodeURIComponent(text)}`
        window.open(url, "_blank")
        setSubmitted(true)
    }

    return (
        <section id="contacto" className="bg-white py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Technical Info */}
                    <div className="space-y-16">
                        <div className="space-y-4">
                            <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">Atención Personalizada</p>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[0.85]">
                                Contacte a<br />Nuestros Asesores
                            </h2>
                        </div>

                        {/* Main Phone */}
                        <div className="border-l-4 border-primary pl-8 space-y-2">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Línea Directa</p>
                            <a href="tel:+59891838500" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-primary transition-colors">
                                (+598) 91 838 500
                            </a>
                        </div>

                        {/* Showrooms Technical Stack */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {SHOWROOMS.map(s => (
                                <div key={s.name} className="space-y-3">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-foreground">{s.name}</h4>
                                    <div className="space-y-1">
                                        <p className="text-[12px] text-gray-500 font-light leading-tight">{s.address}</p>
                                        <p className="text-[12px] text-gray-400 font-bold">{s.phone}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <Clock className="h-3 w-3" />
                                L-S 09:00 - 19:00
                            </div>
                            <a
                                href="https://wa.me/59891838500"
                                className="text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-2 hover:translate-x-1 transition-transform"
                            >
                                <MessageCircle className="h-3 w-3" />
                                Conectar por WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Minimalist Form */}
                    <div className="relative">
                        <div className="bg-gray-50 p-12 border border-gray-100 rounded-2xl shadow-sm">
                            <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Consulta Rápida</h3>
                            <p className="text-gray-400 text-xs font-light mb-10">Le responderemos en menos de 30 minutos.</p>

                            {submitted ? (
                                <div className="py-20 text-center space-y-4">
                                    <p className="font-black text-foreground uppercase tracking-tight">Solicitud Enviada</p>
                                    <p className="text-xs text-gray-400">Verifique su aplicación de WhatsApp.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Identidad</label>
                                        <Input
                                            placeholder="NOMBRE COMPLETO"
                                            className="rounded-lg border-gray-200 bg-white h-12 text-xs font-medium placeholder:text-gray-300"
                                            value={formState.name}
                                            onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Contacto</label>
                                        <Input
                                            placeholder="TELÉFONO / CELULAR"
                                            className="rounded-lg border-gray-200 bg-white h-12 text-xs font-medium placeholder:text-gray-300"
                                            value={formState.phone}
                                            onChange={e => setFormState(p => ({ ...p, phone: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Requerimiento</label>
                                        <textarea
                                            placeholder="DETALLE DE SU INTERÉS..."
                                            className="w-full rounded-lg border border-gray-200 bg-white p-4 h-32 text-xs font-medium placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                                            value={formState.message}
                                            onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-14 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                                        Enviar Consulta
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
