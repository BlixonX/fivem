import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { TOOL_SIDE, WETool, WorldEditorToolbarState } from '../WorldEditorToolbarState';
import s from './BaseTool.module.scss';

export interface BaseToolProps {
  tool: WETool,
  icon: React.ReactNode,
  label: string,

  renderAlways?: boolean,
  children?: React.ReactNode,

  toggleClassName?: string,
  panelClassName?: string,
}

export const BaseTool = observer(function BaseTool(props: BaseToolProps) {
  const {
    tool,
    icon,
    label,
    children,
    renderAlways = false,
    toggleClassName: tClassName = '',
    panelClassName: pClassName = '',

  } = props;

  const toolIsOpen = WorldEditorToolbarState.isToolOpen(tool);

  const toggleClassName = classnames(s.toggle, tClassName, {
    [s.active]: toolIsOpen,
  });

  const panelClassName = classnames(s.panel, pClassName, {
    [s.active]: toolIsOpen,
    [s.right]: TOOL_SIDE[tool] === 'right',
  });

  let childrenNode = null;
  if (children && (renderAlways || toolIsOpen)) {
    childrenNode = (
      <div className={panelClassName}>
        {children}
      </div>
    );
  }

  return (
    <>
      <button
        className={toggleClassName}
        data-label={label}
        onClick={() => WorldEditorToolbarState.toggleTool(tool)}
      >
        {icon}
      </button>

      {childrenNode}
    </>
  );
});
