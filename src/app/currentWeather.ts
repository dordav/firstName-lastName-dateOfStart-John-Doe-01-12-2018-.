export class currentWeather {
    constructor(
        public cityName: '',
        public LocalObservationDateTime: string,
        public EpochTime: number,
        public WeatherText: string,
        public WeatherIcon: number,
        public HasPrecipitation: false,
        public PrecipitationType: null,
        public IsDayTime: false,
        public Temperature: {
            Metric: {
                Value: number,
                Unit: string,
                UnitType: number
            },
            Imperial: {
                Value: number,
                Unit: string,
                UnitType: number
            }
        },
        public MobileLink: string,
        public Link: string

    ) { }


}