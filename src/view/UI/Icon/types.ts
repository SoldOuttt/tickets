import { ICON } from './IconType';
import React from 'react';

export interface IIconProps {
    icon: ICON;
    size?: 'sm' | 'md' | 'lg' | 'xs';
    width?: number | string;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
