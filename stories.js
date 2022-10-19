"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


// line  69: defining addStoryToPage() function, which takes the data from storyForm and adds it to the page
// line  70: debugger
// line  71: preventing default behavior
// lines  73 - 75: grabbing author, title and url input from storyForm
// line  76: grabbing username input from loginForm
// line  77: saving to variable, 'storyData' the data grabbed from storyForm above 
// line  79: calling addStory method to add newly-submitted story to storyList and
//         saving it to the variable, 'story'
// line  81: calling generateStoryMarkup() function on story, and saving it to
//         the variable, '$storyHTML'
// line  82: appending $storyHTML to $allStoriesList
// line  84: resetting the storyForm
// line  85: hiding the storyForm 
// line  88: listening for clicks on StoryForm, and calling addStoryToPage() on submit
async function addStoryToPage(evt) {
  console.debug("addStoryToPage");
  evt.preventDefault();
  
  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();
  const username = currentUser.username
  const newStory = {author, title, url, username};
  
  const story = await storyList.addStory(currentUser, newStory);
  
  const $storyHTML = generateStoryMarkup(story);
  $allStoriesList.append($storyHTML);

  $storyForm.trigger("reset");
  $storyForm.hide();
}
  
$storyForm.on("submit", addStoryToPage);



