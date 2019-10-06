# GreenHouse
> The plant-helper on request app.

## Table of contents
* [General info](#general-info)
* [Intro Video](#intro-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [License](#license)

## General info
GreenHouse is a single page application that allows users to 
view posts as a person seeking to help plant owners and 
browse plant resources. Users can also create a user account, which enables them to
log in and edit a profile,
create a post to seek a plant helper,
and edit or delete a post.

## Intro Video
[GreenHouse on YouTube](https://www.youtube.com/watch?v=-JK8fxub4ek&feature=youtu.be)


Any user/landing page:

![](https://media.giphy.com/media/H7NGT8PAUoKL73HvWH/giphy.gif)


Creating a post as a logged in user:

![](https://media.giphy.com/media/JrRfppHj5B0DU6wmJI/giphy.gif)

## Technologies
* JavaScript
* Ruby on Rails - version 5.2.3
* SQLite - version 3.24.0
* WeatherWidget.io

## Setup
To run this project, install it locally by cloning the GitHub repository.

From inside the project directory:
```
cd plant-buddies-back-end

bundle install

rails db:{create,migrate,seed}

rails s
```
Open your browser (preferably Chrome) and go to http://localhost:3000.
Then (back in terminal):
```
cd ..

cd plant-buddies-front-end

lite-server
```

## Code Examples
```javascript
const switchButton = () => {
    event.target.style.display = 'none'
    const confirmDeleteButton = createConfirmButton()
    event.target.parentNode.appendChild(confirmDeleteButton)
    confirmDeleteButton.addEventListener('click', deletePost)
}
```

```javascript
const renderName = (user) => {
    user.name
        ? profileName.innerText = user.name
        : profileName.innerText = user.username
}
```

```javascript
const addModalEvents = () => {
    closeModalButton.addEventListener('click', closeModal)
    window.addEventListener('click', clickOutsideModal)
    editPostButton.addEventListener('click', renderPostEdit)
    deletePostButton.addEventListener('click', switchButton)
}
```


## Features
* View post requests 
* View current weather & forecast
* Browse plant & plant care resources
* Create/login a user account
* View user profile
* Create a new post
* Edit a post
* Delete a post


To-do list:
* Login validations
* Password encryption/Authentication
* Refactor JS functions
* Allow user profiles to be edited
* Implement photo uploading for posts/profiles
* Add pagination for higher post count
* Build user/post relationship
* Display user's posts on user profile
* Create a location feature (expand from Denver area)
* Build more features!

## Status
Project is: at a demonstrable product. In the works...

## Inspiration
The inspiration for GreenHouse came from my own love of plants and nature, as well as the popularized 'on-demand' service apps.

## Contact
Created by [Catherine O'Hara](www.linkedin.com/in/catherine-o)

Feel free to contact me!

## License
[GPL v3.0](https://github.com/catherine-o/GreenHouse/blob/master/LICENSE)
