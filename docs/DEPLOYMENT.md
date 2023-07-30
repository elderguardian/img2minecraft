# Deployment


## Install with Docker

#### **`docker-compose.yml`**
```
services:
  img2minecraft:
    ports:
      - "9000:8090"
    image: ghcr.io/elderguardian/img2minecraft:latest
```

This will fire up the latest version on port `9000`.
However, If you want to use a specific version,
their image can be conveniently accessed from the project's releases page.


## Install with Apache/NGINX
1. `git clone https://github.com/elderguardian/img2minecraft.git`
2. `cd img2minecraft`
3. `npm install && npm run build`
4. `mv dist/* /var/www/html`