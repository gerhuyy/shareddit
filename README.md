# <img src='http://cefns.nau.edu/~jk788/shareddit/Icon-48.png'> Browser Extension now available!
|Chrome|Firefox|Safari|
|:--------:|:--------:|:----------:|
| <a href='http://bit.ly/shareddit-chrome' title='Click to Download'><img src='http://cefns.nau.edu/~jk788/shareddit/chrome-done.png'></a>  | <a href='http://bit.ly/shareddit-firefox' title='Click to Download'><img src='http://cefns.nau.edu/~jk788/shareddit/firefox-done.png'></a> | <a href='http://bit.ly/shareddit-safari' title='Click to Download'><img src='http://cefns.nau.edu/~jk788/shareddit/safari-done.png'></a> |
|`v 0.1.4` <br> `Dec 13, 2014`|`v 0.1.5` <br> `Dec 22, 2014`|`v 0.1.5` <br> `Dec 22, 2014`|


# shareddit bookmarklet [![forthebadge](http://forthebadge.com/badges/gluten-free.svg)](http://forthebadge.com)

Basic bookmarklet that creates a drop-down menu on every comment in a thread for automatically generated submission forms for posting to /r/bestof, /r/nocontext, and /r/retiredgif. A hotlink to x-post links, with autogenerated submission forms, is also generated while using the script.

## Setup

You could put the source code on your own server if you want (but then you don't get cool new features!), otherwise just make a new bookmark and set the URL to this (link last updated December 13, 2014):

    javascript:void($.getScript('https://cdn.rawgit.com/iGGNoRe/shareddit/3dceca582ac93900a75325908716a6893199b17f/main.js'))

## Use comment sharing

1. Open a thread, or a user's profile page
2. Click the bookmark
3. Use the newly created drop-down box to select the destination
4. Enter how many comments to use for context
5. Fill in the description template if it is going to /r/bestof, or /r/retiredgif
6. Submit

## Use x-post sharing

Now supports self posts, and doesn't remove expando buttons.

1. Click the bookmarklet either on the subreddit's listing page, or inside the comment page of the link
2. Click on the newly generated hotlink that says "x-post this link"
3. Fill in the destination sub
4. Submit
