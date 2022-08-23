import React, { useState, useEffect, useRef } from "react";
import Article from "./components/Article";

function App() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const category = useRef("");
    const country = useRef("");
    const [search, setSearch] = useState({
        country: "",
        category: "",
    });
    const onChangeHandler = (e) => {
        e.preventDefault();
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const getNews = async (country, category) => {
        setLoading(true);
        if (!country) country = "my";
        if (!category) category = "business";

        let res = await fetch(
            `https://newsapi.org/v2/top-headlines?from=2022-07-24&to=2022-07-24&country=${country}&category=${category}&apiKey=${process.env.REACT_APP_API_KEY}`
        );
        let data = await res.json();
        setNews(data.articles);
        setLoading(false);
    };

    useEffect(() => {
        getNews(country.current, category.current);
    }, []);

    const showNews = news.length ? (
        news.map((article, i) => <Article data={article} key={i} />)
    ) : (
        <p>No news to show</p>
    );

    const categories = [
        "business",
        "health",
        "entertainment",
        "general",
        "science",
        "sports",
        "technology",
    ];

    const countries = [
        "my",
        "ch",
        "at",
        "au",
        "ae",
        "cn",
        "jp",
        "ph",
        "vn",
        "th",
        "in",
        "nz",
    ];

    return (
        <>
            {loading ? (
                <p>Loading... </p>
            ) : (
                <>
                    <div className="flex justify-center my-5 grid-cols-1">
                        <select
                            className="w-2/12 border-black border-2 rounded-md mr-2"
                            name="country"
                            defaultValue={country.current}
                            // onChange={onChangeHandler}
                            onChange={(e) => {
                                country.current = e.target.value;
                            }}
                        >
                            <option value="" disabled>
                                Choose country
                            </option>
                            {countries.map((country, i) => (
                                <option key={i} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        <select
                            className="w-2/12 mr-5 border-black border-2 rounded-md"
                            name="category"
                            defaultValue={category.current}
                            // onChange={onChangeHandler}
                            onChange={(e) => {
                                category.current = e.target.value;
                            }}
                        >
                            <option value="" disabled>
                                Choose category
                            </option>
                            {categories.map((category, i) => (
                                <option key={i} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-center">
                            <label className="mt-1">From: &nbsp;</label>
                            <input
                                className="border-black border-2"
                                type="date"
                            />
                            &nbsp;
                            <label htmlFor="" className="mt-1 ">
                                To: &nbsp;
                            </label>
                            <input
                                type="date"
                                className="border-black border-2"
                            />
                        </div>
                        &nbsp;
                        <button
                            className="btn bg-blue-500 rounded-lg py-1 px-1"
                            onClick={() =>
                                getNews(country.current, category.current)
                            }
                        >
                            Search
                        </button>
                    </div>
                    <div className="gap-x-2 grid grid-cols-1 sm:grid-cols-2">
                        {showNews}
                    </div>
                </>
            )}
        </>
    );
}

export default App;
