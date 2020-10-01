# StarLink Tracker
<strong> Overview </strong>
<p>A React JS based Starlink Trajectory Visualization Web Application</p>
<p>I am always fascinated by the universe, and love to watch the sky for hours looking for stars. This project aims at tracking the Starlink satellites launched by SpaceX based on the oberver's location information including longitude, latitude, altitude, and radius. The observer can provide the info in the form and submit to see a list of nearby satellites. Then he/she can select one or multiple satellites to track on the world map to the righthand side of the dashboard. Additionally, the observer needs to fill the duration(0-59 mins) to see the path of the selected nearby Starlink satellites during the requested time duration (converted from minutes to seconds). During the tracking, the observer can abort the process at any time and revise the tracking request.</p>
<div>
  
[Project Demo](https://project.dmuwydazhsh8r.amplifyapp.com/)

</div>

<strong> Starlink </strong>
<p>SpaceX is developing a low latency, broadband internet system to meet the needs of consumers across the globe. Enabled by a constellation of thousands of mass-produced small satellites in low Earth orbit, working in combination with ground transceivers. Here is a brief Starlink launch history, in case you ar interested: </p>
<ul>
  <li>First Two Prototype test-flight satellites launched in Feb. 2018</li>
  <li>A second set of test satellites, and 60 operational stellites launched in May 2019</li>
  <li>More to come...</li>
 </ul>
<strong> ⚒ My Work at a Glance</strong>
<ul>
  <li>Set up the Repo by leveraging the React official CLI tool, create-react-app and use NPM to manage project dependencies</li>
  <li>Designed the layout, component interface and data flow prior to the implementation </li>
  <li>Built forms to collect user observation info (longitude, latitude, altitude, radius) using Ant Design component library with an option to use browser geolocation for better User experience </li>
  <li>Achieved the core tracking functionality by fetched nearby satellites info and position prediction data through the N2YO API(s) and React-Simple-Map to animate selected satellite paths on map</li>
  <li>Deployed the dashboard to AWS for demonstration</li>
</ul>
