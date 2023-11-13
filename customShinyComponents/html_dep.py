from htmltools import HTMLDependency
from pathlib import PurePath


custom_component_deps = HTMLDependency(
    "shiny-custom-input",
    "1.0.0",
    source={
        "package": "customShinyComponents",
        "subdir": str(PurePath(__file__).parent / "distjs"),
    },
    script={"src": "index.js", "type": "module"},
    all_files=True,
)
