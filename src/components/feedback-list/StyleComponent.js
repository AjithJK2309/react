import styled from 'styled-components';
import { FeedBox,SubmitButton,Label } from '../get-feedback/StyleComponent';

export const FeedBox2 = styled(FeedBox)`
    background-color: rgb(49, 50, 50);
    width: 150%;
    padding: 20px;
`

export const Table = styled.table`
    padding-inline: 30px;
    text-align: center;
    justify-content: center;
`
export const TBody = styled.tbody``
export const Tr = styled.tr``
export const THead = styled.thead``
export const Th = styled.th`padding-inline:25px`
export const Td = styled.td`padding-inline:25px`

export const EditButton = styled(SubmitButton)`    
    background-image: linear-gradient(to bottom right, ${props => props.theme.colors.blue} 30%, ${props => props.theme.colors.skyBlue});
    position: relative;
    left: 0%;
    padding: 7px;
    padding-inline: 15px;
    &:hover{
        background-image: linear-gradient(to bottom right, ${props => props.theme.colors.skyBlue} 30%, ${props => props.theme.colors.blue});
    }
`
export const DeleteButton = styled(EditButton)`    
    background-image: linear-gradient(to bottom right, ${props => props.theme.colors.red} 30%, ${props => props.theme.colors.orange});
    margin-left: 5px;
    &:hover{
        background-image: linear-gradient(to bottom right, ${props => props.theme.colors.orange} 30%, ${props => props.theme.colors.red});
    }
`
export const Labels = styled(Label)``

export const BreakWord = styled.div`
    inline-size: 120px;
    overflow-wrap: break-word;
`