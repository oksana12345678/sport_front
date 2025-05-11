import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkList = styled.ul(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.pxs.x2,
  marginBottom: theme.pxs.x10_5,
  width: '100%',
}));

export const LinkItem = styled.li({});

export const ImgCard = styled.img({
  borderRadius: '7px',
});
export const StyledLink = styled(Link)<{
  $bgImage1x: string;
  $bgImage2x: string;
}>(({ theme, $bgImage1x, $bgImage2x }) => ({
  color: theme.color.white,
  position: 'relative',
  background: ` linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${$bgImage1x})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  padding: theme.pxs.x3,
  width: '100%',
  height: '152px',
  borderRadius: theme.pxs.x1_5,
  '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)': {
    background: ` linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${$bgImage2x})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));
export const StyledImage = styled.div<{
  $bgImage2x: string;
}>(({ theme, $bgImage2x }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: '112px',
  height: '144px',
  borderRadius: theme.pxs.x2,
  cursor: 'pointer',
  background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${$bgImage2x})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const SportName = styled.div(({ theme }) => ({
  ...theme.fonts.secondTitle,
  fontWeight: '600',
  textTransform: 'uppercase',
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  bottom: '50%',
  color: theme.color.white,
}));
