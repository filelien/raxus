# Script pour pousser RAXUS vers GitHub (filelien/raxus)

Write-Host "`n========== RAXUS - GITHUB PUSH ==========" -ForegroundColor Cyan
Write-Host ""

# Update README
Write-Host "Mise à jour du README..." -ForegroundColor Yellow
$readme = Get-Content "README.md" -Raw
if ($readme -notcontains "# raxus") {
    "# raxus" | Add-Content README.md
    Write-Host "✓ '# raxus' ajouté au README" -ForegroundColor Green
} else {
    Write-Host "✓ README déjà contient '# raxus'" -ForegroundColor Green
}
Write-Host ""

# Initialize git if needed
Write-Host "Vérification du repository Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✓ Repository Git existant trouvé" -ForegroundColor Green
} else {
    Write-Host "Initialisation du repository Git..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Repository Git initialisé" -ForegroundColor Green
}
Write-Host ""

# Configure user
Write-Host "Configuration de l'utilisateur Git..." -ForegroundColor Yellow
git config user.name "INOV AFRIK"
git config user.email "dev@inovafrik.com"
Write-Host "✓ Utilisateur configuré" -ForegroundColor Green
Write-Host ""

# Add files
Write-Host "Ajout de tous les fichiers..." -ForegroundColor Yellow
git add .
Write-Host "✓ Fichiers ajoutés" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "Création du commit..." -ForegroundColor Yellow
git commit -m "Initial commit: RAXUS - Intelligent Infrastructure Platform"
Write-Host "✓ Commit créé" -ForegroundColor Green
Write-Host ""

# Rename branch
Write-Host "Renommage de la branche en 'main'..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branche renommée" -ForegroundColor Green
Write-Host ""

# Update remote
Write-Host "Configuration du remote GitHub..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin git@github.com:filelien/raxus.git
Write-Host "✓ Remote origin ajouté" -ForegroundColor Green
Write-Host ""

# Show status
Write-Host "========== STATUS FINAL ==========" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository: " -NoNewline
git remote -v | Select-Object -First 1
Write-Host ""
Write-Host "Dernier commit:" -ForegroundColor Cyan
git log --oneline -1
Write-Host ""
Write-Host "Branche actuelle:" -ForegroundColor Cyan
git branch --show-current
Write-Host ""

# Push
Write-Host "========== PUSH VERS GITHUB ==========" -ForegroundColor Cyan
Write-Host ""
Write-Host "Exécution: git push -u origin main" -ForegroundColor Yellow
Write-Host ""
git push -u origin main

Write-Host ""
Write-Host "========== TERMINÉ ==========" -ForegroundColor Green
Write-Host "✓ Le projet a été poussé vers: git@github.com:filelien/raxus.git" -ForegroundColor Green
Write-Host ""
