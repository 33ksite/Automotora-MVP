const { Client } = require('pg');

async function run() {
    const client = new Client({
        connectionString: 'postgresql://postgres.riqguufkfqlvfrayhvbt:0Dq6jU7J!fSVEZ!@aws-0-us-west-2.pooler.supabase.com:6543/postgres',
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const res = await client.query("UPDATE storage.buckets SET public = true WHERE id = 'vehicles'");
        console.log('Bucket vehicles made public. Rows affected:', res.rowCount);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.end();
        process.exit(0);
    }
}

run();
