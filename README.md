# doc-ock

A document Classifier that can detect the type of file from the contents.
We have a portal for a user and one for admin.
User can upload a file and specifies its class, our ML Model runs on upload and detects the class, if the class matches to the one given by the user the document is aprooved, else its status is marked pending until an admin Approves/Rejects the document.
This wep-app helps in significantly reducing the task of data-scrubbing.
On rejection and email is sent to the user notifying them to reupload the file.
We are using Linear Support Vector Machine for classification.

We support pdf, png, jpeg, jpg, webp file formats.

Deployment instructions can be found in [TestMe.md](TestMe.md)