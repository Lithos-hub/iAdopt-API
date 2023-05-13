export interface Form {
  adopter_name: string;
  adopter_age: number | null;
  adopter_email: string;
  adopter_phone?: string;
  adopter_region: string;
  adopter_city: string;
  adopter_sex: 'male' | 'female';
  adopter_is_working: 'true' | 'false';
  animal_specie: 'dog' | 'cat' | string;
  animal_name: string;
  animal_region: string;
  animal_breed: string;
  animal_age: string | null;
  animal_extra_info: string;
  animal_image?: File | null;
  animal_link: string;
}
