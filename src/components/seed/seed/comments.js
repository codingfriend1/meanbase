var firstComment = {
  "author": "Admin",
  "url": "/why-cms",
  "content": "Comments can be added to articles.",
  "email": "admin@admin.com",
  "ip": "172.31.255.255",
  "approved": true,
  "likes": 2
};

var secondComment = {
  "author": "test",
  "url": "/why-cms",
  "content": "I can approve or reject comments",
  "email": "test@test.com",
  "ip": "172.97.114.255",
  "approved": false,
  "likes": 0
};

var thirdComment = {
  "email": "codingfriend@meanbase.com",
  "content": "You can manage comments on your site by approving or rejecting them. Google Recaptcha protects you from spam.",
  "url": "/why-cms",
  "approved": true,
  "date": "2016-08-28T02:05:02.842Z",
  "author": "Coding Friend",
}

module.exports = [firstComment, secondComment, thirdComment];
