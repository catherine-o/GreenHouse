class PostsController < ApplicationController

    def index 
        posts = Post.all 
        render json: posts
    end

    def show
        post = Post.find_by(id: params[:id])
        render json: post
    end

    def create
        post = Post.create(post_params)
        render json: post
        # if post.save
        #     render json: post
        # # else
        # #     puts post_params
        # end
    end

    private

    def post_params
        params.require(:post).permit(:title, :description)
    end
    
end
