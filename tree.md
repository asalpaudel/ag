# Project Directory Tree

This file documents the core structure generated for the **Top-Up & Withdraw Management System**, deliberately excluding `node_modules`, standard configuration binaries, and OS-specific build directories for clarity.

```text
d:\ag\
│   prd.md
│   README.md
│   tree.md
│   
├───admin-panel\
│   │   index.html
│   │   package.json
│   │   postcss.config.js
│   │   tailwind.config.js
│   │   vite.config.ts
│   │   
│   └───src\
│       │   App.tsx
│       │   index.css
│       │   main.tsx
│       │   vite-env.d.ts
│       │   
│       ├───components\
│       │       ProtectedRoute.tsx
│       │       
│       └───pages\
│               Dashboard.tsx
│               Games.tsx
│               Login.tsx
│               Payments.tsx
│               TopUpQueue.tsx
│               
├───backend\
│   │   .env
│   │   nest-cli.json
│   │   package.json
│   │   tsconfig.json
│   │   
│   ├───prisma\
│   │       schema.prisma
│   │       
│   └───src\
│       │   app.module.ts
│       │   main.ts
│       │   
│       ├───audit\
│       │       audit.module.ts
│       │       audit.service.ts
│       │       
│       ├───auth\
│       │       auth.controller.ts
│       │       auth.module.ts
│       │       auth.service.ts
│       │       jwt-auth.guard.ts
│       │       jwt.strategy.ts
│       │       roles.decorator.ts
│       │       roles.guard.ts
│       │       
│       ├───encryption\
│       │       encryption.module.ts
│       │       encryption.service.ts
│       │       
│       ├───events\
│       │       events.gateway.ts
│       │       events.module.ts
│       │       
│       ├───games\
│       │       games.controller.ts
│       │       games.module.ts
│       │       games.service.ts
│       │       
│       ├───orders\
│       │       orders.controller.ts
│       │       orders.module.ts
│       │       orders.service.ts
│       │       
│       ├───payments\
│       │       payments.controller.ts
│       │       payments.module.ts
│       │       payments.service.ts
│       │       
│       └───users\
│               users.controller.ts
│               users.module.ts
│               users.service.ts
│               
└───mobile-app\
    │   App.tsx
    │   app.json
    │   babel.config.js
    │   index.js
    │   package.json
    │   
    ├───android\             # React Native OS Build Layer
    ├───ios\                 # React Native OS Build Layer
    │   
    └───src\
        └───screens\
                HomeScreen.tsx
                ProfileScreen.tsx
                TopUpScreen.tsx
                WithdrawScreen.tsx
```
