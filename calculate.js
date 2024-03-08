const monthLength = {
    31: [1,3,5,7,8,10,12],
    30: [4,6,9,11],
    28: [2]
}

function calculateAge(dayVal, monthVal, yearVal) {
    let date = new Date;

    let currentYear = date.getFullYear();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYearLength, birthYearLength = 0;

    let birthMonthLength;

    let deltaYear = currentYear - yearVal;
    let deltaDay;

    Object.keys(monthLength).forEach(key => {
        
        if(monthLength[key].includes(monthVal)) {
            birthMonthLength = +key;
        };
    })

    if(monthVal === 2 && yearVal % 4 === 0) {
        birthMonthLength++;
    }

    currentYearLength = currentDay;
    deltaDay = currentDay + (birthMonthLength - dayVal);

    if(currentYear === yearVal) {

        if(monthVal === currentMonth) {
            deltaDay = currentDay - dayVal;
        }

        else if(currentMonth - monthVal === 1){
            deltaDay = (birthMonthLength - dayVal) + currentDay;
            deltaDay--;
        }


        if(currentMonth - monthVal > 1) {
            console.log(birthMonthLength, dayVal, currentDay);

            for(let i = --currentMonth; i > monthVal; --i) {
                Object.keys(monthLength).forEach(key => {
                    if(monthLength[key].includes(i)) {
                        deltaDay += +key;
                        console.log("Key", key);
                    } 
                })
                console.log(i);
            }
            deltaDay++;
        }

        if(monthVal === 2 && currentYear % 4 === 0) {
            deltaDay++;
        }
    }
    else {
        for(let i = --currentMonth; i > 0; i--) {
            Object.keys(monthLength).forEach(key => {
                if(monthLength[key].includes(i)) {
                    deltaDay += +key;
                }
            })
         
        if(i === 2 && currentYear % 4 === 0) {
            deltaDay++;
        }
        }
        currentYearLength = deltaDay - (birthMonthLength - dayVal);

        for(let i = ++monthVal; i <= 12; i++) {
            Object.keys(monthLength).forEach(key => {
                if(monthLength[key].includes(i)) {
                    birthYearLength += +key;
                }
            })
        }
        birthYearLength += (birthMonthLength - dayVal);

        deltaDay = birthYearLength + currentYearLength;

        if(deltaYear > 1) {
            for(let i = ++yearVal; i < currentYear; i++) {
                if(i % 4 === 0) {
                    deltaDay += 366;
                }
                else {
                    deltaDay += 365;
                }
            }
        }
    }

    console.log(deltaDay);

    let ageYear = Math.trunc(deltaDay/365);
    let ageMonth = deltaDay - (ageYear*365);
    let ageDay = 0;

    let monthCount = 0;

    let monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    monthList[1] = (yearVal % 4 === 0) ? 29 : 28; 

    for(let i = yearVal; i <= currentYear; i++) {
        if(i % 4 === 0) {ageMonth--;}
    }

    for(let i = currentMonth -2; i >= 0; i--) {
        if(ageMonth - monthList[i] > 0) {
            ageMonth -= monthList[i];
            monthCount++;
        }
        ageDay = ageMonth;
    }

    ageMonth = monthCount;
    console.log(`Year: ${ageYear}\nMonth: ${ageMonth}\nDay: ${ageDay}`);   
    return [ageYear, ageMonth, ageDay]; 
}

console.log(calculateAge(1, 1, 2006))  