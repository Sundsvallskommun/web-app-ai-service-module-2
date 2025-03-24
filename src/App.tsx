import {
  AssistantInfo,
  AssistantSettings,
  setAssistantStoreName,
  useAssistantStore,
  useSessions,
} from "@sk-web-gui/ai";
import { ColorSchemeMode, GuiProvider, cx, Logo } from "@sk-web-gui/react";
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

  const questions = [
    import.meta.env.VITE_QUESTION_1,
    import.meta.env.VITE_QUESTION_2,
    import.meta.env.VITE_QUESTION_3,
    import.meta.env.VITE_QUESTION_4,
    import.meta.env.VITE_QUESTION_5,
  ].filter((q) => !!q);

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

    const options = {
      title:
        import.meta.env.VITE_HEADING_TITLE || "Hej, hur kan jag hjälpa dig?",
      label: import.meta.env.VITE_HEADING_LABEL || "Ställ din fråga här",
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

  const getBackgroundColor = () => {
    const inverted =
      import.meta.env.VITE_BG_COLOR_INVERTED?.toLowerCase() === "true";
    switch (import.meta.env.VITE_BG_COLOR) {
      case "vattjom":
        return inverted
          ? "bg-inverted-vattjom-surface-primary text-vattjom-text-primary"
          : "bg-vattjom-surface-primary text-light-primary";
      case "juniskar":
        return inverted
          ? "bg-inverted-juniskar-surface-primary text-juniskar-text-primary"
          : "bg-juniskar-surface-primary text-light-primary";
      case "bjornstigen":
        return inverted
          ? "bg-inverted-bjornstigen-surface-primary text-bjornstigen-text-primary"
          : "bg-bjornstigen-surface-primary text-light-primary";
      case "gronsta":
        return inverted
          ? "bg-inverted-gronsta-surface-primary text-gronsta-text-primary"
          : "bg-gronsta-surface-primary text-light-primary";
      case "info":
        return inverted
          ? "bg-inverted-info-surface-primary text-info-text-primary"
          : "bg-info-surface-primary text-light-primary";
      case "warning":
        return inverted
          ? "bg-inverted-warning-surface-primary text-warning-text-primary"
          : "bg-warning-surface-primary text-light-primary";
      case "error":
        return inverted
          ? "bg-inverted-error-surface-primary text-error-text-primary"
          : "bg-error-surface-primary text-light-primary";
      default: {
        return "bg-transparent text-dark-primary";
      }
    }
  };

  const showLogo = import.meta.env.VITE_SHOW_LOGO?.toLowerCase() === "true";
  const fullscreen = import.meta.env.VITE_FULLSCREEN?.toLowerCase() === "true";
  const noModule =
    import.meta.env.VITE_VARIANT === "primary"
      ? import.meta.env.VITE_BG_COLOR === import.meta.env.VITE_COLOR &&
        import.meta.env.VITE_BG_COLOR_INVERTED === import.meta.env.VITE_INVERTED
      : import.meta.env.VITE_BG_COLOR === import.meta.env.VITE_COLOR &&
        import.meta.env.VITE_BG_COLOR_INVERTED !==
          import.meta.env.VITE_INVERTED;

  return (
    <GuiProvider
      htmlFontSize={16}
      colorScheme={import.meta.env.VITE_COLOR_SCHEME ?? ColorSchemeMode.System}
    >
      {fullscreen ? (
        <div
          id="sk-service-assistant-fullscreen"
          className={cx(
            "w-full flex justify-center items-start min-h-screen",
            getBackgroundColor()
          )}
        >
          <div
            className="max-w-[1440px] p-32 w-full flex flex-col items-center"
            data-nomodule={noModule}
          >
            {(import.meta.env.VITE_PAGE_TITLE || showLogo) && (
              <header className="flex items-center w-full gap-32 mb-48">
                {showLogo && (
                  <div className="w-[240px]">
                    <Logo
                      inverted={
                        import.meta.env.VITE_BG_COLOR_INVERTED?.toLowerCase() !==
                        "true"
                      }
                      title={import.meta.env.VITE_PAGE_TITLE}
                      variant={
                        !!import.meta.env.VITE_PAGE_TITLE ? "service" : "logo"
                      }
                    />
                  </div>
                )}
                {!!import.meta.env.VITE_PAGE_TITLE && !showLogo && (
                  <h1>{import.meta.env.VITE_PAGE_TITLE}</h1>
                )}
              </header>
            )}
            <div
              className={cx(
                "px-0 lg:px-32 w-full",
                questions?.length > 0 ? "max-w-full" : "max-w-[1000px]"
              )}
            >
              <Suspense fallback="loading">
                {loaded && (
                  <Assistant
                    children={children ? HtmlParser(children) : undefined}
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        <Suspense fallback="loading">
          {loaded && (
            <Assistant children={children ? HtmlParser(children) : undefined} />
          )}
        </Suspense>
      )}
    </GuiProvider>
  );
}

export default App;
