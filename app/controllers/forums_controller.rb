class ForumsController < ApplicationController

	def new
		@forum = Forum.new
		p "@forum is of type: #{@forum.class}"
	end

	def new_helper

		p "am getting into new_helper!!!!!"

		@forum = Forum.new()

		@forum.url = params[:url]
		@forum.title = params[:title]
		@forum.description = params[:description]
		@forum.name_of_assoc_subkeddit = params[:subKeddit_name]
		@forum.submitted_by = session[:user_name]
		#id can serve as unique num??		
		@forum.save()
	end


	def create

		p "am getting into create even though I shouldn't be"

		@forum = Forum.new()

		p "params[:title] is: #{params[:forum][:title]}"

		@forum.url = params[:forum][:url]
		@forum.title = params[:forum][:title]
		@forum.description = params[:forum][:description]
		@forum.name_of_assoc_subkeddit = params[:forum][:subKeddit_name]
		@forum.submitted_by = session[:user_name]
		#id can serve as unique num??		
		@forum.save()

		# p "@forum.title is: #{@forum.title }"
		# return @forum
	end

	def index
		# @forums = SubKeddit.find(params[:id]).forum.all
		@forums = SubKeddit.find(1).forum.all #for that subKeddit, all the forums/posts
	end

	def show

		p"------------------------------"

		p "params[:sub_keddit_name] is: #{params[:sub_keddit_name]}"
		p "params[:forum_title] is: #{params[:forum_title]}"

		# @temp = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.find_by(title: params[:forum_title])

		@temp = SubKeddit.find_by(name: params[:sub_keddit_id]).forum.find_by(title: params[:id])

		p "@temp is: #{@temp}" 

		p"------------------------------"

		#use 1 for params[:sub_keddit_id]
		#use 3 for params[:id]

		#for that forum in that subKeddit, all the posts

		#working. At least does with the right parameters from view. 
		# @posts = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.find_by(title: params[:forum_title]).post.all 

		@posts = SubKeddit.find_by(name: params[:sub_keddit_id]).forum.find_by(title: params[:id]).post.all 
	end


	def showy

		p"------------------------------"

		p "params[:sub_keddit_name] is: #{params[:sub_keddit_name]}"
		p "params[:forum_title] is: #{params[:forum_title]}"

		# @temp = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.find_by(title: params[:forum_title])

		@temp = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.find_by(title: params[:forum_title])

		p "@temp is: #{@temp}" 

		p"------------------------------"

		#use 1 for params[:sub_keddit_id]
		#use 3 for params[:id]

		#for that forum in that subKeddit, all the posts

		#working. At least does with the right parameters from view. 
		@posts = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.find_by(title: params[:forum_title]).post.all 
	end

end
