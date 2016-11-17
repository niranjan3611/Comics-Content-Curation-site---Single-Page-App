# Module 3 group project #
__Submitted by:__ WebCrows

__Team members:__

- tulaj001@umn.edu
- balan016@umn.edu
- karup002@umn.edu
- nayan003@umn.edu
- rich1044@umn.edu

__Heroku URL:__ https://modthreewc.herokuapp.com/

__Argument of ambition (optional, maximum 100 words):__
_Briefly argue why this was a technically ambitious project_

We wanted to implemented a react SPA with a wide spectrum of functionalities. Following is the list of functionalities:

###### Implementing fluid image grid for content display
###### Multiple modes of content import:
   - Via URL parsing (from http://www.gocomics.com/)
   
   - Via direct image upload
   
###### Multi-tier search feature:
   - Search by tags
   
   - Search by title
   
###### Multiple user support: 

   - Each user can specify his interests
   - Content related to user's interest will be shown in his personal feed
   - User can also view the entire content in the general feed
   - User can broaden his range of interests to inlcude additional content

###### Annotate the content with additional information:

   - Implemented like feature
   - Each user can only like the content once
   
###### Edit content:
   - User can edit the title, detail and URL of content
   
###### Multiple modes of content deletion:
   - Temporary deletion from user's personal feed
   - Permanent deletion (only the owner of the content can delete it permanently)

###### Local user authentication

__Argument of execution (optional, maximum 100 words):__
_Briefly argue why this was a well executed project_

We implemented all the functionalities that we planned at the time of project commencement. Paid sepecial attention to maintain the modular structure of the code. 

Each call from client to the server is handled through an API and we wrote 13 APIs for this project. On the client side, lot of planning and effort went into implementing react components and their interaction with one another. 14 major react components were implemented to support all client facing functionalities. Database schema used in the project is well defined and can support future enhancements.

The project code is easy to understand and maintain.  

## Website rendering on iPhone6 ##
![alt text](file:///home/nayanambuj/Desktop/websiteOniPhone7.jpg "Website on iPhone6")

## Description ##
The group project for module 3 is to create a website for collecting and organizing content.

Some sites that can serve as inspiration:

- pinterest: users save images to "boards".
- pocket and delicious: users save and organize URLs
- zotero: users save academic articles, organize them into groups, tag them, and export them in various formats
- reddit and hackernews: users post, vote on, and discuss URLs

Generally, these sites allow users to (a) collect content into collections, lists, or tags, (b) annotate the content with additional information, and (c) browse and search for other information on the site.

We encourage you to build a site to curate content that's interesting to you. Ideas:

- Airbnb rentals
- NPM packages
- Amazon products
- NES ROMs


## Requirements ##

- Build a site on react, express, and mongo. Host the site on heroku.
- The site must allow users to:
  - Add new content.
  - Edit existing content, e.g., by changing its description or giving it a descriptive tag
  - Delete existing content
- The site must allow the content to be organized.  E.g., collections, lists, or tags.
- The site must allow users to browse the site in a reasonable way via links.


### Encouraged, but optional ###

- Content import via identifier (e.g., URL). Many interfaces (Facebook, Slack, Pocket) allow users to add links, which the site then parses to find some content (e.g., a title, an image). Allow your users to do something similar.
- Search. Add a site-search feature that allows users to find content. It does not count to add a google site search box :)  This could, for example, be an autocomplete widget that shows tags, or an open-ended widget that searches the text of imported items.
- Multi-user support.  Allow multiple users to independently contribute content.  There is no need for full authentication, but you could allow users to "log in" by typing a username.  You could simply track and display activity by user, or to be more ambitious, you could give different users different views (e.g., the homepage shows the logged-in user's collections).
- Responsive design. Make the site render in a usable way on an iphone 7 (or equivalent).


## Submission ##
- Your code should be pushed up to your repo on github
- Fill this `README.md` out with your team name, team members' emails, and
- Heroku url for your demo. Additionally, complete the argument sections at the top of the file.


## Grading ##
You will be graded on the __ambition__ and __execution__ of the project. At the top of this `README.md` you have the opportunity to argue why your submission was ambitious and well executed. In order for us to grade it, you must have it hosted on Heroku. To earn an "A" grade, a project must be technically ambitious, well-executed, and polished. To earn a passing grade, a project must minimally fulfill the three requirements listed in the description.
