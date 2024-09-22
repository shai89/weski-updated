import { v4 as uuidv4 } from 'uuid';

export type Site = {
    id: number,
    name: string;
}
export const siteMapping = new Map<number, string>([
    [1, 'Val Thorens'],
    [2, 'Courchevel'],
    [3, 'Tignes'],
    [4, 'La Plagne'],
    [5, 'Chamonix'],
])
export const siteData: Site[] = [
    {
      id: 1,
      name: 'Val Thorens'
    },
    {
      id: 2,
      name: 'Courchevel'
    },
    {
      id: 3,
      name: 'Tignes'
    },
    {
      id: 4,
      name: 'La Plagne'
    },
    {
      id: 5,
      name: 'Chamonix'
    }
  ]

  export const clientId = uuidv4();