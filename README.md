This repo is an example of a python package that contains with custom components for shiny.

## Structure

In an attempt to be as pick and chooseable as possible each example is setup in a distinct sub-folder in the `customShinyComponents` folder.

Take for example the `custom-output` component.

The code structure is as follow:

```
customShinyComponents/
  custom-output/    # JS for the custom-output component
  custom-output.py  # Python functions for the custom-output component
  __init__.py       # This aggregates all the components into a single module
  ...
example-apps/
  custom-output/    # Example app for the custom-output component
  ...
...
```

Each of these contains the javascript needed to make the component work.

For example the `custom-output/` folder contains the javascript needed to make the `customOutput` component work.

The python for this component is in the .py file of the same at the main source level: `customShinyComponents/custom-output.py`.

In addition, there are example apps that demo each component in the `example-apps/` folder.

## Using/ Developing package

### Setting up python package in "editable" mode

This should be run from the root of the repo

```
pip install -e .
```

## Setting up JS for development

Each component has a `package.json` file that contains the dependencies needed to build the component.

So to install the dependencies for the `custom-output` component you would run:

```
cd customShinyComponents/custom-output
npm install
```

Then from the same folder you can build the assets with:

```
npm run build
```

Or if you want to watch the files for changes and rebuild on the fly you can run:

```
npm run watch
```
