// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  spotify: {
    baseUrl:'https://api.spotify.com/v1/'
  },
  account: {
    clientId :"ef293b5e099348b7a19884dc5d78f4f9",
    secretId :"d0a21657e8ce4652992cf79ce7fe4ac6"
  },
  app: {
    baseUrl :''
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
