class AddReference < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :user, foreign_key: true
  end

  def change
    add_reference :comments, :user, foreign_key: true
  end

end
