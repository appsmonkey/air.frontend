[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

<p align="center"><a href="https://air.cityos.io/login"><img src="public/images/cityos-air-logo.png" /></a></p>
<br />
<br />

CityOS Air is the highest rated enironmental app in the South European region.

|         | Features  |
----------|-----------------
:thumbsup: | The power of clean air is right at your fingertips with the air app
:thumbsup: | Monitor all sensors in real time for a comprehensive picture of the air quality and the environment
:thumbsup: | Automatic syncing to the cloud, your air data goes with you no matter where you are.
:thumbsup: | The app provides you with comprehensive data and graph trends to give you a deeper understanding of your surroundings, air pollution patterns, and insights into the source of poor air quality as it happens.
:octocat: | 100% free and open source

## Contributing

We are always looking for contributions from **all skill levels**!

# CityOS
CityOS web app

## Project architecture: 
 
* Framework: React

* Language: Javascript 

* Web standard: HTML 5 

* Styling framework: Styled components 

* Packet manager: Yarn 

* Arrays manipulation library: Loadash 

* Date/Time manipulation library: moment.js 

## Browsers:
 * Chrome 
 * Firefox 
 * Edge 
 * Safari 
 * Android 4.1 - 6.0 
 * IOS 7 – 10 

 
## Project implementation: 

### Application parts below are flagged like this: 

* &#x1F4D2; Folders 
* &#x1F4D1; Files 


### Project arhitecture: 
* &#x1F4D2; core
    * &#x1F4D2; http
        * &#x1F4D1; axiosInstance.js
    * &#x1F4D2; state
        * &#x1F4D1; axiosInstance.js
        * &#x1F4D1; rootReducer.js
        * &#x1F4D1; rootSaga.js
        * &#x1F4D1; store.js
* &#x1F4D2; features
    * &#x1F4D2; auth
    * &#x1F4D2; common
    * &#x1F4D2; header
    * &#x1F4D2; map
    * &#x1F4D2; dashboard
    * &#x1F4D2; helpers
* &#x1F4D1; package.json
* &#x1F4D1; README.md


## Setting up project:

- Install dependencies:
`yarn`

- Start project:
`yarn start`

- Create a deployable build
`yarn build`


## Commiting your work:

- Fetch origin:
`git fetch`

- Rebase your changes:
`git rebase origin/master`

- Resolve conflicts and save if needed, then:
`git add .`
`git rebase --continue`

- Push changes:
`git push`

- Create PR

- Select squash and merge option on github.

## ESLint

Install Visual Studio Code extensions:

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## External libs (dependencies)

| Package name | Version | License | Author |
| --- | --- | --- | --- |
| [react](https://reactjs.org/) | ^16.8.4 | [MIT](https://opensource.org/licenses/MIT) | Facebook, Inc. |
| [react-dom](https://reactjs.org/) | ^16.8.4 | [MIT](https://opensource.org/licenses/MIT) | Facebook, Inc. |
| [react-router-dom](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/README.md) | ^4.3.1 | [MIT](https://opensource.org/licenses/MIT) |
| [react-redux](https://github.com/reduxjs/react-redux) | 6.0.1 | [MIT](https://opensource.org/licenses/MIT) |
| [redux](https://github.com/reduxjs/redux) | ^4.0.1 | [MIT](https://opensource.org/licenses/MIT) |
| [redux-saga](https://github.com/redux-saga/redux-saga/blob/master/README.md) | ^1.0.2 | [MIT](https://opensource.org/licenses/MIT) |
| [react-scripts](https://github.com/facebook/create-react-app/blob/master/README.md) | ^2.1.8 | [MIT](https://opensource.org/licenses/MIT) |
| [axios](https://github.com/axios/axios) | ^0.18.0 | [MIT](https://opensource.org/licenses/MIT) |
| [google-map-react](https://github.com/google-map-react/google-map-react#readme) | ^1.1.4 | [MIT](https://opensource.org/licenses/MIT) |
| [moment](https://momentjs.com/) | ^2.24.0 | [MIT](https://opensource.org/licenses/MIT) |
| [lodash](https://lodash.com/) | ^4.17.14 | [MIT](https://opensource.org/licenses/MIT) |
| [react-datepicker](https://github.com/Hacker0x01/react-datepicker) | ^2.11.0 | [MIT](https://opensource.org/licenses/MIT) |
| [react-geocode](https://github.com/shukerullah/react-geocode#readme) | ^0.2.1 | [MIT](https://opensource.org/licenses/MIT) |
| [d3-dsv](https://github.com/d3/d3-dsv/blob/master/README.md) | ^1.1.1 | [BSD-3-Clause](https://github.com/d3/d3-dsv/blob/master/LICENSE) |
| [d3-format](https://github.com/d3/d3-format/blob/master/README.md) | ^1.3.2 | [BSD-3-Clause](https://github.com/d3/d3-format/blob/master/LICENSE) |
| [d3-shape](https://github.com/d3/d3-shape/blob/master/README.md) | ^1.3.5 | [BSD-3-Clause](https://github.com/d3/d3-shape/blob/master/LICENSE) |
| [d3-time-format](https://github.com/d3/d3-time-format/blob/master/README.md) | ^2.1.3 | [BSD-3-Clause](https://github.com/d3/d3-time-format/blob/master/LICENSE) |
| [@turf/turf](https://github.com/Turfjs/turf/blob/master/README.md) | ^5.1.6 | [MIT](https://opensource.org/licenses/MIT) |
| [date-fns](https://github.com/date-fns/date-fns/blob/master/README.md) | ^2.0.0-alpha.27 | [MIT](https://opensource.org/licenses/MIT) |
| [deck.gl](https://github.com/uber/deck.gl/blob/master/README.md) | ^6.4.7 | [MIT](https://opensource.org/licenses/MIT) |
| [formik](https://github.com/jaredpalmer/formik/blob/master/packages/formik/README.md) | ^1.5.1 | [MIT](https://opensource.org/licenses/MIT) |
| [history](https://github.com/ReactTraining/history/blob/master/README.md) | ^4.9.0 | [MIT](https://opensource.org/licenses/MIT) |
| [mapbox-gl](https://github.com/mapbox/mapbox-gl-js/blob/master/README.md) | ^0.53.1 | [BSD-3-Clause](https://github.com/mapbox/mapbox-gl-js/blob/master/LICENSE.txt) |
| [react-circular-progressbar](https://github.com/kevinsqi/react-circular-progressbar/blob/master/README.md) | ^2.0.0 | [MIT](https://opensource.org/licenses/MIT) |
| [react-facebook-login](https://github.com/keppelen/react-facebook-login/blob/master/README.md) | ^4.2.0 | No license |
| [react-google-login](https://github.com/anthonyjgrove/react-google-login/blob/master/README.md) | ^5.0.4 | [MIT](https://opensource.org/licenses/MIT) |
| [react-map-gl](https://github.com/uber/react-map-gl/blob/master/README.md) | ^4.1.1 | [BSD-3-Clause](https://github.com/uber/react-map-gl/blob/master/LICENSE) | Uber |
| [react-outside-click-handler](https://github.com/airbnb/react-outside-click-handler/blob/master/README.md) | ^1.2.3 | [MIT](https://opensource.org/licenses/MIT) |
| [react-places-autocomplete](https://github.com/hibiken/react-places-autocomplete/blob/master/README.md) | ^7.2.1 | [MIT](https://opensource.org/licenses/MIT) |
| [react-select](https://github.com/JedWatson/react-select/blob/master/README.md) | ^2.4.2 | [MIT](https://opensource.org/licenses/MIT) |
| [react-sparklines](https://github.com/borisyankov/react-sparklines/blob/master/README.md) | ^1.6.0 | [MIT](https://opensource.org/licenses/MIT) |
| [react-stockcharts](https://github.com/rrag/react-stockcharts/blob/master/README.md) | ^0.7.8 | [MIT](https://github.com/rrag/react-stockcharts/blob/master/LICENSE) |
| [react-vis](https://github.com/uber/react-vis/blob/master/README.md) | ^1.11.7 | [MIT](https://opensource.org/licenses/MIT) |
| [styled-components](https://github.com/styled-components/styled-components/blob/master/README.md) | ^4.1.3 | [MIT](https://opensource.org/licenses/MIT) |
| [supercluster](https://github.com/mapbox/supercluster/blob/master/README.md) | ^7.0.0 | [ISC](https://github.com/mapbox/supercluster/blob/master/LICENSE) |
| [victory](https://github.com/FormidableLabs/victory/blob/master/README.md) | ^32.2.0 | [MIT](https://opensource.org/licenses/MIT) |
| [yup](https://github.com/jquense/yup/blob/master/README.md) | ^0.27.0 | [MIT](https://opensource.org/licenses/MIT) |


## Why are we building this?

We are group of people who care about the envirnment and the better future of humanity.

## Code of Conduct

We aim to share our knowledge and findings as we work daily to improve our
product, for our community, in a safe and open space. We work as we live, as
kind and considerate human beings who learn and grow from giving and receiving
positive, constructive feedback.
