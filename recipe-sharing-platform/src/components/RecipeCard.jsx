import { Link } from "react-router-dom";


function RecipeCard({recipe}) {
    const {title, summary, image, id} = recipe;

    return (
        <div className="flex justify-start gap-2 shadow-lg rounded-lg p-3 w-fit h-fit">
            <img src={image} alt="Recipe image" className="rounded-lg hover:scale-110"/>
            <div>
                <h2>
                    {title}
                </h2>
                <p>{summary}</p>
                <Link to={`/recipe/${id}`}>
                    View the recipe
                </Link>
            </div>
        </div>
    )
}

export default RecipeCard;
