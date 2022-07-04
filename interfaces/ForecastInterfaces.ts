
export type DayName = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
export type Daylight = 'yes' | 'partly' | 'no'
export type Precipitation = 'dry' | 'light rain' | 'rain' | 'heavy rain' | 'light showers' | 'showers' | 'heavy showers' | 'sleet' | 'snow' | 'snow showers' | 'thunderstorm' | 'mist'

export interface Data3Hrs {
    "dayName": string
    "tempMax": number,
    "daylight": Daylight,
    "precipitation": Precipitation,
    "clouds": number
}

export interface DataDay {
    "dayName": string,
    "tempMax": number,
    "forecastThreeHourlyColumns": Data3Hrs[]
}

export interface PrecipitationConditions {
    'light rain':   (val: number) => boolean,
    'rain':         (val: number) => boolean,
    'heavy rain':   (val: number) => boolean,
    'light showers':(val: number) => boolean,
    'showers':      (val: number) => boolean,
    'heavy showers':(val: number) => boolean,
    'sleet':        (val: number) => boolean,
    'snow':         (val: number) => boolean,
    'snow showers': (val: number) => boolean,
    'thunderstorm': (val: number) => boolean,
    'mist':         (val: number) => boolean,
    'dry':          (val: number) => boolean
}

export interface DaylightConditions {
    'no':       (hour: number) => boolean,
    'partly':   (hour: number) => boolean,
    'yes':      (hour: number) => boolean
}
