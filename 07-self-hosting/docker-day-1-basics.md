# Docker Day 1: Basics in Simple Words

> Part of `07-self-hosting/`. Written in plain language. Every new word is explained the first time it appears. Checklist items are ticked only after I have actually done them.

## 1. What is Docker?

Say I build a Node app on my laptop. It works because my laptop has the right Node version and the right settings. I send it to a friend and it breaks, because their laptop is different.

**Docker fixes this by putting the app and everything it needs into one sealed box.** The box runs the same way on any computer.

- **Image:** the sealed box *before* it runs. Think of it as a recipe with all the ingredients packed in. It just sits there.
- **Container:** the box *while it runs*. Think of it as the meal made from the recipe. One recipe can make many meals, so one image can start many containers.

**Image = the package. Container = the package running.**

## 2. Words used with Docker

### The main things

| Word | Simple meaning | Example |
|---|---|---|
| **Image** | The sealed package. Read-only. Never runs by itself. | `nginx` |
| **Container** | A running (or stopped) copy made from an image. | `web` |
| **Dockerfile** | A text file with step-by-step instructions to build an image. | I will write one soon |
| **Registry** | A server where images are stored and shared (like GitHub, but for images). | Docker Hub |
| **Repository** | One image's collection of versions inside a registry. | `nginx` on Docker Hub |
| **Tag** | A version label on an image, written `name:tag`. If I leave it out, Docker uses `latest`. | `node:20-alpine` |

### The tools

| Word | Simple meaning |
|---|---|
| **Docker Desktop** | The app I install on my computer to build and run containers. It has a window with buttons and also runs the engine in the background. |
| **Docker Engine (daemon)** | The background program that really builds images and runs containers. |
| **CLI** (command line interface) | The `docker` commands I type in the terminal. They send instructions to the engine. |
| **Terminal** | The window where I type commands as text. |

## 3. What is nginx?

**nginx** (said "engine-x") is a **web server**: a program that waits for requests from a browser and replies, usually by sending files like HTML, CSS, JavaScript, and images.

It is also often used as:
- a **reverse proxy**: it sits in front of my app and passes requests to it,
- a **load balancer**: it spreads requests across several copies of my app,
- an **SSL/TLS terminator**: it handles HTTPS so my app does not have to.

I use the official `nginx` image on Day 1 only because it works right away and shows a web page, so it is an easy way to see a container running.

## 4. Docker Desktop vs a registry

These are two different jobs.

- **Docker Desktop** is where I **build and run** containers on *my own computer*. The images it holds live only on my machine.
- **A registry** is where images are **stored and shared** between machines.

Docker Desktop on my laptop cannot hand an image to a server somewhere else. I **push** the image to a registry, and the server **pulls** it from there.

```
My laptop (Docker Desktop) -> build image -> push -> Registry -> pull -> Server / teammate / CI
```

It works like Git and GitHub: Git runs on my computer, GitHub is the shared place. Docker Desktop is like Git, and a registry is like GitHub.

### Which registry?

| Registry | What it is | When I would use it |
|---|---|---|
| **Docker Hub** | The default public registry. Official images (`nginx`, `node`, `mongo`, `redis`) live here. | Pulling base images, publishing public images |
| **GitHub Container Registry (GHCR)** | Registry attached to GitHub. Works well with GitHub Actions. | Publishing my own images later |
| **Harbor** | An open-source registry that companies run on their own servers, with private storage, access control, and security scanning. | Not needed now. Good to know it exists. |
| **AWS ECR / Google Artifact Registry / Azure Container Registry** | The cloud providers' own registries. | When deploying to those clouds |

(Helm is a different tool. It is a package manager for Kubernetes, not a registry.)

**What I need now:** only Docker Desktop. A registry comes later, when I deploy.

## 5. Build-time vs run-time

This is a common confusion.

- **Build-time:** when I run `docker build`. The Dockerfile's `FROM`, `COPY`, and `RUN` instructions run here and produce an **image**.
- **Run-time:** when I run `docker run`. The `CMD` runs here and produces a **container**.

## 6. The container life cycle

`created -> running -> stopped (exited) -> removed`

- `docker run` creates and starts a container.
- `docker stop` stops it. It still exists (`docker ps -a` shows it).
- `docker rm` deletes it. The **image stays**.
- **Detached mode (`-d`):** runs the container in the background so it does not block my terminal.

## 7. Ports

A container is isolated, so I cannot reach a program inside it unless I **publish a port**.

```bash
docker run -p 8080:80 nginx
#             host:container
```

This means: "traffic to port 8080 on my computer goes to port 80 inside the container."

`EXPOSE` in a Dockerfile only *documents* which port the app uses. `-p` is what actually opens it.

## 8. Day 1 steps

### Step 1: Install Docker Desktop
Download it from docker.com, install it, open it, and wait until it says Docker is running.

### Step 2: Check it works
```bash
docker --version
```

### Step 3: Run my first container
```bash
docker run hello-world
```
Docker does not find the `hello-world` image on my machine, **pulls** (downloads) it from Docker Hub, creates a container, runs it, and the container exits after printing a message.

### Step 4: Run a real web server
```bash
docker run -d -p 8080:80 --name web nginx
```
- `-d` runs it in the background
- `-p 8080:80` maps my port 8080 to the container's port 80
- `--name web` gives the container a name

Open `http://localhost:8080` in the browser. The nginx welcome page should appear. (`localhost` means "this computer".)

### Step 5: Look around and clean up
```bash
docker ps                # running containers
docker logs web          # what nginx printed
docker exec -it web sh   # open a shell inside the container (type "exit" to leave)
docker stop web
docker rm web
docker images            # the images are still here
```

Removing the container did not remove the image.

## 9. Commands as words

| Word | Meaning |
|---|---|
| **pull** | Download an image from a registry |
| **push** | Upload an image to a registry |
| **build** | Create an image from a Dockerfile |
| **run** | Create and start a container from an image |
| **exec** | Run a command inside an already running container |
| **prune** | Delete unused containers, images, or volumes |

## 10. Check my understanding

Answer in my own words, without scrolling up:

1. What is the difference between the `nginx` image and the `web` container?
2. What does `-p 8080:80` do, and what happens if I leave it out?
3. If I delete the `web` container, is the `nginx` image deleted too?
4. Does `RUN` in a Dockerfile run when the container starts? (Think: build-time or run-time?)
5. Why do I need a registry if I already have Docker Desktop?

## 11. Day 1 checklist

- [ ] Install Docker Desktop and see it running
- [ ] `docker --version` prints a version
- [ ] `docker run hello-world` works
- [ ] `nginx` page opens at `localhost:8080`
- [ ] Used `ps`, `logs`, `exec`, `stop`, `rm`
- [ ] Answered the 5 questions above without help

## 12. My notes

### What happened when I ran the steps

_(write what I saw, and any errors)_

### What I still find confusing

_(write it down, then ask)_

## 13. Resources

- [Docker Get Started guide](https://docs.docker.com/get-started/)
- [Docker Hub](https://hub.docker.com/)
