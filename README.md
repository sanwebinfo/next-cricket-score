# Live Cricket Score

![build-test](https://github.com/sanwebinfo/next-cricket-score/workflows/build-test/badge.svg)  

 ~~Next.js Cricket Score API - Simple PWA Web app and API to Get Live Cricket Score updates.~~  

 Next.js Cricket Score Web APP - Simple PWA Web app and API to Get Live Cricket Score updates.  

**API is not working due to the Cricbuzz Mobile site being Fully Redesigned - The full Site Structure was Changed it's a bit complex to get data - Please Consider using the Python Cricket API Version - <https://github.com/sanwebinfo/python-cricket-score/tree/main/api>**  

![Screenshot from 2023-09-09 18-09-44](https://github.com/sanwebinfo/next-cricket-score/assets/10300271/fc4990a5-1983-45f3-bff1-687b22762056)

> This project is for Educational and Learning usage - all data credits go to `Cricbuzz.com`.

⚛ React + Next.js | 🌩 Vercel  

## Free Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanwebinfo%2Fnext-cricket-score)

## Features 🍔

- React + Next JS
- Tailwind CSS
- Power Packed with React and Next Modules
- Next JS API Router for fetch score data from API
- PWA Support
- Vercel cache Support

```sh

## Homepage - Get Live Score
http://localhost:3000

## Get Match Score by ID
http://localhost:3000/score?id=123456

```

## proxy API 🍪

- Get API from this repo <https://github.com/sanwebinfo/python-cricket-score/tree/main/api>
- Deploy it on vercel or **Self-host (recommended)**
- Update the current Live match ID at `/app/proxy/live/match.json`

For more check - `/app/proxy/live/route.js`

```sh
http://localhost:3000/proxy/live
```

- Get Live Score data by match id

For More Check - `/app/proxy/match/[slug]/route.js`

```sh
http://localhost:3000/proxy/match/53350
```

- Add your Primiary API URL in `.env` File / For production - <https://vercel.com/docs/projects/environment-variables>

```sh
MATCH_API=https://yourapurl.com/score/live?id=
```

- API was cached to 3 secs you can update the cache validation according to your needs - <https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config>

## Installation 📦

- Required node.js LTS version (18 or 20)
- `pnpm` package manager

```sh
npm install -g pnpm
````

- Clone this repo or Download

```sh
git clone https://github.com/sanwebinfo/next-cricket-score
cd next-cricket-score
pnpm install
```

- Test the site

```sh
pnpm dev
```

- Build the site

```sh
pnpm build
```

- Test the production Build on Localhost

```sh
pnpm start
```

## Contributing 🙌

Your PR's are Welcome

## Disclaimer 🗃

- This is not an Offical API from Cricbuzz - it's an Unofficial API
- This is for Education Purposes only - use at your own risk on the Production Site

## LICENSE ☑

MIT
