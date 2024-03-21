import { Editor } from "./Editor";
import "./quill.snow.css";
import "./App.css";
import { http, HttpResponse, passthrough } from "msw";
import { SetupWorker, setupWorker } from "msw/browser";
import { useState } from "react";

// Describe the network.
const handlers = [
    http.get("https://acme.com/product/:id", ({ params }) => {
        return HttpResponse.json({
            id: params.id,
            title: "Porcelain Mug",
            price: 9.99,
        });
    }),
];

// Enable API mocking anywhere.
const worker = setupWorker(...handlers);
await worker.start();
function App() {
    const [path, setPath] = useState("");
    const [res, setRes] = useState();
    const [error, setError] = useState();
    const request = () => {
        fetch(path)
            .then((res) =>
                res
                    .json()
                    .then((data) => {
                        console.log(data);

                        setRes(data);
                    })
                    .catch((error) => {
                        console.log(error, "??");

                        setError(error);
                    })
            )
            .catch((error) => {
                console.log(error, "??");
                setError(error);
            });
    };
    return (
        <>
            {/* <Editor /> */}
            <label>
                <span>path</span>
                <input value={path} onChange={(e) => setPath(e.target.value)} />
            </label>
            <button onClick={request}>start fetch</button>
            <div>response:{JSON.stringify(res)}</div>

            <div>error:{JSON.stringify(error)}</div>
            <MSWDevtools worker={worker} path={path} setPath={setPath} />
        </>
    );
}
export type Method =
    | "all"
    | "post"
    | "get"
    | "put"
    | "patch"
    | "options"
    | "delete";

const MSWDevtools = ({
    worker,
    path,
    setPath,
}: {
    worker: SetupWorker;
    path: any;
    setPath: any;
}) => {
    const [method, setMethod] = useState<Method>("get");
    const [statusCode, setStatusCode] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [passThrough, setPassThrough] = useState(false);
    const jsonResponseHandler = (body: any) => () =>
        statusCode === "200" ? HttpResponse.json(body) : HttpResponse.error();
    const passthroughResponseHandler = () => () => passthrough();

    const handleOnClick = () => {
        if (!passThrough) {
            console.log(path, "passThoughed");
            worker.use(http[method](path, passthrough));
        } else {
            console.log(path, "saved");

            worker.use(http[method](path, jsonResponseHandler(response)));
        }
    };
    return (
        <div
            style={{
                position: "fixed",
                width: "100%",
                height: 200,
                // right: 48,
                bottom: 0,
                background: "gray",
            }}
        >
            <div style={{ width: "100%", height: "100%", display: "flex" }}>
                <label>
                    <span>method</span>
                    <input
                        value={method}
                        onChange={(e) => setMethod(e.target.value as any)}
                    />
                </label>
                <label>
                    <span>path</span>
                    <input
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                    />
                </label>
                <label>
                    <span>statusCode</span>
                    <input
                        value={statusCode}
                        onChange={(e) => setStatusCode(e.target.value)}
                    />
                </label>
                <label>
                    <span>response</span>
                    <input
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                    />
                </label>
                <label>
                    <span>error</span>
                    <input
                        value={error}
                        onChange={(e) => setError(e.target.value)}
                    />
                </label>
                <label>
                    <span>on/off</span>
                    <input
                        type="checkbox"
                        checked={passThrough}
                        onChange={(e) => setPassThrough(!!e.target.checked)}
                    />
                </label>
                <button onClick={handleOnClick}>save</button>
            </div>
        </div>
    );
};

export default App;
