from htmltools import Tag
from .html_dep import custom_component_deps


from shiny.module import resolve_id


def react_input(id):
    """
    A shiny input.
    """
    return Tag(
        "custom-react-input",
        custom_component_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )
