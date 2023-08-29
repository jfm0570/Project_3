CREATE TABLE descriptions (desc_id integer, city varchar(30), latitude varchar(30), longitude varchar(30), date date, 
						   conditions varchar(30), description varchar(100));
SELECT * FROM descriptions;
CREATE TABLE other_conditions (cond_id integer, city varchar(30), latitude varchar(30), longitude varchar(30), date date, cloudcover varchar(30), dewpoint varchar(30), 
							   pressure varchar(30), uv_index varchar(30), visibility varchar(30);
SELECT* FROM other_conditions;
CREATE TABLE precipitation (precip_id integer, city varchar(30), latitude varchar(30), longitude varchar(30), date date, precipitation varchar(30),
						   precipitation_type varchar(30), severe_risk varchar(30));
SELECT * FROM precipitation; 
CREATE TABLE sun_moon (sun_moon_id integer, city varchar(30), latitude varchar(30), longitude varchar(30), date date, moonphase varchar(30), 
					  sunrise varchar(30), sunset varchar(30));
SELECT * FROM sun_moon;	
CREATE TABLE temp_humidity (temp_id integer, city varchar(30),latitude varchar(30), longitude varchar(30), date date, humidity varchar(30),
						   feelslike varchar(30), feelslikemin varchar(30), feelslikemax varchar(30), 
						   temp varchar(30), tempmin varchar(30), tempmax varchar(30));							   
SELECT * FROM temp_humidity;		
CREATE TABLE wind (wind_id integer, city varchar(30),latitude varchar(30), longitude varchar(30), date date, wind_direction varchar(30), 
				  wind_speed varchar(30), wind_gust varchar(30));							   
SELECT * FROM wind;						
CREATE TABLE full_data (full_id integer, city varchar(30), latitude varchar(30), longitude varchar(30),date date, conditions varchar(60),
					   description varchar(100), cloudcover varchar(30), dewpoint varchar(30),
					   pressure varchar(30), humidity varchar(30), uv_index varchar(30), visibility varchar(30),
					   feelslike varchar(30), feelslikemin varchar(30), feelslikemax varchar(30), 
					   temp varchar(30), tempmin varchar(30), tempmax varchar(30), precipitation varchar(30),
					   precipitation_type varchar(30), wind_direction varchar(30), wind_speed varchar(30),
					   wind_gust varchar(30), severe_risk varchar(30), moonphase varchar(30), sunrise varchar(30),
					   sunset varchar(30)); 