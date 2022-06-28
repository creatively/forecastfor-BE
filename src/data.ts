import { dataIn } from '../../forecastfor-FE/src/mock-api/weather-data';
import { iForecastData, iForecastDay, iForecastThreeHourlyColumn } from '../../forecastfor-FE/src/interfaces/forecastInterface';


let data2 = [];

console.log(data1.code)


function makeForecastDays() {
    dataIn.forEach(function (dataIn3hrBlock) {
        dataIn3hrBlock.

    })
}

    function makeForecastDay(dayName, tempMax, ForecastDay) {

    }

        function getDaysDayName() {
            
        }

        function getDaysMaxTemp() {
            
        }

        function makeForecastThreeHourlyColumn() {
                
        }

            function makeForecastThreeHourlyColumn() {
                
            }
                function getDaylight() {
                    
                }

                function getPrecipitation() {
                            
                }

                function getClouds() {
                                
                }

dataOut = getForecastDays();


// util functions
function getShortDayName(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-us', {weekday:'short'})
}

function getPrecipitationType(id) {

    const ids = {
        'light rain':   (id: number) => (id === 300 || id === 310 || id === 500),
        'rain':         (id: number) => (id > 299 && id <322 || id === 501),
        'heavy rain':   (id: number) => (id > 501 && id < 505),
        'light showers':(id: number) => (id === 520),
        'showers':      (id: number) => (id === 521),
        'heavy showers':(id: number) => (id === 522 || id === 531),
        'sleet':        (id: number) => (id > 610 && id < 617),
        'snow':         (id: number) => (id > 599 && id < 603),
        'snow showers': (id: number) => (id > 619 && id < 623),
        'thunderstorm': (id: number) => (id > 199 && id < 233 || id === 771 || id === 781),
        'mist':         (id: number) => (id > 700 && id < 763),
        'dry':          (id: number) => (id === id)
    }

    for (var type: string in ids) {
        if (ids[type](id)) return type
    }
}

function getDaylightStatus(dateTimeString: string) {
    const hour = new Date(dateTimeString).getHours()
    switch (hour) {
        case 6: case 18:
            return 'partly'
            break;
        case 0: case 3: case 21:
            return 'no'
            break;
        default:
            return 'yes'
    }
}




/*

const d2 = "forecastDays": [
                {
                    "dayName": "Mon",
                    "tempMax": 20,
                    "forecastThreeHourlyColumns": [
                        {
                            "daylight": "daylight-yes",
                            "precipitation": "dry",
                            "clouds": 85
                        }





    let dayMaxSoFar = 0;
    let d2.dayNumber = 0;

    d1.3hrs.forEach((d1.3hrs, index) => {
        do {
            if (d1.3hrs.main.temp_max > dayMaxSoFar) {
                dayMaxSoFar = d1.3hrs.main.temp_max;
            }

            = getDescription = (d1.3hrs.weatherdescription)
            = d1.3hrs.clouds.all
        } while (d1.3hrs[index].time !== '00:00:00')

        d2.tempMax = dayMaxSoFar;
        d2.dayName = 

        d2.dayNumber++;
        dayMaxSoFar = 0;
    })


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


    // Loop through all d1 3hr objects
        // add data to all d2 3hr object

let d2ThreeHrs = [];

data1.list.forEach((threeHrs) => {
    let obj = {}
    const dateTimeString = threeHrs.dt_txt
    obj.daylight = getDaylightStatus(dateTimeString)
    obj.precipitation = getPrecipitationType(threeHrs.weather[0].id)
    obj.clouds = threeHrs.clouds.all
    obj.dayName = getShortDayName(dateTimeString)
    obj.temp = threeHrs.main.temp_max
    d2ThreeHrs.push(obj)
})
