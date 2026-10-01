/**
 * Photo library. Product photography is official Pharmatoka material
 * (ellurautihealth.com). Lifestyle and botanical photos are Unsplash
 * (free licence) — editorial stock that does not depict ellura customers.
 * Credits: content-sources.md.
 */
export interface Photo {
  base: string;
  alt: string;
  w: [number, number];
}

const p = (base: string, alt: string, w: [number, number] = [800, 1600]): Photo => ({ base: `/images/${base}`, alt, w });

export const PHOTOS = {
  // Lifestyle (Unsplash)
  calm: p('life-calm', 'Young woman with eyes closed, calm, in soft window light'),
  elder: p('life-elder', 'Portrait of a composed older Indian woman in a patterned kurta'),
  glass: p('life-glass', 'A hand holding a clear glass of water'),
  glass2: p('life-glass-2', 'Close-up of a glass of water held in a hand'),
  sunlight: p('life-sunlight', 'Woman stretching in slanted morning sunlight'),
  sariGolden: p('life-sari-golden', 'Woman in a sari standing in golden afternoon light'),
  editorial: p('life-editorial', 'Editorial portrait of a woman against a warm plaster wall'),
  ritual: p('life-ritual', 'Woman in a white robe during a calm bathroom self-care routine'),
  waterSprig: p('life-water-sprig', 'A green sprig in a glass of water in low light'),
  morning: p('life-morning', 'Woman stretching on a bed beside a bright window'),
  smile: p('life-smile', 'Smiling woman in a pink printed blouse on a city street'),
  friends: p('life-friends', 'Two friends laughing together on a sofa'),
  street: p('life-street', 'Smiling young woman walking down a tree-lined road'),
  sariRed: p('life-sari-red', 'Woman in a blue sari against a bright red wall'),
  // Botanical & science (Unsplash, reused from the Pharmatoka library)
  berriesFrost: p('berries-frost', 'Frosted cranberries, close up'),
  berriesDark: p('berries-dark', 'Deep red cranberries, close up'),
  cranberryCut: p('cranberry-cut', 'Cranberries cut in half showing the pale interior'),
  bog: p('cranberry-bog', 'Cranberry harvest in a flooded bog'),
  plant: p('cranberry-plant', 'Cranberry plants with red berries growing low to the ground'),
  branch: p('berry-branch', 'A branch of red berries against dark foliage'),
  labPipette: p('lab-pipette', 'Scientist pipetting a sample into test tubes'),
  labScientist: p('lab-scientist', 'Scientist looking through a microscope'),
  labWells: p('lab-wells', 'Pipette dispensing into a multi-well plate'),
  leafShadow: p('leaf-shadow', 'Soft leaf shadow on a pale wall'),
  leafShadow2: p('leaf-shadow-2', 'Branch shadow on a warm plaster wall'),
  india: p('india', 'City skyline across the water at dusk, India'),
  atlanta: p('atlanta', 'Atlanta skyline at sunset'),
  france: p('france', 'Parisian Haussmann building facade'),
  // Official product & brand (Pharmatoka)
  bottlesDuo: p('bottles-duo', 'ellura 30-capsule and 90-capsule bottles with capsules spilling from the open bottle', [900, 1800]),
  bottleBox: p('bottle-box-glow', 'ellura 90-capsule bottle beside its carton', [900, 1600]),
  doctor: p('dr-chughtai', 'Portrait of Dr. Bilal Chughtai in his office', [700, 1200]),
  pack30: p('pack-30', 'ellura 30-capsule bottle with carton', [700, 1400]),
  pack90: p('pack-90', 'ellura 90-capsule bottle with carton', [700, 1400]),
  pack180: p('pack-180', 'Two ellura 90-capsule bottles', [700, 1400]),
  boxFacts: p('box-facts', 'ellura carton Supplement Facts panel', [700, 1400]),
  infoUse: p('info-use', 'Recommended use infographic: take one capsule daily with water', [700, 1400]),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

export const photoSrcSet = (ph: Photo) => `${ph.base}-${ph.w[0]}.webp ${ph.w[0]}w, ${ph.base}-${ph.w[1]}.webp ${ph.w[1]}w`;
export const photoSrc = (ph: Photo, large = false) => `${ph.base}-${ph.w[large ? 1 : 0]}.webp`;
