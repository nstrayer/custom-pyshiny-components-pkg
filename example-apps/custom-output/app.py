# Example of building a custom output binding for PyShiny. This example
# demonstrates the use of HTMLDependency to include external javascript and css
# files directly in the output element instead of requiring them to be included
# in the ui head everytime


from shiny import ui, App
from customShinyComponents import render_custom_output, output_custom_output


app_ui = ui.page_fluid(
    ui.input_slider("n", "Choose a value", 1, 20, 5),
    output_custom_output("myOutput"),
)


def server(input, output, session):
    @render_custom_output
    def myOutput():
        return input.n()


app = App(app_ui, server)
