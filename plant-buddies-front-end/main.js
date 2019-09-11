const postsURL = 'http://localhost:3000/posts/'
const foliageURL = 'https://www.thegardenglove.com/wp-content/uploads/2014/05/img_0585.jpg'

const navList = document.querySelector('#nav-ul')
const browsePage = document.querySelector('#show-posts')
const createPage = document.querySelector('#create-post')
const createPostForm = document.querySelector('#create-post-form')
const postModal = document.querySelector('.modal')
const closeModalButton = document.querySelector('.modalCloseButton')
const modalHeader = document.querySelector('.modal-header').lastElementChild
const modalBody = document.querySelector('.modal-body')
const modalLocation = modalBody.firstElementChild
const modalDescription = modalBody.children[1]
const modalImage = document.querySelector('.modal-image')
const contactButton = document.querySelector('.modal-contact-button')


const renderBrowse = () => {
    addNavEvent()
    getPosts()
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

    const cardLocation = document.createElement

    const cardInfo = document.createElement('p')
    cardInfo.innerText = post.description
    cardInfo.style.display = 'none'
    card.appendChild(cardInfo)

    const cardImg = document.createElement('img')
    cardImg.classList.add('card-image')
    cardImg.src = foliageURL
    
    card.appendChild(cardImg)
    postArea.appendChild(card)
    addCardEvent(card)
    // browsePage.style.display='none'
}

const addCardEvent = (card) => {
    card.addEventListener('click', openModal)
}

const openModal = () => {
    let cardID = ''
    postModal.style.display = 'block'
    if(event.target.tagName === 'DIV'){
        cardID = event.target.dataset.id
    // } else if (event.target.tagName === 'P'){
    //     cardID = event.target.parentNode.dataset.id
    } else if (event.target.tagName === 'H5'){
        cardID = event.target.parentNode.dataset.id
    } else if (event.target.tagName === 'IMG'){
        cardID = event.target.parentNode.dataset.id
    }
    renderModalText(cardID)
    addCloseEvents()
}

const renderModalText = (cardID) => {
    const modalCard = document.querySelector(`[data-id="${cardID}"]`)
    const location = modalCard.dataset.location
    console.log(modalCard)
    modalHeader.innerText = modalCard.firstElementChild.innerText
    if (location !== 'null') {
        modalLocation.innerText = location
    } else {
        modalLocation.innerText = ' '
    }
    
    modalDescription.innerText = modalCard.children[1].innerText
    modalImage.src = modalCard.children[2].src
    modalImage.classList.add('modal-image')
}

const addCloseEvents = () => {
    closeModalButton.addEventListener('click', closeModal)
    window.addEventListener('click', clickOutsideModal)
}

const closeModal = () => {
    postModal.style.display = 'none'
}

function clickOutsideModal(e){
    if (e.target === postModal) {
        postModal.style.display = 'none'
    }
}



const addNavEvent = () => {
    navList.addEventListener('click', switchPage)
}

const switchPage = () => {
    const id = event.target.id
    if(id === 'browse' && browsePage.style.display === 'none'){
        browsePage.style.display = 'block'
        createPage.style.display = 'none'
        document.location.reload()
    } else if(id === 'create'){
        createPage.style.display = 'block'
        browsePage.style.display = 'none'
        addCreateEvent()
    }
}

const addCreateEvent = () => {
    createPostForm.addEventListener('submit', createNewPost)
}

const createNewPost = () => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const postTitle = formData.get("post-title")
    const postDescription = formData.get("post-description")
    const config = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // "Access-Control-Allow-Origin": "*", 
            // "Access-Control-Allow-Credentials": true 
        },
        body: JSON.stringify({
            'title': postTitle,
            'description': postDescription
        })
    }
    fetch(postsURL, config)
        .then(response => response.json())
        // .then(res => console.log(res))
        .then(createCardFromForm)
        // .then(post => renderBrowse(post))
        // .then(post => renderCard(post))
}

const createCardFromForm = (post) => {
    browsePage.style.display = 'block'
    createPage.style.display = 'none'
    renderCard(post)
}


renderBrowse()