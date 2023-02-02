# **Covi**sualize**d**
> **How did the COVID-19 regulations affect the hospitality industry in each of Germany's states?**

## ℹ️ About
Information visualization project for Lecture *Information Visualization* of the winter semester 2022-/23.

### 🚀 Live Environment
[**Available at:** https://iv2223-projects.pages.gitlab.lrz.de/team-32/](https://iv2223-projects.pages.gitlab.lrz.de/team-32/)

### 👥 Team Members
| Felix Bastian | Simon Grätz | Janka Hartmann | Timy Phan | You Sun Song |
|---|---|---|---|---|
| Design & Codestyle | Handyman | Project Management | Data Specialist | Ideation & Code |

> Team member functions are fluid and everyone chips in with programming.

## 🛫 Getting Started
1. Make sure [Node.js](https://nodejs.org/) version 18+ is installed (LTS recommended), includes npm.
2. Install recommended project extensions for your code editor (see `.vscode/extensions.json`).
3. Install project dependencies locally: `npm install`
4. Start a local development server: `npm run dev`

## 🔍 Usage

### The Map

To the top left, the user can see a map of Germany (the state cities Hamburg, Bremen and Berlin were enlarged for better visibility and accessibility). The states are highlighted with different colors, based on which variable is selected in the top row and which point in time is selected in the timeline. Pale / white coloring of a state indicates low values of the selected variable, higher saturation indicates higher values of the selected variable per state. Note that the color scale is constant for each variable across all points in time, thus if e.g. Bavaria's coloring is more saturated at one chosen point in time, then it also has a higher value at that point.

COVID19 regulation measures are indicated by red coloring of the otherwise white-gray bars above the states. The red color is filled bottom-up (akin to filling a vessel with liquid) and is derived from the __Massnahmenindex Bundeslaender pro Tag__. Note that COVID19 regulations were first introduced in March 2020, thus there is no such red coloring in the months before that.

### The Timeline

At the bottom, the user can see a timeline which shows the same variable as the map, but applied to all of Germany (map coloring is state-specific). Points in time can be selected at month-level granularity, like `June 2020`, by moving the mouse above the timeline. A gray vertical line shows what would be selected if the user clicks on the gray line, a black vertical indicates the currently selected month. This updates the date of the data displayed on the map.

When a state is selected in the map, a second line appears in the line chart which represents the selected state.
The timeline can be zoomed in and out by double-clicking or scrolling.

## 📦 Features
### Visualization:
  - Map of Germany & its states: The variable which is selected at the top is represented as the coloring of each state. The split bars above the states indicate the severity of corona regulations at the selected time.
  - Timeline representing information about Germany as a whole: The timeline shows the same variable as the map (the variable which is selected at the top). When a state is selected in the map, a second line is shown in the timeline which represents the selected state in addition to the line which represents Germany. A point in time can be selected via scrubber in the timeline or by using the playback feature.
  - Switching between visualized datasets: revenue, number of employees, average 7-day-incidences per month
  - Detail View representing additional information to the currently selected state: The Detailview is opened by clicking on a state. It contains Details on the selected states and charts representing one a yearly and one a national comparison.
  - Play Button: On the left of the timeline is a Play Button. By clicking on it, an automatic timeline flow starts.
  - About Section: The About Section contains information about the five developers of Covi**sualize**d. 


### Used datasets (preprocessed for formatting and data reduction, filtered files can be found in `src/assets/data`):
  - __hospitality revenue__: Datasets __45213-0014__ and __45213-0005__ from *https://www-genesis.destatis.de/*
  - __number of employees in the hospitality industry__: Datasets __45213-0002__ and __45213-0012__ from *https://www-genesis.destatis.de/*
  - __average 7 day incidence rate per month__: Dataset __RKI History__ from *https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/6d78eb3b86ad4466a8e264aa2e32a2e4_0/about* (Incidence rate was computed based on cumulative number of reported cases.)
  - __lockdown measures__: The __ZPID Lockdown Measures Dataset__ for Germany from *https://www.psycharchives.org/en/item/8a0c3db3-d4bf-46dd-8ffc-557430d45ddd* and the __Massnahmenindex Bundeslaender pro Tag__ from *https://www.corona-daten-deutschland.de/dataset/massnahmenindex_bundeslaender_pro_tag*.

Note: __revenue__ and __number of employees__ values are __relative__ and use revenue or number of employees from 2015 as a reference value. Revenue or number of employees from 2015 is represented as 1.0 (100%). Thus, if e.g. revenue has increased by 10%, it is shown as 1.1 (110%).

### Next thoughts

- Filtering by Hospitality Industry: One could add filters to the timeline to scope out different sections of the hospitality industry. Challenge: it is difficult to find datasets which cover the time period and show the values for each state of Germany.
- Tutorial: An Introduction to Covi**sualize**d and the information that can be retreived on the page could be implemented. 
