import { memo } from "react";
import { CopyButton } from "@/components/ui/CopyButton/CopyButton";
import type { Command } from "@/data/types";
import "./command-card.scss";

interface CommandCardProps {
  command: Command;
}

export const CommandCard = memo(function CommandCard({
  command,
}: CommandCardProps) {
  return (
    <article className='command-card'>
      <div className='command-card__header'>
        <h3 className='command-card__label'>{command.label}</h3>
        <CopyButton text={command.syntax} />
      </div>
      <div className='command-card__syntax'>
        <code>{command.syntax}</code>
      </div>
      <p className='command-card__description'>{command.description}</p>
    </article>
  );
});
