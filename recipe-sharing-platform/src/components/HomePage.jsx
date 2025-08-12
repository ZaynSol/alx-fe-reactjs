import { useEffect, useState } from "react"
import recipes from '../data.json';
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

function HomePage() {
    const [data , setData] = useState(null);

    useEffect(() => {
        setData(recipes)
    }, [data])

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <Link to={`/recipe/new`} >Add New Recipe</Link>
            <div className="flex gap-4 flex-wrap p-4 border-2 rounded-lg">
              {data.map(({id, title}) => <Link to={`/recipe/${id}`} >{title}</Link>)}
            </div>
            <div className="grid grid-cols-1 shadow-sm shadow-orange-200 hover:shadow-lg rounded-md p-3 text-base sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map(item => <RecipeCard recipe={item} key={item.id} />)}
            </div>
        </div>
    )
}

export default HomePage;
