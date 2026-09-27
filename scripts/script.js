

// function shortcut that returns document.getElementById
function $(id)
{
    return document.getElementById(id)
}

// gets all elements with the class name "expand-button"
var expand_buttons = document.getElementsByClassName("expand-button")


// animation for collapsible sections
for (i = 0; i < expand_buttons.length; i++)
	{
		// Add click event listeners to each button that shows each section
		expand_buttons[i].addEventListener("click", function() {
    	this.classList.toggle("active"); // keeps hover styling when the section is clicked
    	var content = this.nextElementSibling; //gets next div containing the content for that tool
		var img = document.querySelectorAll(".image_adjust") //get all images that need to adjust the max height of their section when they load
		var click_btns = document.querySelectorAll(".click") //getting all buttons with class click
    	if (content.style.maxHeight) //when maxHeight exists (i.e the content is shown)
		{
			content.style.maxHeight = null; //set maxHeight to null so that the content is collapsed and hidden
		}
		else //when button is clicked to show content
		{
			content.style.maxHeight = content.scrollHeight + "px"; // set the maxHeight of the content to its scroll height
		}
		for (j = 0; j < img.length; j++) //when images load they update the scrollheight 			
		{
			img[j].onload = function(){
				content.style.maxHeight = content.scrollHeight + "px"
			}
		}
		for (j = 0; j < click_btns.length; j++) //certain buttons update the scrollheight
		{
			click_btns[j].onclick = function(){
				content.style.maxHeight = content.scrollHeight + "px"
			}
		}
		
	});
}

// events for each button or input
window.onload = function(){
    $("submitDate").onclick = function(){
        calculateDay()
		$("dayCalculator").style.maxHeight = $("dayCalculator").scrollHeight + "px"
    }

	$("left_currency").onchange = function(){
		convertCurrency($("currency_1").value, $("currency_2").value, "left_currency", "right_currency")
	}
	$("right_currency").onchange = function(){
		convertCurrency($("currency_2").value, $("currency_1").value, "right_currency", "left_currency")
	}
	
	$("currency_1").onchange = function() {
		convertCurrency($("currency_1").value, $("currency_2").value, "left_currency", "right_currency")
		changeCurrencyImage($("currency_1").value, "left_currency")
	}

	$("currency_2").onchange = function() {
		convertCurrency($("currency_2").value, $("currency_1").value, "right_currency", "left_currency")
		changeCurrencyImage($("currency_2").value, "right_currency")
	}

	$("left_currency").oninput = function(){
		convertCurrency($("currency_1").value, $("currency_2").value, "left_currency", "right_currency")
	}
	$("right_currency").oninput = function(){
		convertCurrency($("currency_2").value, $("currency_1").value, "right_currency", "left_currency")
	}
	
	$("start_btn").onclick = function(){
        StartTimer()
    }
    $("stop_btn").onclick = function(){
        StopTimer()
    }

	$("measurement_categories").onchange = function(){
		showConverter($("measurement_categories").value)
		$("measurementConvertor").style.maxHeight = $("measurementConvertor").scrollHeight + "px"
	}

	$("length_input_1").oninput = function(){
		convertLength($("length_1").value, $("length_2").value)
	}

	$("temperature_input_1").oninput = function(){
		convertTemperature($("temperature_1").value, $("temperature_2").value)
	}

	$("time_input_1").oninput = function(){
		convertTime($("time_1").value, $("time_2").value)
	}

	$("swap_length").onclick = function(){
		swapUnits('length_1', 'length_2')
	}

	$("swap_time").onclick = function(){
		swapUnits('time_1', 'time_2')
	}

	$("swap_temperature").onclick = function(){
		swapUnits('temperature_1', 'temperature_2')
	}

	$("dark_mode").onclick = function()
	{
		toggleDarkMode()
	}
}


// function toggles dark mode and styles the page accordingly
function toggleDarkMode()
{
	//get all elements that styles need to change when dark mode is enabled
	let darkModeClasses = document.getElementsByClassName("dark-mode")
	// get all input elements to change background color
	let darkModeInputClasses = document.getElementsByClassName("dark-mode-inputs")

	// enable dark mode
	if ($("dark_mode").checked) 
	{
		//change body colour
		$("body").classList.remove("w3-light-grey") 
		$("body").classList.add("w3-black")

		// change the background colour of all sections to dark mode 
		for (i = 0; i < darkModeClasses.length; i++)
		{
			darkModeClasses[i].classList.remove("w3-white")
			darkModeClasses[i].style.backgroundColor = "rgb(82,82,82)"
		}
		// change the background colour of the input elements to light grey
		for (i = 0; i <darkModeInputClasses.length; i++)
		{
			darkModeInputClasses[i].style.backgroundColor = "rgb(168, 168, 168)"
			darkModeInputClasses[i].style.color = "white"
		}
	}
	// dark mode disabled
	else
	{
		// change body colour to light grey
		$("body").classList.remove("w3-black")
		$("body").classList.add("w3-light-grey")
		//change the sections input boxes back to white
		for (i = 0; i < darkModeClasses.length; i++)
		{
			darkModeClasses[i].classList.add("w3-white")
			darkModeClasses[i].style.backgroundColor = ""
		}
		for (i = 0; i <darkModeInputClasses.length; i++)
		{
			darkModeInputClasses[i].style.backgroundColor = ""
			darkModeInputClasses[i].style.color = ""
		}
	}
}

// function calculates the day that a given date fell on, draws a calendar of that month and modifies the elements to display the result
function calculateDay(){
	// gets input values
    let year = parseInt($("year_input").value)
    let month = parseInt($("month_input").value)
    let day = parseInt($("day_input").value)
	// validate inputs
	if (!validateDate(day, month, year))
	{
		return alert("Invalid Date Entered")
	}
	// getting time from current date and chosen date to determine whether the chosen date is
	// in the future or in the past
	const CURRENT_DATE = new Date();
	const CHOSEN_DATE = new Date(year, month-1, day) //months have an index of 0-11

	// calculate time since/to chosen date
	fromCurrentDate(CURRENT_DATE, CHOSEN_DATE)
	// update the text to past or future tense
	if (CHOSEN_DATE.getTime() < CURRENT_DATE.getTime())
	{
		$("tense").innerText = "fell"
	}
	else
	{
		$("tense").innerText = "will fall"
	}
	//check inputs in console
    console.log(day)
    console.log(month)
    console.log(year)
    
	// get the weekday a date falls on
    let calculatedDay = doomsdayAlgorithm(day, month, year)
	// update spans
    $("chosen_date").innerText = day
	$("chosen_month").innerText = getMonthName(month)
	$("chosen_year").innerText = year
	$("fall_date").innerText = calculatedDay
	// create title for month calendar and show result text
	$("month_calendar").innerText = getMonthName(month)+" "+year
	$("result_date_text").classList.remove("hidden")
}

// this function validates the inputs the user entered for day, month, year
function validateDate(day, month, year)
{
	// if day falls outside possible bounds
	if (day < 1 || day > 31 || isNaN(day))
	{
		return false
	}
	// if month is not between 1 and 12
	else if (month < 1 || month > 12 || isNaN(month))
	{
		return false
	}
	// the day calculation is limited to dates from 1800 to 2199
	else if (year < 1800 || year >= 2200 || isNaN(year))
	{
		return false
	}
	// check if day is greater than 30 in months that only have 30 days
	else if (day > 30 && (month == 4 || month == 6 || month == 9 || month == 11))
	{
		return false
	}
	// check february and leap years
	else if (month == 2)
	{
		// if year is leap year
		if ((year % 4 == 0 && !(year % 100 == 0)) || year % 400 == 0)
		{
			// day is greater than 29?
			if (day > 29)
			{
				return false
			}
			else
			{
				return true
			}
		}
		else
		{
			// day greater than 28?
			if (day > 28)
			{
				return false
			}
			else
			{
				return true
			}
		}
	}
	// date is valid
	else
	{
		return true
	}
	
}


// function that calculates the day a date falls on according to the doomsday algorithm developed by John Conway in 1970
// algorithm instructions can be found at https://www.timeanddate.com/date/doomsday-weekday.html
function doomsdayAlgorithm(day, month, year)
{
    let yearAnchorDay = 0
    if (year >= 1800 && year < 1900) // 0 = Sunday; 1 = Monday; 2 = Tuesday; ... 6 = Saturday for variable yearAnchorDay
		{
			yearAnchorDay = 5;
		}
		else if (year >= 1900 && year < 2000)
		{
			yearAnchorDay = 3;
		}
		else if (year >= 2000 && year < 2100)
		{
			yearAnchorDay = 2;
		}
		else if (year >= 2100 && year < 2200)
		{
			yearAnchorDay = 0;
		}
        else
		{
			console.log("Year falls out of valid range");
		}

        let yearNumber = year%100;   //Finding the year within a century e.g 78 for 1978
		let divideTwelveWhole = Math.floor(yearNumber / 12);   //Finding how many times 12 divides wholly into the yearNumber
		let divideTwelveRemainder = yearNumber % 12;  //Finding the remainder
		let divideFourRemainder = Math.floor(divideTwelveRemainder / 4);  //Finding how many times 4 goes into the remainder
		let additionResult = yearAnchorDay + divideTwelveWhole + divideTwelveRemainder + divideFourRemainder;  //Adding the yearAnchorDay to the preceding calculations

        additionResult %= 7;   //finds the number of the year's doomsday.
		let yearDoomsDay = additionResult;  //e.g 2026's doomsday is 6 (Saturday)
        let monthAnchor = -1;     //finding month's anchor date
		switch (month)
		{
		case 1:
			if ((year % 4 == 0 && !(year % 100 == 0)) || year % 400 == 0)  //January and February's anchor date changes depending on if the year is a leap year.
			{
				monthAnchor = 4;  //Jan 4 on leap year
			}
			else
			{
				monthAnchor = 3; //Jan 3 on non-leap year
			}
			break;
		case 2:
			if ((year % 4 == 0 && !(year % 100 == 0)) || year % 400 == 0) //if year was a leap year
			{
				monthAnchor = 29;
			}
			else
			{
				monthAnchor = 28;
			}
			break;
		case 3:
			monthAnchor = 7;
			break;
		case 4:
			monthAnchor = 4;
			break;
		case 5:
			monthAnchor = 9;
			break;
		case 6:
			monthAnchor = 6;
			break;
		case 7:
			monthAnchor = 11;
			break;
		case 8:
			monthAnchor = 8;
			break;
		case 9:
			monthAnchor = 5;
			break;
		case 10:
			monthAnchor = 10;
			break;
		case 11:
			monthAnchor = 7;
			break;
		case 12:
			monthAnchor = 12;
			break;
		default:
			console.log("The month you entered was not between 1 and 12!");
			break;
		}

        let dayReturn;

        let differenceDates = day - monthAnchor;  //Finds difference between the month anchor and the target date
		let weekday = ((differenceDates % 7) + yearDoomsDay) % 7;    // finds the weekday (the modulo operator is used twice in case the weekday number is above 7 when yearDoomsDay is added
		if (weekday < 0)
		{
			weekday += 7;  //In case the difference was negative and the weekday variable was assigned a negative value. If weekday was -1, it would be a saturday (-1 + 7 = 6 = Saturday).
		}

		// draws calendar of the month of the chosen date
		drawCalendar(weekday, day, month, year)
        switch (weekday)
		{
		case 0:
			dayReturn = "Sunday";
			break;
		case 1:
			dayReturn = "Monday";
			break;
		case 2:
			dayReturn = "Tuesday";
			break;
		case 3:
			dayReturn = "Wednesday";
			break;
		case 4:
			dayReturn = "Thursday";
			break;
		case 5:
			dayReturn = "Friday";
			break;
		case 6:
			dayReturn = "Saturday";
			break;
		default:
			dayReturn = "There is some error in the code...";
			break;
		}
        return dayReturn
}

//draws the calendar of the month of a given date using the date and weekday
function drawCalendar(weekday, day, month, year)
{
	//storing original day value
	let originalDay = day
	// clear calendar if already exists on page
	$("date_table").innerHTML = ""
	// create arrays for each week row of the calendar
	let daysRow = ["M", "T", "W", "T", "F", "S", "S"]
	let week1 = [0,0,0,0,0,0,0]
	let week2 = [0,0,0,0,0,0,0]
	let week3 = [0,0,0,0,0,0,0]
	let week4 = [0,0,0,0,0,0,0]
	let week5 = [0,0,0,0,0,0,0]
	let week6 = [0,0,0,0,0,0,0]

	// The value of weekday found by the doomsday algorithm has 0 represent Sunday. The calendar weeks start on Monday,
	// which is the 0 position of each week array. Therefore the weekday must be subtracted by 1 so that 0 represents Monday  
	weekday-=1
	if (weekday < 0)
	{
		weekday += 7
	}
	
	//find the date of Monday of the same week as the input day
	day -= weekday

	// find month length
	if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
	{
		monthLength = 31
	}
	else if (month == 4 || month == 6 || month == 9 || month == 11)
	{
		monthLength = 30
	}
	else
	{
		if ((year % 4 == 0 && !(year % 100 == 0)) || year % 400 == 0)
		{
			monthLength = 29
		}
		else
		{
			monthLength = 28
		}
	}

	// find the date of Monday in the last week shown on the Calendar (may be in the next month)
	if (day < 30)
	{
		while (day < monthLength)
		{
			day+=7
			if (day == 30)
			{
				break;
			}
		}
	}
	
	
	// The value of day represents the day in the last week row of the calendar at each index
	// so that if day = 38, the date of Monday in the last week row is the 7th of the next month, so that
	// day - 7 (Monday week5) is the 31st of the selected month, day - 14 is the 24th, until day - 35 represents the 
	// days for week 1.

	// fill in the week arrays simultaneously
	for (i = 0; i < 7; i++)
	{
		// if the day is greater than the month length (day falls in the next month)
		if (day > monthLength)
		{
			week6[i] = day - monthLength //e.g day = 38, week6[i] would equal 7 if month had 31 days 
		}
		else // day falls in month length
		{
			week6[i] = day
		}
		// fill in first week
		if (day-35 < 1)
		{
			// if the value for day in the first week is negative, the day falls in the previous month, which means
			// the length of the previous month should be added to give the day it falls on

			// if the selected month's previous month has 31 days
			if (month == 8 || month == 1 || month == 2 || month == 4 || month == 6 || month == 9 || month == 11)
			{
				week1[i] = day-4 //-35+31 = -4
				day-28 < 1 ? week2[i] = day - 28 + 31 : week2[i] = day - 28  
			}
			// the previous month is february
			else if (month == 3)
			{
				if ((year % 4 == 0 && !(year % 100 == 0)) || year % 400 == 0)
				{
					week1[i] = day - 35 + 29
					day-28 < 1 ? week2[i] = day -28 + 29 : week2[i] = day - 28
				}
				else
				{
					week1[i] = day - 35 + 28
					day-28 < 1 ? week2[i] = day : week2[i] = day - 28
				}
			}
			// previous month has 30 days
			else
			{
				week1[i] = day - 5
				day-28 < 1 ? week2[i] = day - 28 + 30 : week2[i] = day - 28
			}
		}
		// the day falls in the same month
		else
		{
			week1[i] = day - 35
		}

		// fill in weeks 2-5, dealing with cases when the day falls in the next or previous month
		day-7 > monthLength ? week5[i] = day - 7 - monthLength: week5[i] = day - 7
		week4[i] = day - 14
		week3[i] = day - 21
		if (day-28 > 1)
		{
			week2[i] = day - 28
		}
		//increment the day so that the next index is filled in the next interation
		day++
	}
	// create table rows for each week along with the names of the weekdays
	let week1Row = document.createElement("tr")
	let week2Row = document.createElement("tr")
	let week3Row = document.createElement("tr")
	let week4Row = document.createElement("tr")
	let week5Row = document.createElement("tr")
	let week6Row = document.createElement("tr")
	let dayRow = document.createElement("tr")
	// style the day row
	dayRow.classList.add("w3-green")
	for (i = 0; i < 7; i++)
	{
		//create table data elements for each element in the week rows
		let dayRowElement = document.createElement("th")
		let week1Element = document.createElement("td")
		let week2Element = document.createElement("td")
		let week3Element = document.createElement("td")
		let week4Element = document.createElement("td")
		let week5Element = document.createElement("td")
		let week6Element = document.createElement("td")
		//store the date in each table data
		dayRowElement.innerHTML = daysRow[i]
		week1Element.innerHTML = week1[i]
		week2Element.innerHTML = week2[i]
		week3Element.innerHTML = week3[i]
		week4Element.innerHTML = week4[i]
		week5Element.innerHTML = week5[i]
		week6Element.innerHTML = week6[i]

		// Highlight the chosen day in blue on the calendar
		if (week1[i] == originalDay) {week1Element.classList.add("w3-blue")}
		if (week2[i] == originalDay) {week2Element.classList.add("w3-blue")}
		if (week3[i] == originalDay) {week3Element.classList.add("w3-blue")}
		if (week4[i] == originalDay) {week4Element.classList.add("w3-blue")}
		if (week5[i] == originalDay) {week5Element.classList.add("w3-blue")}
		if (week6[i] == originalDay) {week6Element.classList.add("w3-blue")}

		// Style the days that fall in the previous or next month in grey 
		if (week1[i] > 7)
		{
			week1Element.classList.add("w3-grey")
		}
		if (week2[i] > 14)
		{
			week2Element.classList.add("w3-grey")
		}
		if (week5[i] < 14)
		{
			week5Element.classList.add("w3-grey")
		}
		if (week6[i] < 14)
		{
			week6Element.classList.add("w3-grey")
		}

		// add each element to their week row
		dayRow.appendChild(dayRowElement)
		week1Row.appendChild(week1Element)
		week2Row.appendChild(week2Element)
		week3Row.appendChild(week3Element)
		week4Row.appendChild(week4Element)
		week5Row.appendChild(week5Element)
		week6Row.appendChild(week6Element)
	}
	// append the rows to the calendar table to complete the drawing of the calendar
	$("date_table").appendChild(dayRow)
	$("date_table").appendChild(week1Row)
	$("date_table").appendChild(week2Row)
	$("date_table").appendChild(week3Row)
	$("date_table").appendChild(week4Row)
	$("date_table").appendChild(week5Row)
	$("date_table").appendChild(week6Row)



}

// finds the years, months, and days since or to the chosen date from the current date
function fromCurrentDate(CURRENT_DATE, CHOSEN_DATE)
{
	// create variables to store the days, months and years of the former month and the latter month (the date that comes later between the two)
	let latter_year, latter_month, latter_day, former_year, former_month, former_day, pastDate

	// chosen date falls before current date
	if (CHOSEN_DATE.getTime() < CURRENT_DATE.getTime())
	{
		latter_year = CURRENT_DATE.getYear()
		latter_month = CURRENT_DATE.getMonth()+1
		latter_day = CURRENT_DATE.getDate()
		former_year = CHOSEN_DATE.getYear()
		former_month = CHOSEN_DATE.getMonth()+1
		former_day = CHOSEN_DATE.getDate()
		pastDate = true
	}
	// current date falls before chosen date
	else
	{
		latter_year = CHOSEN_DATE.getYear()
		latter_month = CHOSEN_DATE.getMonth()+1
		latter_day = CHOSEN_DATE.getDate()
		former_year = CURRENT_DATE.getYear()
		former_month = CURRENT_DATE.getMonth()+1
		former_day = CURRENT_DATE.getDate()
		pastDate = false
	}
	// find the differences of year, month and day
	let yearDifference = latter_year - former_year
	let monthDifference = latter_month - former_month
	let dayDifference = latter_day - former_day
	// if difference is less than 0, add the previous month's length and subtract the month difference to account for this
	if (dayDifference < 0)
	{
		if (latter_month == 1 || latter_month == 2 || latter_month == 4 || latter_month == 6 || latter_month == 8 || latter_month == 9 || latter_month == 11)
		{
			dayDifference += 31
		}
		else if (latter_month == 5 || latter_month == 7 || latter_month == 10 || latter_month == 12)
		{
			dayDifference += 30
		}
		else if (latter_month == 3)
		{
			if ((latter_year % 4 == 0 && !(latter_year % 100 == 0)) || latter_year % 400 == 0)
			{
				dayDifference += 29
			}
			else
			{
				dayDifference += 28
			}
		}
		monthDifference-=1
	}
	// add 12 to month and subtract a year to account if the month difference is less than 0
	if (monthDifference < 0)
	{
		monthDifference+=12
		yearDifference-=1
	}
	// show the time since/until the chosen date
	$("date_tense").innerText = (pastDate ? "was " : "is ") + (yearDifference == 0 ? "" : yearDifference + " year(s), ") + (monthDifference == 0 ? "" : monthDifference + " month(s), ")+ (yearDifference == 0 && monthDifference == 0 ? "" : "and ") + dayDifference + " day(s) "+ (pastDate ? "ago" : "from now")
	$("days_ago_text").classList.remove("hidden")
}

// returns the month name of 1-12 (Jan-Dec)
function getMonthName(month)
{
	switch(month)
	{
		case 1:
			monthName = "January";
			break;
		case 2:
			monthName = "February";
			break;
		case 3:
			monthName = "March";
			break;
		case 4:
			monthName = "April";
			break;
		case 5:
			monthName = "May";
			break;
		case 6:
			monthName = "June";
			break;
		case 7:
			monthName = "July";
			break;
		case 8:
			monthName = "August";
			break;
		case 9:
			monthName = "September";
			break;
		case 10:
			monthName = "October";
			break;
		case 11:
			monthName = "November";
			break;
		case 12:
			monthName = "December";
			break;
		default:
			monthName = "NotAMonth";
			break;
	}
	return monthName
}

// CURRENCY CONVERTOR FUNCTIONS

// Importing JSON data from API
fetch(`https://cdn.moneyconvert.net/api/latest.json`)
.then(response => response.json())
.then(data => processCurrencyData(data))
.catch(error => console.log(error))

// stores the conversion rate between usd to that currency
let dollar_rate, pound_rate, euro_rate, yen_rate, australian_rate

// initialise the currency rate variables
function processCurrencyData(data)
{
	console.log(data)
	dollar_rate = data.rates.USD
	pound_rate = data.rates.GBP
	euro_rate = data.rates.EUR
	yen_rate = data.rates.JPY
	australian_rate = data.rates.AUD
}

// converts the currency value of one currency to another 
function convertCurrency(currency_one, currency_two, entry_box, result_box)
{
	// find the rate of the input currency
	let rate_one, rate_two
	if (currency_one == "usd")
	{
		rate_one = dollar_rate
		$(entry_box +"_unit").innerText = "$"
	}
	else if (currency_one == "gbp")
	{
		rate_one = pound_rate
		$(entry_box +"_unit").innerText = "£"
	}
	else if (currency_one == "eur")
	{
		rate_one = euro_rate
		$(entry_box +"_unit").innerText = "€"
	}
	else if (currency_one == "jpy")
	{
		rate_one = yen_rate
		$(entry_box +"_unit").innerText = "¥"
	}
	else if (currency_one == "aud")
	{
		rate_one = australian_rate
		$(entry_box +"_unit").innerText = "A$"
	}

	// finds rate of output currency
	if (currency_two == "usd")
	{
		rate_two = dollar_rate
		$(result_box +"_unit").innerText = "$"
	}
	else if (currency_two == "gbp")
	{
		rate_two = pound_rate
		$(result_box +"_unit").innerText = "£"
	}
	else if (currency_two == "eur")
	{
		rate_two = euro_rate
		$(result_box +"_unit").innerText = "€"
	}
	else if (currency_two == "jpy")
	{
		rate_two = yen_rate
		$(result_box +"_unit").innerText = "¥"
	}
	else if (currency_two == "aud")
	{
		rate_two = australian_rate
		$(result_box +"_unit").innerText = "A$"
	}

	// The conversion is done by converting the selected input currency to usd, and then multiply that by the conversion rate of the second currency
	$(result_box).value = ($(entry_box).value * (1/rate_one) * rate_two).toFixed(2)
	// show result
	$("left_currency_input").innerText = (parseFloat(($("left_currency").value))).toFixed(2)
	$("right_currency_input").innerText = (parseFloat($("right_currency").value)).toFixed(2)
	$("exchange_display").classList.remove("hidden")
	
}

// changes the image of the currency banknote and label shown when a new currency is selected
function changeCurrencyImage(currency, direction_id)
{
	if (currency == "usd")
	{
		$(direction_id + "_image").src = "images/usdollar.jpg"
		$(direction_id + "_label").innerText = "Dollars"
	}
	else if (currency == "gbp")
	{
		$(direction_id + "_image").src = "images/british_pound.jpg"
		$(direction_id + "_label").innerText = "Pounds"
	}
	else if (currency == "eur")
	{
		$(direction_id + "_image").src = "images/euro.jpg"
		$(direction_id + "_label").innerText = "Euro"
	}
	else if (currency == "jpy")
	{
		$(direction_id + "_image").src = "images/yen.jpg"
		$(direction_id + "_label").innerText = "Yen"
	}
	else if (currency == "aud")
	{
		$(direction_id + "_image").src = "images/australian_dollar.jpg"
		$(direction_id + "_label").innerText = "Dollars"
	}
	$("exchange_display").classList.add("hidden")
}

// MEASUREMENT CONVERTOR FUNCTIONS

// shows the seleted category converter input boxes
function showConverter(category)
{
	clearConverters()
	$("length").classList.add("hidden")
	$("temperature").classList.add("hidden")
	$("time").classList.add("hidden")
	$(category).classList.remove("hidden")
}

// Length rates
const METRE_RATE = 1
const MILLIMETRE_RATE = 0.001
const CENTIMETRE_RATE = 0.01
const KILOMETRE_RATE = 1000
const MILE_RATE = 1609
const FEET_RATE = 0.3048
const LIGHTYEAR_RATE = 9.461e+15

// converts the length from unit 1 to unit 2
function convertLength(unit_1, unit_2)
{
	let rate_one, rate_two
	//finding rate 1
	if (unit_1 == "millimetres")
	{
		rate_one = MILLIMETRE_RATE
	}
	else if (unit_1 == "centimetres")
	{
		rate_one = CENTIMETRE_RATE
	}
	else if (unit_1 == "metres")
	{
		rate_one = METRE_RATE
	}
	else if (unit_1 == "kilometres")
	{
		rate_one = KILOMETRE_RATE
	}
	else if (unit_1 == "miles")
	{
		rate_one = MILE_RATE
	}
	else if (unit_1 == "feet")
	{
		rate_one = FEET_RATE
	}
	else if (unit_1 == "lightyears")
	{
		rate_one = LIGHTYEAR_RATE
	}

	// finding rate 2
	if (unit_2 == "millimetres")
	{
		rate_two = MILLIMETRE_RATE
	}
	else if (unit_2 == "centimetres")
	{
		rate_two = CENTIMETRE_RATE
	}
	else if (unit_2 == "metres")
	{
		rate_two = METRE_RATE
	}
	else if (unit_2 == "kilometres")
	{
		rate_two = KILOMETRE_RATE
	}
	else if (unit_2 == "miles")
	{
		rate_two = MILE_RATE
	}
	else if (unit_2 == "feet")
	{
		rate_two = FEET_RATE
	}
	else if (unit_2 == "lightyears")
	{
		rate_two = LIGHTYEAR_RATE
	}
	// converts the value into metres then from metres into selected unit
	$("length_input_2").value = ($("length_input_1").value * rate_one * (1/rate_two)).toFixed(2)
}

// converts temperature from one unit to another
function convertTemperature(unit_1, unit_2)
{
	let input_temperature = $("temperature_input_1").value
	// validates that celsius does not fall below absolute zero
	if (unit_1 == "celsius" && input_temperature < -273.15)
	{
		alert("Temperature cannot be below absolute zero.")
		$("temperature_input_1").value = -273.15
		input_temperature = -273.15
	}
	// validates kelvin does not fall below absolute zero
	else if (unit_1 == "kelvin" && input_temperature < 0)
	{
		alert("Temperature cannot be below absolute zero.")
		$("temperature_input_1").value = 0 
		input_temperature = 0
	}
	// validates that fahrenheit does not fall below absolute zero
	else if (unit_1 == "fahrenheit" && input_temperature < -459.67)
	{
		alert("Temperature cannot be below absolute zero.")
		$("temperature_input_1").value = -459.67
		input_temperature = -459.67
	}
	let input_in_celsius

	// converts unit into celsius
	if (unit_1 == "fahrenheit")
	{
		input_in_celsius = (input_temperature-32)*(5/9)
	}
	else if (unit_1 == "kelvin")
	{
		input_in_celsius = input_temperature-273.15
	}
	else if (unit_1 == "celsius")
	{
		input_in_celsius = input_temperature
	}

	// converts from celsius into the selected output unit
	if (unit_2 == "celsius")
	{
		$("temperature_input_2").value = input_in_celsius
	}
	else if (unit_2 == "fahrenheit")
	{
		$("temperature_input_2").value = (input_in_celsius*(9/5))+32
	}
	else if (unit_2 == "kelvin")
	{
		$("temperature_input_2").value = input_in_celsius + 273.15
	}
}

// Time rates
const SECONDS_RATE = 1
const MILLISECONDS_RATE = 0.001
const MINUTES_RATE = 60
const HOURS_RATE = 3600
const DAYS_RATE = 86400
const WEEKS_RATE = 604800
const MONTHS_RATE = 2628288
const YEARS_RATE = 31536000

// Converts time from unit to another
function convertTime(unit_1, unit_2)
{
	let rate_one, rate_two

	// find input rate
	if (unit_1 == "milliseconds")
	{
		rate_one = MILLISECONDS_RATE
	}
	else if (unit_1 == "seconds")
	{
		rate_one = SECONDS_RATE
	}
	else if (unit_1 == "minutes")
	{
		rate_one = MINUTES_RATE
	}
	else if (unit_1 == "hours")
	{
		rate_one = HOURS_RATE
	}
	else if (unit_1 == "days")
	{
		rate_one = DAYS_RATE
	}
	else if (unit_1 == "weeks")
	{
		rate_one = WEEKS_RATE
	}
	else if (unit_1 == "months")
	{
		rate_one = MONTHS_RATE
	}
	else if (unit_1 == "years")
	{
		rate_one = YEARS_RATE
	}

	// find unit 2
	if (unit_2 == "milliseconds")
	{
		rate_two = MILLISECONDS_RATE
	}
	else if (unit_2 == "seconds")
	{
		rate_two = SECONDS_RATE
	}
	else if (unit_2 == "minutes")
	{
		rate_two = MINUTES_RATE
	}
	else if (unit_2 == "hours")
	{
		rate_two = HOURS_RATE
	}
	else if (unit_2 == "days")
	{
		rate_two = DAYS_RATE
	}
	else if (unit_2 == "weeks")
	{
		rate_two = WEEKS_RATE
	}
	else if (unit_2 == "months")
	{
		rate_two = MONTHS_RATE
	}
	else if (unit_2 == "years")
	{
		rate_two = YEARS_RATE
	}

	// convert input unit to seconds and then from seconds to output unit
	$("time_input_2").value = ($("time_input_1").value * rate_one * (1/rate_two)).toFixed(2)
}

// clears convertor when another category is selected
function clearConverters()
{
	$("temperature_input_1").value = 0
	$("length_input_1").value = 0
	$("time_input_1").value = 0
}

// swaps the input unit and output unit
function swapUnits(unit_1, unit_2)
{
	let temp = $(unit_1).value
	$(unit_1).value = $(unit_2).value
	$(unit_2).value = temp 
}

// TIMER FUNCTIONS
let elapsed_time = 0
let total_time = 0
let seconds = 0
let minutes = 0
let display_total_time = 0

let display_minutes = 0
let display_seconds = 0
let newInput = false
let intervalID

function StartTimer() {
    //calculate the total amount of seconds of the timer
    
    //get user input 
    minutes = parseInt($("minutes").value)
    seconds = parseInt($("seconds").value)
	// check if new input
    if (total_time != (minutes*60)+seconds)
    {
        newInput = true
    }
	// calculate total time
    total_time = (minutes * 60) + seconds
	// stops a timer starting at 0
	if (total_time == 0)
	{
		return alert("Error: Cannot start a timer of 0 seconds")
	}
	// change active state of buttons
	$("stop_btn").disabled = false
    $("start_btn").disabled = true
    //create a setInterval for ShowTime
    intervalID = setInterval(ShowTime, 1000)
}

// Stops the timer
function StopTimer() {
    $("start_btn").disabled = false
    $("stop_btn").disabled = true
    intervalID = clearInterval(intervalID)
}

// finds the percentage of the progress bar that has been filled
function normalise(max_x, x) {
    console.log(`${total_time} - ${elapsed_time} -> ${Math.ceil((x / max_x) * 100)}`)

    return Math.ceil((x / max_x) * 100);
}

// this function gets called every second and shows the time
function ShowTime() {
    if (newInput)
    {
        elapsed_time = 0
        newInput = false
    }
    //add one second to the elapsed time
    elapsed_time = elapsed_time + 1
    display_total_time = total_time - elapsed_time
	// find percentage of progress bar
	let progressPercentage = normalise(total_time, elapsed_time)
	// change width of progress bar
	$("progress-bar").style.width = progressPercentage + "%"

	// change colour of progress bar as it progresses from green to red
	$("progress-bar").style.backgroundColor = "rgb("+(progressPercentage <= 50 ? 5.1*progressPercentage: 255)+", "+ (progressPercentage > 50 ? (255 - 5.1*(progressPercentage-50)): 255) +", 0)"
    if (elapsed_time == total_time) {
        // stop and reset timer
        StopTimer()
		resetTimer()
    }

    //display the number of minutes and seconds left
    display_seconds = display_total_time%60
    display_minutes = Math.floor(display_total_time/60)
    display_minutes = display_minutes.toString()
	// add 0 if seconds is less than 10
    if (display_seconds < 10)
    {
        display_seconds = display_seconds.toString()
        display_seconds = "0"+display_seconds
    }
    else
    {
        display_seconds = display_seconds.toString()
    }
    $("timerDisplay").innerText = display_minutes+":"+display_seconds
    

}

// resets the timer
function resetTimer()
{
	total_time = 0
	elapsed_time = 0
	seconds = 0
	minutes = 0
	$("minutes").value = 0
	$("seconds").value = 0
}


// ************
// *MAP FUNCTIONS
// ************ 

// import the map from Leaflet and openstreetmap
var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// set variables for lat, long, click marker, markers for selected locations
let latitude = 0 
let longitude = 0
let map_marker = L.marker([0,0])
let location_1_marker = L.marker([0,0])
let location_2_marker = L.marker([0,0])

// When the map is clicked on
map.on('click', function(event){
	
	// remove marker if already on map
	map_marker = map.removeLayer(map_marker)

	// get lat and long of selected point
	latitude = event.latlng.lat
	longitude = event.latlng.lng
	$("latitude").innerText = "Lat: "+latitude
	$("longitude").innerText = "Long: "+longitude

	// put a marker at that location
	map_marker = L.marker([latitude, longitude]).addTo(map)
	
	// fetch the weather data for those coordinates from open meteo
	fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&current=temperature_2m,is_day,cloud_cover,precipitation&timezone=auto&forecast_days=1`)
  	.then(response => response.json())
  	.then(weatherData => processWeatherData(weatherData))
  	.catch(error=> console.log(error))
	
	
})

// weather data variables
let temperature, cloud_cover, precipitation, isDay, current_time, sunrise_time, sunset_time, timezone

// assigns variables from API and creates a forecast
function processWeatherData(weatherData)
{
	$("forecast_card").classList.remove("hidden")
	temperature = weatherData.current.temperature_2m
	precipitation = weatherData.current.precipitation
	cloud_cover = weatherData.current.cloud_cover
	isDay = weatherData.current.is_day == 1 ? true : false;
	current_time = new Date(weatherData.current.time)
	sunrise_time = new Date(weatherData.daily.sunrise[0])
	sunset_time = new Date(weatherData.daily.sunset[0])
	timezone = weatherData.timezone_abbreviation
	createForecast(temperature, cloud_cover, precipitation, isDay, current_time, sunrise_time, sunset_time, timezone)
	$("map_tool").style.maxHeight = $("map_tool").scrollHeight + "px"
}

// fills in forecast card with weather data
function createForecast(temperature, cloud_cover, precipitation, isDay, current_time, sunrise_time, sunset_time, timezone)
{
	// creates strings for the current time, sunrise and sunset times
	let current_time_string = (current_time.getHours() < 10 ? "0" + current_time.getHours() : current_time.getHours()) + ":" + (current_time.getMinutes() < 10 ? "0" + current_time.getMinutes() : current_time.getMinutes())
	let sunrise_time_string = (sunrise_time.getHours() < 10 ? "0" + sunrise_time.getHours() : sunrise_time.getHours()) + ":" + (sunrise_time.getMinutes() < 10 ? "0" + sunrise_time.getMinutes() : sunrise_time.getMinutes())
	let sunset_time_string = (sunset_time.getHours() < 10 ? "0" + sunset_time.getHours() : sunset_time.getHours()) + ":" + (sunset_time.getMinutes() < 10 ? "0" + sunset_time.getMinutes() : sunset_time.getMinutes())
	// select a forecast image based on conditions
	selectForecastImage(isDay, cloud_cover, precipitation)
	// add the data to the card
	$("current_temp").innerText = temperature
	$("cloud_cover").innerText = cloud_cover
	$("precipitation").innerText = precipitation
	$("current_time").innerText = current_time_string + " " + timezone
	$("sunrise_time").innerText = sunrise_time_string + " " + timezone
	$("sunset_time").innerText = sunset_time_string + " " + timezone


}


// selects a forecast image based on the cloud cover, precipitation and whether it is night or day
function selectForecastImage(isDay, cloud_cover, precipitation)
{
	// day weather conditions
	if (isDay)
	{
		// rainy
		if (precipitation > 0.2)
		{
			$("forecast_image").src = "images/rainy_day.png"
		}
		else
		{
			// cloudy
			if (cloud_cover >= 75)
			{
				$("forecast_image").src = "images/cloudy_day.png"
			}
			// partially cloudy
			else if (cloud_cover > 10 && cloud_cover < 75)
			{
				$("forecast_image").src = "images/light_cloud_day.png"
			}
			// sunny
			else
			{
				$("forecast_image").src = "images/sunny.png"
			}
		}
	}
	// same idea for night
	else
	{
		if (precipitation > 0.2)
		{
			$("forecast_image").src = "images/rainy_night.png"
		}
		else
		{
			if (cloud_cover >= 75)
			{
				$("forecast_image").src = "images/cloudy_night.png"
			}
			else if (cloud_cover > 10 && cloud_cover < 75)
			{
				$("forecast_image").src = "images/light_cloud_night.png"
			}
			else
			{
				$("forecast_image").src = "images/clear_night.png"
			}
		}
	}
	// update the height of the map tool section when the weather card is unhidden
}

// distance between two locations
let location_1_latitude = 0
let location_1_longitude = 0
let location_2_latitude = 0
let location_2_longitude = 0
// polygon path
let distance_path = L.polygon([[0,0],[0,0]])

// logs the coordinates of where the map marker is when the user clicks the button
function logCoordinates(button_id)
{
	if (button_id == "location_1")
	{
		// clear existing marker for logged location 
		location_1_marker = map.removeLayer(location_1_marker)
		location_1_latitude = latitude
		location_1_longitude = longitude
		// adds marker and shows coordinates 
		location_1_marker = L.marker([location_1_latitude, location_1_longitude]).addTo(map)
		$(button_id + "_coordinates").innerText = latitude.toFixed(5) + ", " + longitude.toFixed(5)
	}
	else if (button_id == "location_2")
	{
		location_2_marker = map.removeLayer(location_2_marker)
		location_2_latitude = latitude
		location_2_longitude = longitude
		location_2_marker = L.marker([location_2_latitude, location_2_longitude]).addTo(map)
		$(button_id + "_coordinates").innerText = latitude.toFixed(5) + ", " + longitude.toFixed(5)
	}
	else
	{
		console.log("Error! Unknown button id")
	}
}

// Calculates distance between two points on the globe based on the Haversine formula
function calculateDistance(location_1_latitude, location_1_longitude, location_2_latitude, location_2_longitude)
{
	// remove existing distance path
	distance_path = map.removeLayer(distance_path)
	// draw new path
	distance_path = L.polygon([[location_1_latitude, location_1_longitude],[location_2_latitude, location_2_longitude]]).addTo(map)
	
	// convert lat, long angles into radians 
	location_1_latitude = location_1_latitude * (Math.PI / 180)
	location_1_longitude = location_1_longitude * (Math.PI / 180)
	location_2_latitude = location_2_latitude * (Math.PI / 180)
	location_2_longitude = location_2_longitude * (Math.PI / 180)

	// find differeces between lat and long
	let delta_latitude = location_2_latitude - location_1_latitude
	let delta_longitude = location_2_longitude - location_1_longitude

	// radius of earth in km
	const radiusEarth = 6371

	// argument of the arcsin function in the equation
	let arcsin_argument = Math.pow((Math.sin(delta_latitude/2)), 2) + (Math.cos(location_1_latitude) * Math.cos(location_2_latitude) * Math.pow((Math.sin(delta_longitude/2)),2))
	arcsin_argument = Math.sqrt(arcsin_argument)
	// calculate and display distance
	let distance = 2*radiusEarth*Math.asin(arcsin_argument)
	$("calculated_distance").innerText = distance.toFixed(3) + " km"
	$("distance_text").classList.remove("hidden")
	$("map_tool").style.maxHeight = $("map_tool").scrollHeight + "px"
}