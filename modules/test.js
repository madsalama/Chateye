


function getLanguageName(langlist, language) {
   for (var i in langlist) {
     if (langlist[i].alpha2 == language) {
        return users[i].English;
     }
   }
};

