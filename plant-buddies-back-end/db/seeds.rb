# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all
Home.destroy_all

home1 = Home.create(name: "Cat", bio: "plant lover")
home2 = Home.create(name: "Sarah", bio: "I heart foliage")
home3 = Home.create(name: "Rick", bio: "Books, flowers, mountains and wine")

post1 = Post.create(title: "Need help", description: "could use some help watering and pruning", details: "dog", location: "RiNo", home: home2)
post2 = Post.create(title: "Vacation!", description: "will be away 5 days, please water my plants", details: "no pets", location: "Baker", home: home1)
post3 = Post.create(title: "Begonias", description: "Need someone to help tomorrow morning", details: "no pets", location: "Lakewood", home: home3)
post4 = Post.create(title: "Begonias", description: "Need someone to help next Saturday", details: "no pets", location: "Lakewood", home: home3)