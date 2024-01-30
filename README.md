Segédlet

1. töltsd le a dockert
2. Clone-ozd a main repository-t
3. a root mappában npm install
4. cd apps/backend
5. npm install
6. npx prisma generate
7. npm run db:dev:restart (linux vagy mac alatt nembiztos hogy működik) "db:dev:restart": "npm run db:dev:rm && npm run db:dev:up && node -e \"setTimeout(()=>{}, 1000)\" && npm run prisma:dev:deploy && npm run prisma:studio", =>
8. forrás: apps/backend package.json "db:dev:restart": "npm run db:dev:rm && npm run db:dev:up && npm run prisma:dev:deploy && npm run prisma:studio"
9. Új terminál
10. cd apps/frontend
11. npm install
12. cd ../ ..
13. npm run bs (build and run)
14. localhost:3000

Dev mode 
az apps/frontend és backend mappából npm run dev (két külön terminál)
localhost:5173

Kérdés: bence2002327@gmail.com vagy telefonon
