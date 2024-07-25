import type { StyledOptions } from '@emotion/styled';
import styled from '@emotion/styled';

export const transientOptions = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};

export const transientStyled = <T>(component: React.FC<T>, options?: StyledOptions<T>) =>
  styled(component, {
    ...options,
    shouldForwardProp: (propName) =>
      transientOptions.shouldForwardProp(propName) &&
      (options?.shouldForwardProp?.(propName) ?? true),
  });
