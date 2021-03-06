const postsURL = 'http://localhost:3000/posts/'
const resourcesURL = 'http://localhost:3000/resources'
const usersURL = 'http://localhost:3000/users/'

let currentUser = null
let loggedIn = false

function createImgArray(number) {
    let photoArray = []
    for (let i = 1; i <= +number; i++) {
        photoArray.push(`assets/images/plants/plant${i}.jpeg`)
    }
    return photoArray
}

const plantImages = createImgArray(25)

const navList = document.querySelector('#nav-ul')
const browsePage = document.querySelector('#show-posts')
const createPage = document.querySelector('#create-post')
const createPostForm = document.querySelector('#create-post-form')
const editPage = document.querySelector('#edit-post')
const editPostForm = document.querySelector('#edit-post-form')
const resourcesPage = document.querySelector('#resources-page')
const resourcesList = document.querySelector('#resources-list')
const loginPage = document.querySelector('#login-user')
const loginForm = document.querySelector('#login-form')
const profilePage = document.querySelector('#profile-page')

const postModal = document.querySelector('.modal')
const closeModalButton = document.querySelector('.modalCloseButton')
const modalHeader = document.querySelector('.modal-header').lastElementChild
const modalBody = document.querySelector('.modal-body')
const modalLocation = modalBody.firstElementChild
const modalDescription = modalBody.children[1]

const modalRight = document.querySelector('.modal-right')
const modalImage = document.querySelector('.modal-image')
const contactButton = document.querySelector('.modal-contact-button')
const editPostButton = document.querySelector('.modal-edit-button')
const deletePostButton = document.querySelector('.modal-delete-button')
const newUserButton = document.querySelector('#new-user')

const profilePhoto = document.querySelector('#profile-photo')
const profileName = document.querySelector('.profile-name')
const profileBio = document.querySelector('.profile-bio')
const loginLink = document.querySelector('#login')
const logoutLink = document.querySelector('#logout')
const createPostLink = document.querySelector('#create')
const profileLink = document.querySelector('#profile')


const renderBrowse = () => {
    addNavEvent()
    getPosts()
    getResources()
}

const getPosts = () => {
    fetch(postsURL)
        .then(response => response.json())
        .then(listPosts)
}

const listPosts = (posts) => {
    posts.map(renderCard)
}

const renderCard = (post) => {
    const postArea = document.querySelector('#post-grid')
    const card = document.createElement('div')
    card.setAttribute('data-id', `${post.id}`)
    card.setAttribute('data-location', `${post.location}`)
    card.classList.add('post-card')

    const cardTitle = document.createElement('h5')
    cardTitle.innerText = post.title
    card.appendChild(cardTitle)

    const cardInfo = document.createElement('p')
    cardInfo.innerText = post.description
    cardInfo.style.display = 'none'
    card.appendChild(cardInfo)

    const cardImg = document.createElement('img')
    cardImg.classList.add('card-image')
    cardImg.src = getRandomImage(plantImages, 'assets/images')
    cardImg.setAttribute('alt', 'plant photo')
    
    card.appendChild(cardImg)
    postArea.prepend(card)
    addCardEvent(card)
}

function getRandomImage(imgAr, path) {
    path = path || 'images/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    return img
}

const addCardEvent = (card) => {
    card.addEventListener('click', openModal)
}

const openModal = () => {
    let cardID = ''
    postModal.style.display = 'block'
    if(event.target.tagName === 'DIV'){
        cardID = event.target.dataset.id
    } else if (event.target.tagName === 'H5'){
        cardID = event.target.parentNode.dataset.id
    } else if (event.target.tagName === 'IMG'){
        cardID = event.target.parentNode.dataset.id
    }
    renderModalText(cardID)
    addModalEvents()
}

const renderModalText = (cardID) => {
    const modalCard = document.querySelector(`[data-id="${cardID}"]`)
    modalBody.setAttribute('data-post-id', cardID)
    const location = modalCard.dataset.location
    modalHeader.innerText = modalCard.firstElementChild.innerText
    if (location !== 'null') {
        modalLocation.innerText = location
    } else {
        modalLocation.innerText = ' '
    }
    
    modalDescription.innerText = modalCard.children[1].innerText
    modalImage.src = modalCard.children[2].src
    modalImage.classList.add('modal-image')


    if (loggedIn === true) {
        editPostButton.style.display = 'inline-block'
        deletePostButton.style.display = 'inline-block'
    } else {
        editPostButton.style.display = 'none'
        deletePostButton.style.display = 'none'
    }
    deletePostButton.setAttribute('data-delete-id', cardID)
}


const addModalEvents = () => {
    closeModalButton.addEventListener('click', closeModal)
    window.addEventListener('click', clickOutsideModal)
    editPostButton.addEventListener('click', renderPostEdit)
    deletePostButton.addEventListener('click', switchButton)
}

const closeModal = () => {
    let byeConfirm = document.querySelector('.modal-confirm-button')
    if (byeConfirm) {byeConfirm.remove()}
    deletePostButton.style.display = 'inline-block'
    postModal.style.display = 'none'
}

function clickOutsideModal(e){
    if (e.target === postModal) {
        closeModal()
    }
}

const switchButton = () => {
    event.target.style.display = 'none'
    const confirmDeleteButton = createConfirmButton()
    event.target.parentNode.appendChild(confirmDeleteButton)
    confirmDeleteButton.addEventListener('click', deletePost)
}

const createConfirmButton = () => {
    const confirmDeleteButton = document.createElement('button')
    confirmDeleteButton.innerText = 'Confirm'
    confirmDeleteButton.classList.add('modal-confirm-button')
    return confirmDeleteButton
}

const deletePost = () => {
    const deleteID = event.target.parentNode.parentNode.dataset.postId
    fetch(postsURL + deleteID, {method: 'DELETE'})
        .then(document.location.reload())
}

function renderPostEdit(){
    const postContent = event.target.parentNode.parentNode.parentNode    
    browsePage.style.display = 'none'
    editPage.style.display = 'block'
    postModal.style.display = 'none'
    prepopulateForm(postContent)
    addEditEvent()
}

const prepopulateForm = (info) => {
    const editID = info.children[1].dataset.postId
    const editTitle = info.firstElementChild.lastElementChild.innerText
    const editLocation = info.children[1].firstElementChild.innerText
    const editDescription = info.children[1].children[1].innerText
    
    editPostForm[0].value = editID
    editPostForm[1].value = editTitle
    editPostForm[2].value = editLocation
    editPostForm[3].value = editDescription
}

const addEditEvent = () => {
    editPostForm.addEventListener('submit', editPost)
}

const editPost = () => {
    event.preventDefault()
    const formDataEdit = new FormData(editPostForm)
    const editIdData = formDataEdit.get('post_id')
    const editTitleData = formDataEdit.get('edit-post-title')
    const editLocationData = formDataEdit.get('edit-post-location')
    const editDescriptionData = formDataEdit.get('edit-post-description')
    const editPostId = formDataEdit.get('post_id')

    const configEdit = {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'title': editTitleData,
            'location': editLocationData,
            'description': editDescriptionData
        })
    }
    fetch(postsURL + editIdData, configEdit)
        .then(window.location.reload())
}

const addNavEvent = () => {
    navList.addEventListener('click', switchPage)
}

const switchPage = () => {
    const id = event.target.id
    if(id === 'browse' && browsePage.style.display === 'none'){
        showBrowse()
    } else if(id === 'create'){
        showCreate()
    } else if(id === 'resources'){
        showResources()
    } else if(id === 'profile'){
        showProfilePage()
    } else if (id === 'login'){
        showLogin()
    } else if (id === 'logout'){
        logoutUser()
    }
}

const showBrowse = () => {
    browsePage.style.display = 'block'
    createPage.style.display = 'none'
    editPage.style.display = 'none'
    resourcesPage.style.display = 'none'
    loginPage.style.display = 'none'
    profilePage.style.display = 'none'
}

const showCreate = () => {
    createPage.style.display = 'block'
    browsePage.style.display = 'none'
    editPage.style.display = 'none'
    resourcesPage.style.display = 'none'
    loginPage.style.display = 'none'
    profilePage.style.display = 'none'
    addCreateEvent()
}

const showResources = () => {
    resourcesPage.style.display = 'block'
    createPage.style.display = 'none'
    browsePage.style.display = 'none'
    editPage.style.display = 'none'
    loginPage.style.display = 'none'
    profilePage.style.display = 'none'
}

const showLogin = () => {
    loginPage.style.display = 'block'
    createPage.style.display = 'none'
    browsePage.style.display = 'none'
    editPage.style.display = 'none'
    resourcesPage.style.display = 'none'
    profilePage.style.display = 'none'
    createLoginEvents()
}

const addCreateEvent = () => {
    createPostForm.addEventListener('submit', createNewPost)
}

const createNewPost = () => {
    event.preventDefault()
    const formDataCreate = new FormData(event.target)
    const postTitle = formDataCreate.get('post-title')
    const postLocation = formDataCreate.get('post-location')
    const postDescription = formDataCreate.get('post-description')
    const configCreate = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'title': postTitle,
            'location': postLocation,
            'description': postDescription
        })
    }

    // add validations
    fetch(postsURL, configCreate)
        .then(response => response.json())
        .then(createCardFromForm)
}

const createCardFromForm = (post) => {
    browsePage.style.display = 'block'
    createPage.style.display = 'none'
    renderCard(post)
}

const getResources = () => {
    fetch(resourcesURL)
        .then(response => response.json())
        .then(listResources)
}

const listResources = (resources) => {
    resources.map(renderResource)
}

const renderResource = (resource) => {
    const resourceCard = createResourceCard(resource)
    const resourceItem = document.createElement('li')
    resourceItem.appendChild(resourceCard)
    resourcesList.appendChild(resourceItem)
}

const createResourceCard = (resource) => {
    const card = document.createElement('div')
    card.classList.add('resource-card')
    card.innerText = resource.name
    card.setAttribute('data-link', resource.link)
    createLinkEvent(card)
    return card
}

const createLinkEvent = (resource) => {
    resource.addEventListener('click', routeLink)
}

const routeLink = () => {
    const link = event.target.dataset.link
    window.open(link)
}

const createLoginEvents = () => {
    loginForm.addEventListener('submit', loginUser)
    newUserButton.addEventListener('click', createNewUser)
}

const loginUser = () => {
    event.preventDefault()
    const formDataLogin = new FormData(loginForm)
    currentUser = formDataLogin.get('username')
    const password = formDataLogin.get('password')
    
    fetch(usersURL)
        .then(response => response.json())
        .then(listUsers)  //find user and open profile
}

const listUsers = (users) => {
    users.map(selectUser)
}

const selectUser = (user) => {
    if (user.username === currentUser){
        currentUser = user
        showProfilePage(user)
    } else {
        loginForm.reset()
    }
}

const showProfilePage = (user) => {
    profilePage.style.display = 'block'
    browsePage.style.display = 'none'
    createPage.style.display = 'none'
    editPage.style.display = 'none'
    resourcesPage.style.display = 'none'
    loginPage.style.display = 'none'
    renderProfile(user)
}

const renderProfile = (user) => {
    loggedIn = true
    loginLink.style.display = 'none'
    logoutLink.style.display = 'inline-block'
    createPostLink.style.display = 'inline-block'
    profileLink.style.display = 'inline-block'
    renderPhoto(user)
    renderName(user)
    renderBio(user)
}

const renderPhoto = (user) => {
    user.photo
        ? profilePhoto.src = user.photo
        : profilePhoto.src = "https://tinyurl.com/y5gp2urs"
}

const renderName = (user) => {
    user.name
        ? profileName.innerText = user.name
        : profileName.innerText = user.username
}

const renderBio = (user) => {
    user.bio
        ? profileBio.innerText = user.bio
        : profileBio.innerText = "Tell us about yourself!"
}

const logoutUser = () => {
    loggedIn = false
    currentUser = null
    logoutLink.style.display = 'none'
    loginLink.style.display = 'inline-block'
    createPostLink.style.display = 'none'
    profileLink.style.display = 'none'
    showLogin()
}

const createNewUser = () => {
    const formDataSignup = new FormData(loginForm)
    const usernameInput = formDataSignup.get('username')
    const passwordInput = formDataSignup.get('password')
    const configSignup = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'username': usernameInput,
            'password': passwordInput
        })
    }
    fetch(usersURL, configSignup)
        .then(response => response.json())
        .then(selectUser) //open profile

}

renderBrowse()
