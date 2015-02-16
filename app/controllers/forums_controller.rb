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


		#redirect_to display_forum(@forum)
		# p "@forum.title is: #{@forum.title }"
		# return @forum
	end


	def display_forum(zoom)
		@forum = zoom
		return @forum
	end

end
