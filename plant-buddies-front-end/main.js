const postsURL = 'http://localhost:3000/posts/'
// const foliageURL = 'https://www.thegardenglove.com/wp-content/uploads/2014/05/img_0585.jpg'
const leafs1 = 'assets/images/leafs1.jpeg'
const leafs2 = 'assets/images/leafs2.jpeg'
const leafs3 = 'assets/images/leafs3.jpeg'
const foliage1 = 'assets/images/foliage1.jpg'
const foliage2 = 'assets/images/foliage2.jpg'
const foliage3 = 'assets/images/foliage3.jpg'
const flower1 = 'assets/images/flower1.jpg'
const flower2 = 'assets/images/flower2.jpg'
const garden1 = 'assets/images/garden1.jpg'
const garden2 = 'assets/images/garden2.jpg'
const garden3 = 'assets/images/garden3.jpg'
const indoor1 = 'assets/images/indoor1.jpg'
const indoor2 = 'assets/images/indoor2.jpg'
const indoor3 = 'assets/images/indoor3.jpg'
const indoor4 = 'assets/images/indoor4.jpg'
const indoor5 = 'assets/images/indoor5.jpg'
const patio1 = 'assets/images/patio1.jpg'
const patio2 = 'assets/images/patio2.jpg'
const plantImages = [leafs1, leafs2, leafs3, foliage1, foliage2, foliage3, flower1, flower2, garden1, garden2, garden3, indoor1, indoor2, indoor3, indoor4, indoor5, patio1, patio2]

const navList = document.querySelector('#nav-ul')
const browsePage = document.querySelector('#show-posts')
const createPage = document.querySelector('#create-post')
const createPostForm = document.querySelector('#create-post-form')
const editPage = document.querySelector('#edit-post')
const editPostForm = document.querySelector('#edit-post-form')
const postModal = document.querySelector('.modal')
const closeModalButton = document.querySelector('.modalCloseButton')
const modalHeader = document.querySelector('.modal-header').lastElementChild
const modalBody = document.querySelector('.modal-body')
const modalLocation = modalBody.firstElementChild
const modalDescription = modalBody.children[1]
const modalImage = document.querySelector('.modal-image')
const contactButton = document.querySelector('.modal-contact-button')
const editPostButton = document.querySelector('.modal-edit-button')
const deletePostButton = document.querySelector('.modal-delete-button')


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
    cardImg.src = getRandomImage(plantImages, 'assets/images')
    
    card.appendChild(cardImg)
    postArea.appendChild(card)
    addCardEvent(card)
    // browsePage.style.display='none'
}

function getRandomImage(imgAr, path) {
    path = path || 'images/'; // default path here
    var num = Math.floor( Math.random() * imgAr.length );
    var img = imgAr[ num ];
    // var imgStr = '<img src="' + path + img + '" alt = "">';
    // document.write(imgStr); document.close();
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
    // } else if (event.target.tagName === 'P'){
    //     cardID = event.target.parentNode.dataset.id
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

const addModalEvents = () => {
    closeModalButton.addEventListener('click', closeModal)
    window.addEventListener('click', clickOutsideModal)
    editPostButton.addEventListener('click', editPost)
}

const closeModal = () => {
    postModal.style.display = 'none'
}

function clickOutsideModal(e){
    if (e.target === postModal) {
        postModal.style.display = 'none'
    }
}

function editPost(){
    browsePage.style.display = 'none'
    editPage.style.display = 'block'
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
    } else if (id === 'login'){
        createPage.style.display = 'none'
        browsePage.style.display = 'none'
    }
}

const addCreateEvent = () => {
    createPostForm.addEventListener('submit', createNewPost)
}

const createNewPost = () => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const postTitle = formData.get("post-title")
    const postLocation = formData.get("post-location")
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
            'location': postLocation,
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