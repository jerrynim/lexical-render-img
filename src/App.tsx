import {
    $getRoot,
    $isDecoratorNode,
    $isElementNode,
    LexicalEditor,
} from "lexical";
import { useEffect } from "react";
import { TreeView } from "@lexical/react/LexicalTreeView";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ImageNode } from "./ImageNode";
import "./quill.snow.css";
import { Toolbar } from "./toolbar";
import { $generateNodesFromDOM } from "@lexical/html";

const theme = {
    // Theme styling goes here
};

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.

const htmlString = `
<p><img src="https://opening-attachments.greetinghr.com/20210719/91eacc7c-299f-4043-ab6f-7629fe568d3a/greeting-img.png" width="828"></p><p><br></p><h3><strong class="gt-strong" style="color:rgb(25, 113, 194);">🚀로켓처럼 빠르게 성장 중인 채용관리 솔루션 그리팅을 함께 만들어가며,</strong></h3><h3><strong class="gt-strong" style="color:rgb(25, 113, 194);">대한민국의 채용문화를 혁신해 나갈 동료를 찾고 있습니다.</strong></h3><p><br></p><p><span style="background-color:rgb(255, 255, 255); color:rgba(0, 0, 0, 0.9);">📈&nbsp;</span><strong class="gt-strong" style="background-color:rgb(255, 255, 255); color:rgba(0, 0, 0, 0.9);">빠르다 빨라,</strong><span style="background-color:rgb(255, 255, 255); color:rgba(0, 0, 0, 0.9);"> </span>B2B SaaS로서는 드물게 J커브를 그리며 가파르게 성장 중! (매달 27.5%씩 고객사 수 성장 중)</p><p>🏃‍♂️ <strong class="gt-strong">출근이 기다려진 건 처음이야</strong>, 실제 구성원이 주셨던 말로 즐거움과 성장을 함께 느낄 수 있어요!</p><p>🧡 <strong class="gt-strong">그리팅 만족지수 오늘도 높음, </strong>고객들에게 사랑받는 제품을 직접 개발하고, 피드백을 바로바로 받으며 성취감을 받을 수 있어요!</p><p>🤸‍♂️ <strong class="gt-strong">해보고 싶은 거 다해! </strong>본인이 자유롭게 업무를 기획/제안하고, 주도적으로 추진까지 할 수 있어요!</p><p>🔥 <strong class="gt-strong">두들린 인재밀도 최고치 달성,</strong> 두들린 팀원들은 모두가 각자의 분야에서 실력이 정말 뛰어난 분들이에요!</p><p><br></p><h3><strong class="gt-strong" style="color:rgb(33, 37, 41);">그리팅 소개 (그리팅은 이렇게 성장해왔어요!)</strong></h3><p>그리팅(Greeting)은 기업의 채용 과정에서 발생하는 이력서 관리, 평가 관리, 면접 일정 관리 등 모든 번거로운 일들을 하나의 서비스 안에서 해결할 수 있도록 돕는 서비스입니다.</p><p>한국에는 없던 ATS(Applicant Tracking System)라는 새로운 시장을 개척하며 나아가고 있습니다.</p><p><br></p><p>현재 그리팅은 웹 형태의 SaaS 솔루션으로 서비스 중이며, 2021년 1월 베타서비스 출시, 7월 정식 서비스 출시 후 수개월 만에 <strong class="gt-strong">쏘카, 샌드박스, 패스트파이브, 아이디어스, 웨이브, 강남언니</strong> 등 국내 유명 스타트업들이 저희 서비스를 통해 채용을 진행하고 있습니다.</p><p>또한 창업 1년 9개월만인 2021년 12월 <strong class="gt-strong">알토스벤처스, 프라이머, 동훈인베스트먼트, 슈미트, 퓨처플레이</strong> 등 국내 유명 투자사들로부터 43억원 규모(누적 53억)의 Series A 투자를 유치하여 성장 가능성을 인정받았습니다.</p><p><br></p><p>더 탄탄하고 좋은 서비스, 더 많은 분들에게 사랑받을 수 있는 서비스를 만들고, 보다 고도화 하고, 더 빠르게 성장할 수 있는 두들린을 만들기 위해 <strong class="gt-strong">리크루팅 매니저</strong>분을 추가로 모시게 되었습니다. 함께 채용 문화를 바꿔보고 싶으신 분들, 끊임없는 토론과 고민으로 최적의 사용자 경험을 주고 싶은 분들, 폭풍 성장하는 스타트업에서 함께 성장하고 싶으신 분들, 이 외에도 다양한 꿈을 꾸고 계신 분들 모두 환영합니다! 🥳</p><p><br></p><ul><li><a href="https://bit.ly/3unkSWe" rel="noopener noreferrer" target="_blank" style="color:rgb(0, 102, 204);"><strong class="gt-strong">1년에 업데이트만 300번, 미친 실행력의 스타트업 이야기</strong></a><strong class="gt-strong"> </strong></li><li><a href="https://www.notion.so/doodlincorp/Doodlin-b97540f0b5f7402a947ec87896e441b0" rel="noopener noreferrer" target="_blank" style="color:rgb(0, 102, 204);"><strong class="gt-strong">짧고 굵은 두들린 소개 페이지 </strong></a></li></ul><p><br></p><h3>😊 이런 분들이 두들린 ‘리크루팅 매니저’에 딱이에요!</h3><ul><li>채용에 진심인 다른 구성원들과 적극적으로 협업하고, 다양한 시도들을 해보고 싶은 분!</li><li>톡톡 튀는 다양한 아이디어를 채용 뿐만 아니라 비즈니스에도 제안해보고 싶은 분!</li><li>직접 영입한 지원자가 회사에 만족하며 행복하게 다니는 것을 보고 싶은 분!</li></ul><p><br></p><h3>주요 업무 (리크루팅 매니저는 이런 일을 해요!)</h3><ul><li>전반적인 채용 프로세스를 관리/운영하고, 지원자들이 긍정적인 경험을 가질 수 있도록 개선해나갑니다.</li><li>두들린에 필요한 인재들을 영입할 수 있는 다이렉트 소싱 전략을 수립하고 적극적으로 실행합니다.</li><li>지원자들이 두들린의 매력 포인트를 알 수 있도록 채용 브랜딩 전략을 수립하고, 실행합니다.</li><li>좋은 인재가 모이는 커뮤니티 및 채널을 발굴하고, 다양한 후보자들과 적극적으로 소통하며 중장기적 네트워크를 구축합니다.</li><li>ㅇㅇ</li></ul><p><br></p><h3>자격 요건 (이런 분을 찾아요!)</h3><ul><li>빠르게 성장하는 회사에서 1년 이상 주도적으로 채용 업무를 경험해보신 분</li><li>다양한 채용 플랫폼을 활용한 다이렉트 소싱 경험이 있는 분</li><li>인재 영입을 위해 다양한 관점에서 접근하고 실행하는 분</li><li>생각이나 아이디어를 이해하기 쉽게 글과 말로 잘 표현하고, 전달할 수 있는 분</li></ul><p><br></p><h3>우대 사항 (이런 경험이 있으면 더 좋아요!)</h3><ul><li>틀에 박힌 사고에서 벗어나 새로운 아이디어를 시도해본 경험이 있는 분</li><li>채용 브랜딩 콘텐츠를 제작해본 경험이 있거나 브랜딩에 관심이 많은 분</li><li>다양한 사람들과의 소통을 즐기고, 긍정적인 영향력을 줄 수 있는 분</li><li>두들린의 비전을 효과적으로 전달하고, 후보자에게 설득할 수 있는 분</li><li>IT 또는 스타트업에 대한 경험이나 이해가 있는 분</li></ul><p><br></p><h3>✨두들린 피플팀에 오시면, 이런 기회들이 있어요!</h3><ul><li><strong class="gt-strong">두들린의 비즈니스는 바로 채용!</strong> 채용에 느꼈던 다양한 불편함, 새로운 아이디어를 직접 비즈니스에 제안해볼 수 있어요.</li><li><strong class="gt-strong">두들린의 미션은 고객의 문제를 해결해주는 것!</strong> 고객의 채용 문제 해결을 위해 저희 피플팀도 함께 참여할 수 있어요.</li><li><strong class="gt-strong">해보고 싶은 거 다 해!</strong> 채용에 진심인 다른 구성원들과 협업하고, 피플팀과 여러가지 아이디어를 교류하며, 다양한 시도를 해볼 수 있어요.</li></ul><p><br></p><h3>👨‍👨‍👧‍👦 피플팀 소개</h3><p><strong class="gt-strong">'더 좋은 사람들과 더 즐겁게 일하는 두들린을 만들어가는 것’</strong>이 저희 피플팀의 미션입니다!</p><ul><li>즐겁게 일하는 게 우리 회사 성장의 전부 (이태규, CEO)</li><li class="ql-indent-1">링크드인 프로필 : <a href="https://www.linkedin.com/in/taekyu-lee-556220191/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/taekyu-lee-556220191/</a></li><li>어차피 인사는 송민호 (송민호, 피플 리드)</li><li class="ql-indent-1">링크드인 프로필 : <a href="https://www.linkedin.com/in/minhosong-32807a13a/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/minhosong-32807a13a/</a></li><li>이 구역의 주인공은 나야나 (민문홍, 피플 매니저)</li><li class="ql-indent-1">링크드인 프로필 : <a href="https://www.linkedin.com/in/munergy/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/munergy/</a></li></ul><p><br></p><h3>🎈문화 및 복지</h3><ul><li>직급 없이 "님" 으로 소통하는 문화</li><li><strong class="gt-strong">매일매일</strong> 출근 시간에 대한 압박이 없는 유연출근제(<strong class="gt-strong">9시 ~ 11시 출근</strong>)</li><li>원할 때 언제든지 떠나는 <strong class="gt-strong">무제한</strong> 휴가 및 재택근무</li><li><strong class="gt-strong">무제한</strong> 자기개발비 지원(도서, 강의, 세미나 등)</li><li>점심 &amp; 저녁 식사비 지원</li><li><span style="color:rgb(51, 51, 51);">무료 스낵바, 에스프레소 머신, 음료 등의 무제한 간식 지원</span></li><li>업무를 위한 기기 지원(<strong class="gt-strong">최신형 MacBook, 모니터 등</strong>)</li><li><strong class="gt-strong">각자의 위치에서 최고의 전문가인 뛰어난 동료들</strong></li></ul><p><br></p><h3>채용 절차</h3><p class="ql-indent-1"><span style="background-color:rgb(255, 235, 204);">Step 1. 서류 접수 (열람 후 최대 1주일 내 회신)</span></p><p class="ql-indent-2">어떤 경험을 가지고 계신지 알기 위한 절차예요.</p><p class="ql-indent-2"><br></p><p class="ql-indent-1"><span style="background-color:rgb(255, 235, 204);">Step 2. 실무진 면접 (1시간)</span></p><p class="ql-indent-2">실무진과의 인터뷰로 지원자 분의 경험, 프로젝트 등에 대한 내용을 기반으로 인터뷰를 진행해요.</p><p class="ql-indent-2"><br></p><p class="ql-indent-1"><span style="background-color:rgb(255, 235, 204);">Step 3. 컬처핏 면접 (30분~1시간)</span></p><p class="ql-indent-2">경영진과의 인터뷰로 지원자 분의 비전, 목표 등에 대한 내용을 들어요.</p><p class="ql-indent-2"><br></p><p class="ql-indent-1"><span style="background-color:rgb(255, 235, 204);">Step 4. 처우 협의 및 최종 합격</span></p><p class="ql-indent-2">처우, 입사 일정 등을 협의해요.</p><p class="ql-indent-2"><br></p><p><strong class="gt-strong">😁 두들린 채용에 대한 설문조사에 솔직한 의견 남겨주세요! (딱, 1분)</strong></p><ul><li><a href="https://forms.gle/nkRTbCMWD23AZgLY6" rel="noopener noreferrer" target="_blank" style="color:rgb(0, 102, 204);"><strong class="gt-strong">1분 설문조사 참여하기!</strong></a></li></ul><p><br></p><p><strong class="gt-strong" style="background-color:rgb(255, 255, 255); color:rgb(33, 37, 41);">❓ 그 외 추가로 궁금하신 점이 있거나 건의사항이 있다면 아래 채용담당자 이메일로 자유롭게 말씀해주세요!</strong></p><ul><li>recruit@doodlin.co.kr</li></ul>
`;

function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
    console.error(error);
}

function Editor() {
    const initialConfig = {
        editorState: (editor: LexicalEditor) => {
            const parser = new DOMParser();
            const dom = parser.parseFromString(htmlString, "text/html");
            const nodes = $generateNodesFromDOM(editor, dom);
            const root = $getRoot();
            root.clear();
            root.append(
                ...nodes.filter(
                    (node) => $isElementNode(node) || $isDecoratorNode(node)
                )
            );
        },
        namespace: "MyEditor",
        theme,
        onError,
        nodes: [ImageNode],
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <Toolbar />
            <div className="detail">
                <div className="quill">
                    <div className="ql-container ql-snow">
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="ql-editor"></ContentEditable>
                            }
                            placeholder={<div>Enter some text...</div>}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                    </div>
                </div>
            </div>
            <HistoryPlugin />
            <TreeViewPlugin />
            <MyCustomAutoFocusPlugin />
        </LexicalComposer>
    );
}

function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();
    return (
        <TreeView
            viewClassName="tree-view-output"
            timeTravelPanelClassName="debug-timetravel-panel"
            timeTravelButtonClassName="debug-timetravel-button"
            timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
            timeTravelPanelButtonClassName="debug-timetravel-panel-button"
            editor={editor}
            treeTypeButtonClassName={""}
        />
    );
}

export default Editor;
