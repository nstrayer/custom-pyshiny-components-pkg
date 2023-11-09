# from pathlib import Path
from htmltools import HTMLDependency, Tag


from shiny.render.transformer import (
    output_transformer,
    resolve_value_fn,
    TransformerMetadata,
    ValueFn,
)
from shiny.module import resolve_id
from pathlib import PurePath


dist_path = PurePath(__file__).parent / "custom-output/dist"


@output_transformer()
async def render_custom_output(
    _meta: TransformerMetadata,
    _fn: ValueFn[int | None],
):
    res = await resolve_value_fn(_fn)
    if res is None:
        return None

    if not isinstance(res, int):
        # Throw an error if the value is not a dataframe
        raise TypeError(f"Expected a integer, got {type(res)}. ")

    # Get data from dataframe as a list of lists where each inner list is a
    # row, column names as array of strings and types of each column as an
    # array of strings
    return {"value": res}


custom_output_deps = HTMLDependency(
    "shiny-custom-output",
    "1.0.0",
    source={"package": "customShinyComponents", "subdir": str(dist_path)},
    script={"src": "index.js", "type": "module"},
    all_files=True,
)


def output_custom_output(id, height="200px"):
    """
    A shiny output. To be paired with
    `render.custom_output` decorator.
    """
    return Tag(
        "shiny-custom-output",
        custom_output_deps,
        # Use resolve_id so that our component will work in a module
        id=resolve_id(id),
    )
