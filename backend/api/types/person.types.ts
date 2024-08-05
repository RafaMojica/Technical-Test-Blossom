export interface Person {
  id: number;
  name: string;
  species: string;
  image: string;
  gender: string;
  status: string;
  like: boolean;
}

export interface FilterArgs {
  species?: string;
  gender?: string;
  status?: string;
}
