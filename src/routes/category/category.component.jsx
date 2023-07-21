import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './category.styles.scss'
import { CategoriesContext } from '../../contexts/categories.context';
import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }
    , [categoriesMap, category]);

    return (
        <div className="category">
            {
                products && 
                products.map((product) => <ProductCard key={product.id} product={product} />)
            }
        </div>
    )
}

export default Category;