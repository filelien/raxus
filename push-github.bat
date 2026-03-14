@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

cls
echo.
echo ===============================================
echo  RAXUS - GITHUB SETUP
echo ===============================================
echo.

REM Check if .git exists
if exist .git (
    echo Repository Git existant trouvé.
    echo.
) else (
    echo Initialisation du repository Git...
    git init
    echo.
)

echo Configuration de l'utilisateur Git...
git config user.name "INOV AFRIK"
git config user.email "dev@inovafrik.com"
echo.

echo Ajout de tous les fichiers...
git add .
echo.

echo Création du commit initial...
git commit -m "Initial commit: RAXUS - Intelligent Infrastructure Platform by INOV AFRIK"
echo.

echo Renommage de la branche en 'main'...
git branch -M main
echo.

echo Configuration du remote GitHub...
for /f "delims=" %%i in ('git remote') do git remote remove %%i
git remote add origin https://github.com/jackvactus/OSIRIS-.git
echo.

echo.
echo ===============================================
echo  STATUS GIT
echo ===============================================
echo.
git remote -v
echo.
echo ===============================================
echo  NEXT STEP: Push vers GitHub
echo ===============================================
echo.
echo OPTIONS POUR POUSSER:
echo.
echo 1. HTTPS avec Personal Access Token (recommandé):
echo    - Allez sur: https://github.com/settings/tokens
echo    - Créez un nouveau token avec permission 'repo'
echo    - Exécutez: git push -u origin main
echo    - Username: votre pseudo GitHub
echo    - Password: le token généré
echo.
echo 2. SSH:
echo    - Assurez-vous d'une clé SSH configurée sur GitHub
echo    - Exécutez:
echo      git remote set-url origin git@github.com:jackvactus/OSIRIS-.git
echo      git push -u origin main
echo.
echo 3. GitHub CLI:
echo    - Installez: https://cli.github.com
echo    - gh auth login
echo    - gh repo create --source=. --remote=origin --push
echo.
echo ===============================================
echo.
pause
