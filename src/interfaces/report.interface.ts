export interface Report extends NewReport {
  _id: string;
}

export interface NewReport {
  title: string;
  evaluation_score: number;
  evaluation_results: string;
  specie: 'dog' | 'cat' | string; // Maybe would change in the future
  image: string;
  adopter_name: string;
  adopter_age: number;
  is_favourite: boolean;
}
