from htmltools import Tag
from shiny.module import resolve_id
from .html_dep import custom_component_deps


def custom_input(id):
    """
    A shiny input.
    """
    return Tag(
        "shiny-custom-input",
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )
