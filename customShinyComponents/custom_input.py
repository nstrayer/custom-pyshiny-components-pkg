from htmltools import HTMLDependency, Tag


from shiny.module import resolve_id
from pathlib import PurePath


dist_path = PurePath(__file__).parent / "custom-input/dist"

custom_input_deps = HTMLDependency(
    "shiny-custom-input",
    "1.0.0",
    source={"package": "customShinyComponents", "subdir": str(dist_path)},
    script={"src": "index.js", "type": "module"},
    all_files=True,
)


def custom_input(id):
    """
    A shiny input.
    """
    return Tag(
        "shiny-custom-input",
        custom_input_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )
