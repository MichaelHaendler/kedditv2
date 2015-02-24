Rails.application.routes.draw do


  get 'sessions/new'

  get 'sessions/create'

  get 'sessions/destroy'

  # get 'posts/new'

  root 'users#front_page' 
  # get 'users/toy1'
  get 'users/sign_in'
  get 'users/sign_out'
  get 'users/sign_up'
  post 'users/sign_up_helper'
  post 'users/sign_in_helper'
  get 'users/testing_page'
  post 'users/testing_page_helper'
  get 'users/testing_page_helper2'
  post 'users/delete_post_helper'
  post 'users/submit_post_helper'
  post 'users/save_changes_to_comment_helper'

  # get 'forum/new'
  # post 'forum/new_helper'



  
  # get 'zoomy', to: 'users#toy2'

  # get    'login'   => 'sessions#new'
  # post   'login'   => 'sessions#create'
  # delete 'logout'  => 'sessions#destroy'

  #resources 'users'

  resources 'users', only: [:new,:create]

  get 'forums/new'
  post 'forums/new_helper'
  get 'forums/display_forum'

  resources 'forums', only: [:create]



#get '/patients/:id', to: 'patients#show'
#match ':controller/:action/:id(.:format)'
#map.connect "schools/:id/check_teachers", :controller => "schools", :action => "check_teachers"
#link_to "Check teachers", check_teachers_path(:id => @school.id)

#subKeddit list
#map.subKeddit_list "sub_keddits", :controller => "subKeddits", :action => "subKeddit_list"
#this will take me to my list of subKeddits (WORKING)

#get '/sub_keddits', to: 'sub_keddits#list_of_subKeddits'

#link_to "see list of avaiable subKeddits!", subKeddit_list_path
#in subKeddit_list action, you create a variable called subKedits that holds an array, each of which 
# is a subKeddit row/instance whatever. When iterating through, will use the link directly below 

#this will take me to the list of threads IN that particular subKeddit
#map.forum_list "sub_keddits/:id1/forums", :controller => "forums", :action => "list_of_forums"
get 'sub_keddits/:id1/forums', to: 'forums#list_of_forums'

#link_to forum.title, list_of_forums(:id1 => subKeddit.id)

#the thread itself
#map.show_thread "sub_keddits/:id1/forums/:id2", :controller => "posts", :action => "show_thread"
#get 'sub_keddits/:id1/forums/:id2', to: 'posts#show_thread'

# gets working: http://localhost:3000/sub_keddits/technology/check_out_this_neat_new_phone
#get 'sub_keddits/:sub_keddit_name/:forum_title', to: 'forums#showy', as: 'blah'


# http://localhost:3000/sub_keddits/sub_name/forums/forum_unique_num/forum_name



get 'sub_keddits/', to: 'sub_keddits#index', as: 'sub_keddits_index'

get 'sub_keddits/:sub_keddit_name', to: 'sub_keddits#showy', as: 'sub_keddit_show'

get 'sub_keddits/:sub_keddit_name/forums/:forum_unique_num/:forum_title', to: 'forums#showForum', as: 'get_forum'

#post 'sub_keddits/:sub_keddit_name/forums/:forum_unique_num/:forum_title', to: 'forums#submitNewPost'

post '/forums/submit_post_for_this_forum', to: 'forums#submitNewPost'

#for deleting a post from the forum, and for editing/updating a post form this forum. 
post '/forums/modify_post_from_this_forum', to: 'forums#modifyPost'


#post 'sub_keddits/:sub_keddit_name/forums/:forum_unique_num/:forum_title', to: 'forums#showForum', as: 'get_forum_helper'

#GET '/new', to: 'articles#new', as: 'my_new_article'

#no button needed for this
#link_to subKeddit.title, list_of_forums(:id1 => params[id1], :id2 => forum.id)

# get '/sub_keddits', to: 'subKeddits#list_of_subKeddits'
# get 'sub_keddits/:id1/forums', to: 'forums#list_of_forums'
# get 'sub_keddits/:id1/forums/:id2', to: 'posts#show_thread'

#resources :sub_keddits

# resources :sub_keddits do
#   resources :forums
# end

# resources :sub_keddits do
#   resources :forums do
#     resources :posts
#   end
# end



  #resources :account_activations, only: [:edit] #example only
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
