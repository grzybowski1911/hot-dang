import { useEffect, useState } from "react"
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Filters } from "./Filters";

export const PropertySearch = () => {
    const [properties, setProperties] = useState([]);
    const [totalResults, setTotalResults] = useState([0]);
    const pageSize = 3; 
    const router = useRouter();

    const search = async () => {
        const {page} = queryString.parse(window.location.search);
        const response = await fetch(`/api/search`, {
            method: "POST",
            body: JSON.stringify({
                page: parseInt(page || "1"),
            })
        });
        const data = await response.json();
        console.log("SEARCH DATA: ", data);
        setProperties(data.properties);
        setTotalResults(data.total);
    };

    const handlePageClick = async (pageNumber) => {
        await router.push(`${router.query.slug.join("/")}?page=${pageNumber}`, null, {
            shallow: true
        });
        search();
    }

    useEffect(() => {
        search();
    }, []);

    const handleSearch = async ({petFriendly, hasParking, minPrice, maxPrice}) => {
        console.log("HANDLE SEARCH: ", petFriendly, hasParking, minPrice, maxPrice);
        await router.push(
            `${router.query.slug.join("/")}?page=1&petFriendly=${!!petFriendly}&hasParking=${!!hasParking}&minPrice=${!!minPrice}&maxPrice=${!!maxPrice}}`, 
            null, 
            {shallow: true}
        );
    }

    return <div>  
        <Filters onSearch={handleSearch} />
        <Results properties={properties} />
        <Pagination onPageClick={handlePageClick} totalPages={Math.ceil(totalResults / pageSize)} />
    </div>
}