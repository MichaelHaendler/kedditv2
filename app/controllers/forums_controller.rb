class ForumsController < ApplicationController

	# before_create :generate_token

  def current_user()

  	p "session[:password_hash] is: #{session[:password_hash]}"

    User.find_by(user_name: session[:user_name], password_digest: session[:password_hash])
    
  end

	def all_requirements_for_mod_of_post_met(userName,subKedditName,forumTitle,forumUniqueNum)

		#user = User.find_by(user_name: session[:user_name], password_digest: session[:password_hash])

		user = current_user()

		if user.present?
			post = Post.find_by(user_name: userName, 
								sub_keddit_name: subKedditName,
								forum_title: forumTitle,
								forum_unique_num: forumUniqueNum)
								

			if post.present?
				p "post.present? returns true!!!!!!!"
				return true
			else
				p "post.present? returns FALSE!!!!!!"
				return false
			end

		else
			p "user.present? returns FALSE!!!!!!"
			return false

		end

	end

	def modifyPost()

		success = false

		userName = session[:user_name]
		subKedditName = params[:sub_keddit_name]
		forumTitle = params[:forum_title]
		forumUniqueNum = params[:forum_unique_num]
		to_do = params[:to_do]
		post_id = params[:post_id]

		#can't use this to look up value since delete and edit would have diff values for post_content
		post_content = params[:post_content]

		if all_requirements_for_mod_of_post_met(userName,subKedditName,forumTitle,forumUniqueNum)

			post = Post.find_by(id: post_id,
								user_name: userName, 
								sub_keddit_name: subKedditName,
								forum_title: forumTitle,
								forum_unique_num: forumUniqueNum)

			if to_do == "delete"
				#debugger
				p "2221111getting into delete section!!!!!!!!!!!"
				#for some reason, printing our the value before deleting it (in either javascript or here)
				#helps to allow the call to destroy (directly below) work. Otherwise, it doesn't always work. 
				#no idea why. 
				p post.inspect
				post.destroy
			end 

			if to_do == "save_changes"
				post.update(content: post_content)
			end

			success = true
		end

		#don't need an 'else' because the default is false. 
	    respond_to do |format|
	      format.html

	      format.json { render :json => { :status => 'Ok', :message => 'Received', :success => success},:status => 200}
	    end


	end


	def getPosts()
		Post.find_by(forum_id: self.id)
	end

	#on success...repaint subkeddit screen. 
	def submitNewPost()
		p "yay!!!! got into submitNewPost!!!"


		# p "session[:user_name] is: #{session[:user_name]}"

		# p "params[:forum_title] is: #{params[:forum_title]}"


		# #add new post to that forum
		# User.find_by(user_name: session[:user_name]).post.new(forum_title: params[:forum_title], 
		# 														forum_unique_num: params[:forum_unique_num], 
		# 														sub_keddit_name: params[:sub_keddit_name],
		# 														content: params[:content]).save


		Post.new(user_name: session[:user_name],
				forum_title: params[:forum_title], 
				forum_unique_num: params[:forum_unique_num], 
				sub_keddit_name: params[:sub_keddit_name],
				content: params[:submission]).save

		post_id = Post.find_by(user_name: session[:user_name],
				forum_title: params[:forum_title], 
				forum_unique_num: params[:forum_unique_num], 
				sub_keddit_name: params[:sub_keddit_name],
				content: params[:submission]).id

		#every time this action is ran, the most recent thing should be the last thing inserted...so hopefully
		#this will work every time. 
		#post_id = Post.last_insert_rowid()



		# this works. not using it because there is no need to look up the entire page of comments and then redraw 
		#the entire page when the person hits the submit button. 
		# @posts = Post.where(forum_title: params[:forum_title], 
		# 					forum_unique_num: params[:forum_unique_num], 
		# 					sub_keddit_name: params[:sub_keddit_name])

		p "post_id is:"
		p post_id

	    respond_to do |format|
	      format.html

	      #format.json { render :json => { :status => 'Ok', :message => 'Received', :posts => @posts},:status => 200}
	      # format.json { render :json => { :status => 'Ok', :message => 'Received'}:status => 200}
	      format.json { render :json => { :status => 'Ok', :message => 'Received', :post_id => post_id},:status => 200}
	    end

	end

	def showForum

		p "params[:sub_keddit_name] is: #{params[:sub_keddit_name]}"

		p "params[:forum_unique_num] #{params[:forum_unique_num]}"

		p "params[:forum_title] is: #{params[:forum_title]}"


		@forum = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.find_by(unique_num: params[:forum_unique_num] ,url_friendly_title: params[:forum_title])

		#the reason I'm using this code as opposed to the code above (the above runs just fine) is because I don't want to be relying
		#on the forum_id number (even though it's probably basically impossible to run out of numbers)
		#@forum = Forum.find_by(unique_num: params[:forum_unique_num] ,url_friendly_title: params[:forum_title])

		#p "@forum is: #{@forum.url_friendly_title}"

		#logger.debug "NEW @forum is: #{@forum.index}"

		#p "@forum.post.all is: #{@forum.post.all}"
		#p "@forum.getPosts() is: #{@forum.getPosts()}"

		# @posts = @forum.post.all.select("content")

		@posts = Post.where(forum_title: params[:forum_title], 
							forum_unique_num: params[:forum_unique_num], 
							sub_keddit_name: params[:sub_keddit_name])
		#@posts = @forum.post.all

		#p "@posts.all is: #{@posts.all}"

		p @posts.all

		#debugger

		#debugger

		# @postArray = []

		# #---

		# (@posts).each do |post|
		# 	#p "post.content is: #{post.content}"
		# 	temp = post.content.to_s
		# 	p "temp is: #{temp}"
		# 	@postArray.push(temp)
		# end

		# p "@postArray is: #{@postArray}"

		#---

		#debugger

		#@number_of_posts = @posts.length

	    # respond_to do |format|
	    #   format.html

	    #   format.json { render :json => { :status => 'Ok', :message => 'Received', posts: posts},:status => 200}
	    # end

	end

	def showForum_helper

	end



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

		p "getting into forum#showy2222222222222222222222"

		@user = User.find(session[:id])

		@forum = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.find_by(url_friendly_title: params[:forum_title])
		# p "SubKeddit.find_by(name: params[:sub_keddit_name]).forum is: #{SubKeddit.find_by(name: params[:sub_keddit_name]).forum.all}"
		# p "@forum is: #{@forum}"
		@posts = @forum.post.all 

		@number_of_posts = @posts.length

		p "@number_of_posts is: #{@number_of_posts}"

	    respond_to do |format|
	      format.html

	      format.json { render :json => { :status => 'Ok', :message => 'Received', posts: @posts},:status => 200}
	    end

	end




  #   protected

  #   	#this isn't what I want. Not exactly. However, once implemented, it should be pretty easy to replace. 
		# def generate_token
		# 	self.unique_num = Digest::SHA1.hexdigest([Time.now, rand].join)[0..5]
		# end

end
