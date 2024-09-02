# Database via Docker
```bash
docker run --name=demo-A-api-pg --env=POSTGRES_DB=demo-a --env=POSTGRES_USER=root --env=POSTGRES_PASSWORD=root --volume=/Users/deema/Desktop/projects/presento/docker-volumes/demo-A-api-db:/var/lib/postgresql/data -p 5432:5432 -d postgres:16-alpine
```
