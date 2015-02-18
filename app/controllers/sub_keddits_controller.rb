class SubKedditsController < ApplicationController


	def index
		@subKeddits = SubKeddit.all
	end


	def show
		# @forums = SubKeddit.find(params[:id]).forum.all
		@sub_keddit_name = params[:id]
		@forums = SubKeddit.find_by(name: params[:id]).forum.all
	end

	# def list_of_subKeddits
	# 	@subKeddits = SubKeddits.all
	# end	
end
