"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $favoriteStoriesList.hide();
  $storyForm.hide();
  $userStoriesList.hide();
}

$body.on("click", "#nav-all", navAllStories);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoriteStoriesListOnPage();
  $storyForm.hide();
  $userStoriesList.hide();
  
};

$body.on("click", "#nav-favorites", navFavoritesClick);

function navNewStory(evt) {
  console.debug("navNewStory", evt);
  hidePageComponents();
  $storyForm.show();
  $favoriteStoriesList.hide();
  $userStoriesList.hide();
}

$navSubmitLink.on('click', navNewStory);

$storySubmit.on('click', function () {
  $storyForm.hide();
});

function navUserStoriesClick(evt) {
  console.debug("navUserStoriesClick", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $favoriteStoriesList.hide();
  $storyForm.hide();
};


$body.on("click", "#nav-user-stories", navUserStoriesClick);

