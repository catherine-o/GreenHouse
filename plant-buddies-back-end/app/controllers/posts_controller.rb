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
        # render json: post
        if post.save
            render json: post
        else
           puts "Cannot be longer than 30 characters"
        end
    end

    def update
        post = Post.find_by(id: params[:id])
        post.update(post_params)
        post.save
        render json: post
    end

    def destroy
        post = Post.find_by(id: params[:id])
        post.destroy
    end

    private

    def post_params
        params.require(:post).permit(:id, :title, :location, :description)
    end
    
end
