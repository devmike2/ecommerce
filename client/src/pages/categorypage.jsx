import { useParams } from "react-router-dom";

const CategoryPage = () => {
    const param = useParams()
    console.log('category', param)
    return ( 
        <div>
            {param.category}
        </div>
     );
}
 
export default CategoryPage;