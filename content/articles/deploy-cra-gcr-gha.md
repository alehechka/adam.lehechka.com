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
    - [`build`](#build)
    - [`deploy-gcr`](#deploy-gcr)

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

Before getting started on this step, I do want to warn you that you can skip this step entirely and go straight to the [GitHub Action](#manual-deploy-to-google-cloud-run) which needs a different set of steps. I included the manual process steps to help you understand what all needs to be orchestrated within the automatic CI/CD workflow.

If you chose to work through the manual steps, glad you’re here, you’ll gain more from being able to do these things manually so you can better troubleshoot your own projects. Let’s get started!

First, you’ll need to download the [GCloud SDK](https://cloud.google.com/sdk/docs/quickstart). Don’t worry too much about initializing a project from the command line, we mainly need the tool to be able to authorize our Docker container to be pushed into Google Container Registry.

Next, with a valid Google account, you can create a new [Google Cloud Platform](https://console.cloud.google.com/) account which includes a free year of its products and $300 of compute credits. After creating your account, create a new project to house the Docker container and Cloud Run service.

From the taskbar, click on ‘Select a project’

![GCP Navbar](/images/deploy-cra-gcr-gha/gcp_navbar.png)

Then in the modal, click New Project to create one

![GCP Create Project](/images/deploy-cra-gcr-gha/gcp_create_project.png)

After creating your project, you can use the ‘Select a project’ dropdown again to view all of your projects, within the modal take note of the created project ID, we’ll need it when we deploy our container. In my case, my project ID is `medium-react-gcr`.

Return back to the command line, within the `.docker` directory, we need to create the Docker image again, but this time using the GCR domain and our project ID, it will look similar to this:

```bash
docker build -t gcr.io/medium-react-gcr/react-app .
```

Be sure to replace `medium-react-gcr` with your own project ID and feel free to switch out `react-app` with whatever you want to name your image.

Next, we’ll need to authenticate our GCloud SDK to [configure Docker](https://cloud.google.com/container-registry/docs/pushing-and-pulling), run the following command, and log in using the same Google account as your created project.

```bash
gcloud auth configure-docker
```

With that complete, we can push the Docker image to Google Cloud Registry using the following command:

```bash
docker push gcr.io/medium-react-gcr/react-app
```

Be sure to use the same exact tag in the above `push` command as you used in the `build` command.

You can go view your upload Docker image under the [Google Container Registry](https://console.cloud.google.com/gcr) tab in the console.

## Manual deploy to Google Cloud Run

Now to deploy our container to a Cloud Run service! On the [Cloud Run](https://console.cloud.google.com/run) tab, click on the ‘Create Service’ button in the ribbon.

![Create Cloud Run Service](/images/deploy-cra-gcr-gha/gcp_cloud_run_create_service.png)

In the Create Service screen, on item #1, select the Region closest to you physically (for fastest response times) and provide a name for your service (this can be different than the name you gave the container.

![Cloud Run Settings](/images/deploy-cra-gcr-gha/gcp_cloud_run_settings.png)

On #2, use option one, and hit the ‘SELECT’ button on the input field, this will open a drawer to let you pick a container from the Container Registry.

![Cloud Run Revision](/images/deploy-cra-gcr-gha/gcp_cloud_run_revision.png)

In the drawer, find the container directory that you just pushed, open the dropdown, select the most recent image version, and hit the ‘SELECT’ button at the bottom.

![Cloud Run Container Image](/images/deploy-cra-gcr-gha/gcp_cloud_run_container_image.png)

Finally, in #3, for the purposes of a React app that anyone can use, select the `Allow unauthenticated invocations` option. Then hit the ‘CREATE’ button.

![Cloud Run Service Trigger](/images/deploy-cra-gcr-gha/gcp_cloud_run_trigger.png)

This will immediately start spinning up resources for your Cloud Run service, but we need to make one small edit for our service to work. In the ribbon, hit the ‘Edit & Deploy New Revision’ button.

![Cloud Run Edit Revision](/images/deploy-cra-gcr-gha/gcp_cloud_run_edit_revision.png)

Under Advanced Settings, make sure the PORT is set to 8080. This is to match the PORT provided in the `Dockerfile` and `nginx.conf`. This can be configured to use any port, but all three of the provided ports must match.

![Cloud Run Advanced Settings](/images/deploy-cra-gcr-gha/gcp_cloud_run_advanced_settings.png)

After changing the port, scroll to the bottom of this page and hit ‘DEPLOY’.

Give Cloud Run some time to finish deploying, once it is complete you’ll be able to see the created URL where your service is hosted!

![Cloud Run Deployed URL](/images/deploy-cra-gcr-gha/gcp_cloud_run_deployed.png)

(Don’t bother trying the URL above, I have already deleted the service within my own GCP instance).

Within the Cloud Run console, you can also provide a custom domain to have a prettier URL to navigate to.

![Cloud Run Custom Domain](/images/deploy-cra-gcr-gha/gcp_cloud_run_custom_domain.png)

## Automatic Deployment with GitHub Actions

If you chose to follow the manual process above you’ll be able to appreciate a fully hosted React app on Google Cloud Run, congrats! Now we’re gonna make that whole process a breeze by creating a [GitHub Action](https://github.com/google-github-actions/setup-gcloud/blob/master/example-workflows/cloud-run/README.md) that will automatically build and deploy a new version of our Docker image to Google Container Registry and have Google Cloud Run allocate its resources to the new image.

The first thing we’ll need to do is set up our GitHub repository with some secrets that allow our Action to be authenticated with Google Cloud Platform. We’ll need to create a new service account for GitHub so visit the [IAM](https://console.cloud.google.com/iam-admin) console of GCP, and click on ‘Service Accounts’ in the nav menu. From there, click on ‘Create Service Account’ in the ribbon.

![GCP IAM](/images/deploy-cra-gcr-gha/gcp_iam.png)

On the first step, provide a service account name (I used GitHub for obvious reasons), and the service account ID will populate automatically. Then hit ‘Create’.

![IAM Service Account](/images/deploy-cra-gcr-gha/gcp_iam_service_account.png)

On step two, you’ll need to add all the following Cloud IAM roles to the service account to allow permissions to Cloud Build and Cloud Run.

- `Cloud Run Admin` - allows for the creation of new services
- `Cloud Build Editor` - allows for deploying cloud builds
- `Cloud Build Service Account` - allows for deploying cloud builds
- `Viewer` - allows for viewing the project
- `Service Account User` - required to deploy services to Cloud Run

![IAM Service Account Permission](/images/deploy-cra-gcr-gha/gcp_iam_sa_permissions.png)

On the third step, you can allow access to the service account, but this is not necessary for what we’re trying to do. When you’re finished, click the ‘Done’ button.

![IAM SA Done](/images/deploy-cra-gcr-gha/gcp_iam_done.png)

Back on the Service Accounts page, find your newly created account. Click on the vertical ellipses, then click ‘Create key’.

![IAM Create Key](/images/deploy-cra-gcr-gha/gcp_iam_create_key.png)

This will open the following modal, select ‘JSON’ then click ‘Create’. This will download the private key in JSON format to your computer.

![IAM Create Key Modal](/images/deploy-cra-gcr-gha/gcp_iam_create_key_modal.png)

Now we can move over to GitHub to set our repository secrets. Under the ‘Settings’ tab, click on ‘Secrets’ in the left nav panel. From here, click on the ‘New repository secret’

![GitHub Secrets](/images/deploy-cra-gcr-gha/github_secrets.png)

On the New secret page, the first secret we’ll create is `GCR_PROJECT` . This will need to have the value of your GCP project ID. Enter both fields and click ‘Add secret’.

![GitHub Secret 1](/images/deploy-cra-gcr-gha/github_secrets_key1.png)

The second secret we need is `GCR_SA_KEY`. The value for this secret will need to be the contents of the private key JSON file we downloaded earlier. Open the JSON, copy the entire file’s contents, and paste them into the value input field. Then click ‘Add secret’

![GitHub Secret 2](/images/deploy-cra-gcr-gha/github_secrets_key2.png)

One last step to be sure you’re fully configured for the upcoming GitHub Action, you will need to enable the [Google Cloud Build API](https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?q=build) to your current project. This will be required to build the Docker image and store it within Google Container Registry. At this point, also be sure that your trial period is activated, your account is upgraded to a full access account, and that a billing method is added. (Remember, if you just created a new account you will have $300 compute credits that will be used before charging anything).

With the Service Account created and GitHub secrets saved with the private key, we can get back into the code the create the GitHub Action.

Next, at the head of your repository, create a `.github` directory, and within that, create a `workflows` directory. This is the file structure that GitHub will look for to automatically pull in your Action workflow.

In this directory, create a new file, `gcr-deploy.yml`. Really this file can be named anything as long as it ends with the `.yml` or `.yaml` extensions.

Here is what our finished GitHub Action will look like. If you’re copying the config, make sure to change the `RUN_REGION` and `SERVICE_NAME` before pushing it to GitHub.

<script src="https://gist.github.com/alehechka/02013635bafe1cd437b91e641cc62e65.js"></script>

[gcr-deploy.yml](https://gist.github.com/alehechka/02013635bafe1cd437b91e641cc62e65)

A quick rundown of what’s happening in the above action.

#### `build`

- Checks out the repository
- Pulls in cached node_modules (for faster repeat runs)
- Installs dependencies
- Builds the production React app.
- Finally, it archives the build folder for use in the next job.

#### `deploy-gcr`

- Checks out the repository
- Downloads the archived buildfolder into the .docker directory
- Prepares the GCloud CLI with your project ID and private key
- Pushes the .docker directory to Google Cloud Build to build the Docker image and save it to Google Cloud Registry.
- Finally deploys the Docker image to your Cloud Run service.

Commit and push the new workflow to GitHub and watch the magic happen. On GitHub, go to the Actions tab and find your Action being run. You can click on the Action to view the console and see each step do its thing.

![GitHub Action](/images/deploy-cra-gcr-gha/github_action.png)

Within the console, for the created GitHub Action you’ll be able to view all logs that are printed from the workflow. If any steps fail you will find them here and should be able to troubleshoot from what’s printed out as an error message.

If you run into any other issues with any of this process please let me know and I will edit this post to include any clarifications needed.

With that, you now have a new React app with the CI/CD pipeline in place to automatically deploy your application as a Docker image to Google Cloud Run!

You can find the full source code in the repository here: https://github.com/alehechka/medium-react-gcr

Good luck and happy coding!
