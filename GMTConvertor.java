package com.gpac.test;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

public class GMTConvertor {

	public static void main(String args[]) {

		/*
		 * Convert String from yyyy-mm-dd hh mm ss to date object in Java
		 */

		 DateFormat utcConverter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	     utcConverter.setTimeZone(TimeZone.getTimeZone("GMT"));
	     String sampleDateTime = "2015-11-01 01:00:00";
	     DateFormat nyConverter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	     nyConverter.setTimeZone(TimeZone.getTimeZone("EST"));
	     Calendar nyCal = Calendar.getInstance();

	     try {
			nyCal.setTime(nyConverter.parse(sampleDateTime));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	     System.out.println("NY TIME :" +nyConverter.format(nyCal.getTime()));

	    System.out.println("GMT TIME  :" +utcConverter.format(nyCal.getTime()));

	}

}
