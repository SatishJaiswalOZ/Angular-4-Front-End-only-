# Angular (Front End)

Develop a responsive web app that allows a user to create a profile using name, email address, date of birth and location (using a map). This information should be saved locally (no backend coding required) and the user should be able to edit it even after refreshing the page).


To run the App:

1. cd user-details 

2. npm install @angular/cli -g

3. npm install

4. run ng serve

5. http://localhost:4200/


Note: 

1. Dev environment for now is limited to Chrome browser only. Not yet tested on other browsers.

2. Date picker has minor issue in responsive **

KNOWN ISSUES IN EXTERNAL PLUGINS:

** .ng2-datepicker plugin has size issue of it's Input type due to which it's not responsive. If deliberately style=\"width:100%\"  \n is placed at line 1637 of node_modules\ng2-date-picker then it works. I'll check this later to solve if app component level workaround can be done.


TEST & COVERAGE using Angular Cli via Karma:

1. To run test: ng test

    Tests will execute after a build is executed via Karma, and it will automatically watch your files for changes. You can run tests a single time via --watch=false or --single-run.

2. You can run tests with coverage via --code-coverage. The coverage report will be in the  ./my-component-library/coverage/index.html directory.

3. If you want to inspect how angular cli was configured, generate a project with the angular-cli and execute on the root folder ng eject, that will allow you to see the webpack configuration file.