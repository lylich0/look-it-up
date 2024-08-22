export interface ICountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: ICountry[];
}
