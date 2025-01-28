# leaflet-challenge
Module 15 Challenge

## Overview
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

This project focuses on developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet. 

## Project Structure
The Earthquake Visualization is built using JavaScript, D3.js, and Leaflet for interactive data visualization.

## Key Features:
- Map: Plots all earthquakes based on their longitude and latitude using Leaflet.js.
- Markers: Reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger ranging from -10 to +90, and earthquakes with greater depth appear darker in color, ranging from green to red.
- Popups: When the user clicks on a marker, a popup will display additional details about the earthquake, such as: place, magnitude, depth of the earthquake.
- Legend: Displays a color-coded guide for the earthquake depth ranges and corresponding colors. The user can reference the legend to better understand the color coding and interpret the map's data.

## Folder/file Breakdown (Leaflet-Part-1)
- index.html: The main HTML file that structures the map and links to other assets (CSS/JS files).
- static/js/app.js: The JavaScript file containing the code for:
    +   Fetching earthquake data from USGS.
    +   Rendering the map and markers.
    +   Adding event listeners for popups.
    +   Adding a color-coded legend.
- static/css/#style.css: Contains styles for formatting the look and feel of the map and the legend.

## How to Run Locally:
1.  Clone or download the repository to your local machine.
2.  Open index.html file in any web browser (Chrome, Firefox, etc.) to see the Earthquake Visualization in action.

## To Deploy on a Web Server:
