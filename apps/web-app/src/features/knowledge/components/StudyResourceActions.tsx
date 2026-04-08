import type { StudyResourceMetadata } from '../types';
import { isSameOriginAsset } from '../utils';

interface StudyResourceActionsProps {
  resource: Pick<StudyResourceMetadata, 'downloadUrl' | 'liveUrl' | 'sourceCodeUrl' | 'title'>;
}

function ActionLink({
  href,
  label,
  download,
}: {
  href: string;
  label: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? true : undefined}
      className="action-pill"
    >
      {label}
    </a>
  );
}

export default function StudyResourceActions({ resource }: StudyResourceActionsProps) {
  return (
    <div className="action-pill-row">
      {resource.liveUrl && <ActionLink href={resource.liveUrl} label="Abrir material" />}
      {resource.downloadUrl && (
        <ActionLink
          href={resource.downloadUrl}
          label="Baixar"
          download={isSameOriginAsset(resource.downloadUrl)}
        />
      )}
      {resource.sourceCodeUrl && <ActionLink href={resource.sourceCodeUrl} label="Ver código" />}
    </div>
  );
}
