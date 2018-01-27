#!/bin/bash
./prettify.sh
git add .
git commit -a -m 'commit'
git push heroku master
git push chateye master
heroku logs --tail
