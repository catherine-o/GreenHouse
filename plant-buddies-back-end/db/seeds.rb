# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all
User.destroy_all
Resource.destroy_all

radplantsPhoto = "https://tinyurl.com/y3n6vhky"
ilikeleavesPhoto = "https://tinyurl.com/y6q3vnzq"
natureloverPhoto = "https://tinyurl.com/yyu89vqs"

user1 = User.create(username: "radplants", name: "Cat", password: "test", bio: "plant lover", photo: radplantsPhoto)
user2 = User.create(username: "ilikeleaves", name: "Sarah", password: "test", bio: "I heart foliage", photo: ilikeleavesPhoto)
user3 = User.create(username: "naturelover", name: "Rick", password: "test", bio: "Books, flowers, mountains and wine", photo: natureloverPhoto)

post1 = Post.create(title: "Need help", description: "I have so many plants it sometimes takes a few hours to attend to them all. I'd appreciate the help today. By the way, I have a dog in the house but he's calm.", location: "RiNo")
post2 = Post.create(title: "Bad at plants", description: "I love my plants but can never tell what's going on. Can someone come check on how they're doing? Might need some repotted?", location: "Sunnyside")
post3 = Post.create(title: "Business Trip", description: "Will be away a couple days and the forecast says it will be hot! My garden will be thirsty, don't want my flowers to droop. Need someone to water in the mornings.", location: "Whittier")
post4 = Post.create(title: "I forgot!", description: "Forgot to water my plants! Need some quick help", location: "RiNo")
post5 = Post.create(title: "Vacation!", description: "will be away 5 days, please water my plants", location: "Baker")
post6 = Post.create(title: "Begonias", description: "Need someone to help tomorrow morning. I'm an older gentleman and my back can't handle the gardening right now. Looks like it will be nice weather.", location: "Lakewood")
post7 = Post.create(title: "Lawn Care", description: "Mowing, I have a lawn mower. Also pulling weeds and aeration.", location: "Wash Park")
post8 = Post.create(title: "Vine pruning", description: "My house has many vine plants and I can't reach some of them myself. Could you please help?", location: "Highlands")

Resource.create(name: "The Sill: Plant Delivery", link: "https://www.thesill.com/")
Resource.create(name: "Top 10 Plant Care Tips", link: "https://www.ambius.com/learn/online/top-tips/")
Resource.create(name: "Grow and Care", link: "https://growandcare.com/")
Resource.create(name: "Indoor Tropical Plants & Flower Care", link: "https://plantandflowerinfo.com/")
Resource.create(name: "How to Care For Potted Plants", link: "https://www.realsimple.com/home-organizing/how-to-care-for-potted-plants")
Resource.create(name: "House of Plants", link: "https://www.houseofplants.co.uk/index.php")
Resource.create(name: "Outdoor Plant Care", link: "https://www.gardenfactoryny.com/outdoor-plant-care")
Resource.create(name: "How to Plant Succulents", link: "https://www.southernliving.com/home-garden/gardens/how-to-plant-succulents")