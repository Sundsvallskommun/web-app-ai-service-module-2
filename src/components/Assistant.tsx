import { AIServiceModule, useAssistantStore } from "@sk-web-gui/ai";
import { Avatar, Icon } from "@sk-web-gui/react";
import { useMediaQuery } from "usehooks-ts";
import { DynamicIcon } from "lucide-react/dynamic";

interface AssistantProps {
  children?: JSX.Element | JSX.Element[];
}

export const Assistant: React.FC<AssistantProps> = ({ children }) => {
  const options = useAssistantStore((state) => state.options);
  const isMobile = useMediaQuery(`screen and (max-width: 1023px)`);

  const props: React.ComponentPropsWithoutRef<
    typeof AIServiceModule.Component
  > = {
    isMobile,
    questionsTitle: options?.questionsTitle,
    questions: options?.questions,
    variant: options?.variant,
    header: <h2>{options.title}</h2>,
    label: options?.label,
    readmore: options?.readmore?.link?.url ? options.readmore : undefined,
    headerIcon: options?.icon ? (
      <Avatar
        size="md"
        className="w-40 h-40"
        imageElement={
          <Icon
            color={options.inverted ? options.color : undefined}
            icon={<DynamicIcon name={options.icon} />}
          />
        }
      />
    ) : undefined,
    color: options?.color,
    inverted: options?.inverted,
    children,
  };

  return <AIServiceModule {...props} />;
};
