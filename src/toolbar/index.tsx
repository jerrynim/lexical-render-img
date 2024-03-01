import {
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_CRITICAL,
    SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useEditor } from "../store/editor";
import { BoldPlugin } from "./BoldPlugin";
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const Toolbar = () => {
    const [editor] = useLexicalComposerContext();

    const { setIsBold } = useEditor((s) => ({
        setIsBold: s.setIsBold,
    }));
    const onChangeSelection = () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"));
        }
    };
    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                onChangeSelection();
                return false;
            },
            COMMAND_PRIORITY_CRITICAL
        );
    }, [editor]);
    return (
        <div className="toolbar">
            <BoldPlugin />
        </div>
    );
};
