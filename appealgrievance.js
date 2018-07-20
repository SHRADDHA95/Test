var isValid = true;
function appealgrievanceDetail() {
	var maintainLineNumber = getMaintainLineNumber();
	alert("maintainLineNumber------" + maintainLineNumber);
	document.forms[0].preAuthLineGA.value = maintainLineNumber;
	alert("preAuthLineGA------" + document.forms[0].preAuthLineGA.value);
	document.forms[0].widget.value = "appealgrievancedetail";
	document.forms[0].submit();
}

function appealgrievanceAdd() {
	alert("call add");
	document.forms[0].widget.value = "appealgrievanceadd";
	document.forms[0].submit();
}

function backAddG_A() {
	document.forms[0].widget.value = "viewappealgrievance";
	document.forms[0].submit();
}
function backView_GA() {
	document.forms[0].selectedIndex.value = "3";
	document.forms[0].widget.value = "viewappealgrievance";
	document.forms[0].submit();
}

// It checks whether input is digit or not
function isDigit(c) {
	return ((c >= "0") && (c <= "9"));
}

// It checks whether input is number or not
function isInteger(s) {
	var i;
	for (i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (!isDigit(c))
			return false;
	}
	return true;
}

function searchValueGA() {

	/* alert(document.getElementById("appealgrievancecomponent")); */
	changedFromDate = document.forms[0].changedFromDate.value;
	changedToDate = document.forms[0].changedToDate.value;
	var ffd = changedFromDate.replace(/\-/g, '');
	var ttd = changedToDate.replace(/\-/g, '');
	if (!isInteger(ffd)) {
		document.getElementById("errorMessage").innerHTML = "Invalid From Date";
		return false;
	}
	if (!isInteger(ttd)) {
		document.getElementById("errorMessage").innerHTML = "Invalid To Date";
		return false;
	}

	futureFromDate(changedFromDate, changedToDate);

	if (!validateFormat(changedFromDate)) {
		/* alert(0); */
		/*
		 * document.getElementById("appealgrievance_body_div").style.display =
		 * 'none';
		 */
		document.getElementById("errorMessage").innerHTML = "Invalid Date Format MM-DD-YYYY";
		return false;
	}
	if (!validateFormat(changedToDate)) {
		document.getElementById("errorMessage").innerHTML = "Invalid Date Format MM-DD-YYYY";
		return false;
	}
	if (!priorDateValid(changedFromDate)) {

		document.getElementById("errorMessage").innerHTML = "Date range cannot be prior to 01-01-2010";
		return false;
	}

	var res = futureFromDate(changedFromDate, changedToDate);
	if (res != "") {
		document.getElementById("errorMessage").innerHTML = futureFromDate(
				changedFromDate, changedToDate);
		return false;
	}

	if (!isDatebetweenOneYear(changedFromDate, changedToDate)) {

		document.getElementById("errorMessage").innerHTML = "Date range should be in between 1 year";
		return false;
	}

	document.getElementById("errorMessage").innerHTML = " ";
	return true;
}

function validateFormat(date) {
	date = date.split('-');
	m = date[0];
	d = date[1];
	y = date[2];
	// check date range
	if (d < 1 || d > 31) {
		return false;
	}
	// check month range
	if (m < 1 || m > 12) {
		return false;
	}
	if (y == "" || y == null) {
		return false;
	}
	if ((m == 4 || m == 6 || m == 9 || m == 11) && d == 31) {
		alert("Month " + month + " doesn't have 31 days!")
		return false;
	}
	if (m == 2) { // check for february 29th
		var isleap = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0));
		if (d > 29 || (d == 29 && !isleap)) {
			/* alert("February " + y + " doesn't have " + d + " days!"); */
			return false;
		}
	}
	return true;
}

// function for calculating date should be after 01-01-2010
function isDatePrior(changedFromDate) {

	changedFromDateNew = changedFromDate.split('-');
	m1 = changedFromDateNew[0];
	d1 = changedFromDateNew[1];
	y1 = changedFromDateNew[2];
	if (y1 > 2010 && m1 >= 1 && d1 >= 1) {
        alert("Date Check !!!!!");
		return false;
	}

	return true;

}

// Calculating date difference between 2 dates should be 1 year
function isDatebetweenOneYear(changedFromDate, changedToDate) {

	changedFromDate = changedFromDate.split('-');
	changedToDate = changedToDate.split('-');

	changedFromDate = new Date(changedFromDate[2], changedFromDate[0],
			changedFromDate[1]);
	changedToDate = new Date(changedToDate[2], changedToDate[0],
			changedToDate[1]);

	var ONE_DAY = 1000 * 60 * 60 * 24;

	var date1_ms = changedFromDate.getTime();
	var date2_ms = changedToDate.getTime();

	// Calculate the difference in milliseconds
	var difference_ms = (date2_ms - date1_ms) / ONE_DAY;

	if (difference_ms > 365) {
		return false;
	}
	return true;
}

// checking future and past date for fromDate and tDate
function futureFromDate(changedFromDate, changedToDate) {

	var fd = new Date(changedFromDate);
	var td = new Date(changedToDate);

	if (fd.getTime() > new Date().getTime()) {
		return "From date must contain current or past date";
	}
	if (td.getTime() > new Date().getTime()) {
		return "To date must contain current or past date";
	}
	if (td.getTime() < fd.getTime()) {
		return "To date cannot be prior to from date";
	}
	return "";
}

// if string is entered instead of digits

/*
 * function checkIsNumeric(changedFromDate,changedToDate){ var numbers =
 * /^[0-9]+$/; if(changedFromDate.match(numbers)) { alert('Your Registration
 * number has accepted....'); return false; } return true; }
 */

function getMaintainLineNumber(componentID) {
	var radioNameGA = "appealgrievance_summary";
	alert("radioNameGA------" + radioNameGA);
	var lineNumber = '0';
	for (i = 0; i < document.forms[0].elements[radioNameGA].length; i++) {
		if (document.forms[0].elements[radioNameGA][i].checked) {
			lineNumber = document.forms[0].elements[radioNameGA][i].value;
			alert("lineNumber------" + lineNumber);
		}
	}
	return lineNumber;
}

function submitAddG_A() {
	clear();
	var validation = true;
	var prescriberNPI = document.getElementById("prescriberNPI").value;
	var requestorName = document.getElementById("requestorName").value;
	var grievanceStartDate = document.getElementById("grievanceStartDate").value;
	var frmtGrievStartDate = grievanceStartDate.replace(/\-/g, '');
	var grievanceEndDate = document.getElementById("grievanceStartEnd").value;
	var frmtGrievEndDate = grievanceEndDate.replace(/\-/g, '');
	var comments = document.getElementById("comments").value;
	var expectedOutcome = document.getElementById("exp_output").value;
	var priorAuth = document.getElementById("priorAuth").value;
	var effectiveDate = document.getElementById("effectiveDate").value;
	var expirationDate = document.getElementById("expirationDate").value;
	var e = document.getElementById("typedropdown");
	var selected_type = e.options[e.selectedIndex].text;
	var griAgainstName = document.getElementById("grienanceAgainst").value;
	var comPref = document.getElementById("comPrefdropdown");
	var selComPref = comPref.options[comPref.selectedIndex].text;
	var griComPref = document.getElementById("grievanceComPrefdropdown");
	var selGriComPref = griComPref.options[griComPref.selectedIndex].text;
	var griAddressone = document.getElementById("addressOne").value;
	var griCity = document.getElementById("grievanceCity").value;
	var griState = document.getElementById("grievancestate").value;
	var griZip = document.getElementById("grievanceZip").value;
	var gaAddressOne = document.getElementById("addressOneGA").value;
	var gaCity = document.getElementById("cityGA").value;
	var gaState = document.getElementById("stateGA").value;
	var gaZip = document.getElementById("zipGA").value;

	if (!isTypeSelected(selected_type)) {
		document.getElementById("typeMessage").innerHTML = "Type must be selected";
		validation = false;
	}

	if (isEmpty(requestorName)) {
		document.getElementById("error_requesterName").innerHTML = "Requestor Name must be entered";
		validation = false;
	}
	if (selComPref.trim() == "Mail") {
		// alert("Inside check Mail gri:" + selGriComPref.trim());

		if (isEmpty(gaAddressOne) && isEmpty(gaCity) && isEmpty(gaState)
				&& isEmpty(gaZip)) {
			// alert("MAil Address is null!!");
			document.getElementById("error_MailGA").innerHTML = "Communication Preference requires a valid Requestor Address.";
			validation = false;
		}
	} else if (selComPref.trim() == "Email") {
		if (isEmpty(document.getElementById("emailGA").value)) {
			document.getElementById("error_emailGA").innerHTML = "Communication Preference requires a Requestor Email Address.";
			validation = false;
		}
	} else if (selComPref.trim() == "Phone") {
		if (isEmpty(document.getElementById("phoneGA").value)) {
			document.getElementById("error_phoneGA").innerHTML = "Communication Preference requires a Requestor Phone Number.";
			validation = false;
		}

	}

	if (selected_type == "Grievance") {

		if (isEmpty(grievanceStartDate)) {
			document.getElementById("error_date").innerHTML = "Grievance Start Date is required";
			validation = false;

		} else if (!isInteger(frmtGrievStartDate)) {
			alert("Inside isInteger date");
			document.getElementById("error_date").innerHTML = "Dates must be in MM-DD-YYYY format";
			validation = false;
		}

		else if (!validateDateFormat(grievanceStartDate)) {
			alert("Inside validate date");
			document.getElementById("error_date").innerHTML = "Dates must be in MM-DD-YYYY format";
			validation = false;
		}

		else if (!isDateValid(grievanceStartDate)) {
			alert("Inside isDateValid");
			document.getElementById("error_date").innerHTML = "Invalid date ";
			validation = false;
		}

		else if (isDatePrior(grievanceStartDate)) {
			alert("Inside prior date valid");
			document.getElementById("error_date").innerHTML = "Dates must be greater than 01-01-2010";
			validation = false;
		}
		// grievanceEndDate
		if (isEmpty(grievanceEndDate)) {

			document.getElementById("error_date_ends").innerHTML = "Grievance End Date is required";
			validation = false;

		} else if (!isInteger(frmtGrievEndDate)) {

			document.getElementById("error_date_ends").innerHTML = "Dates must be in MM-DD-YYYY format";
			validation = false;
		}

		else if (!validateDateFormat(grievanceEndDate)) {

			document.getElementById("error_date_ends").innerHTML = "Dates must be in MM-DD-YYYY format";
			validation = false;
		} else if (!isDateValid(grievanceEndDate)) {

			document.getElementById("error_date_ends").innerHTML = "Invalid date ";
			validation = false;
		}

		else if (isDatePrior(grievanceEndDate)) {
			alert("Inside prior date valid");
			document.getElementById("error_date_ends").innerHTML = "Dates must be greater than 01-01-2010";
			validation = false;
		} else if (isDateLesser(grievanceStartDate, grievanceEndDate)) {

			document.getElementById("error_date_ends").innerHTML = "The Grievance End Date must be equal to or greater than the Grievance Start date";
			validation = false;
		}

		// Date Validations ends here
		if (isEmpty(griAgainstName)) {
			alert("Griveance agaisnt Name is >>>>" + griAgainstName);
			document.getElementById("error_griAgainst").innerHTML = "Grievance Against Name must be entered";
			validation = false;
		}

		if (selGriComPref.trim() == "Mail") {
			if (isEmpty(griAddressone) && isEmpty(griCity) && isEmpty(griState)
					&& isEmpty(griZip)) {
				document.getElementById("error_griMail").innerHTML = "Communication Preference requires a valid Grieving Against Address";
				validation = false;
			}
		}

		if (selGriComPref.trim() == "Email") {
			if (isEmpty(document.getElementById("grievanceEmail").value)) {
				document.getElementById("error_griEmail").innerHTML = "Communication Preference requires a Grieving Against Email Address.";
				validation = false;
			}
		} else if (selGriComPref.trim() == "Phone") {
			if (isEmpty(document.getElementById("grievancePhone").value)) {
				document.getElementById("error_griPhone").innerHTML = "Communication Preference requires a Grieving Against Phone Number.";
				validation = false;
			}

		}
	}

	if (isEmpty(comments)) {
		document.getElementById("error_comment").innerHTML = "Comments are required";
		validation = false;

	} else if (!isEmpty(comments) && !checkLength(comments)) {
		document.getElementById("error_comment").innerHTML = "Comments and Expected Outcome cannot exceed 5000 characters";
		validation = false;
	}

	else if (!isEmpty(expectedOutcome) && !checkLength(expectedOutcome)) {
		document.getElementById("error_exp_output").innerHTML = "Comments and Expected Outcome cannot exceed 5000 characters";
		validation = false;
	}

	return validation;

}

// It checks whether input is empty or not
function isEmpty(s) {

	if ((s == null) || (s == "") || (s.length == 0))

		return true;
	else
		return false;
}

// function to validate Comments and Expected Outcome
function checkLength(s) {
	if (s.length > 5000) {
		return false
	} else {
		return true;
	}
}

// enables or disables fields on the basis of type selected

function typeChanged() {

	var e = document.getElementById("typedropdown");
	var selected_type = e.options[e.selectedIndex].text;
	if (selected_type == "Appeal") {
		document.getElementById("typeMessage").innerHTML = "";
		document.getElementById("grievancefieldSet").disabled = true;
		/*
		 * document.getElementById("priorAuth").disabled = false;
		 * document.getElementById("effectiveDate").disabled = false;
		 * document.getElementById("expirationDate").disabled = false;
		 */
		document.getElementById("appealfieldset").disabled = false;

	} else if (selected_type == "Grievance") {
		document.getElementById("typeMessage").innerHTML = "";
		document.getElementById("grievancefieldSet").disabled = false;
		/*
		 * document.getElementById("priorAuth").disabled = true;
		 * document.getElementById("effectiveDate").disabled = true;
		 * document.getElementById("expirationDate").disabled = true;
		 */
		document.getElementById("appealfieldset").disabled = true;

	} else {
		document.getElementById("grievancefieldSet").disabled = false;
		/*
		 * document.getElementById("priorAuth").disabled = false;
		 * document.getElementById("effectiveDate").disabled = false;
		 * document.getElementById("expirationDate").disabled = false;
		 */
		document.getElementById("appealfieldset").disabled = false;

	}
}

// checks that type is selected or not

function isTypeSelected(selected_type) {
	if (selected_type == "Grievance" || selected_type == "Appeal") {
		return true;
	} else {
		return false;
	}
}

function isNumber(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

function clear() {

	document.getElementById("typeMessage").innerHTML = "";
	document.getElementById("error_requesterName").innerHTML = "";
	document.getElementById("error_date").innerHTML = "";
	document.getElementById("error_date_ends").innerHTML = "";
	document.getElementById("error_emailGA").innerHTML = "";
	document.getElementById("error_emailGA").innerHTML = "";
	document.getElementById("error_comment").innerHTML = "";
	document.getElementById("error_exp_output").innerHTML = "";
	document.getElementById("error_griAgainst").innerHTML = "";
	document.getElementById("error_griMail").innerHTML = "";
	document.getElementById("error_griEmail").innerHTML = "";
	document.getElementById("error_phoneGA").innerHTML = "";
	document.getElementById("error_MailGA").innerHTML = "";

}

// taking the date format in MM-DD-YYYY
function validateDateFormat(date) {
	date = date.split('-');

	m = date[0];
	d = date[1];
	y = date[2];
	alert("Y is:" + y + "d is:" + d + "m is:" + m);

	if (d < 0 || d > 31) {
		return false;
	}
	if (m < 1 || m > 12) {
		return false;
	}
	if (!isEmpty(y)) {

		if (getlength(y) < 0 || getlength(y) > 4) {
			alert("inside year length check");
			return false;
		}
	}
	return true;
}

// Calculates length of an Integer
function getlength(number) {
	alert("Length of year is:" + number.toString().length);
	return number.toString().length;
}

// For leap year and month check
function isDateValid(date) {

	date = date.split('-');
	m = date[0];
	d = date[1];
	y = date[2];
	if ((m == 4 || m == 6 || m == 9 || m == 11) && d == 31) {
		alert("Month " + m + " doesn't have 31 days!")
		return false;
	}
	if (m == 2) { // check for february 29th
		var isleap = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0));
		if (d > 29 || (d == 29 && !isleap)) {
			/* alert("February " + y + " doesn't have " + d + " days!"); */
			return false;
		}
	}

	return true;

}

function isDateLesser(date1, date2) {

	var fd = new Date(date1);
	var td = new Date(date2);
	if (td.getTime() < fd.getTime()) {
		return true;
	}
	return false;
}
