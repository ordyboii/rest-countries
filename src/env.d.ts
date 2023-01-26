/// <reference types="astro/client" />

type Country = {
  name: {
    common: string;
    nativeName: Record<string, { official: string }>;
  };
  flags: {
    png: string;
  };
  population: number;
  capital: string[];
  region: string;
  subregion: string;
  tld: string[];
  currencies: Record<string, { name: string }>;
  languages: Record<string, string>;
  borders: string[];
};
