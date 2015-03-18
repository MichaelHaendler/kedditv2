class SubKedditsController < ApplicationController

	def new
		@create_sub_keddit = SubKeddit.new
	end

	def create

		#p "params[:sub_keddit][:name] is: #{params[:sub_keddit][:name]}"

		SubKeddit.create(name: params[:sub_keddit][:name])
		#also have a thing where a message pops up on the front page saying "subkeddit created"
		redirect_to root_path
	end

	def index
		@subKeddits = SubKeddit.all

		@subKeddits.each do |sk|
			p "sk.name is: #{sk.name}"
		end

	end


	def show
		# @forums = SubKeddit.find(params[:id]).forum.all
		@sub_keddit_name = params[:id]
		@forums = SubKeddit.find_by(name: params[:id]).forum.all
	end

	def showy
		@sub_keddit_name = SubKeddit.find_by(name: params[:sub_keddit_name]).name
		@forums = SubKeddit.find_by(name: params[:sub_keddit_name]).forum.all
	end	

	# def list_of_forums
	# 	p "should NOT be getting here22222222222222222222222222222222222222222222"
	# end

	# def index
	# 	# @forums = SubKeddit.find(params[:id]).forum.all
	# 	@sub_keddit_name = params[:id]
	# 	@forums = SubKeddit.find_by(name: params[:id]).forum.all
	# end
	# def list_of_subKeddits
	# 	@subKeddits = SubKeddits.all
	# end	
end
