#!/bin/bash
if [[ "$1" == "--make-pretty" ]]
then
./prettify.sh
fi

git add .
git commit -a -m 'commit'
git push heroku master
git push chateye master
heroku logs --tail
