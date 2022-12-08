# Note : on linux systems this script must be called with bash, it will not work with sh 

set -e # fail on errors

target=
upload=0
GH_TOKEN=""
# capture all arguments passed in (anything starting with --)
while [ -n "$1" ]; do 
    case "$1" in
    --upload|-u) upload=1 ;;
    --token)
        GH_TOKEN="$2" shift;;    
    --target|-t)
        target="$2" shift;;
    esac 
    shift
done

if [ "$target" = "" ]; then
    echo "ERROR : --target not set, egs, --target win64"
    exit 1;
fi

# get tag on this revision
tag=$(git describe --abbrev=0 --tags)

if [ ! $target = "dev"  ]; then
    python3 writeVersion.py --version $TAG --path ./../src/package.json
fi

echo "{ \"version\" : \"$tag\" }" > ./../src/version.json

# Call the node package pkg directly, on build servers it is not installed globally, mainly because on Windows Jenkins agents
# global npm packages are a pain to set up, and we want to minimize changing the global state of agents.
if [ "$target" = "linux" ]; then
    
    filename=./linux64/if-file-then-do
    name="if-file-then-do_linux64"

    $(npm bin)/pkg ./../src/. --targets node12-linux-x64 --output $filename

    # run app and ensure exit code was 0
    (${filename} --version)

elif [ "$target" = "win" ]; then
    filename=./win64/if-file-then-do.exe
    name="if-file-then-do.exe"

    $(npm bin)/pkg ./../src/. --targets node12-windows-x64 --output $filename
    
    # run app and ensure exit code was 0
    ($filename --version)
elif [ $target = "dev" ]; then
    filename=./linux64/if-file-then-do
    name="if-file-then-do_linux64"
    
    pkg ./../src/. --targets node12-linux-x64 --output $filename

else
    echo "ERROR : ${target} is not a valid --target, allowed values are [linux|win|dev]"
    exit 1;
fi

if [ ! $? -eq 0 ]; then
    echo "ERROR : App test failed " >&2
    exit 1
fi

echo "App built"

if [ ! -z $GH_TOKEN ]; then

    GH_REPO="https://api.github.com/repos/shukriadams/if-file-then-do"
    GH_TAGS="$GH_REPO/releases/tags/$tag"
    AUTH="Authorization: token $GH_TOKEN"
    WGET_ARGS="--content-disposition --auth-no-challenge --no-cookie"
    CURL_ARGS="-LJO#"

    # Validate token.
    curl -o /dev/null -sH "$GH_TOKEN" $GH_REPO || { echo "Error : token validation failed";  exit 1; }

    # Read asset tags.
    response=$(curl -sH "$GH_TOKEN" $GH_TAGS)

    # Get ID of the asset based on given filename.
    eval $(echo "$response" | grep -m 1 "id.:" | grep -w id | tr : = | tr -cd '[[:alnum:]]=')
    [ "$id" ] || { echo "Error : Failed to get release id for tag: $tag"; echo "$response" | awk 'length($0)<100' >&2; exit 1; }

    # upload file to github
    GH_ASSET="https://uploads.github.com/repos/shukriadams/if-file-then-do/releases/$id/assets?name=$(basename $name)"
    curl --data-binary @"$filename" -H "Authorization: token $GH_TOKEN" -H "Content-Type: application/octet-stream" $GH_ASSET

    echo "uploaded"
fi

echo "Done"