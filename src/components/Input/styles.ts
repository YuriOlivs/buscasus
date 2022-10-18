import styled from "styled-components";

export const InputContainer = styled.div`
    position: relative;
`

export const Input = styled.input`
    margin: 11px 0 12px 0;
    padding: 2px 2px 2px 6px;
    border: 1px solid #e6e6e6;
    border-radius: 5px;

    &:focus {
        outline: 0;
        border: 1px solid #000;
    }
`

export const LoginInput = styled.input<{
    errorText: boolean;
}>`
    font-size: 16px;
    padding: 5px;
    padding-left: 28px;
    width: 100%;
    border: none;
    border-bottom: 3px solid ${(props) => props.errorText ? '#e94a4f' : '#3eb08f'};
    border-radius: 8px;
    background-color: #FBFBFD;
    transition: .5s;

    &:focus {
    outline: 0;
    border-bottom:3px solid #28755f;
}
`

export const LeftIcon = styled.label`
    display: inline-block;
    color: #757575;
    position: absolute;
    left: 0;
    cursor: pointer;
`

export const RightIcon = styled.span`
    color: #757575;
    left: 290px;
    top: 2px;
    position: absolute;
    cursor: pointer;
`

export const ErrorMessage = styled.p<{
    errorText: boolean;
}>`
    font-size: 13px;
    text-align: center;
    color: ${(props) => props.errorText ? '#e94a4f' : '#fbfbfd'};
    margin-top: 7px;
    margin-bottom: 5px;
    height: 20px;
    transition: .5s;
`