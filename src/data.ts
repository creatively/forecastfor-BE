import { apiData } from '../../forecastfor-FE/src/mock-api/apiData';
import { Data3Hrs, DataDay } from '../../forecastfor-FE/src/interfaces/forecastInterface';


// DATA PROCESSING UTILS
function switchCase(conditions: any, val: number): any {
    for (var type in conditions) {
        if (conditions[type](val)) return type
    }
}

function getPrecipitationType(id: number) {
    
    const conditions = {
        'light rain':   (val: number) => (val === 300 || val === 310 || val === 500),
        'rain':         (val: number) => (val > 299 && val <322 || val === 501),
        'heavy rain':   (val: number) => (val > 501 && val < 505),
        'light showers':(val: number) => (val === 520),
        'showers':      (val: number) => (val === 521),
        'heavy showers':(val: number) => (val === 522 || val === 531),
        'sleet':        (val: number) => (val > 610 && val < 617),
        'snow':         (val: number) => (val > 599 && val < 603),
        'snow showers': (val: number) => (val > 619 && val < 623),
        'thunderstorm': (val: number) => (val > 199 && val < 233 || val === 771 || val === 781),
        'mist':         (val: number) => (val > 700 && val < 763),
        'dry':          () => true
    }

    return switchCase(conditions, id)
}

function getDaylightConditions(dateTimeString: string) {
    const hour: number = new Date(dateTimeString).getHours()
    const conditions = {
        'no':       (hour: number) => (hour === 0 || hour === 3 || hour === 21),
        'partly':   (hour: number) => (hour === 6 || hour === 18),
        'yes':      () => true
    }

    return switchCase(conditions, hour)
}

function getShortDayName(dateString: string): string {
    const newDate: Date = new Date(dateString)
    const shortDayName = newDate.toLocaleDateString('en-us', {weekday:'short'})
    return shortDayName
}

function getShortDayNameByIndex(dayNumber: number): string {
    const today: Date = new Date()
    const todayDate: Date = new Date(today)
    const nextDate: Date = new Date(todayDate.setDate(todayDate.getDate() + dayNumber))
    return getShortDayName(nextDate.toString())
}

function getArrayOfADays3hrs(data3Hrs: Data3Hrs[], dayShortName: string) {
    return data3Hrs.filter((data3Hr: Data3Hrs) => data3Hr.dayName === dayShortName)
}


// MAIN DATA PROCESSING FUNCTIONS

function getCleanedData3Hrs(apiData: any): Data3Hrs[] {
    let data3Hrs: Data3Hrs[] = [];

    apiData.list.forEach((apiData3Hrs: any) => {
        
        const dateTimeString: string = apiData3Hrs.dt_txt
        const precipitationCode: number = apiData3Hrs.weather[0].id
        let obj: Data3Hrs = {
            "daylight": getDaylightConditions(dateTimeString),
            "precipitation": getPrecipitationType(precipitationCode),
            "clouds": apiData3Hrs.clouds.all,
            "dayName": getShortDayName(dateTimeString),
            "tempMax": apiData3Hrs.main.temp_max
        }
        data3Hrs.push(obj)
    })

    return data3Hrs
}

function get5DaysOfDataFrom3HrsData(data3Hrs: Data3Hrs[]) {
    let daysData: DataDay[] = []

    for (let dayNumber = 0; dayNumber < 5; dayNumber++) {
        const dayName: string = getShortDayNameByIndex(dayNumber)
        const dataDay3hrs: Data3Hrs[] = getArrayOfADays3hrs(data3Hrs, dayName)
        const tempMax: number = Math.max(...(dataDay3hrs.map(({ tempMax }) => tempMax)))
        const day: DataDay = {
            dayName: dayName,
            forecastThreeHrsColumns: dataDay3hrs,
            tempMax : tempMax
        }
        daysData.push(day)
    }
    return daysData
}


// MAIN CODE
 
const cleanedData3Hrs = getCleanedData3Hrs(apiData)
const dataFor5Days = get5DaysOfDataFrom3HrsData(cleanedData3Hrs)
console.log(dataFor5Days)



/*
const d2 = \
"forecastDays": [
    {
        "dayName": "Mon",
        "tempMax": 20,
        "forecastThreeHourlyColumns": [
            {
                "daylight": "daylight-yes",
                "precipitation": "dry",
                "clouds": 85
            }

const data1 =
    {
        "cod": "200",
        "message": 0,
        "cnt": 40,
        "list": [
            {
                "dt": 1647345600,
                "main": {
                    "temp": 286.88,
                    "feels_like": 285.93,
                    "temp_min": 286.74,
                    "temp_max": 286.88,
                    "pressure": 1021,
                    "sea_level": 1021,
                    "grnd_level": 1018,
                    "humidity": 62,
                    "temp_kf": 0.14
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 85
                },
                "wind": {
                    "speed": 3.25,
                    "deg": 134,
                    "gust": 4.45
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2022-03-15 12:00:00"
            }
        ]
    }
*/
