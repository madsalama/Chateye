#!/bin/bash
git add .
git commit -a -m 'commit'
git push chateye master 
git push chatzer master
heroku logs --tail