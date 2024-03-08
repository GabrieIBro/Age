const form = document.querySelector("form")

const day = document.querySelector("#day-input");
const dayLabel = document.querySelector('#day-label');
const dayError = document.querySelector("#day-error"); 

const month = document.querySelector("#month-input");
const monthLabel = document.querySelector('#month-label');
const monthError = document.querySelector("#month-error"); 

const year = document.querySelector("#year-input");
const yearLabel = document.querySelector('#year-label');
const yearError = document.querySelector("#year-error"); 

const yearText = document.querySelector('#year');
const monthText = document.querySelector('#month');
const dayText = document.querySelector('#day');



const monthLength = {
    31: [1,3,5,7,8,10,12],
    30: [4,6,9,11],
    28: [2]
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    let gap;

    if(validateForm()) {
        gap = calculateGap(+(day.value), +(month.value), +(year.value));
        setGap(gap);
        // form.submit();
    }
})

function validateForm() {

    let dayContent = +(day.value);
    let monthContent = +(month.value);
    let yearContent = +(year.value); 

    if(!validateInput(dayContent, monthContent, yearContent)) {return false};
    if(!validateDate(dayContent, monthContent, yearContent)) {return false};
    if(!dateExists(dayContent, monthContent, yearContent)) {return false};

    return true;
}

function validateInput(dayVal, monthVal, yearVal) {
    let count = 0;

    if(!dayVal) {
        error(day, dayLabel, dayError);
        count++;
    }
    else {
        notError(day, dayLabel, dayError);
    }


    if(!monthVal) {
        error(month, monthLabel, monthError);
        count++;
    }
    else {
        notError(month, monthLabel, monthError);
    }


    if(!yearVal) {
        error(year, yearLabel, yearError);
        count++;
    }
    else {
        notError(year, yearLabel, yearError);
    }   

    return (count === 0) ? true : false;
}

function validateDate(dayVal, monthVal, yearVal) {
    let count = 0;
    let date = new Date;

    if(dayVal <= 0 || dayVal > 31) {
        error(day, dayLabel, dayError, message="Must be a valid day");
        count++;
    }
    else{
        notError(day, dayLabel, dayError);
    }


    if(monthVal <= 0 || monthVal > 12) {
        error(month, monthLabel, monthError, message="Must be a valid month");
        count++;
    }
    else {
        notError(month, monthLabel, monthError);
    }


    if(yearVal > date.getFullYear()) {
        error(year, yearLabel, yearError, message="Must be in the past");
        count++;
    }
    else {
        notError(year, yearLabel, yearError);
    }

    return (count === 0) ? true : false;
}

function dateExists(dayVal, monthVal, yearVal) {
    console.log(dayVal);

    if(!(dayVal === 29 && monthVal === 2)) {
        console.log("Not ")
        let valid = false;
        Object.entries(monthLength).forEach(key => {
            if(monthLength[key[0]].includes(monthVal) && dayVal <= key[0]){
                valid = true;
            }
        })
        if(valid) {return true} 
    }

    if(dayVal === 29 && monthVal === 2 && yearVal % 4 === 0) {
        console.log("Leap year")
        return true;
    }
    
    error(day, dayLabel, dayError, message="Must be a valid date");
    error(month, monthLabel, monthError, message="");
    error(year, yearLabel, yearError, message="");

    return false;
}

function error(input, label, error, message="This field is required") {
    input.classList.add('active-error-input');
    label.classList.add('active-error-text');
    error.innerHTML = message;
    error.style.display = 'block';
}

function notError(input, label, error) {
    input.classList.remove('active-error-input');
    label.classList.remove('active-error-text');
    error.innerHTML = "";
    error.style.display = 'none';
}

function calculateGap(dayVal, monthVal, yearVal) {
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

        for(let i = monthVal + 1; i <= 12; i++) {
            Object.keys(monthLength).forEach(key => {
                if(monthLength[key].includes(i)) {
                    birthYearLength += +key;
                }
            })
        }
        birthYearLength += (birthMonthLength - dayVal);

        deltaDay = birthYearLength + currentYearLength;

        if(deltaYear > 1) {
            for(let i = yearVal + 1; i < currentYear; i++) {
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

    console.log(ageMonth);
    let monthsLeft = Math.trunc(ageMonth/31);
    console.log(monthsLeft);
    let countStart = monthVal;

    let monthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    monthList[1] = (yearVal % 4 === 0) ? 29 : 28; 

    for(let i = yearVal; i <= currentYear; i++) {
        if(i % 4 === 0) {ageMonth--;}
    }

    ageDay = ageMonth;
    ageMonth = monthsLeft;

    for(let i = 0; i < monthsLeft; i++) {
        if(countStart > 11) {
            countStart = 0;
            console.log("count reset")
        }

        console.log(ageDay, "CountStart:", countStart);
        ageDay -= monthList[countStart];

        countStart++;
    }


    console.log(`Year: ${ageYear}\nMonth: ${ageMonth}\nDay: ${ageDay}`);   
    return [ageYear, ageMonth, ageDay]; 
}

function setGap(gapArray) {
    yearText.innerHTML = (gapArray[0] >= 10) ? gapArray[0] : ("0" + gapArray[0]);
    monthText.innerHTML = (gapArray[1] >= 10) ? gapArray[1] : ("0" + gapArray[1]);
    dayText.innerHTML = (gapArray[2] >= 10) ? gapArray[2] : ("0" + gapArray[2]);

}