import { http, HttpResponse, passthrough } from "msw";
import { setupWorker } from "msw/browser";
import { useEffect, useState } from "react";
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
        console.log(page, (page - 1) * 10, 10);
        return HttpResponse.json({
            items: items.slice((page - 1) * 10, page * 10),
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
    const [items, setItems] = useState<{ text: string }[]>([]);
    const [maxLength, setMaxLength] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log(page);
        axios
            .get<{ items: { text: string }[] }>(`/items?page=${page}`)
            .then((res) => {
                console.log(res, "res");
                setItems(res.data.items);
            });
    }, [page]);

    useEffect(() => {
        axios.get<{ "max-length": number }>("/items/max-length").then((res) => {
            console.log(res, "max-length");
            setMaxLength(res.data["max-length"]);
            //maxLength setValue << camelCase 카멜케이스는 프론트엔드만 써요 거의
            // 백엔드는 database column 항상 언더바를 씀 max_length, item_info
        });
    }, []);
    const maxPage = Math.ceil(maxLength / 10);
    return (
        <div>
            {items.map((item) => {
                return <div key={item.text}>{item.text}</div>;
            })}
            <Pagination
                maxPage={maxPage}
                setPage={setPage}
                currentPage={page}
            />
        </div>
    );
};

const Pagination = ({
    maxPage,
    setPage,
    currentPage,
}: {
    maxPage: number;
    setPage: any;
    currentPage: number;
}) => {
    return (
        <div id="pagination" style={{ display: "flex" }}>
            <button disabled={currentPage === 1}>{"<"}</button>
            {Array(maxPage)
                .fill(null)
                .map((item, index) => (
                    <div
                        style={{ padding: 4 }}
                        onClick={() => {
                            setPage(index + 1);
                        }}
                    >
                        {index + 1}
                    </div>
                ))}

            <button disabled={currentPage === maxPage}>{">"}</button>
        </div>
    );
};

export default App;
