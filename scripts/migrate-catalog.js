const { Client } = require('pg');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const tenantId = 'd28a1c9e-4f4b-8b11-9bc1-1a2b3c4d5e6f';

const cars = [
    { make: "Fiat", model: "Strada Freedom 1.3", year: 2024, price: 19500, currency: "USD", mileage: 0, bodyType: "Truck", color: "Gris Silverstone", transmission: "Manual", engine: { fuelType: "Gasoline" }, features: [], image_url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2574" },
    { make: "Fiat", model: "Fastback Limited Edition", year: 2024, price: 28990, currency: "USD", mileage: 0, bodyType: "SUV", color: "Negro Vulcano", transmission: "Automatic", engine: { fuelType: "Gasoline" }, features: [], image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670" },
    { make: "Fiat", model: "Toro Volcano TD350 4x4", year: 2024, price: 32990, currency: "USD", mileage: 0, bodyType: "Truck", color: "Azul Jazz", transmission: "Automatic", engine: { fuelType: "Diesel" }, features: [], image_url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2671" },
    { make: "BMW", model: "M4 Competition xDrive", year: 2024, price: 95000, currency: "USD", mileage: 1500, bodyType: "Coupe", color: "Verde Isla de Man", transmission: "Automatic", engine: { fuelType: "Gasoline" }, features: [], image_url: "/cars/0007df9bea74ccb4f2f9d57d465f4119.webp" },
    { make: "Tesla", model: "Model S Plaid", year: 2023, price: 89000, currency: "USD", mileage: 5000, bodyType: "Sedan", color: "Gris Metalizado", transmission: "Automatic", engine: { fuelType: "Electric" }, features: [], image_url: "/cars/Used-2023-Tesla-Model-S-Plaid-1716313171.jpg" },
    { make: "Audi", model: "RS e-tron GT", year: 2024, price: 155000, currency: "USD", mileage: 200, bodyType: "Sedan", color: "Blanco", transmission: "Automatic", engine: { fuelType: "Electric" }, features: [], image_url: "/cars/upload-1.webp" },
    { make: "Chevrolet", model: "Tracker", year: 2023, price: 26990, currency: "USD", mileage: 15000, bodyType: "SUV", color: "Blanco", transmission: "Manual", engine: { fuelType: "Gasoline" }, features: [], image_url: "/cars/59a24025a23242a8817c7a3d25820751_1721052303579.webp" },
    { make: "Suzuki", model: "Swift Hybrid", year: 2024, price: 18990, currency: "USD", mileage: 0, bodyType: "Hatchback", color: "Gris Plata", transmission: "Manual", engine: { fuelType: "Hybrid" }, features: [], image_url: "/cars/atfzj11ho7wsuaba3skvfv31j.jpg" },
    { make: "Volkswagen", model: "Polo Track", year: 2024, price: 19490, currency: "USD", mileage: 0, bodyType: "Hatchback", color: "Gris Plata", transmission: "Manual", engine: { fuelType: "Gasoline" }, features: [], image_url: "/cars/vw-polo-track.webp" },
    { make: "Hyundai", model: "HB20", year: 2023, price: 17500, currency: "USD", mileage: 22000, bodyType: "Hatchback", color: "Gris Oscuro", transmission: "Manual", engine: { fuelType: "Gasoline" }, features: [], image_url: "/cars/Lanzamiento_ Hyundai HB20 MY2023 Precios 0km Autoblog Uruguay Precios 20229.jpg" }
];

const s3 = new S3Client({
    forcePathStyle: true,
    region: "us-west-2",
    endpoint: "https://riqguufkfqlvfrayhvbt.storage.supabase.co/storage/v1/s3",
    credentials: {
        accessKeyId: "8f0b8a781ba12157d4f7ce1a3a98c02a",
        secretAccessKey: "4fa793ddbd70c1a796ec6aba77545acad9347da47e6f92e0ea809bb0b29f4e58",
    },
});

async function run() {
    const client = new Client({ connectionString: 'postgresql://postgres.riqguufkfqlvfrayhvbt:0Dq6jU7J!fSVEZ!@aws-0-us-west-2.pooler.supabase.com:6543/postgres' });
    await client.connect();

    for (const car of cars) {
        let imageUrl = car.image_url;

        if (imageUrl.startsWith('https://images.unsplash.com')) {
            const fileName = `unsplash-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
            console.log(`Downloading ${imageUrl} ...`);
            const res = await fetch(imageUrl);
            const buffer = await res.arrayBuffer();

            console.log(`Uploading ${fileName} to S3 ...`);
            await s3.send(new PutObjectCommand({
                Bucket: 'vehicles',
                Key: fileName,
                Body: Buffer.from(buffer),
                ContentType: 'image/jpeg'
            }));
            imageUrl = fileName;
        } else if (imageUrl.startsWith('/cars/')) {
            imageUrl = imageUrl.replace('/cars/', '');
        }

        const typeMap = { 'Truck': 'truck', 'SUV': 'suv', 'Coupe': 'car', 'Sedan': 'car', 'Hatchback': 'car' };
        const fuelMap = { 'Gasoline': 'Nafta', 'Diesel': 'Diesel', 'Electric': 'Eléctrico', 'Hybrid': 'Híbrido' };
        const transMap = { 'Manual': 'Manual', 'Automatic': 'Automática' };

        const rootModel = car.model.split(' ')[0];
        const rootVersion = car.model.split(' ').slice(1).join(' ');

        const query = `
            INSERT INTO vehicles (tenant_id, brand, model, type, operation, version, year, mileage, transmission, fuel_type, price, currency, color, image_url, available, extra_data)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        `;
        const values = [
            tenantId,
            car.make,
            rootModel,
            typeMap[car.bodyType] || 'car',
            'sale',
            rootVersion || car.model,
            car.year,
            car.mileage,
            transMap[car.transmission] || 'Manual',
            fuelMap[car.engine.fuelType] || 'Nafta',
            car.price,
            car.currency,
            car.color,
            imageUrl,
            true,
            JSON.stringify(car.features)
        ];

        await client.query(query, values);
        console.log(`✅ Seeded ${car.make} ${car.model}`);
    }

    await client.end();
}

run().catch(console.error);
