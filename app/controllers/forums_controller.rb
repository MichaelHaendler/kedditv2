class ForumsController < ApplicationController

	#before_create :generate_token
# title
# url
# description
# name_of_assoc_subkeddit (special)--
# submitted_by (special)--
# sub_keddit_id (special)--

	def create

		p "(create)"

		p "params[:name_of_assoc_subkeddit] is: #{params[:forum][:name_of_assoc_subkeddit]}"

		id = SubKeddit.find_by(name: params[:forum][:name_of_assoc_subkeddit]).id

		p "make_url_friendly_title(params[:forum][:title]) is: #{make_url_friendly_title(params[:forum][:title])}"


		# Forum.create(title: params[:title], url: params[:url], description: params[:description],
		# 		submitted_by: session[:user_name], name_of_assoc_subkeddit: params[:forum][:name_of_assoc_subkeddit],
		# 		sub_keddit_id: id, unique_num: make_a_token())
		Forum.create(title: params[:forum][:title], url: params[:forum][:url], description: params[:forum][:description],
				submitted_by: session[:user_name], name_of_assoc_subkeddit: params[:forum][:name_of_assoc_subkeddit],
				sub_keddit_id: id, unique_num: make_a_token(), url_friendly_title: make_url_friendly_title(params[:forum][:title]))

	end

	def make_url_friendly_title(string)
		# http://stackoverflow.com/questions/13843574/ruby-regex-replace-characters-between-two-numbers
		# return string.gsub(' ', /_/)
		results = ""

		string.each_char do |char|

			if char == " "

				results << "_"

			#replace with reg expression
			elsif (char.ord >= 48  and char.ord <= 57) or (char.ord >= 65  and char.ord <= 90) or (char.ord >= 97  and char.ord <= 122) 

				results << char

			end

		end

		return results
	end



  def save_changes_to_comment

    p "getting into save_changes_to_comment"

    p "params[:new_post] is: #{params[:new_post]}"

    p "params[:post_id_num] is: #{params[:post_id_num]}"

    p "session[:id] is: #{session[:id]}"

    #@temp = User.find(session[:id]).getPosts()

    #debugger

    p "User.find(session[:id]).getPosts() is: #{User.find(session[:id]).getPosts().inspect}"

    #get post that we're looking for
    @post = User.find(session[:id]).getPosts().find_by(post_id_rel_to_user: params[:post_id_num])

    p "@post is: #{@post.inspect}"

    #debugger

    #update content
    @post.content = params[:new_post]

    #save changes to it. 
    @post.save

    respond_to do |format|
      format.html

      format.json { render :json => { :status => 'Ok', :message => 'Received'},:status => 200}
                  
    end

  end

  def current_user()

  	p "session[:password_hash] is: #{session[:password_hash]}"

    User.find_by(user_name: session[:user_name], password_digest: session[:password_hash])
    
  end

  def logged_in()

  	p "session[:password_hash] is: #{session[:password_hash]}"

  	if session[:user_name].present? and session[:password_hash].present?
		User.find_by(user_name: session[:user_name], password_digest: session[:password_hash]).present?
	else
		false
	end
    
  end

	def all_requirements_for_mod_of_post_met(userName,subKedditName,forumTitle,forumUniqueNum,userPostID)

		#user = User.find_by(user_name: session[:user_name], password_digest: session[:password_hash])

		user = current_user()

		if user.present?
			post = Post.find_by(user_name: userName, 
								sub_keddit_name: subKedditName,
								forum_title: forumTitle,
								forum_unique_num: forumUniqueNum,
								post_id_rel_to_user: userPostID)
								

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
		#post_id = params[:post_id]
		userPostId = params[:post_id_rel_to_user]

		#can't use this to look up value since delete and edit would have diff values for post_content
		post_content = params[:post_content]


		p "modifyPost --------------------"
		p "userName is: #{userName}"
		p "post_id_rel_to_user is: #{userPostId}"
		p "subKedditName is: #{subKedditName}"
		p "forumTitle is: #{forumTitle}"
		p "forumUniqueNum is: #{forumUniqueNum}"
		p "to_do is: #{to_do}"
		p "--------------------------------"

		if all_requirements_for_mod_of_post_met(userName,subKedditName,forumTitle,forumUniqueNum,userPostId)

			post = Post.find_by(post_id_rel_to_user: userPostId,
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

	def other_users_post_exist()

		p "params[:otherUsers_user_name] is: #{params[:otherUsers_user_name]}"

		p "params[:otherUsers_post_id_rel_to_user] is: #{params[:otherUsers_post_id_rel_to_user]}"

		Post.find_by(user_name: params[:otherUsers_user_name], 
					 post_id_rel_to_user: params[:otherUsers_post_id_rel_to_user]).present?
		
	end


#Post.where(forum_title: "awesome_new_computer").update(forum_id: 3)

#Post.where(forum_title: "awesome_new_computer").where(forum_id: nil).update_all(forum_id: 3)
#Post.where(forum_title: "awesome new computer").where(forum_id: nil).update_all(forum_id: 3)

	#used once for cleaning up some data. 
	def insert_into_post_array()

		#get the forum
		forum = Forum.find_by(url_friendly_title: "awesome_new_computer")

		#get it's posts 
		#posts = forum.post.all
		posts = Post.where(forum_id: 3).or(Post.where(forum_title: "awesome_new_computer"))

		posts.each do |post|
			reply_holder = [] 
			p_obj = [post,reply_holder] #pseudo_object
			forum.post_array.post.push(p_obj)
		end

		forum.post_array.save

	end

	def replyToPost()

		#otherUsers_user_name
		#otherUsers_post_id_rel_to_user (get from comment)

		#post = nil #just so that there's something

		new_comments_loc = ""

		p "22222(replyToPost)---------------"

		p "is the user logged in? #{logged_in()}"

		p "does the other use exist? #{other_users_post_exist()}"



		if logged_in() and other_users_post_exist()

			p "getting in here??????????????????"

			post_being_replied_to = Post.find_by(
											sub_keddit_name: params[:sub_keddit_name],
											forum_title: params[:forum_title],
											forum_unique_num: params[:forum_unique_num],
											user_name: params[:otherUsers_user_name],
											post_id_rel_to_user: params[:otherUsers_post_id_rel_to_user]
											)

			its_loc_in_forum = post_being_replied_to.loc_of_comment_in_forum

			p "its_loc_in_forum is of type: #{its_loc_in_forum.class}"			

			p "@ is of type: #{"@".class}"

			p "* is of type: #{"*".class}"

			p "post_being_replied_to.post_id_rel_to_user.to_s is of type: #{post_being_replied_to.post_id_rel_to_user.to_s.class}"

			p "its_loc_in_forum is: #{its_loc_in_forum}"

			if its_loc_in_forum == ""
				new_comments_loc = post_being_replied_to.user_name + "*" + post_being_replied_to.post_id_rel_to_user.to_s + "@"
			else
				new_comments_loc = its_loc_in_forum + post_being_replied_to.user_name + "*" + post_being_replied_to.post_id_rel_to_user.to_s + "@"
			end

			#works as of march 3rd 2015
			# post = Post.new(
			# 	User_id: session[:id],
			# 	user_name: session[:user_name],
			# 	forum_title: params[:forum_title], 
			# 	forum_unique_num: params[:forum_unique_num], 
			# 	sub_keddit_name: params[:sub_keddit_name],
			# 	content: params[:submission],
			# 	inReplyTo_user_name: params[:otherUsers_user_name],
			# 	inReplyTo_post_id_rel_to_user: params[:otherUsers_post_id_rel_to_user]
			# 	)

			post = Post.new(
				User_id: session[:id],
				user_name: session[:user_name],
				forum_title: params[:forum_title], 
				forum_unique_num: params[:forum_unique_num], 
				sub_keddit_name: params[:sub_keddit_name],
				content: params[:submission],
				inReplyTo_user_name: params[:otherUsers_user_name],
				inReplyTo_post_id_rel_to_user: params[:otherUsers_post_id_rel_to_user],
				loc_of_comment_in_forum: new_comments_loc
				)

			p "post is: #{post.inspect}"

			post.save

			forum = Forum.find_by(url_friendly_title: params[:forum_title], unique_num: params[:forum_unique_num])

			forum.post_array.insert_post(post)
			#PostArray.insert_post(post)

		end
		

		

	    respond_to do |format|
	      format.html

	      #am sending post back so that the commentBlock can have the right value 
	      format.json { render :json => { :status => 'Ok', :message => 'Received', :post => post},:status => 200}
	                  
	    end


	end 

	#on success...repaint subkeddit screen. 
	def submitNewPost()
		p "yay!!!! got into submitNewPost!!!"


		p "session[:user_name] is: #{session[:user_name]}"

		p "session[:id] is: #{session[:id]}"

		# p "params[:forum_title] is: #{params[:forum_title]}"


		# #add new post to that forum
		# User.find_by(user_name: session[:user_name]).post.new(forum_title: params[:forum_title], 
		# 														forum_unique_num: params[:forum_unique_num], 
		# 														sub_keddit_name: params[:sub_keddit_name],
		# 														content: params[:content]).save

	#-----
		# Post.new(user_id: session[:id],
		# 		user_name: session[:user_name],
		# 		forum_title: params[:forum_title], 
		# 		forum_unique_num: params[:forum_unique_num], 
		# 		sub_keddit_name: params[:sub_keddit_name],
		# 		content: params[:submission]).save

		# post_id_rel_to_user = Post.find_by(user_name: session[:user_name],
		# 		forum_title: params[:forum_title], 
		# 		forum_unique_num: params[:forum_unique_num], 
		# 		sub_keddit_name: params[:sub_keddit_name],
		# 		content: params[:submission]).post_id_rel_to_user

	#------

			post = Post.new(User_id: session[:id],
				user_name: session[:user_name],
				forum_title: params[:forum_title], 
				forum_unique_num: params[:forum_unique_num], 
				sub_keddit_name: params[:sub_keddit_name],
				content: params[:submission])


			#post.increment_post_id_rel_to_user_val2()

			post.save

			p "SHOULD HAVE SEEN RUN OF increment_post_id_rel_to_user_val JUST NOW!!!"
			p "post is: #{post.inspect}"

			#self.post_array.insert_post(post)


			forum = Forum.find_by(url_friendly_title: params[:forum_title], unique_num: params[:forum_unique_num])

			forum.post_array.insert_post(post)
			#PostArray.insert_post(post)

		#every time this action is ran, the most recent thing should be the last thing inserted...so hopefully
		#this will work every time. 
		#post_id = Post.last_insert_rowid()



		# this works. not using it because there is no need to look up the entire page of comments and then redraw 
		#the entire page when the person hits the submit button. 
		# @posts = Post.where(forum_title: params[:forum_title], 
		# 					forum_unique_num: params[:forum_unique_num], 
		# 					sub_keddit_name: params[:sub_keddit_name])

		p "post_id_rel_to_user is:"
		p post.post_id_rel_to_user

	    respond_to do |format|
	      format.html

	      #format.json { render :json => { :status => 'Ok', :message => 'Received', :posts => @posts},:status => 200}
	      # format.json { render :json => { :status => 'Ok', :message => 'Received'}:status => 200}
	      format.json { render :json => { :status => 'Ok', :message => 'Received', :post => post},:status => 200}
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
		@forum.post_array = PostArray.new
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


	# def create

	# 	p "am getting into create even though I shouldn't be"

	# 	@forum = Forum.new()

	# 	p "params[:title] is: #{params[:forum][:title]}"

	# 	@forum.url = params[:forum][:url]
	# 	@forum.title = params[:forum][:title]
	# 	@forum.description = params[:forum][:description]
	# 	@forum.name_of_assoc_subkeddit = params[:forum][:subKeddit_name]
	# 	@forum.submitted_by = session[:user_name]
	# 	#id can serve as unique num??		
	# 	@forum.save()

	# 	# p "@forum.title is: #{@forum.title }"
	# 	# return @forum
	# end

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




  protected

  #   	#this isn't what I want. Not exactly. However, once implemented, it should be pretty easy to replace. 
		# def generate_token
		# 	self.unique_num = Digest::SHA1.hexdigest([Time.now, rand].join)[0..5]
		# end
		def make_a_token
			return Digest::SHA1.hexdigest([Time.now, rand].join)[0..5]
		end

end
