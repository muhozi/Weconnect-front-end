# WeConnect

[![Build Status](https://www.travis-ci.org/muhozi/Weconnect-front-end.svg?branch=master)](https://www.travis-ci.org/muhozi/Weconnect-front-end) 
[![Coverage Status](https://coveralls.io/repos/github/muhozi/Weconnect-front-end/badge.svg?branch=master)](https://coveralls.io/github/muhozi/Weconnect-front-end?branch=master) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8db8f1816458486385dcc0ad0bd96526)](https://www.codacy.com/app/muhozi/Weconnect-front-end?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=muhozi/Weconnect-front-end&amp;utm_campaign=Badge_Grade)

WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

This is the *Front end* Application of [Weconnect](https://connectship.herokuapp.com/), Backend can be found [here](https://github.com/muhozi/WeConnect-2)

## Prerequisites

Make sure you have the followings installed.

* Nodejs
* npm, npx or yarn

## Tools used

This application used:

* React 
* Redux and
* [create-react-app](https://github.com/facebook/create-react-app) to bootstrap react application

## Set up the environment 🛠

Assuming that you have any NodeJS and any package manager(among yarn, npm or npx) installed:

#### **Clone the repository**

```sh
git clone git@github.com:muhozi/WeConnect-front-end.git
```

```sh
cd WeConnect-front-end
```

#### Set the API endpoint url

If you want to use your custom backend you can change the endpoint url by creating the `.env.local` in the project root directory then add the following:

```
REACT_APP_API_URL='custom_api_url'
```

If the api url is not set, the default one will be used, which is `https://allconnect.herokuapp.com/api/v1`

#### Enable redux devtools

If you want to enable redux devtools [**redux devtools**](https://github.com/zalmoxisus/redux-devtools-extension) add in  `.env.local`(in the project root directory) the following line:

```
REACT_APP_REDUX_DEVTOOL='true'
```



#### Install the packages

```sh
yarn
```

## Run the application 🚀

#### Compile SASS files to CSS

This application uses SASS, Run below command to compile to css first:

```
yarn build-css
```

or if you want to watch the changes while customizing run: 

```sh
yarn watch-css
```

#### Start the application

```sh
yarn start
```

## Author

[Emery Muhozi](https://twitter.com/EmeryMuhozi)



## License

MIT License