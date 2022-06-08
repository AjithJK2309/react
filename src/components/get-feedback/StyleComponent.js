import styled from 'styled-components';

export const FeedBox = styled.div`
margin: auto;
background-color: rgba(86, 95, 96, 0.992);
width: 55%;
margin-top: 5%;
color: white;
padding: 40px;
box-shadow:  rgba(250, 250, 251, 0.955) 0px 30px 60px -30px, rgba(250, 250, 251, 0.955) 0px -2px 6px 0px inset;
`   
export const Header = styled.h1`
    text-align: left;
    font-family: Georgia, 'Times New Roman', Times, serif;
`

export const Rating = styled.div`
    background-color: rgb(219, 222, 222);
    border-radius: 10px;
    width: 150%;
    padding-inline: 30px;
    margin-top: 20px;
    .active{
    background:  radial-gradient(circle farthest-side, #fceabb, #f8b500) !important;
    color: rgb(83, 77, 77) !important;
    font-weight: bold !important;
    border: none !important;
}
`
export const Label = styled.label`
    font-size: 20px;
    text-align: start !important;
    font-weight: 700;
    color: rgb(30, 28, 28);
    margin-top: 20px;
    margin-bottom: 10px;
`
export const RatingButton = styled.button`
    color:#fff;
    border-radius: 100px;
    font-size: 20px;
    background-color: #6c757d;
    padding: 5px;
    padding-inline:15px;
    border: none;
    margin-inline: 5px;
    &:hover{
        background-color: #5c636a;
    }
`
export const SubmitButton = styled.button`
    background-image: linear-gradient(to bottom right, ${props => props.theme.colors.green} 30%, ${props => props.theme.colors.lightGreen});
    padding: 10px;
    padding-inline: 20px;
    color: white;
    border: none;
    outline: none;
    font-weight: 700;
    border-radius: 8px;
    position: relative;
    right: -40%;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover{
        background-image: linear-gradient(to bottom right, ${props => props.theme.colors.lightGreen} 30%, ${props => props.theme.colors.green});
    }
    &:disabled{
        cursor: not-allowed;
        &:hover{
            background-image: linear-gradient(to bottom right, ${props => props.theme.colors.green} 30%, ${props => props.theme.colors.lightGreen});
        }
    }
`
export const ResetButton = styled(SubmitButton)`
    background-image: linear-gradient(to bottom right, ${props => props.theme.colors.gold} 30%, ${props => props.theme.colors.yellow});
    margin-right: 10px;
    &:hover{
        background-image: linear-gradient(to bottom right, ${props => props.theme.colors.yellow} 30%, ${props => props.theme.colors.gold});
    }
    &:disabled{
        &:hover{
            background-image: linear-gradient(to bottom right, ${props => props.theme.colors.gold} 30%, ${props => props.theme.colors.yellow});
        }
    }
`