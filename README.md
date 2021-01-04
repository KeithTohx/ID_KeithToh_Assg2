# ID_KeithToh_Assg2
#### Traffic & Weather Condition in Singapore
This Project allows users to check the traffic condition in Singapore based on traffic images displayed, as well as the rainfall value at different parts of Singapore.

## Design Process
This website is intended for drivers, road users in general and those researching about traffic conditions and rainfall in Singapore. They will be able to know if the roads they would like to travel on is congested, and plan their journey accordingly if they wish to avoid the congestion. Users will also be able to know if a place is/was raining at certain dates and timings. All the users need to do is to enter the date and time which they want to search into the input boxes. This website will then show a map with all the location of traffic cameras and weather detector stations in operation, as well as the images taken by the cameras and the rainfall values.

User Stories:
* As a driver, I want to check if a certain section of the road is congested, so that I can better plan my journey to avoid reaching my destination late.
* As a driver, I want to check if a certain section of the road has a high rainfall value, so that I can decide if I want to travel using that road in case of flooding.
* As a researcher, I want to view traffic images captured at certain places at specific timings, so that I can determine the trend of vehicles driving past the places at those timings.
* As a researcher, I want to check if certain places rained at specific timings, so that I can determine the trend of rainfall in Singapore.

Link to Adobe XD Wireframe: https://xd.adobe.com/view/160a2137-9de5-4af5-9391-7d3748a085d5-4359/

## Features
### Existing Features 
* Feature 1: allows Users to access Government Digital Services (related to vehicle/driving) by clicking on the website links on the navigation bar.
* Feature 2: allows Users to view a list of Emergency Hotlines/Contacts on the navigation bar.
* Feature 3: allows Users to view their Current Location on Google Maps
    * Click on the "Pan to Current Location" button on the top of the map to shift the view of the map so that the User's current location is in the centre. A marker pin will also be shown on the map to represent the User's current location.
* Feature 4: allows Users to search for the Traffic Condition based on Date and Time:
    * Output includes Location of Cameras on Map, Camera ID, Coordinates of Camera, Image of Traffic and Timestamp.
* Feature 5: allows Users to search for the Weather Condition (Rainfall value) based on Date and Time:
    * Output includes Location of Weather Stations on Map, Device ID, Coordinates of Detectors and Timestamp.
* Feature 6: allows Users to be brought back to the Top of the Website by clicking on the "Back to Top" link at the bottom of the page.
* Feature 7: allows Users to switch the colour mode of the website between light and dark modes to have a different viewing experience by clicking on the "Switch to Light/Dark Mode" link on the navigation bar.

## Technologies Used
* [JQuery](https://jquery.com)
    * This project uses jQuery to simplify DOM manipulation.
* [Bootstrap](https://getbootstrap.com/)
    * This project uses Bootstrap to layout contents on the website.
* APIs
    * [Data.gov.sg](https://data.gov.sg/)
        * This project uses Traffic Images and Realtime Weather Readings across Singapore (Rainfall) APIs from Data.Gov to retrieve images of the roads of Singapore and the locations of the traffic cameras and weather stations. 
    * [Google Maps](https://developers.google.com/maps/apis-by-platform)
        * This project uses Google Maps JavaScript API to display a Google Map on the website, as well as the exact locations of every traffic cameras and weather stations.

## Testing
1. Scenario - Search for Traffic/ Weather Details:
    1. Scroll to the top of the website/ Click on the 'Back to Top' button at the bottom of the page.
    2. Verify that an error message about entering the datetime in the correct format appears when:
        * the input only has the date value;
        * the input only has the time value; and
        * date and time entered are not in the specified format (e.g. without 'T', '-' or ':').
2. Different Screen Sizes:
    * When viewed on a big screen (desktop):
        * Navigation bar options will all be displayed out.
        * The user input section will be displayed horizontally.
    * When viewed on a small screen (smartphone):
        * Navigation bar options will collapse into a hamburger menu button.
        * The user input section will stack vertically.
3. Interesting Bugs/ Problems:
    1. When the user search for both the traffic images and weather, and tries to remove the results of the weather first, the user will not be able to remove the results of the traffic condition unless the website is refreshed.

## Credits
### Media/ Content
* Icons used in the Google Maps: [Google Earth/Maps Icons](http://kml4earth.appspot.com/icons.html#shapes)
* Text Fonts used in website: [Google Fonts](https://fonts.google.com/)
* Navigation Bar: [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/components/navbar/)
* Codes for User Current Location on Google Maps: [Google Maps Platform Documentation](https://developers.google.com/maps/documentation/javascript/geolocation)
### Acknowledgements
* I received inspiration for Feature 7 (Light & Dark Modes) from various Smartphone Operating Systems offering both Light Mode and Dark Mode appearances.