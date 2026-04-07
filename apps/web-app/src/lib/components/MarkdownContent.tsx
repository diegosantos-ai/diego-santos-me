'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

interface MarkdownContentProps {
  html: string;
  className?: string;
  style?: CSSProperties;
}

export default function MarkdownContent({ html, className, style }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;

    async function renderMermaidDiagrams() {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const mermaidBlocks = Array.from(
        container.querySelectorAll<HTMLElement>('pre > code.language-mermaid')
      );

      if (mermaidBlocks.length === 0) {
        return;
      }

      const mermaidModule = await import('mermaid');
      const mermaid = mermaidModule.default;
      const rootStyles = getComputedStyle(document.documentElement);

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'base',
        themeVariables: {
          background: rootStyles.getPropertyValue('--bg-elevated').trim() || '#ffffff',
          primaryColor: rootStyles.getPropertyValue('--bg-warm').trim() || '#f3ede2',
          primaryTextColor: rootStyles.getPropertyValue('--text-primary').trim() || '#16212b',
          primaryBorderColor: rootStyles.getPropertyValue('--border-strong').trim() || '#b9c3cc',
          lineColor: rootStyles.getPropertyValue('--accent-bronze').trim() || '#c9892f',
          secondaryColor: rootStyles.getPropertyValue('--bg-surface-alt').trim() || '#eef2f5',
          tertiaryColor: rootStyles.getPropertyValue('--bg-surface').trim() || '#ffffff',
          fontFamily: 'var(--font-geist-sans), sans-serif',
        },
        flowchart: {
          htmlLabels: true,
          curve: 'basis',
        },
      });

      await Promise.all(
        mermaidBlocks.map(async (codeBlock, index) => {
          const preBlock = codeBlock.parentElement;
          const diagramDefinition = codeBlock.textContent?.trim();

          if (!preBlock || !diagramDefinition) {
            return;
          }

          try {
            const { svg, bindFunctions } = await mermaid.render(
              `mermaid-diagram-${index}-${Date.now()}`,
              diagramDefinition
            );

            if (isCancelled) {
              return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'mermaid-diagram';
            wrapper.innerHTML = svg;
            preBlock.replaceWith(wrapper);

            bindFunctions?.(wrapper);
          } catch (error) {
            console.error('Falha ao renderizar diagrama Mermaid.', error);

            if (isCancelled) {
              return;
            }

            const fallback = document.createElement('div');
            const message = document.createElement('p');
            const pre = document.createElement('pre');
            const code = document.createElement('code');

            fallback.className = 'mermaid-diagram mermaid-diagram--error';
            message.className = 'mermaid-diagram__message';
            message.textContent = 'Nao foi possivel renderizar este diagrama.';
            code.textContent = diagramDefinition;

            pre.appendChild(code);
            fallback.appendChild(message);
            fallback.appendChild(pre);
            preBlock.replaceWith(fallback);
          }
        })
      );
    }

    renderMermaidDiagrams();

    return () => {
      isCancelled = true;
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
