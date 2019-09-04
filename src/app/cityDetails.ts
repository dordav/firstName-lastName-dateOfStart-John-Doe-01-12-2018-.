export class cityDetails {
  constructor(
    public Version?: number,
    public Key?: number,
    public Type?: string,
    public Rank?: number,
    public LocalizedName?: string,
    public Country?: {
      ID?: string,
      LocalizedName: string
    },
    public AdministrativeArea?: {
      ID?: string,
      LocalizedName?: string
    }
  ) { }
}