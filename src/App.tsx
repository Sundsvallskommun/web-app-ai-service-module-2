import {
  AssistantInfo,
  AssistantSettings,
  setAssistantStoreName,
  useAssistantStore,
  useSessions,
} from "@sk-web-gui/ai";
import { ColorSchemeMode, GuiProvider } from "@sk-web-gui/react";
import React, { Suspense, useEffect, useState } from "react";
import { Assistant } from "./components/Assistant";
import HtmlParser from "react-html-parser";

function App({
  user,
  hash,
  assistantId,
  children,
}: {
  user?: string | null;
  hash?: string | null;
  assistantId?: string | null;
  children?: string; //InnerHTML;
}) {
  const [setSettings, setInfo, setStream, setApiBaseUrl, setOptions] =
    useAssistantStore((state) => [
      state.setSettings,
      state.setInfo,
      state.setStream,
      state.setApiBaseUrl,
      state.setOptions,
    ]);
  const newSession = useSessions((state) => state.newSession);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setAssistantStoreName(`sk-ai-sa-${assistantId}`);

    const settings: AssistantSettings = {
      user: user || "",
      assistantId: assistantId || "",

      hash: hash || "",
      app: import.meta.env.VITE_APPLICATION,
    };

    const info: AssistantInfo = {
      name: import.meta.env.VITE_ASSISTANT_NAME || "Serviceassistenten",
      shortName: import.meta.env.VITE_ASSISTANT_SHORT_NAME || "AI",
      title: import.meta.env.VITE_ASSISTANT_TITLE || "Sundsvalls AI-assistent",
      description: {
        default:
          "Fråga assistenten om sådant du behöver veta som medarbetare på Sundsvalls kommun.",
        en: "The AI assistant can answer your questions in multiple languages.",
      },
      avatar: `${import.meta.env.VITE_BASE_PATH}${
        import.meta.env.VITE_ASSISTANT_AVATAR || "assets/assistanticon.png"
      }`,
    };
    const questions = [
      import.meta.env.VITE_QUESTION_1,
      import.meta.env.VITE_QUESTION_2,
      import.meta.env.VITE_QUESTION_3,
      import.meta.env.VITE_QUESTION_4,
      import.meta.env.VITE_QUESTION_5,
    ].filter((q) => !!q);

    const options = {
      title:
        import.meta.env.VITE_HEADING_TITLE || "Hej, hur kan jag hjälpa dig?",
      label: import.meta.env.VITE_LABEL || "Ställ din fråga här",
      questionsTitle:
        questions.length > 0
          ? import.meta.env.VITE_QUESTIONS_TITLE || "Vanliga frågor"
          : undefined,
      questions,
      variant: import.meta.env.VITE_VARIANT || "primary",
      readmore: {
        text: import.meta.env.VITE_READMORE_TEXT,
        link: {
          url: import.meta.env.VITE_READMORE_LINK_URL,
          text: import.meta.env.VITE_READMORE_LINK_TEXT,
        },
      },
      icon: import.meta.env.VITE_ICON,
      color: import.meta.env.VITE_COLOR || "vattjom",
      inverted:
        import.meta.env.VITE_VARIANT === "secondary"
          ? import.meta.env.VITE_INVERTED !== "true"
          : import.meta.env.VITE_INVERTED === "true",
    };

    setStream(import.meta.env.VITE_STREAM_DEFAULT);
    setApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
    setSettings(settings);
    setInfo(info);
    setOptions(options);

    newSession();

    if (import.meta.env.VITE_PAGE_TITLE) {
      document.title = import.meta.env.VITE_PAGE_TITLE;
    }

    setLoaded(true);
  }, [
    user,
    hash,
    assistantId,
    setSettings,
    setInfo,
    newSession,
    setStream,
    setApiBaseUrl,
  ]);

  return (
    <GuiProvider htmlFontSize={16} colorScheme={ColorSchemeMode.System}>
      {import.meta.env.VITE_PAGE_TITLE && (
        <div>
          <h1>{import.meta.env.VITE_PAGE_TITLE || "Assistent"}</h1>
        </div>
      )}
      <Suspense fallback="loading">
        {loaded && (
          <Assistant children={children ? HtmlParser(children) : undefined} />
        )}
      </Suspense>
    </GuiProvider>
  );
}

export default App;
