$(document).ready(function () {

    // Add a new post
    $('#post-form').submit(function (e) {
        e.preventDefault();

        let post_caption = $("#post-caption").val();
        let post_visibility = $("#visibility").val();
        let post_workout = $("#workout").val();

        var fileInput = $('#post-thumbnail')[0];
        if (fileInput.length !== 0) {
            var file = fileInput.files[0];

            if (file)
                var fileName = file.name; // Extract the filename
        }

        var formData = new FormData();
        formData.append('post-caption', post_caption);
        formData.append('visibility', post_visibility);
        formData.append('workout', post_workout);

        if (fileInput.length !== 0 && fileName) {
            formData.append('post-thumbnail', file, fileName);
        }

        $.ajax({
            url: '/create-post/',
            type: 'POST',
            dataType: 'json',
            data: formData,
            processData: false,
            contentType: false,


            success: function (res) {
                console.log("Post Saved to DB...", res);

                const parsedData = JSON.parse(res.data);
                console.log(parsedData);

                // Check if response contains data
                if (parsedData.length > 0) {
                    // Access the first element of the array to get the post data object
                    let postData = parsedData[0].fields;

                    // Check if content exists
                    let content = postData.content ? postData.content : '';

                    // Check if image exists
                    let imageHtml = '';
                    if (postData.image) {
                        imageHtml = '<div class="grid grid-cols-2 gap-2 px-5">\
                                <a href="' + postData.image + '" class="col-span-2">  \
                                    <img src="' + postData.image + '" style="width: 100%; height: 300px; object-fit: cover;" alt="" class="rounded-md w-full lg:h-76 object-cover">\
                                </a>\
                            </div>';
                    }

                    // Build HTML
                    let _html = '<div class="card lg:mx-0 uk-animation-slide-bottom-small mt-3 mb-3">\
                            <div class="flex justify-between items-center lg:p-4 p-2.5">\
                                <div class="flex flex-1 items-center space-x-4">\
                                    <a href="#">\
                                        <img src="' + (postData.avatar ? postData.avatar : '') + '" style="width: 40px; height: 40px;" class="bg-gray-200 border border-white rounded-full w-10 h-10" />\
                                    </a>\
                                    <div class="flex-1 font-semibold capitalize">\
                                        <a href="#" class="text-black dark:text-gray-100">' + (postData.username ? postData.username : '') + '</a>\
                                        <div class="text-gray-700 flex items-center space-x-2">' + (postData.updated_at ? postData.updated_at + ' ago <ion-icon name="story-time"></ion-icon>' : '') + '</div>\
                                    </div>\
                                </div>\
                                <div>\
                                    <a href="#"> <i class="icon-feather-more-horizontal text-2xl hover:bg-gray-200 rounded-full p-2 transition -mr-1 dark:hover:bg-gray-700"></i> </a>\
                                    <div class="bg-white w-56 shadow-md mx-auto p-2 mt-12 rounded-md text-gray-500 hidden text-base border border-gray-100 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" uk-drop="mode: click;pos: bottom-right;animation: uk-animation-slide-bottom-small">\
                                        <ul class="space-y-1">\
                                            <li>\
                                                <a href="#" class="flex items-center px-3 py-2 hover:bg-gray-200 hover:text-gray-800 rounded-md dark:hover:bg-gray-800">\
                                                    <i class="uil-edit-alt mr-1"></i>  Edit Post \
                                                </a>\
                                            </li>\
                                            <li>\
                                                <hr class="-mx-2 my-2 dark:border-gray-800">\
                                            </li>\
                                            <li>\
                                                <a href="#" class="flex items-center px-3 py-2 text-red-500 hover:bg-red-100 hover:text-red-500 rounded-md dark:hover:bg-red-600">\
                                                    <i class="uil-trash-alt mr-1"></i>  Delete\
                                                </a>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                            <div uk-lightbox>\
                                <div class="p-5 pt-0 border-b dark:border-gray-700 pb-3">\
                                    ' + content + '\
                                </div>\
                                ' + imageHtml + '\
                            </div>\
                            <div class="p-4 space-y-3">\
                                <div class="flex space-x-4 lg:font-bold">\
                                    <a  class="flex items-center space-x-2  text-blue-500" style="cursor: pointer;" >\
                                        <div class="p-2 rounded-full like-btn' + postData.pk + ' text-black " id="like-btn" data-like-btn="' + postData.pk + '">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" class="dark:text-blue-100">\
                                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />\
                                            </svg>\
                                        </div>\
                                        <div> Like</div>\
                                    </a>\
                                    <a href="#" class="flex items-center space-x-2">\
                                        <div class="p-2 rounded-full  text-black lg:bg-gray-100 dark:bg-gray-600">\
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="22" height="22" class="dark:text-gray-100">\
                                                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />\
                                            </svg>\
                                        </div>\
                                        <div> <b><span id="comment-count' + postData.pk + '">0</span></b> Comment</div>\
                                    </a>\
                                </div>\
                                <div class="flex items-center space-x-3 pt-2">\
                                    \
                                    <div class="dark:text-gray-100">\
                                        <strong><span id="like-count' + postData.pk + '">0</span></strong> Likes\
                                    </div>\
                                </div>\
                                <div class="border-t py-4 space-y-4 dark:border-gray-600" id="comment-div' + postData.pk + '">\
                                </div>\
                                <a href="#" class="hover:text-blue-600 hover:underline">No Comments </a>\
                                <div class="bg-gray-100 rounded-full relative dark:bg-gray-800 border-t">\
                                    <input placeholder="Add your Comment..." id="comment-input' + postData.pk + '" data-comment-input="' + postData.pk + '" class="bg-transparent max-h-10 shadow-none px-5 comment-input' + postData.pk + '">\
                                    <div class="-m-0.5 absolute bottom-0 flex items-center right-3 text-xl">\
                                        <a style="cursor: pointer;" id="comment-btn" class="comment-btn' + postData.pk + '" data-comment-btn="' + postData.pk + '">\
                                            <ion-icon name="send-outline" class="hover:bg-gray-200 p-1.5 rounded-full"></ion-icon>\
                                        </a>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>';

                    $("#post-list").prepend(_html);
                    $("#create-post-modal").removeClass("uk-flex uk-open");

                    // redirect to the post
                    window.location.href = "/posts/" + postData.slug;
                    console.log(postData.slug)
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });

    // Like a post
    $(document).on("click", "#like-btn", function () {
        let btn_val = $(this).attr("data-like-btn")
        $.ajax({
            url: "/like-post/",
            dataType: "json",
            data: {
                "id": btn_val
            },
            success: function (response) {
                console.log(response);
                if (response.data.is_liked) {
                    console.log("Liked");
                    $(".like-btn" + btn_val).addClass("text-blue-500").removeClass("text-black");
                } else {
                    console.log("Unliked");
                    $(".like-btn" + btn_val).addClass("text-black").removeClass("text-blue-500");
                }

                $("#like-count" + btn_val).text(response.data.likes);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        })
    })

    // Delete a post
    $(document).on("click", "#delete-post", function (event) {
        event.preventDefault();
        let btn_val = $(this).attr("data-delete-btn")
        $.ajax({
            url: "/delete-post/",
            dataType: "json",
            data: {
                "id": btn_val
            },
            success: function (response) {
                console.log(response);
                $("#post" + btn_val).remove();
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        })
    })

    // Comment on post
    $(document).on("click", "#comment-btn", function () {
        let id = $(this).attr("data-comment-btn")
        let comment = $("#comment-input" + id).val()

        if (!comment) {
            return;
        }

        console.log(id);
        console.log(comment);

        $.ajax({
            url: "/comment-post/",
            dataType: "json",
            data: {
                "id": id,
                "comment": comment,
            },
            success: function (res) {

                let newComment = '<div class="flex card shadow px-2 py-3" id="comment-div' + res.data.comment_id + '">\
                    <div class="w-10 h-10 rounded-full relative flex-shrink-0">\
                        <img src="' + res.data.profile_image + '" alt="" class="absolute h-full rounded-full w-full">\
                    </div>\
                    <div class="w-full relative">\
                        <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100 flex items-center w-full">\
                            <p class="leading-6 flex-grow">' + res.data.comment + '</p>\
                                <button class="ml-auto text-xs ml-3 mr-3 p-4 hover:text-red-500" id="delete-comment" data-delete-comment="' + res.data.comment_id + '"> <i class="fas fa-trash"></i> </button>\
                        </div>\
                        <div class="text-sm flex items-center space-x-3 mt-2 ml-5 absolute -top-6">\
                            <small>' + res.data.date + ' ago</small>\
                        </div>\
                        <details class="ml-5">\
                            <summary class="flex gap-2"><div class="">Reply</div></summary>\
                            <details-menu role="menu" class="origin-top-right relative right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">\
                                <div class="pyf-1" role="none">\
                                    <div method="POST" class="p-1 d-flex" action="#" role="none">\
                                        <input type="text" class="with-border" name="" id="reply-input' + res.data.comment_id + '">\
                                        <button id="reply-comment-btn" data-reply-comment-btn="' + res.data.comment_id + '" class="block w-fulfl text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 reply-comment-btn' + res.data.comment_id + '" role="menuitem">\
                                            <i class="fa-solid fa-paper-plane"></i>\
                                        </button>\
                                    </div>\
                                </div>\
                            </details-menu>\
                        </details>\
                        <div class="reply-div' + res.data.comment_id + '">\
                        </div>\
                    </div>\
                </div>\
            '
                $("#comment-div" + id).append(newComment);
                $("#comment-count" + id).text(res.data.comment_count);
                $("#comment-input" + id).val("")
            }
        })
    })

    // Delete a comment
    $(document).on("click", "#delete-comment", function (event) {
        event.preventDefault();
        let btn_val = $(this).attr("data-delete-comment")
        $.ajax({
            url: "/delete-comment/",
            dataType: "json",
            data: {
                "id": btn_val
            },
            success: function (response) {
                console.log(response);
                $("#comment-div" + btn_val).remove();
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        })
    })

    // Reply Comment
    $(document).on("click", "#reply-comment-btn", function () {
        let id = $(this).attr("data-reply-comment-btn")
        let reply = $("#reply-input" + id).val()

        console.log(id);
        console.log(reply);

        $.ajax({
            url: "/reply-comment/",
            dataType: "json",
            data: {
                "id": id,
                "reply": reply,
            },
            success: function (res) {

                let newReply = ' <div class="flex mr-12 mb-2 mt-2" style="margin-right: 20px;">\
                <div class="w-10 h-10 rounded-full relative flex-shrink-0">\
                    <img src="' + res.data.profile_image + '" style="width: 40px; height: 40px;" alt="" class="absolute h-full rounded-full w-full">\
                </div>\
                <div>\
                    <div class="text-gray-700 py-2 px-3 rounded-md bg-gray-100 relative lg:ml-5 ml-2 lg:mr-12 dark:bg-gray-800 dark:text-gray-100">\
                        <p class="leading-6">' + res.data.reply + '</p>\
                        <div class="absolute w-3 h-3 top-3 -left-1 bg-gray-100 transform rotate-45 dark:bg-gray-800"></div>\
                    </div>\
                    <span> <small>' + res.data.date + ' ago</small> </span>\
                    \
                </div>\
            </div>\
            '
                $(".reply-div" + id).append(newReply);
                $("#reply-input" + id).val("")

                console.log(res.data.bool);
            }
        })
    })

    // Add Friend
    $(document).on("click", "#add-friend", function () {
        let id = $(this).attr("data-friend-id")
        console.log(id);

        $.ajax({
            url: "/add-friend/",
            dataType: "json",
            data: {
                "id": id
            },
            success: function (response) {
                console.log(response);
                if (response.is_friend_request_sent == true) {
                    $("#friend-text").html("<i class='fas fa-user-minus'></i> Cancel Request ")
                    $(".add-friend" + id).addClass("bg-red-600")
                    $(".add-friend" + id).removeClass("bg-blue-600")
                }
                if (response.is_friend_request_sent == false) {
                    $("#friend-text").html("<i class='fas fa-user-plus'></i> Add Friend ")
                    $(".add-friend" + id).addClass("bg-blue-600")
                    $(".add-friend" + id).removeClass("bg-red-600")
                }
            }
        })
    })

    // Accept Friend Request
    $(document).on("click", "#accept-friend-request", function () {
        let id = $(this).attr("data-request-id")
        console.log(id);

        $.ajax({
            url: "/accept-friend/",
            dataType: "json",
            data: {
                "id": id
            },
            success: function (response) {
                console.log(response);
                $(".reject-friend-request-hide" + id).hide()
                $(".accept-friend-request" + id).html("<i class='fas fa-check-circle'></i> Friend Request Accepted")
                $(".accept-friend-request" + id).addClass("text-white")
            }
        })
    })

    // Reject Friend Request
    $(document).on("click", "#reject-friend-request", function () {
        let id = $(this).attr("data-request-id")
        console.log(id);

        $.ajax({
            url: "/reject-friend/",
            dataType: "json",
            data: {
                "id": id
            },
            success: function (response) {
                console.log(response);
                $(".accept-friend-request-hide" + id).hide()
                $(".reject-friend-request" + id).html("<i class='fa-solid fa-xmark'></i> Friend Request Rejected")
                $(".reject-friend-request" + id).addClass("text-white")
            }
        })
    })

    // UnFriend User
    $(document).on("click", "#unfriend", function () {
        let id = $(this).attr("data-friend-id")
        console.log(id);

        $.ajax({
            url: "/remove-friend/",
            dataType: "json",
            data: {
                "id": id
            },
            success: function (response) {
                console.log(response);
                $("#unfriend-text").html("<i class='fas fa-check-circle'></i> Friend Removed ")
                $(".unfriend" + id).addClass("bg-blue-600")
                $(".unfriend" + id).removeClass("bg-red-600")
            }
        })
    })
});

