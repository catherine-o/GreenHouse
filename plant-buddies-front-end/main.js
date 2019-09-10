const postsURL = 'http://localhost:3000/posts/'

const navList = document.querySelector('#nav-ul')
const browsePage = document.querySelector('#show-posts')
const createPage = document.querySelector('#create-post')
// const newPostButton = document.querySelector('#submit-post')
const createPostForm = document.querySelector('#create-post-form')
const postModal = document.querySelector('.modal')
const closeModalButton = document.querySelector('.modalCloseButton')

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
    card.classList.add('post-card')
    const cardTitle = document.createElement('h5')
    cardTitle.innerText = post.title 
    card.appendChild(cardTitle)
    const cardInfo = document.createElement('p')
    cardInfo.innerText = post.description
    card.appendChild(cardInfo)
    postArea.appendChild(card)
    addCardEvent(card)
    // browsePage.style.display='none'
}

const addCardEvent = (card) => {
    console.log(card)
    card.addEventListener('click', openModal)
}

const openModal = () => {
    if(event.target.tagName === 'DIV'){
        console.log(event.target)
        postModal.style.display = 'block'
    } else if (event.target.tagName === 'P'){
        console.log(event.target.parentNode)
        postModal.style.display = 'block'
    } else if (event.target.tagName === 'H5'){
        console.log(event.target.parentNode)
        postModal.style.display = 'block'
    }
    addCloseEvent()
}

const addCloseEvent = () => {
    closeModalButton.addEventListener('click', closeModal)
}

const closeModal = () => {
    postModal.style.display = 'none'
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