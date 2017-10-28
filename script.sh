#!/bin/bash
git add .
git commit -a -m 'commit'
<<<<<<< HEAD
git push chateye master 
git push heroku master
=======
git push
>>>>>>> 7b0ffa4f956b5206f95a7effbdb70826808a05ce
heroku logs --tail