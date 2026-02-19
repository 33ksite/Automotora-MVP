"use client";

import { motion } from "framer-motion";
import { ArrowRight, Car, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/4 translate-y-1/4 rounded-full bg-blue-500/5 blur-[100px]" />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500">
              <Car className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter">
              AUTOMOTORA<span className="text-orange-500">AI</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            <a href="#" className="transition-colors hover:text-white">Inventario</a>
            <a href="#" className="transition-colors hover:text-white">Análisis</a>
            <a href="#" className="transition-colors hover:text-white">Seguridad</a>
          </div>
          <button className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95">
            Acceso Demo
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-orange-500 uppercase"
          >
            <Zap className="h-3 w-3" />
            Revolucionando la gestión automotriz
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 text-5xl font-extrabold tracking-tight sm:text-7xl"
          >
            Gestión Inteligente para <br />
            <span className="bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent italic">
              Concesionarias Premium
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg text-zinc-400"
          >
            Optimiza tu inventario, analiza tendencias de mercado y escala tus ventas con nuestra plataforma MVP diseñada para el mercado automotriz de alta gama.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button className="flex h-14 items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 text-base font-bold text-black transition-all hover:bg-orange-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              Comenzar Ahora
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="glass glass-hover flex h-14 items-center justify-center rounded-xl px-8 text-base font-bold">
              Ver Documentación
            </button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<BarChart3 className="text-orange-500" />}
            title="Análisis Predictivo"
            description="Anticipa las demandas del mercado y ajusta tu stock con algoritmos de IA avanzados."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-orange-500" />}
            title="Seguridad Total"
            description="Tus datos y transacciones protegidos con los más altos estándares de cifrado."
          />
          <FeatureCard
            icon={<Car className="text-orange-500" />}
            title="Stock en Tiempo Real"
            description="Visibilidad instantánea de cada vehículo con estados actualizados y reportes detallados."
          />
        </div>
      </main>

      <footer className="border-t border-zinc-900 py-10 text-center text-sm text-zinc-500">
        <p>© 2026 Automotora AI. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass glass-hover flex flex-col gap-4 rounded-3xl p-8 text-left"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}
