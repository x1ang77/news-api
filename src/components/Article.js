import React from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";

const Article = ({ data }) => {
    return (
        <div className="flex justify-center ">
            <div className="rounded-lg shadow-lg bg-white max-w-2xl">
                <a
                    href="#!"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                >
                    <img
                        className="rounded-t-lg"
                        src={data.urlToImage}
                        alt={data.title}
                    />
                </a>
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <small>{data.author} | </small>
                <small>{moment(data.publishedAt).format("LLLL")}</small>
            </div>
        </div>
    );
};

export default Article;
