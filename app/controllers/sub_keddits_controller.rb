class SubKedditsController < ApplicationController


	def index
		@subKeddits = SubKeddit.all
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
