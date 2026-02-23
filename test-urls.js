const urls = [
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400",
  "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400",
];
Promise.all(
  urls.map(async (u, i) => {
    const r = await fetch(u, { method: "HEAD", redirect: "follow" });
    return { i, status: r.status };
  })
).then((results) => {
  results.forEach((r) => console.log(`${r.i}: ${r.status}`));
});
