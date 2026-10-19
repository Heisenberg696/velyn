const filesByPrice = [
  {
    folder: '150',
    price: 150,
    files: [
      'the flexxx.jpeg',
    ],
  },
  {
    folder: '350',
    price: 350,
    files: [
      'Dust essence.jpeg',
      'IRIDIUM PETAL.jpeg',
      'PRESTIGE.jpeg',
      'THE BLACK OUT.jpeg',
      'THE SCENT OF CONFICENCE.jpeg',
      'golden musk.jpeg',
      'midnight.jpeg',
      'my fault.jpeg',
      'secret love.jpeg',
      'touch.jpeg',
      'velyn2.jpeg',
    ],
  },
];

const toName = (file) =>
  file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');

const toSlug = (name) =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const entries = filesByPrice
  .flatMap(({ folder, price, files }) =>
    files.map((file) => ({ file, folder, price, name: toName(file) }))
  )
  .sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));

const usedSlugs = new Set();

const perfumes = entries.map((entry, index) => {
  const { file, folder, price, name } = entry;

  let slug = toSlug(name);
  if (usedSlugs.has(slug)) {
    const pricedSlug = `${slug}-${price}`;
    slug = usedSlugs.has(pricedSlug) ? `${pricedSlug}-${index + 1}` : pricedSlug;
  }
  usedSlugs.add(slug);

  return {
    id: index + 1,
    name,
    slug,
    price,
    category: 'unisex',
    tags: [],
    stock: 20,
    image: `/images/${folder}/${encodeURIComponent(file)}`,
    description: `${name} is part of the Velyn fragrance collection — a refined, long-lasting scent crafted for everyday elegance.`
  };
});

export const PRICE_MIN = perfumes.length
  ? Math.min(...perfumes.map((perfume) => perfume.price))
  : 0;

export const PRICE_MAX = perfumes.length
  ? Math.max(...perfumes.map((perfume) => perfume.price))
  : 0;

export default perfumes;
