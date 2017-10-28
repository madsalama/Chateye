#!/bin/bash
git add .
git commit -a -m 'commit'
git push chateye master 
git push heroku master
heroku logs --tail