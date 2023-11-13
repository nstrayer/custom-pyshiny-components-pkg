# Example of building a custom output binding for Shiny. This example
# demonstrates the use of HTMLDependency to include external javascript and css
# files directly in the output element instead of requiring them to be included
# in the ui head everytime


from shiny import ui, App, render

from customShinyComponents import react_input


app_ui = ui.page_fluid(
    react_input("myInput"),
    ui.output_text("valueOut"),
)


def server(input, output, session):
    @render.text
    def valueOut():
        return f"Value from input is {input.myInput()}"


app = App(app_ui, server)
