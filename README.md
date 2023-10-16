# easyroam.example.useragent
This is a simple example of how useragents work in easyroam and what they can do.
You must set the following environment variables: 

| Name | Description |
|------|-------------|
|REDIRECT_HOST| Host for the redirect uri that is sent to the authentication server|
|CLIENT_ID| Your applications client_id|
|API_URL|The base url of the easyroam api|
|OID_URL|The base url of the authentication server|

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
