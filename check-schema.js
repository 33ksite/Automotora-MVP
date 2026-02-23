const fs = require('fs');
const url = "https://riqguufkfqlvfrayhvbt.supabase.co/rest/v1/";
const key = "process.env.SUPABASE_KEY" || "your_supabase_key";

fetch(url, {
  headers: {
    "apikey": key,
    "Authorization": `Bearer ${key}`
  }
})
.then(res => res.json())
.then(data => {
  fs.writeFileSync('schema.json', JSON.stringify(data.paths, null, 2));
  console.log("Schema saved");
})
.catch(err => console.error(err));
