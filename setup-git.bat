@echo off
setlocal enabledelayedexpansion

echo Initializing Git repository...
git init

echo Configuring Git user...
git config user.name "INOV AFRIK"
git config user.email "dev@inovafrik.com"

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "First commit: RAXUS - Intelligent Infrastructure Platform by INOV AFRIK"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/jackvactus/OSIRIS-.git

echo.
echo Git setup complete! Run: git push -u origin main
echo Note: You may be prompted to enter your GitHub credentials.
echo.
pause
