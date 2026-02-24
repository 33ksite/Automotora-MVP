"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Car, RefreshCw, Shield, CreditCard, ArrowRight } from "lucide-react"

const SERVICES = [
    {
        icon: Car,
        title: "Nuevos 0KM",
        description: "Toda nuestra línea de autos nuevos a tu medida. Concesionario oficial con garantía de marca.",
        cta: "Ver Catálogo",
        href: "/catalog?mileage=0",
        iconColor: "text-primary",
    },
    {
        icon: RefreshCw,
        title: "Tomamos tu Usado",
        description: "Tasación inmediata y transparente. Tomamos tu vehículo como parte de pago al mejor precio.",
        cta: "Tasar mi Auto",
        href: "#contacto",
        iconColor: "text-accent",
    },
    {
        icon: Shield,
        title: "Garantía Dante",
        description: "Respaldo total en cada unidad. Servicio de post-venta especializado y repuestos originales.",
        cta: "Más Información",
        href: "#",
        iconColor: "text-primary",
    },
    {
        icon: CreditCard,
        title: "Financiamiento",
        description: "Alianzas bancarias de primer nivel. Planes hasta en 60 cuotas con tasa preferencial.",
        cta: "Simular Crédito",
        href: "#contacto",
        iconColor: "text-accent",
    },
]

export function ServicesSection() {
    return (
        <section className="relative bg-accent py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
            {/* Background Depth Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] uppercase tracking-[0.2em] pointer-events-none select-none">
                Servicios
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Technical Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mb-24">
                    <div className="space-y-4">
                        <p className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">Ecosistema Corporativo</p>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[0.85]">
                            Soluciones de<br />Alto Impacto
                        </h2>
                    </div>
                    <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                        Un enfoque integral diseñado para optimizar cada fase de su inversión automotriz. Especialización, respaldo y agilidad técnica.
                    </p>
                </div>

                {/* Glassmorphism Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                        >
                            <div className="mb-8 p-3 inline-flex border border-white/20 bg-white/10 rounded-xl">
                                <service.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-white font-black text-xl mb-4 uppercase tracking-tight">{service.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-10 font-light">{service.description}</p>
                            <Link
                                href={service.href}
                                className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors group-hover:gap-3"
                            >
                                {service.cta}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* High-Contrast Technical Banner */}
                <div className="mt-24 p-12 bg-white text-accent flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl shadow-2xl">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-accent/20" />
                            <p className="text-accent/60 text-[10px] font-black uppercase tracking-[0.2em]">Scotiabank Official Partner</p>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-accent">
                            80% Tasa Cero
                        </h3>
                        <p className="text-accent/60 text-sm font-light mt-2 tracking-wide max-w-sm">
                            Financiación inmediata mediante Scotiabank. Adquiera su unidad con condiciones preferenciales de mercado.
                        </p>
                    </div>
                    <Link
                        href="#contacto"
                        className="shrink-0 px-12 py-5 bg-accent text-white hover:bg-accent/90 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-xl shadow-lg shadow-accent/20"
                    >
                        Gestionar Crédito
                    </Link>
                </div>
            </div>
        </section>
    )
}
