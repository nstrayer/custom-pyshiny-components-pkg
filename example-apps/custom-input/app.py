# pyright: basic

# Example of building a custom output binding for PyShiny. This example
# demonstrates the use of HTMLDependency to include external javascript and css
# files directly in the output element instead of requiring them to be included
# in the ui head everytime


from shiny import ui, App, render

from customShinyComponents import custom_input


app_ui = ui.page_fluid(
    custom_input("myInput"),
    ui.output_text("valueOut"),
)


def server(input, output, session):
    @render.text
    def valueOut():
        return f"Value from input is {input.myInput()}"


app = App(app_ui, server)
