import { useParams } from "react-router-dom";
import recipes from '../data.json';
import { useEffect, useState } from "react";

function RecipeDetail() {
    const { id } = useParams();
    const [
        {title, summary, image, ingredients, instructions},
        setRecipe
    ] = useState({});

    useEffect(() => {
        const recipe = recipes.find(recipe => recipe.id === Number(id));
        setRecipe(recipe);
    }, []);

    if (!title) return <div>Loading...</div>

    return (
        <div className="shadow-lg rounded-lg p-3 w-full">
            <img src={image} alt="Recipe image" className="rounded-lg w-full max-h-60 hover:scale-110"/>
            <div>
                <h1>
                    {title}
                </h1>
                <p>{summary}</p>
            </div>
            <section className="m-2 p-2 border-2 rounded-lg">
            <h2 className="text-lg font-semibold">Ingredients:</h2>
            <ul>
                  {ingredients.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </section>
            <section className="m-2 p-2 border-2 rounded-lg">
                <h2 className="text-lg font-semibold">Instructions:</h2>
                <ol>
                  {instructions.map((item, i) => <li key={i}>{`${i+1}- ${item}`}</li>)}
                </ol>
            </section>
        </div>
    )
}

export default RecipeDetail;
