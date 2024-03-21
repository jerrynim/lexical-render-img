import { http, HttpResponse, passthrough } from "msw";
import { setupWorker } from "msw/browser";
import { useEffect } from "react";
import axios from "axios";

const items = Array(24)
    .fill(null)
    .map((_, index) => ({
        text: `item${index + 1}`,
    }));

// Describe the network.
const handlers = [
    http.get("/items", ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page"));

        if (!page) {
            return HttpResponse.json("page is required", { status: 400 });
        }
        return HttpResponse.json({
            items: items.splice((page - 1) * 10, 10),
        });
    }),
    http.get("/items/max-length", ({ params }) => {
        return HttpResponse.json({
            "max-length": 24,
        });
    }),
];

const worker = setupWorker(...handlers);
await worker.start();
const App = () => {
    useEffect(() => {
        axios.get("/items?page=3").then((res) => {
            console.log(res, "res");
        });
    }, []);
    useEffect(() => {
        axios.get("/items/max-length").then((res) => {
            console.log(res, "max-length");
        });
    }, []);

    return (
        <div>
            <Pagination />
        </div>
    );
};

const Pagination = () => {
    return <div id="pagination"></div>;
};

export default App;
