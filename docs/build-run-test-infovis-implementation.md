
## 1. Clone those two repositories and install their dependencies:

[RawGraphs Charts Repo](https://github.com/blindguardian50/rawgraphs-charts)

[RawGraphs App Repo](https://github.com/blindguardian50/rawgraphs-app)

## 2. Check out master on both repositories.

## 3. Creating a build and testing locally in RAWGraphs app:

In terminal, browse the folder containging `rawgraphs-charts` and create a build with the command:

```shell
npm run build
```

Then create a link with the command:

```shell
yarn link
```

Open the terminal and browse the folder containing rawgraphs-app, link the local chart with the command:

```shell
yarn link "@rawgraphs/rawgraphs-charts"
```

And test it locally by starting the app:

```shell
npm run start
```
or by simply going to the package.json configuration and execute the start script.

Everytime you will create a new build of `rawgraphs-chart` your local version of `rawgraphs-app` will be updated.
