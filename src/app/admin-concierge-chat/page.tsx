"use client"

import * as React from "react"
import { Send, CarFront, PlusCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useChat } from "@/lib/context/ChatContext"
import { fetchCatalogCars, createCatalogCar } from "@/app/actions/catalog"
import { Car } from "@/types/automotive"

export default function AdminConciergeChat() {
    const { messages, addMessage } = useChat();
    const [inputText, setInputText] = React.useState("");
    const [catalogCars, setCatalogCars] = React.useState<Car[]>([]);

    // mock add car simple state
    const [newCarModel, setNewCarModel] = React.useState("");
    const [newCarPrice, setNewCarPrice] = React.useState("");
    const [searchQuery, setSearchQuery] = React.useState("");

    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // Fetch initial catalog
        fetchCatalogCars().then(data => setCatalogCars(data));
    }, []);

    const filteredCars = catalogCars.filter(car =>
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        addMessage(inputText, 'ai');
        setInputText("");
    };

    const handleAddCar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCarModel.trim() || !newCarPrice.trim()) return;

        // Convert string price to number safely for mock db
        const numericPrice = Number(newCarPrice.replace(/[^0-9.-]+/g, ""));

        // Add globally via server action
        const updatedCatalog = await createCatalogCar({
            make: newCarModel.split(' ')[0] || "Custom Make",
            model: newCarModel,
            price: isNaN(numericPrice) ? 0 : numericPrice
        });

        setCatalogCars(updatedCatalog);
        setNewCarModel("");
        setNewCarPrice("");
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full bg-background text-foreground overflow-hidden">
            {/* Left panel: Catalog / Data */}
            <div className="w-full md:w-1/3 border-r border-border/50 bg-muted/10 flex flex-col h-[40vh] md:h-full">
                <div className="p-6 border-b border-border/50 bg-eclipse text-white shrink-0">
                    <h2 className="text-xl font-serif flex items-center gap-2">
                        <CarFront className="h-5 w-5 text-almond" />
                        Catálogo LUXEAUTO
                    </h2>
                    <p className="text-sm text-white/70 mt-1">Datos rápidos para el operador</p>
                </div>

                <div className="p-4 border-b border-border/50 bg-muted/20">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar modelo o marca..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-almond/30 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Inventario Actual</h3>
                        <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono">
                            {filteredCars.length} items
                        </span>
                    </div>

                    {filteredCars.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground italic text-sm">
                            No se encontraron vehículos.
                        </div>
                    ) : (
                        filteredCars.map(car => (
                            <div
                                key={car.id}
                                onClick={() => {
                                    addMessage(`Sí, tenemos disponible este ${car.make} ${car.model}. ¿Te gustaría recibir más detalles o prefieres ver otros modelos similares?`, 'ai');
                                }}
                                className="bg-card border border-border/50 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-almond/50 group"
                                title="Haz clic para enviar mensaje automático sobre este auto"
                            >
                                <h4 className="font-semibold group-hover:text-almond transition-colors">{car.make} {car.model}</h4>
                                <p className="text-almond font-medium text-sm mt-1 bg-eclipse inline-block px-2 py-0.5 rounded-sm">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: car.currency || 'USD', maximumFractionDigits: 0 }).format(car.price)}
                                </p>
                                <div className="mt-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                    Clic para recomendar →
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-border/50 bg-card shrink-0">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" /> Agregar Rápido
                    </h3>
                    <form onSubmit={handleAddCar} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Modelo (ej. Ferrari F40)"
                            value={newCarModel}
                            onChange={e => setNewCarModel(e.target.value)}
                            className="w-full text-sm border border-input rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                        <input
                            type="text"
                            placeholder="Precio (ej. 1200000)"
                            value={newCarPrice}
                            onChange={e => setNewCarPrice(e.target.value)}
                            className="w-full text-sm border border-input rounded-md px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                        <Button type="submit" className="w-full bg-eclipse text-white hover:bg-eclipse/90">
                            Guardar
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right panel: Message Center */}
            <div className="flex-1 flex flex-col h-[60vh] md:h-full bg-card">
                <div className="flex items-center justify-between p-6 border-b border-border/50 shrink-0">
                    <div>
                        <h1 className="text-2xl font-serif">Centro de Mensajes (Mago de Oz)</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Respondiendo como el Asistente Virtual de Lujo</p>
                    </div>
                    <div className="flex items-center gap-2 hidden sm:flex">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                        <span className="text-sm font-medium text-green-600/80">En línea</span>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-muted/5 custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="text-center text-muted-foreground pt-10">
                            No hay mensajes aún. Esperando que el cliente inicie el chat.
                        </div>
                    )}
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                            <div
                                className={`rounded-2xl p-4 max-w-[80%] sm:max-w-[60%] shadow-sm ${msg.sender === 'user'
                                    ? 'bg-white border border-border/50 text-foreground rounded-tl-none font-medium'
                                    : 'bg-eclipse text-white rounded-tr-none'
                                    }`}
                            >
                                {msg.sender === 'user' && (
                                    <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-wider">Cliente</div>
                                )}
                                {msg.sender === 'ai' && (
                                    <div className="text-xs text-almond/80 mb-1 font-semibold uppercase tracking-wider text-right">Tú (IA)</div>
                                )}
                                <div className={msg.sender === 'user' ? 'text-base' : 'font-serif text-[15px] leading-relaxed'}>
                                    {msg.text}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-6 border-t border-border/50 bg-background shrink-0">
                    <form onSubmit={handleSendMessage} className="flex gap-4">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Escribe la respuesta al cliente..."
                            className="flex-1 border border-input rounded-xl px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-eclipse/20 text-base"
                        />
                        <Button type="submit" size="lg" className="bg-eclipse text-white hover:bg-eclipse/90 rounded-xl px-4 sm:px-8 shadow-md shrink-0">
                            <Send className="h-5 w-5 sm:mr-2" />
                            <span className="hidden sm:inline">Enviar</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
