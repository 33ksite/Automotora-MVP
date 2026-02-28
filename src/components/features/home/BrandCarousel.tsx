"use client"

import * as React from "react"
import { motion } from "framer-motion"

const BRANDS = [
    { name: "Fiat", slug: "fiat" },
    { name: "Audi", url: "https://static.cdnlogo.com/logos/a/18/audi.svg" },
    { name: "Ford", slug: "ford" },
    { name: "Jeep", slug: "jeep" },
    { name: "BYD", url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/BYD_logo.svg" },
    { name: "Volkswagen", url: "https://static.cdnlogo.com/logos/v/1/volkswagen-2019.svg" },
    { name: "Toyota", slug: "toyota" },
    { name: "Renault", slug: "renault" },
    { name: "Chevrolet", url: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Chevrolet-logo.png" },
    { name: "Peugeot", slug: "peugeot" },
    { name: "Nissan", slug: "nissan" },
    { name: "Chery", url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Chery_logo.svg" },
    { name: "Geely", url: "https://static.cdnlogo.com/logos/g/85/geely.svg" },
    { name: "JAC", url: "https://static.cdnlogo.com/logos/j/58/jac.svg" },
]

export function BrandCarousel() {
    // Duplicating brands to ensure a continuous loop
    const duplicatedBrands = [...BRANDS, ...BRANDS]

    return (
        <div className="w-full bg-white border-y border-gray-100 py-16 overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center gap-4">
                <div className="h-px flex-grow bg-slate-100" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">
                    Representantes Oficiales / Alianzas
                </p>
                <div className="h-px flex-grow bg-slate-100" />
            </div>

            <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <motion.div
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                    className="flex gap-24 items-center whitespace-nowrap px-12"
                >
                    {duplicatedBrands.map((brand, i) => (
                        <div
                            key={`${brand.name}-${i}`}
                            className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
                        >
                            <img
                                src={brand.url || `https://cdn.simpleicons.org/${brand.slug}`}
                                alt={brand.name}
                                className="h-10 md:h-12 w-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
