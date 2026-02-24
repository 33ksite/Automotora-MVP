"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

const SLIDES = [
    {
        image: "/hero/byd.webp",
        title: "Concesionario Oficial BYD",
        subtitle: "Liderando la Revolución Eléctrica en Uruguay"
    },
    {
        image: "/hero/jeep-hero.jpg",
        title: "Jeep: 20% Contado - 80% Tasa Cero",
        subtitle: "Oportunidad exclusiva con Scotiabank"
    },
    {
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2574",
        title: "Dante Automóviles",
        subtitle: "Líderes en 0KM y Usados Seleccionados"
    },
    {
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670",
        title: "CON UN BONO DE HASTA USD 1.000",
        subtitle: "Oportunidades exclusivas en toda nuestra línea Fiat"
    },
    {
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2670",
        title: "Calidad Certificada",
        subtitle: "Cada vehículo es revisado en más de 100 puntos"
    },
    {
        image: "/cars/vw-polo-track.webp",
        title: "Tu Próximo Destino",
        subtitle: "Montevideo · Rocha · Lascano"
    }
];

export function HeroSlider() {
    const [current, setCurrent] = React.useState(0);
    const [direction, setDirection] = React.useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const nextSlide = React.useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = React.useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    }, []);

    React.useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative h-[600px] md:h-[80vh] w-full overflow-hidden bg-white">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 35 },
                        opacity: { duration: 0.4 }
                    }}
                    className="absolute inset-0"
                >
                    <div className="relative h-full w-full">
                        <Image
                            src={SLIDES[current].image}
                            alt={SLIDES[current].title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Minimal Technical Overlay */}
                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="space-y-4 max-w-5xl"
                            >
                                <p className="text-[10px] font-black tracking-[0.3em] text-white/80 uppercase">
                                    Concesionario Multimarca
                                </p>
                                <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] uppercase">
                                    {SLIDES[current].title.includes("USD 1.000") ? (
                                        <>
                                            BONO <span className="text-primary font-black">USD 1.000</span>
                                        </>
                                    ) : SLIDES[current].title.includes("Tasa Cero") ? (
                                        <>
                                            {SLIDES[current].title.split("Tasa Cero")[0]}
                                            <span className="text-primary font-black">TASA CERO</span>
                                        </>
                                    ) : SLIDES[current].title}
                                </h2>
                                <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto tracking-wide">
                                    {SLIDES[current].subtitle}
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-12 h-14 text-xs font-black uppercase tracking-widest transition-all">
                                        Ver Inventario
                                    </Button>
                                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm rounded-none px-12 h-14 text-xs font-black uppercase tracking-widest">
                                        Financiación
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Technical Navigation */}
            <div className="absolute bottom-12 right-12 flex gap-0 z-20 border border-white/20">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevSlide}
                    className="rounded-none h-14 w-14 bg-black/20 text-white hover:bg-primary transition-all border-r border-white/20"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    className="rounded-none h-14 w-14 bg-black/20 text-white hover:bg-primary transition-all"
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>

            {/* Minimal Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full flex gap-0 z-20 h-1">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-full transition-all duration-500 flex-grow ${i === current ? 'bg-primary' : 'bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    );
}
