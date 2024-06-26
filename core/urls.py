from django.urls import path

from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='fitness-feed'),
    path("posts/<slug:slug>/", views.post_detail, name="post-detail"),
    path('create-workout-type/', views.create_workout_type, name='create-workout-type'),
    path('workout-types/', views.workout_types, name='workout-types'),

    path('create-workout/', views.create_workout, name='create-workout'),
    path('workouts/', views.workouts, name='workouts'),

    # search with query
    path('search/', views.search, name='search'),

    # Ajax endpoints
    path('create-post/', views.create_post, name='create-post'),
    path('like-post/', views.like_post, name='like-post'),
    path('delete-post/', views.delete_post, name='delete-post'),
    path('comment-post/', views.comment_post, name='comment-post'),
    path('delete-comment/', views.delete_comment, name='delete-comment'),
    path('reply-comment/', views.reply_comment, name='reply-comment'),
    path('add-friend/', views.add_friend, name='add-friend'),
    path('remove-friend/', views.remove_friend, name='remove-friend'),
    path('accept-friend/', views.accept_friend, name='accept-friend'),
    path('reject-friend/', views.reject_friend, name='reject-friend'),
]
