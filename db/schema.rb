# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150221231900) do

  create_table "forums", force: true do |t|
    t.string   "title"
    t.string   "url"
    t.text     "description"
    t.integer  "unique_num"
    t.string   "name_of_assoc_subkeddit"
    t.string   "submitted_by"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "sub_keddit_id"
    t.string   "url_friendly_title"
    t.integer  "num_of_posts",            default: 0
  end

  create_table "posts", force: true do |t|
    t.text     "content"
    t.integer  "User_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.integer  "post_id_rel_to_user",           default: 0
    t.string   "inReplyTo_user_name"
    t.integer  "inReplyTo_post_id_rel_to_user"
    t.integer  "upvote"
    t.integer  "downvote"
    t.integer  "forum_id"
    t.string   "user_name"
    t.string   "sub_keddit_name"
    t.string   "forum_title"
    t.integer  "forum_unique_num"
  end

  add_index "posts", ["User_id"], name: "index_posts_on_User_id"

  create_table "sub_keddits", force: true do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "password"
    t.string   "user_name"
    t.string   "password_confirmation"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "email"
    t.boolean  "admin",                 default: false
    t.string   "password_digest"
  end

end
