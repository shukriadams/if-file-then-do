set -e

mkdir -p  ./express/static/js
mkdir -p  ./express/static/css

VERSION="0.0.12"

wget https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip.js -O ./express/static/js/bootstrip.js
wget https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip.css -O ./express/static/css/bootstrip.css
wget https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip-theme-default.css -O ./express/static/css/bootstrip-theme-default.css
wget https://github.com/shukriadams/bootstrip/releases/download/$VERSION/bootstrip-theme-darkmoon.css -O ./express/static/css/bootstrip-theme-darkmoon.css 