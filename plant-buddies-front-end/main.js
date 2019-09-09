const postURL = 'http://localhost:3000/posts/'

const getPosts = () => {
    fetch(postURL)
        .then(response => response.json())
        .then(listPosts)
}

const listPosts = (posts) => {
    posts.map(renderCard)
}

const renderCard = (post) => {
    const postArea = document.querySelector('#post-grid')
    const card = document.createElement('div')
    card.classList.add('post-card')
    const cardTitle = document.createElement('h5')
    cardTitle.innerText = post.title 
    card.appendChild(cardTitle)
    const cardInfo = document.createElement('p')
    cardInfo.innerText = post.description
    card.appendChild(cardInfo)
    postArea.appendChild(card)
}




getPosts()