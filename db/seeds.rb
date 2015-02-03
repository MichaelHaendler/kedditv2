# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#overly complicated, but fuck it. 
#note: code needs to be at the top like this, otherwise it won't be seen when it's called in the 
#creation of new users below. 
def generate_user_name()
	Faker::Lorem.word + "_" + Faker::Lorem.word + rand.to_s[2..3]
end


User.create!(name: "Tommy" , user_name: "Mike0" , password: "a" , email: "Mike0@gmail.com", admin: true)

2.times do
  name  = Faker::Name.name
  email = Faker::Internet.email
  password = "password"
  userName = generate_user_name()
  User.create!(name:  name,
               email: email,
               user_name: userName,
               password: password)
end


