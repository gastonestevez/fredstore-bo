import styled, { css } from "styled-components"

interface StyleProps {
    newSection?: boolean
    noBottomMargin?: boolean
    marginTop?: number
}

export const H1 = styled.h1`
    font-size: 20px;
    line-height: 1.2;
    margin: 0 0 16px;
    font-weight: bold;

    /* Tablet & Desktop */
    @media screen and (min-width: 768px) {
        font-size: 32px;
    }
`

export const H2 = styled.h2`
    font-size: 18px;
    line-height: 1.2;
    margin: 24px 0;
    font-weight: bold;

    ${({ newSection }: StyleProps) =>
        newSection &&
        css`
            margin-top: 48px;
        `}

    ${({ noBottomMargin }: StyleProps) =>
        noBottomMargin &&
        css`
            margin-bottom: 0;
        `}
    
  /* Tablet & Desktop */
  @media screen and (min-width: 768px) {
        font-size: 20px;
    }
`

export const H3 = styled.h3`
    font-size: 18px;
    line-height: 1.2;
    margin: 0;
    font-weight: bold;

    /* Tablet & Desktop */
    @media screen and (min-width: 768px) {
        font-size: 20px;
    }
`

export const H4 = styled.h4`
    font-weight: 500;
    font-size: 16px;
    margin: 0 0 16px;

    ${({ marginTop }: StyleProps) =>
        marginTop &&
        marginTop > 0 &&
        css`
            margin-top: ${marginTop}px;
        `}
`
