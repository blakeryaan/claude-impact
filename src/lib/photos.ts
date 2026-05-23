// Specific picsum.photos IDs — curated for cafe, food, community, interior vibes.
// picsum.photos is purpose-built for reliable image serving; these IDs always load.
const PHOTO_IDS = [
  431,  // warm interior / cafe seating
  292,  // coffee overhead
  488,  // food / table spread
  493,  // plants / fresh produce
  577,  // market stall
  674,  // lifestyle interior
  315,  // close-up food
  326,  // warm-toned lifestyle
  343,  // table / dining
  347,  // cafe window light
  452,  // barista / coffee prep
  659,  // community / people
  706,  // interior / warm
  718,  // food overhead
  724,  // cafe / lifestyle
  737,  // market / community
  756,  // dining / food
  835,  // bakery / pastry
  870,  // coffee / warm tones
  904,  // community space
  312,  // interior / dining
  348,  // fresh produce / market
  999,  // lifestyle / warm
  1060, // food / overhead
  1080, // community / interior
];

// djb2-style hash for a stable pick per business id
function hashId(id: string): number {
  let h = 5381;
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) + h) ^ id.charCodeAt(i);
    h = h >>> 0;
  }
  return h;
}

export function businessPhoto(id: string, w = 600, h = 400): string {
  const photoId = PHOTO_IDS[hashId(id) % PHOTO_IDS.length];
  return `https://picsum.photos/id/${photoId}/${w}/${h}`;
}
