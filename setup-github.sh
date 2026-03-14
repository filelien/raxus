#!/bin/bash
# Script pour configurer et pousser sur GitHub

echo "=== CONFIGURATION GIT POUR GITHUB ==="
echo ""

# Vérifier si git est initialisé
if [ ! -d ".git" ]; then
    echo "Initialisation du repository Git..."
    git init
    git config user.name "INOV AFRIK"
    git config user.email "dev@inovafrik.com"
else
    echo "Repository Git existant trouvé."
fi

echo ""
echo "Ajout de tous les fichiers..."
git add .

echo "Création du commit initial..."
git commit -m "Initial commit: RAXUS - Intelligent Infrastructure Platform by INOV AFRIK"

echo "Renommage de la branche en 'main'..."
git branch -M main

echo "Ajout du remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/jackvactus/OSIRIS-.git

echo ""
echo "=== PRÊT POUR LE PUSH ==="
echo ""
echo "Pour pousser sur GitHub, vous avez deux options:"
echo ""
echo "Option 1 - HTTPS avec Personal Access Token (recommandé):"
echo "  1. Allez sur https://github.com/settings/tokens"
echo "  2. Créez un nouveau token avec les permissions 'repo'"
echo "  3. Exécutez: git push -u origin main"
echo "  4. Entrez votre username et le token comme password quand demandé"
echo ""
echo "Option 2 - SSH:"
echo "  1. Assurez-vous d'avoir configuré une clé SSH sur GitHub"
echo "  2. Changez l'URL du remote: git remote set-url origin git@github.com:jackvactus/OSIRIS-.git"
echo "  3. Exécutez: git push -u origin main"
echo ""
