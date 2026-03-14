# Script PowerShell pour configurer et pousser sur GitHub
# Exécution: .\github-push.ps1

Write-Host "=== CONFIGURATION GIT POUR GITHUB ===" -ForegroundColor Cyan
Write-Host ""

# Vérifier si git est initialisé
if (-not (Test-Path ".git")) {
    Write-Host "Initialisation du repository Git..." -ForegroundColor Yellow
    git init
    git config user.name "INOV AFRIK"
    git config user.email "dev@inovafrik.com"
} else {
    Write-Host "Repository Git existant trouvé." -ForegroundColor Green
}

Write-Host ""
Write-Host "Ajout de tous les fichiers..." -ForegroundColor Yellow
git add .

Write-Host "Création du commit initial..." -ForegroundColor Yellow
git commit -m "Initial commit: RAXUS - Intelligent Infrastructure Platform by INOV AFRIK"

Write-Host "Renommage de la branche en 'main'..." -ForegroundColor Yellow
git branch -M main

Write-Host "Configuration du remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/jackvactus/OSIRIS-.git

Write-Host ""
Write-Host "=== STATUS GIT ===" -ForegroundColor Cyan
git remote -v
git log --oneline -1
Write-Host ""

Write-Host "=== PRÊT POUR LE PUSH ===" -ForegroundColor Green
Write-Host ""
Write-Host "OPTION 1 - HTTPS avec Personal Access Token (Recommandé):" -ForegroundColor Cyan
Write-Host "  1. Allez sur: https://github.com/settings/tokens" 
Write-Host "  2. Cliquez 'Generate new token (classic)'"
Write-Host "  3. Sélectionnez la permission 'repo'"
Write-Host "  4. Copiez le token généré"
Write-Host "  5. Exécutez dans ce dossier:"
Write-Host "     git push -u origin main" -ForegroundColor Yellow
Write-Host "  6. Entrez votre username GitHub"
Write-Host "  7. Entrez votre token comme password"
Write-Host ""

Write-Host "OPTION 2 - SSH:" -ForegroundColor Cyan
Write-Host "  1. Assurez-vous d'avoir configuré une clé SSH sur GitHub"
Write-Host "  2. Exécutez:"
Write-Host "     git remote set-url origin git@github.com:jackvactus/OSIRIS-.git" -ForegroundColor Yellow
Write-Host "  3. Puis exécutez:"
Write-Host "     git push -u origin main" -ForegroundColor Yellow
Write-Host ""

Write-Host "OPTION 3 - GitHub CLI:" -ForegroundColor Cyan
Write-Host "  1. Installez GitHub CLI: https://cli.github.com"
Write-Host "  2. Authentifiez-vous: gh auth login"
Write-Host "  3. Poussez: gh repo create --source=. --remote=origin --push"
Write-Host ""

Write-Host "Quelle option voulez-vous utiliser?" -ForegroundColor Magenta
