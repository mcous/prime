import cx from 'classnames';

export type ContextMenuItemVariant = 'primary' | 'danger';

export const contextMenuItemCx = (
  variant: ContextMenuItemVariant = 'primary'
): string =>
  cx(
    'flex w-full items-center gap-1.5 py-1.5 pl-3 pr-2 text-left text-xs hover:bg-light focus:bg-light active:bg-medium',
    {
      'text-default': variant === 'primary',
      'text-danger-dark': variant === 'danger',
    }
  );
