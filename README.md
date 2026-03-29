# Getting Started

Clone the repository and install dependencies for both server and client:

### Install dependencies

```bash
npm run install:all
```

### Run in development

```bash
npm run dev
```

## Project Structure

```
onAim/
├── client/                     # React frontend (Vite + TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── api/                # Axios instances and base API config
│   │   ├── components/         # Shared UI components
│   │   ├── context/            # React context providers
│   │   ├── features/           # Feature slices (wheel, raffle, leaderboard)
│   │   ├── pages/              # Route-level page components
│   │   ├── routes/             # React Router configuration
│   │   ├── styles/             # Global styles and theme
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   └── package.json
│
├── server/                     # Express backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── config/             # App configuration
│   │   ├── constants/          # Shared constants
│   │   ├── controllers/        # Route controllers
│   │   ├── data/               # JSON file storage
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API route definitions
│   │   ├── types/              # TypeScript types
│   │   ├── utils/              # Utility functions
│   │   ├── validators/         # Zod schemas
│   │   └── app.ts
│   ├── .env.example
│   └── package.json
│
├── package.json                # Root workspace config
└── README.md
```

## Features

- **Wheel Management** - Create and manage prize wheels with segment configuration and live preview
- **Raffle Management** - Configure raffles with ticket pricing, date ranges, and prize pools
- **Leaderboard Management** - Set up leaderboards with scoring types, participant limits, and ranked prizes
- Light/dark mode toggle
- Server-side pagination, sorting, and filtering
- Form validation with inline errors
- Unsaved changes protection

### 🗂️ არქიტექტურული გადაწყვეტილებები

- ვერტიკალური slice სტრუქტურა: თითოეული feature-ის ყველა კოდი ერთ ადგილშია თავმოყრილი, რაც გამორიცხავს მრავალ ფოლდერში
  ძებნის საჭიროებას. feature-ები დამოუკიდებელია და გავლენას არ ახდენს ერთმანეთზე.
- ცალკე query key თითო feature-ისთვის საშუალებას იძლევა feature-ის მთლიანი cache ერთი ოპერაციით წაიშალოს.
- feature-ების იზოლაცია: თითოეული feature სრულად დამოუკიდებელია; ერთის წაშლა არ უნდა არღვევდეს სხვების ფუნქციონირებას.
- **JSON მონაცემთა სტრუქტურა**: მონაცემები JSON ფორმატში ინახება, რაც უზრუნველყოფს მარტივ წვდომას და მონაცემების
  პრეპოპულაციას. MongoDB-ის ნაცვლად JSON ფაილი ავირჩიეთ, რადგან პროექტი არ საჭიროებს რეალურ მონაცემთა ბაზას მონაცემთა
  მოცულობა მცირეა და მთავარი აქცენტი კეთდება frontend არქიტექტურაზე.
- **Zod ვალიდაცია ორივე მხარეს:** ვალიდაციის სქემები დუბლირებულია frontend და backend მხარეს. frontend-ზე Zod + React
  Hook Form უზრუნველყოფს inline შეცდომებს, backend-ზე კი სერვერის მხარის დაცვას.
- **URL-სინქრონიზებული ფილტრები:** list-გვერდებზე ფილტრები, სორტირება და გვერდის URL search params-ში ინახება
  `useSearchParams`-ის გამოყენებით, რაც ბმულის გაზიარებისა და ბრაუზერის უკან/წინ ნავიგაციის საშუალებას იძლევა.
- **per-feature Error Boundary:** Layout-ში განთავსებული error boundary იჭერს feature-ის error-ის ისე, რომ სხვა
  feature-ები გამართულად აგრძელებენ მუშაობას.