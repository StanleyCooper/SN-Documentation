Become a member
Sign in
Get started
Responses

What are your thoughts?
Cancel
Respond
There are currently no responses for this story.
Be the first to respond.
Signature pad for ServiceNow applications
Andrew Pishchulin
Andrew Pishchulin
Follow
Mar 27 · 3 min read



There is a number of use cases and business processes where we need to capture the user’s signature. It may sound like a trivial development task, but it still takes time to design(UI/UX), implement and integrate it into your ServiceNow applications.
We’ve just released a free Service Portal widget — Signature Pad, which takes care of everything:
Capture user’s signature and instantly attach it to the record
Can be used in Service Portal and native UI
No configuration required
The widget is FREE and can be downloaded from Github repo, or you can use a direct link to XML update set.
How to install the widget
To install the widget you need to do the following:
Download the XML update set.
Import it into your ServiceNow instance: navigate to System Update Sets > Retrieved Update Sets, select Import Update Set from XML, and upload the XML file.
Preview and commit the imported update set.
Once the update set installed, a new Service Portal widget Signature Pad will be available and you can use it on any Service Portal page and in custom applications.
How to use the widget
The widget allows users to capture a signature and instantly save it as an attachment to the current record. Current record identified by table and sys_id parameters from the page URL, so make sure you specify those parameters when loading the page.
When you add a widget to a Service Portal page — you will see the “Add Signature” button. If the page does not have table and sys_id defined in the URL then the button will be disabled.
Image for post
When a user clicks the button, a signature pad appears and the user can sign and submit the signature:
Image for post
Once submitted, the signature will be attached to the current record:
Image for post
The signature image will have some metadata embedded: user name and sys_id, table name, target record sys_id, date signed and the URL where the signature was taken.
Image for postImage for post
How to use the widget in ServiceNow native UI
You can easily integrate Signature Pad widget into ServiceNow native UI:
Image for postImage for post
Create a service portal page signature_pad, add the Signature Pad widget
Create a new service portal signature_portal
Create a UI macro with the following code:
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
 <iframe src="signature_portal?id=signature_pad"
   width="100%"
   scrolling="no"
   style="border:none;min-height:450px;">
 </iframe>
</j:jelly>
4. Create Formatters for the tables where you want to use a Signature Pad.
5. Add formatters to the corresponding forms.
12

Servicenow
Service Portal
12 claps




Andrew Pishchulin
WRITTEN BY

Andrew Pishchulin
Follow
More From Medium
JavaScript Interview Question: What is Functional Programming
GP Lee in DailyJS

Converting to TypeScript: Part 1, Unit Tests
Bryan Hughes in Microsoft Azure

JavaScript Algorithm: Finders Keepers
Erica N in JavaScript In Plain English

Intro to Asynchronous Javascript
Tyler Caprioli in The Startup

JavaScript : What is Object.create()?
Clyde Bates

Modular Data Visualizations With Vue.js and D3
Petr Mitev in The Startup

JavaScript Best Practices — Rest Operator
John Au-Yeung in The Startup

React Native — A Bridge To Project Fabric — Part 1
Chen Feldman in The Startup

Discover Medium
Welcome to a place where words matter. On Medium, smart voices and original ideas take center stage - with no ads in sight. Watch
Make Medium yours
Follow all the topics you care about, and we’ll deliver the best stories for you to your homepage and inbox. Explore
Become a member
Get unlimited access to the best stories on Medium — and support writers while you’re at it. Just $5/month. Upgrade
About
Help
Legal
