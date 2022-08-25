#!/bin/bash
SpellingError () {
    error=0;
    echo "";
    echo "Checking for misspellings in file" $1":";
    n_line=1;
    while IFS= read -r line
    do
        result=$(echo $line | aspell --mode=tex  --lang=en --list | aspell --mode=tex  --lang=es --list --home-dir=.. --personal=.github/workflows/allow_words.txt);
        if [[ ! -z "$result" ]]
        then
         echo "Spell error in line $n_line : $result"
         let "error = 1";
        fi
        let "n_line += 1"
    done < $1
    return $error;
}
export -f SpellingError;
exitValue=0
for file in $(find  -name "*.tex")
do
    SpellingError $file;
    let "exitValue += $?"
done

exit $exitValue;