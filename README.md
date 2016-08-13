# Blog backend with authentication and tag searching

## description

I took my express node.js backend from HW 5 part 1 and added authentication using the Passport library. I protected certain api calls from being called unless the call came with an authenticated token. I also blocked certain views, redirecting any unauthorized visitors to the homepage if they tried to visit the create new post page.

## what worked / didn’t work

It all worked, this stack is great.

## any extra credit attempted

Sweet search bar at the top that allows user to filter posts by their tags. When the user starts typing, it queries the api for tags containing their search string, and returns it. It also preloads a lot of tags from the api, making the filtering instant. 


