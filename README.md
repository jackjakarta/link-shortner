# Klikr Link Shortner - Next.js 14

## Requirements

- [fnm](https://github.com/Schniz/fnm)

## Usage

Before the application can be started, you need to install the necessary tools.

```sh
fnm use # sets up the node version
corepack enable # sets up the proper package manager
corepack prepare
pnpm i # installs the dependencies
```

You can start a local postgres instance using docker compose:

```sh
docker compose up -d postgres
```

You will also need to bring the database up to date by migrating it:

```sh
pnpm db:migrate
```

You can now start the application:

```sh
pnpm dev
```

ENV Template

```
DATABASE_URL=postgresql://postgres:h4yuasd6@127.0.0.1:5432/local-nextjs
NEXTAUTH_URL=http://127.0.0.1:3000
NEXTAUTH_SECRET=secret-random-string
NEXT_PUBLIC_BASE_URL=http://127.0.0.1:3000
GITHUB_ID=
GITHUB_SECRET=
EMAIL_ACCOUNT=
MJ_APIKEY_PUBLIC=
MJ_APIKEY_PRIVATE=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_URL=
AWS_S3_ENDPOINT_URL=
AWS_STORAGE_BUCKET_NAME=
AWS_REGION=
OPENAI_API_KEY=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```
