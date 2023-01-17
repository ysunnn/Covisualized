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

## 📦 Features
### Already implemented
- Visualization:
  - Map of Germany & its states. Information regarding the states is highlighted in the map.
  - Timeline representing information about Germany as a whole. When a state is selected in the map, a second line is shown in the timeline which represents the selected state in addition to the line which represents Germany.
  - Switching between visualized datasets (revenue, number of employees, average 7-day-incidences per month)
- Used datasets (preprocessed for formatting and data reduction, filtered files can be found in `src/assets/data`):
  - __hospitality revenue__. Source: Datasets __45213-0014__ and __45213-0005__ from *https://www-genesis.destatis.de/*
  - __number of employees in the hospitality industry__. Source: Datasets __45213-0002__ and __45213-0012__ from *https://www-genesis.destatis.de/*
  - __average 7 day incidence rate per month__. Source: Dataset __RKI History__ from *https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/6d78eb3b86ad4466a8e264aa2e32a2e4_0/about* (incidence rate was computed based on cumulative number of reported cases).

Note: __revenue__ and __number of employees__ values are **relative** and use revenue / number of employees from 2015 as a reference value. Revenue / number of employees from 2015 is represented as 100%. Thus, if e.g. revenue has increased by 10%, it is shown as 110%.

### Next thoughts

#### Additional Features:
1. Add a detailed view for each state which is shown when the corresponding state is clicked.
2. Add tabs in detailed view with graphs and additional information.
3. Adding filters to timeline to scope out different sections of the hospitality industry (difficult to find datasets which cover the time period and show the values for each state of Germany).

#### Nice to have:
1. Timeline play button & short tutorial
2. COVID-19 cases timeline/map variable
3. About section (project & team)
