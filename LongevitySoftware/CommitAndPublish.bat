:: This is a comment
ECHO OFF

SET COMMIT_MESSAGE="%1"

ECHO %COMMIT_MESSAGE%

IF ""==%COMMIT_MESSAGE% GOTO NO_ARGUMENTS

:: Add all the changes to git
git add -A

IF %ERRORLEVEL%==0 GOTO COMMIT_STEP
ECHO Failed to add changes to git
GOTO END_OF_FILE

:COMMIT_STEP

git commit -m "%1"

IF %ERRORLEVEL%==0 GOTO PUSH_STEP
ECHO Failed to Commit changes to git
GOTO END_OF_FILE

:PUSH_STEP

git push origin HEAD:Source

IF %ERRORLEVEL%==0 GOTO PUBLISH_STEP
ECHO Failed to push changes to origin
GOTO END_OF_FILE

:PUBLISH_STEP

npm run publish

GOTO END_OF_FILE

:NO_ARGUMENTS

ECHO No Commit Message Provided

:END_OF_FILE
