export interface CarVariant {
  name: string
  onTheRoadPrice: number
}

export interface CarModel {
  model: string
  variants: CarVariant[]
}

export const carPrices: CarModel[] = [
  {
    model: 'ARUZ',
    variants: [
      { name: 'ARUZ 1.5 (ADVANCE)', onTheRoadPrice: 80712 },
      { name: 'ARUZ 1.5 (X)', onTheRoadPrice: 75572 },
    ],
  },
  {
    model: 'ALZA',
    variants: [
      { name: 'ALZA 1.5 (ADVANCE)', onTheRoadPrice: 78368 },
      { name: 'ALZA 1.5 (H)', onTheRoadPrice: 70671 },
      { name: 'ALZA 1.5 (X)', onTheRoadPrice: 65000 },
    ],
  },
  {
    model: 'ATIVA',
    variants: [
      { name: 'ATIVA 1.0 (AV) 2T', onTheRoadPrice: 76198 },
      { name: 'ATIVA 1.0 (AV) SM', onTheRoadPrice: 75898 },
      { name: 'ATIVA 1.0 (AV) M', onTheRoadPrice: 75369 },
      { name: 'ATIVA 1.0 (H) SM', onTheRoadPrice: 70457 },
      { name: 'ATIVA 1.0 (H) M', onTheRoadPrice: 69929 },
      { name: 'ATIVA 1.0 (X)', onTheRoadPrice: 64988 },
    ],
  },
  {
    model: 'MYVI',
    variants: [
      { name: 'MYVI 1.5 (AV)', onTheRoadPrice: 62356 },
      { name: 'MYVI 1.5 (H)', onTheRoadPrice: 57216 },
      { name: 'MYVI 1.5 (X)', onTheRoadPrice: 52923 },
      { name: 'MYVI 1.3 (G) ASA', onTheRoadPrice: 50585 },
      { name: 'MYVI 1.3 (G)', onTheRoadPrice: 48529 },
    ],
  },
  {
    model: 'AXIA',
    variants: [
      { name: 'AXIA 1.0 (AV)', onTheRoadPrice: 51600 },
      { name: 'AXIA 1.0 (SE)', onTheRoadPrice: 45901 },
      { name: 'AXIA 1.0 (X)', onTheRoadPrice: 41848 },
      { name: 'AXIA 1.0 (G)', onTheRoadPrice: 40392 },
      { name: 'AXIA 1.0 (E)', onTheRoadPrice: 23191 },
    ],
  },
  {
    model: 'BEZZA',
    variants: [
      { name: 'BEZZA 1.3 (AV)', onTheRoadPrice: 52264.5 },
      { name: 'BEZZA 1.3 (X)', onTheRoadPrice: 46112 },
      { name: 'BEZZA 1.0 (G) AT', onTheRoadPrice: 38367 },
      { name: 'BEZZA 1.0 (G) MT', onTheRoadPrice: 36311 },
    ],
  },
  {
    model: 'TRAZ',
    variants: [
      { name: 'TRAZ 1.5 (X)', onTheRoadPrice: 78920 },
      { name: 'TRAZ 1.5 (H)', onTheRoadPrice: 83820 },
      { name: 'TRAZ 1.5 (H) 2 TONE', onTheRoadPrice: 84970 },
    ],
  },
]
