import { useState } from "react";
import Tab from "./Tab";

const data = {
    tabs: [{ text: "tab1" }, { text: "tab2" }, { text: "tab3" }],
};

const App = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tabs, setTabs] = useState(data);

    return (
        <>
            <Tab
                selectedIndex={selectedIndex}
                data={tabs.tabs}
                onClickItem={(item, index) => {
                    setSelectedIndex(index);
                }}
            />
            <button
                onClick={() => {
                    //? 얕은복사에 의해 실패하는 케이스
                    // tabs.tabs[0].text = "item1";
                    // setTabs(tabs);
                    //? 깊은복사
                    const newTabs = { ...tabs };
                    newTabs.tabs[0].text = "item1";
                    setTabs(newTabs);
                }}
            >
                tab1 을 item1 으로 이름바꾸기
            </button>
        </>
    );
};

export default App;
