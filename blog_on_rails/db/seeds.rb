# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.delete_all
Post.delete_all

50.times do 
    p = Post.create(
        title: Faker::Lorem.word ,
        body: Faker::ChuckNorris.fact,
        created_at: Faker::Date.backward(365 * 3),
        updated_at: Faker::Date.backward(365 * 3)
    )
    if p.valid?
        p.comments = rand(1..5).times.map do
            Comment.create(
                body: Faker::ChuckNorris.fact,
                # created_at: Faker::Date.backward(365 * 3),
                # updated_at: Faker::Date.backward(365 * 3)
            )
        end    
    end
end

p "generated #{Post.all.count} posts"
p "generated #{Comment.all.count} comments"