# People-n-Tables
A demo app about Meteor.

Have you even had a database full of people and wanted them presented to you in a table? If so, read on!

## See it in action!
Go to the demo app [here](http://people-n-tables.meteor.com/)

## Download a Copy!
1. [Download and install](https://www.meteor.com/install) Meteor.
2. Clone this repo: ```git clone https://github.com/illegalprime/PeopleInTables.git```
3. Change to the directory meteor is in: ```cd PeopleInTables/PeopleInTables```

Now we need to tell the app our Postgres credentials, add the following to ```server/lib/secrets.js```
```Javascript
Meteor.settings.postgres = {
    url: "postgres://<user>:<pass>@<server>:<port>/<database>"
}
```

#### Finally use ```meteor run``` to run it!

Go to ```http://localhost:3000/``` to see it, it might need one refresh to get it started.
