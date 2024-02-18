interface TabProps {
    selectedIndex: number;
    data: { text: string }[];
    onClickItem?: (item: string, index: number) => void;
}

const Tab = ({ data, onClickItem, selectedIndex }: TabProps) => {
    return (
        <ul style={{ display: "flex", listStyle: "none", padding: 12 }}>
            {data.map(({ text }, index) => (
                <li
                    key={index}
                    onClick={() => {
                        onClickItem?.(text, index);
                    }}
                    style={{
                        padding: 12,
                        borderBottom:
                            selectedIndex === index ? "1px solid" : undefined,
                    }}
                >
                    {text}
                </li>
            ))}
        </ul>
    );
};
export default Tab;
