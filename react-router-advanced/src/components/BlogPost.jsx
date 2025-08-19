import { useParams } from "react-router-dom";
const blogPosts = [
    {id: '1234', title: "Blog post 1"},
    {id: '5678', title: "Blog post 2"}
]

function BlogPost() {
    const { id: blogPostId } = useParams();
    const {title} = blogPosts.find(({id}) => id === blogPostId);

    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

export default BlogPost;
