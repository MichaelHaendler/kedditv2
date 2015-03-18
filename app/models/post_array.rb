#http://stackoverflow.com/questions/5231534/ruby-on-rails-static-method
#PostArray.all to see all in command line
class PostArray < ActiveRecord::Base
	belongs_to :forum
	serialize :posts

	# def blah()
	# end

	#post should be the entire object. comment, user, string signaling where it lies in the forum, (upvotes, eventually) etc. 
	def insert_post(post)

		p "(insert_post)???????????????????????????????????"

		#build object
		reply_holder = [] #create array for holding replies 
		p_obj = [post,reply_holder] #pseudo_object

		#get string (named path), and turn it into something usable 
		# will be something like [[mike,2],[tim,304],[jake,12]] also, note, no nested elements.
		#no matter where it is in the general array, 
		path = make_into_search_array(post.loc_of_comment_in_forum);

		find_loc(path,p_obj)

	end

# "@jon*23@mike*301@tim*12@andrew*33".split(/[@]/)
# => ["", "jon*23", "mike*301", "tim*12", "andrew*33"]

# "jon*23".split(/[*]/)
# => ["jon", "23"]

#need to fix it so that output is like this: 
#"jon*23@mike*301@tim*12@andrew*33"

# return should be: 
# [["jon","23"],["mike","301"],["tim","12"],["andrew","33"]]

	def make_into_search_array(string)

		p "(make_into_search_array)"

		entire_array = []
		temp_array = string.split(/[@]/)

		for segment in temp_array
			entire_array.push(segment.split(/[*]/))
		end

		return entire_array

	end

	#did things this way so that I could have a "regular" action (find_loc) call the work horse recurrsive action (find_loc_helper). 
	def find_loc(path,p_obj)

		p "(find_loc)"

		find_loc_helper(self.posts,path,p_obj)
	end


	def find_loc_helper(forum_array,path,p_obj)

		p "(find_loc_helper) PostArray.rb"

		p "path is: #{path.inspect}"

		#for path, which is an array, setup like so [users name, post]
		user_name = 0 
		post_id = 1

		#for reply_array which is set up like so: [post,array]. array will be an an array of posts, each one (post)
		#having it's own array for replies. 
		users_post = 0
		users_array = 1

		if path.length > 0 
			curr = path[0] #current post num and user name that we're looking for. 

			#[[post1 array],[post1,[post1 array]],[post1 array]]

			forum_array.each do |reply_array|

				post = reply_array[users_post]

				#if we don't find what we're looking for, then we do nothing
	 
				#if we find what we're looking for (but are at the last el in array), insert into it's array and end
				if post.user_name == curr[user_name] and post.post_id_rel_to_user == curr[post_id] and path.length == 1
					# #append to array that it belongs to (hopefully this works)
					reply_array[users_array].push(p_obj)
					return true #to end this one loop

				#if not last one on the path (but is what we're looking for right now), pop it off, (of path), take the array(s)
				#that are still to be searched, and feed, and the p_obj, and feed that into find_loc  
				elsif post.user_name == curr[user_name] and post.post_id_rel_to_user == curr[post_id] and path.length > 1

					#rest of path (e.g. tim*33@mike*67@jake*21)
					rest_of_path = path[1..-1]

					#the replies and completely unrelated conversations that are attached to this particular post
					rest_of_reply_arrays = reply_array[users_array]

					#going by above example, (for starters) now look for user name tim, post 33 , in the remainder of 
					#the thread
					find_loc(rest_of_reply_arrays, rest_of_path, p_obj)
					return true #just to get things to end

				end

				#otherwise, just keep looping until we find what we're looking for. Not perfect, but (shrugs).

			end

		else
			#not a reply to anyone (an original, by itself post) so just append to the end. 
			p "else statement in find_loc_helper in post_array.rb"
			forum_array.push(p_obj)
			self.save

			p "forum_array is: #{forum_array}"
			#return true
		end

	end
	
	#go through it 

	#-- take name and post_id_rel_to_user number, and find that in the current array

	#--set it's replies array to be the array gone through next. 

	#--keep doing this until you run out of string. 

	#once you've gone through the whole string, take the repl's array that you're current looking at
	#and add p_obj to it. 

	#http://stackoverflow.com/questions/3615700/ruby-what-is-the-easiest-way-to-remove-the-first-element-from-an-array
	#explains the [1..-1]
	# def find_loc_helper(forum_array,path,p_obj)
	# 	users_post = 0
	# 	users_array = 1
	# 	curr = path[0] #current post num and user name that we're looking for. 

	# 	#[[post1 array],[post1,[post1 array]],[post1 array]]

	# 	forum_array.each do |reply_array|

	# 		post = reply_array[users_post]

	# 		#if we don't find what we're looking for, then we do nothing
 
	# 		#if we find what we're looking for (but are at the last el in array), insert into it's array and end
	# 		if post.user_name == curr[user_name] and post.post_id_rel_to_user == curr[user_name] and path.length == 1
	# 			reply_array[users_array].append(p_obj)
	# 			return true #to end this one loop

	# 		#if not last one on the path (but is what we're looking for right now), pop it off, (of path), take the array(s)
	# 		#that are still to be searched, and feed, and the p_obj, and feed that into find_loc  
	# 		elsif post.user_name == curr[user_name] and post.post_id_rel_to_user == curr[user_name] and path.length > 1

	# 			rest_of_path = path[1..-1]

	# 			rest_of_reply_arrays = reply_array[users_array]

	# 			find_loc(rest_of_reply_arrays, rest_of_path, p_obj)
	# 			return true #just to get things to end

	# 		end

	# 		#otherwise, just keep looping until we find what we're looking for. Not perfect, but (shrugs).

	# 	end

	# end


end
