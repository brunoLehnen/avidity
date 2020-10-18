Hi,

Thank you for taking the time to take this coding challenge 🙏 Ideally this test shoud take a 3-5 hours, but feel free to take as much time as you need. Quality is more important than speed. We do kindly ask you to submit the solution to this challenge a maximum of 7 days starting from now.

This coding challenge will show us some of your skills, and will show you a bit more about how we work here at Audry. The solution of the challenge is not too hard. So you can focus on technology and code. Show us what you got!

**Your Task**
Create a small react webapp with backend APIs in node to allow a user to get some information on a podcast, given an apple podcast url. You will build this based on the user story below.


**User Story**

As a user I should be able to input an Apple Podcast url like this example. As soon as I enter the URL, I should see some information from the inputted podcast:
* Name of the podcast show
* Author
* Genres
* Show Image

I should be able to click a "More info" button to see additional information on the podcast:
* Podcast start date
* Last episode date
* Number of episodes
* Podcast show summary

If there are any errors in fetching the required data at any point, I should see an error explaining what went wrong, for example:
* "The Apple Podcast URL is not valid"
* "RSS feed of specified podcast is not valid"
* "Could not find RSS feed of the specified podcast"

**To do**
1. Create a new branch and make small commits to it as you progress (Please don’t push the code at once).
2. Create client and server folders
3. After completing the task raise a pull request and a link to a short demo video (Like as small Sprint demo). Feel free to use your video platform of choice, mention the url in the pull request.

**Requirements**
1. REST APIs should be in NodeJS, you can use Express, Hapi, Restify or framework of your choice.
2. All code, commits and documents should be in English
3. Frontend application should be developed using React, Redux (optional Saga, Thunk)
4. Frontend UI should be responsive

**Bonus**
1. Best coding practice, neat and clean code
2. Use of Typescript
3. placeholders for image and text until the remote data is loaded (for example Facebook style content loader https://github.com/danilowoz/react-content-loader)

**Additional Information**
1. Podcast details can be fetched using this npm https://www.npmjs.com/package/node-itunes-search (example https://www.npmjs.com/package/node-itunes-search#simple-lookup)
2. Podcast Show and Episode details can be found in RSS feed (the npm above will return link to the RSS feed in a raw object)
3. If you have any questions please raise new issue on the repo and tag @maheshkh
