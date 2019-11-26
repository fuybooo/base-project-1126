git add -A
git commit -m 'chore: 构建到github'
git push
git subtree push --prefix=dist origin gh-pages
