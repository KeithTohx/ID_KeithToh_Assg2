# ID_KeithToh_Assg2
#### Traffic Condition in Singapore
This Project allows users to check the traffic condition in Singapore based on traffic images displayed, as well as the rainfall value at different parts of Singapore.

## Design Process
This website is intended for drivers and road users in general. They will be able to know if the roads they would like to travel on is congested, and plan their journey accordingly if they wish to avoid the congestion. Users will also be able to know if a place is/was raining at certain dates and timings. This website shows a map with all the location of traffic cameras and weather detector stations in operation, as well as the images taken by the cameras.

User Stories:
* As a driver, I want to ...

Link to Adobe XD Wireframe: https://xd.adobe.com/view/160a2137-9de5-4af5-9391-7d3748a085d5-4359/

## Features
### Existing Features 
* Feature 1: Links to Government Digital Services (related to vehicle/driving) on navigation bar.
* Feature 2: List of Emergency Hotlines/Contacts on navigation bar.
* Feature 3: View User Current Location on Google Maps
    * Click on the "Pan to Current Location" button on the top of the map to shift the view of the map so that the User's current location is in the centre. A marker pin will also be shown on the map to represent the User's current location.
* Feature 4: Search Traffic Conditions based on Date and Time:
    * Output includes Location of Cameras on Map, Camera ID, Coordinates of Camera, Image of Traffic and Timestamp.
* Feature 5: Search Weather Conditions (Rainfall) based on Date and Time:
    * Output includes Location of Weather Stations on Map, Device ID, Coordinates of Detectors and Timestamp.
* Feature 6: Link to bring Users back to the Top of the Website.
### Features Left to Implement
* Feature(s): Dark and Light Mode

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
1. Search for Traffic/ Weather Details:
    1. Scroll to the top of the website/ Click on the 'Back to Top' button at the bottom of the page.
    2. Verify that an error message about entering the datetime in the correct format appears when:
        * the input only has the date value;
        * the input only has the time value; and
        * date and time entered are not in the specified format (e.g. without 'T', '-' or ':').

## Credits
### Media
The icons used in the Google Maps were from Google Earth/Maps Icons website (http://kml4earth.appspot.com/icons.html#shapes).