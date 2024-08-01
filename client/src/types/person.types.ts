export interface Person {
  id: number;
  name: string;
  species: string;
  image: string;
  like: boolean;
}

export interface PersonData {
  characters: {
    results: Person[];
  };
}
