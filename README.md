# ID_KeithToh_Assg2
#### Traffic Condition in Singapore
This Project allows users to check the traffic condition in Singapore based on traffic images displayed. 

## Design Process
This website is intended for drivers and road users in general. They will be able to know if the roads they would like to travel on is congested, and plan their journey accordingly if they wish to avoid the congestion. This website shows a map with ll the location of traffic cameras in operation as well as the images taken by the cameras.

User Stories:
* As a driver, I want to ...

Link to Adobe XD Wireframe: https://xd.adobe.com/view/160a2137-9de5-4af5-9391-7d3748a085d5-4359/ 

## Features
### Existing Features 
* Feature 1: Links to Government Digital Services (related to vehicle/driving) on navigation bar.
* Feature 2: List of Emergency Hotlines/Contacts on navigation bar.
* Feature 3: Search Traffic Conditions based on Date and Time:
    * Output includes Camera ID, Coordinates of Camera, Image of Traffic and Timestamp.
### Features Left to Implement
* Feature: Check Weather conditions across Singapore.

## Technologies Used
* [JQuery](https://jquery.com)
    * This project uses jQuery to simplify DOM manipulation.
* [Bootstrap](https://getbootstrap.com/)
    * This project uses Bootstrap to layout contents on the website.
* APIs
    * [Data.gov.sg](https://data.gov.sg/)
        * This project uses Traffic Images API from Data.Gov to retrieve images of the roads of Singapore and the location of the cameras. 
    * [Google Maps](https://developers.google.com/maps/apis-by-platform)
        * This project uses Google Maps JavaScript API to display a Google Map on the website, as well as the exact locations of every traffic cameras.
## Testing
1. Search for Traffic Details:
    1. Scroll to the top of the website/ Click on the 'Back to Top' button at the bottom of the page.
    2. Verify that an error message about entering the datetime in the correct format appears when:
        * the input only has the date value;
        * the input only has the time value; and
        * date and time entered are not in the specified format (e.g. without 'T', '-' or ':').

## Credits
### Media
The icons used in the Google Maps were from Google Earth/Maps Icons website (http://kml4earth.appspot.com/icons.html#shapes).