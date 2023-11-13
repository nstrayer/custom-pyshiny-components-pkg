This repo is an example of a python package that contains with custom components for shiny.

## Structure

Take for example the `custom-output` component.

The code structure is as follow:

```
package.json        # Contains the dependencies needed to build the components javascript
srcts/              # Source Typescript files
  custom_output.ts
  ...
customShinyComponents/
  custom_output.py  # Python functions for the custom-output component
  __init__.py       # This aggregates all the components into a single module
  distjs/           # Where the bundled js files are put
  ...
example-apps/
  custom-output/    # Example app for the custom-output component
  ...
...
```

In addition, there are example apps that demo each component in the `example-apps/` folder.

## Using/ Developing package

### Setting up python package in "editable" mode

This should be run from the root of the repo

```
pip install -e .
```

## Setting up JS for development

Install the dependencies for javascript:

```
npm install
```

Build assets into the `customShinyComponents/distjs` folder:

```
npm run build
```

Or if you want to watch the files for changes and rebuild on the fly you can run:

```
npm run watch
```

## Running the example apps

With both the python package and the javascript built, you can run the example apps (typically using the Shiny vscode extension).

For example, to run the `custom-output` example app, you can run:

```
Shiny run example-apps/custom-output/app.py
```
