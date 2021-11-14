---
title: 'Deploying a React App to Google Cloud Run With GitHub Actions'
date: '2020-11-14'
medium: 'https://medium.com/swlh/deploying-a-react-app-to-google-cloud-run-with-github-actions-ae24ac6cb85a'
github: 'https://github.com/alehechka/medium-react-gcr'
---

![React, Docker, Google Cloud Run](/images/deploy-cra-gcr-gha/react_docker_gcr-no_background.png)

Google’s Cloud Run product allows for scalable containerized applications in a fully managed serverless environment.

Since Cloud Run is serverless it allows your services to scale down to zero and incur no charges or scale to infinity when your app blows up! 🤯

This makes for a great way to quickly deploy and host any number of web applications for very cheap on new startups and highly scalable for a growing product.

---

- [create-react-app](#create-react-app)
- [Docker](#docker)
- [Manual push to Google Container Registry](#manual-push-to-google-container-registry)
- [Manual deploy to Google Cloud Run](#manual-deploy-to-google-cloud-run)
- [Automatic Deployment with GitHub Actions](#automatic-deployment-with-github-actions)

---

## create-react-app

Assuming you already have [Node.js](http://nodejs.org/) installed, run the following command to create a brand new create-react-app.

```bash
npx create-react-app my-app
```

This tool simply allows us to get up and running with a working React app, if you know of a better process or tool to create a start React app, feel free to use that instead!

> Note: I personally recommend using TypeScript, it makes the development experience a lot friendlier, this can be done with create-react-app templates:

```bash
npx create-react-app my-app --template typescript
```

At this point, feel free to develop your React app to your heart’s content, but for the remainder of the tutorial, the base CRA is enough.

---

## Docker

The next logical step in our deployment process is to containerize our React application using Docker. Assuming you have [Docker](https://www.docker.com/get-started) installed, we’ll start with creating a Dockerfile. I personally like to box all of my Docker configuration files into a `.docker` folder to keep things organized. For simplicity, I have provided a sample Dockerfile below. If you have experience with or want to customize your container further, feel free to do so, but the following will get us where we need to go.

<script src="https://gist.github.com/alehechka/d62489e0a874ada510979dfc9a6d2df1.js"></script>

[Dockerfile](https://gist.github.com/alehechka/d62489e0a874ada510979dfc9a6d2df1)

If you read into the above Dockerfile, you can see multiple references to nginx and an `nginx.conf`. That’s because it is the exact tool we’re using to serve the React app’s files. [Nginx](https://www.nginx.com/) is an extremely powerful tool with lots of flexibility to be used in many use cases but admittedly has a learning curve. To once again make things easy, I have provided an `nginx.conf` file below that will serve our React app within the Docker container.

<script src="https://gist.github.com/alehechka/33b85f46eacefae88979a110d10200d0.js"></script>

[nginx.conf](https://gist.github.com/alehechka/33b85f46eacefae88979a110d10200d0)

Finally, we’ll need to tell Docker to ignore some files for the purpose of creating the smallest Docker image possible, we do that with a `.dockerignore` file. Below is an example.

<script src="https://gist.github.com/alehechka/104d5f805625255060beaf8dc9247800.js"></script>

[.dockerignore](https://gist.github.com/alehechka/104d5f805625255060beaf8dc9247800)

After creating all of the above files we have two more steps to complete before building our first Docker image. The first is to build the React app itself. It is also possible to build the React app within the Docker image, but I personally like building the React image separately to get more control over the build process. From the command line, run:

```bash
npm run build

# If you have Yarn installed, you can instead run:

yarn build
```

This will create a built, production-ready version of our React application inside the newly created `build` folder. The second step is to move that `build` folder into the `.docker` folder. This is only required if you followed my recommendation to organize all your Docker configs into one place. (Don’t worry, once we set up our GitHub Action you won’t have to worry about moving the `build` folder all the time)

Speaking of which, your Docker configurations are now complete, your `.docker` directory should look as follows:

![Docker folder structure](/images/deploy-cra-gcr-gha/docker_folder.png)

Now we’re ready to build and run our Docker image!

From the command line in the `.docker` directory, run:

```bash
docker build -t react-app .
```

Next, we can test our Docker image by starting it up with the following command:

```bash
docker run -p 8080:8080 react-app
```

This will run the Docker container on [http://localhost:8080](http://localhost:8080). The `-p 8080:8080` simply tells the container to accepts requests on PORT 8080 and forward them to the internal PORT 8080 (specified in the Dockerfile and nginx.conf).

Note: Before committing anything to GitHub, I would also recommend editing your `.gitignore` file to ignore the build folder at any level. This will make it so pushing your current `.docker` folder won’t also push the `build` folder inside. You can do this by changing the `/build` line to be `*build` within the `.gitignore` file.

---

## Manual push to Google Container Registry

## Manual deploy to Google Cloud Run

## Automatic Deployment with GitHub Actions
