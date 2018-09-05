package com.gpac.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class GMTConvertorTest {

	public static void main(String args[]) {

		
		String dateInString = "11-25-2018";
		String timeString="12:12:12";
		dateInString=dateInString+timeString;
		//String time
		SimpleDateFormat formatter1 = new SimpleDateFormat("dd-MM-yyyyHH:MM:SS", Locale.ENGLISH);
			System.out.println(formatter1.toPattern());
			Date date = null;
			try {
				date = formatter1.parse(dateInString);
				System.out.println("date"+date);
			} 
		catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
				SimpleDateFormat formatter = new SimpleDateFormat(
						"yyyyMMdd'T1'HHmmss.SSS 'GMT'");
				formatter.setTimeZone(TimeZone.getTimeZone("GMT"));
				String formattedDateGMT = formatter.format(date);
				System.out.println("formattedDateGMT GMT---"+formattedDateGMT); 
	}

}
